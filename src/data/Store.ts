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
import { processTypeScriptContent } from "@/utils/processTypescriptFile";
import { themeToTypeScript } from "@/utils/themeToTypeScript";

export const ACTIVE_THEME_KEY = "active-theme";
export const USER_THEME_PREFIX = "remoraid-theme:";

export type ThemeType = "user" | "app" | null;

export class RemoraidStore {
    // Separate sources of truth
    premadeDefaults: Record<string, MantineThemeOverride>;
    themes: Map<string, Theme>; // working set: premades + user
    theme: Theme;               // currently active

    constructor() {
        this.premadeDefaults = premadeThemes;
        this.themes = new Map();

        // Load premade defaults fresh each time
        Object.entries(this.premadeDefaults).forEach(([name, data]) => {
            this.themes.set(name, new Theme(data, name, this));
        });

        // 2️⃣ Load user themes from localStorage
        this.loadUserThemesFromLocalStorage();

        // 3️⃣ Restore last active theme
        const activeName = localStorage.getItem(ACTIVE_THEME_KEY) || "Mantine";
        this.theme = this.themes.get(activeName) ?? new Theme(DEFAULT_THEME, activeName, this);

        makeAutoObservable(this);
    }

    // --- THEME MANAGEMENT ---
    setActiveTheme(theme: Theme): void {
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

    /** Get theme by name */
    getTheme(name: string): Theme | undefined {
        return this.themes.get(name);
    }

    /** Check if a theme exists (in working set) */
    hasTheme(name: string): boolean {
        return this.themes.has(name);
    }

    @action
    deleteTheme(name: string): boolean {
        if (this.premadeDefaults[name]) {
            return false;
        }
        this.themes.delete(name);
        localStorage.removeItem(`${USER_THEME_PREFIX}${name}`);
        return true;
    }

    @action
    setTheme(name: string, theme: MantineThemeOverride): void {
        const newTheme = new Theme(theme, name, this);
        this.themes.set(name, newTheme);
        newTheme.makeActiveTheme();

        // Save user theme to localStorage
        localStorage.setItem(`${USER_THEME_PREFIX}${name}`, themeToTypeScript(newTheme.compiled));
    }

    /** Get all working themes (premades + user) */
    getAllThemes(): [string, Theme][] {
        return Array.from(this.themes);
    }

    /** Get just premade themes */
    getAppThemes(): [string, Theme][] {
        return Object.keys(this.premadeDefaults).map((name) => [
            name,
            this.themes.get(name)!,
        ]);
    }

    /** Get just user themes */
    getUserThemes(): [string, Theme][] {
        return Array.from(this.themes).filter(([name, theme]) => !this.premadeDefaults[name]);
    }

    /** Get filtered themes based on flag */
    getThemes(filter: ThemeType = null): [string, Theme][] {
        return filter ? filter === "app" ? this.getAppThemes() : this.getUserThemes() : this.getAllThemes();
    }

    @action
    private loadUserThemesFromLocalStorage(): void {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(USER_THEME_PREFIX)) {
                const name = key.replace(USER_THEME_PREFIX, "");
                const data = localStorage.getItem(key);
                if (data) {
                    try {
                        const parsed = processTypeScriptContent(data);
                        this.themes.set(name, new Theme(parsed, name, this));
                        const theme = this.themes.get(name);
                        if (premadeThemes[name] && theme){
                            theme.edited = true;
                        }
                    } catch (e) {
                        console.error(`Failed to load theme ${name} from localStorage`, e);
                    }
                }
            }
        }
    }

}

// Create the singleton instance
const Root = new RemoraidStore();


//Proxies
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


export const colors: Colors = createColorsProxy(Root)


export const sizes: Sizes = createSizesProxy(Root);


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

export const typography: Typography = typographyProxy(Root);

export default Root;