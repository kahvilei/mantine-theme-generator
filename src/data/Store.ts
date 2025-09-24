import {action, IReactionDisposer, makeAutoObservable, reaction} from "mobx";
import { DEFAULT_THEME, MantineThemeOverride } from "@mantine/core";
import { premadeThemes } from "@/data/Models/Theme/premadeThemes";
import { Sizes } from "@/data/Models/Theme/SizeAndSpacing/Sizes";
import { Theme } from '@/data/Models/Theme/Theme';
import { Components } from './Models/Theme/Components/Components';
import { Typography, typographyProxy } from '@/data/Models/Theme/Typography';
import { Accessibility } from "@/data/Models/Theme/Accessibility/Accessibility";
import { Interaction } from "@/data/Models/Theme/Interaction/Interaction";
import { Colors } from "@/data/Models/Theme/Colors/Colors";
import {createSizesProxy} from "@/data/Models/Theme/SizeAndSpacing/proxy";
import {createColorsProxy} from "@/data/Models/Theme/Colors/proxy";
import { debounce } from "lodash";

const LOCAL_STORAGE_KEY = "remoraid_user_themes";
const ACTIVE_THEME_KEY = "remoraid_active_theme";

export class RemoraidStore {
  // Separate sources of truth
  premadeDefaults: Record<string, MantineThemeOverride>;
  userThemes: Map<string, Theme>;
  themes: Map<string, Theme>; // working set: premades + user
  theme: Theme;               // currently active

  private disposers: IReactionDisposer[] = []; // Track reactions for cleanup

  constructor() {
    this.premadeDefaults = premadeThemes;
    this.userThemes = new Map();
    this.themes = new Map();

    this.loadFromLocalStorage();

    // Load premade defaults fresh each time
    Object.entries(this.premadeDefaults).forEach(([name, data]) => {
      this.themes.set(name, new Theme(data, name, this));
    });

    // Merge user themes into the working set
    this.userThemes.forEach((theme, name) => {
      this.themes.set(name, theme);
    });

    // Pick last active theme or Mantine
    const activeName = localStorage.getItem(ACTIVE_THEME_KEY) || "Mantine";
    this.theme = this.themes.get(activeName) ?? new Theme(DEFAULT_THEME, activeName, this);

    this.initReactions();
    makeAutoObservable(this);
  }

  // --- THEME MANAGEMENT ---

  setMainTheme(theme: Theme): void {
    this.theme = theme;
    localStorage.setItem(ACTIVE_THEME_KEY, theme.name);
  }

  /** Reset a premade theme to its original default */
  @action
  resetTheme(name: string): void {
    if (this.premadeDefaults[name]) {
      const fresh = new Theme(this.premadeDefaults[name], name, this);
      this.themes.set(name, fresh);
      if (this.theme.name === name) this.theme = fresh;
    }
  }

  /** Add or update a USER theme */
  @action
  setTheme(name: string, theme: MantineThemeOverride): void {
    const newTheme = new Theme(theme, name, this);
    this.userThemes.set(name, newTheme);
    this.themes.set(name, newTheme);
    newTheme.makeMainTheme();
  }

  @action
  saveThemeToStorage(name: string, theme: MantineThemeOverride): void {
    const newTheme = new Theme(theme, name, this);
    this.userThemes.set(name, newTheme);
    this.themes.set(name, newTheme);
    this.saveToLocalStorage();
    newTheme.makeMainTheme();
  }

  /** Delete only user themes */
  @action
  deleteTheme(name: string): boolean {
    if (this.theme.name === name) return false; // can't delete active theme
    const deleted = this.userThemes.delete(name);
    if (deleted) {
      this.themes.delete(name);
      this.saveToLocalStorage();
    }
    return deleted;
  }

  /** Check if a theme exists (in working set) */
  hasTheme(name: string): boolean {
    return this.themes.has(name);
  }

  /** Get all working themes (premades + user) */
  themeList(): [string, Theme][] {
    return Array.from(this.themes);
  }

  /** Get just premade themes */
  premadeList(): [string, Theme][] {
    return Object.keys(this.premadeDefaults).map((name) => [
      name,
      this.themes.get(name)!,
    ]);
  }

  /** Get filtered themes based on userThemes flag */
  filteredThemeList(userOnly = false): [string, Theme][] {
    return userOnly ? this.userThemeList() : this.premadeList();
  }

  /** Get just user themes */
  userThemeList(): [string, Theme][] {
    return Array.from(this.userThemes);
  }

  /** Get theme by name */
  getTheme(name: string): Theme | undefined {
    return this.themes.get(name);
  }

  // --- PERSISTENCE ---

  private saveToLocalStorage() {
    const out: Record<string, MantineThemeOverride> = {};
    this.themes.forEach((theme, name) => {
      out[name] = theme.compile();
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(out));
  }

  private loadFromLocalStorage() {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (data) {
        const parsed: Record<string, MantineThemeOverride> = JSON.parse(data);

        Object.entries(parsed).forEach(([name, t]) => {
          const isPremade = !!this.premadeDefaults[name];

          // If premade, load as edited premade into `themes`
          if (isPremade) {
            this.themes.set(name, new Theme(t, name, this));
          } else {
            // Otherwise treat as user theme
            const theme = new Theme(t, name, this);
            this.userThemes.set(name, theme);
            this.themes.set(name, theme);
          }
        });
      }
    } catch {
      console.warn("Failed to load themes from localStorage");
    }
  }

  private saveToLocalStorageDebounced = debounce(() => this.saveToLocalStorage(), 300);

  private initReactions() {
    // 1. Watch all themes for changes (compile output)
    this.disposers.push(
      reaction(
        () => Array.from(this.themes.values()).map(t => t.compile()), // track all compiled states
        () => {
          this.saveToLocalStorage(); // persist user themes only
        }
      )
    );

    // 2. Watch active theme name for switching
    this.disposers.push(
      reaction(
        () => this.theme.name,
        (name) => localStorage.setItem(ACTIVE_THEME_KEY, name)
      )
    );
  }
}


// Create the singleton instance
const Root = new RemoraidStore();

// Export the theme with both get and set functionality
export const theme: Theme = new Proxy({} as Theme, {
    get: (_, prop: string) => {
        return Root.theme[prop as keyof Theme];
    },
    set: (_, prop: string, value: any): boolean => {
        if (prop in Root.theme) {
            (Root.theme as any)[prop] = value;
            return true;
        }
        return false;
    }
});

// Export colors with both get and set functionality
export const colors: Colors = createColorsProxy(Root)

// Export sizes with both get and set functionality
export const sizes: Sizes = createSizesProxy(Root);

// Export components with both get and set functionality
export const components: Components = new Proxy({} as Components, {
    get: (_, prop: string) => {
        if (Root.theme.components && prop in Root.theme.components) {
            return Root.theme.components[prop as keyof Components];
        }
        return undefined;
    },
    set: (_, prop: string, value: any): boolean => {
        if (Root.theme.components && prop in Root.theme.components) {
            (Root.theme.components as any)[prop] = value;
            return true;
        }
        return false;
    }
});

// Export accessibility with both get and set functionality
export const accessibility: Accessibility = new Proxy({} as Accessibility, {
    get: (_, prop: string) => {
        if (Root.theme.accessibility && prop in Root.theme.accessibility) {
            return Root.theme.accessibility[prop as keyof Accessibility];
        }
        return undefined;
    },
    set: (_, prop: string, value: any): boolean => {
        if (Root.theme.accessibility && prop in Root.theme.accessibility) {
            (Root.theme.accessibility as any)[prop] = value;
            return true;
        }
        return false;
    }
});

// Export interaction with both get and set functionality
export const interaction: Interaction = new Proxy({} as Interaction, {
    get: (_, prop: string) => {
        if (Root.theme.interaction && prop in Root.theme.interaction) {
            return Root.theme.interaction[prop as keyof Interaction];
        }
        return undefined;
    },
    set: (_, prop: string, value: any): boolean => {
        if (Root.theme.interaction && prop in Root.theme.interaction) {
            (Root.theme.interaction as any)[prop] = value;
            return true;
        }
        return false;
    }
});

// Export typography with both get and set functionality
export const typography: Typography = typographyProxy(Root);

// Export the root store as default
export default Root;