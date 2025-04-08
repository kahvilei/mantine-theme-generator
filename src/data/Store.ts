import {action, makeAutoObservable} from "mobx";
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

export class RemoraidStore {
    themes: Map<string, Theme>;
    themeDefaults = premadeThemes;
    theme: Theme;

    constructor() {
        // Initialize themes map and populate with default themes
        this.themes = new Map(
            Object.entries(this.themeDefaults).map(
                ([name, themeData]) => [name, new Theme(themeData, name, this)]
            )
        );

        // Set default theme
        this.theme = this.themes.get('Mantine') ?? new Theme(DEFAULT_THEME, 'Mantine', this);

        // Make this store observable
        makeAutoObservable(this);
    }

    /**
     * Set the main active theme
     */
    setMainTheme(theme: Theme): void {
        this.theme = theme;
    }

    @action
    resetTheme(themeName: string): void {
        if (this.themeDefaults[themeName]) {
            this.themes.delete(themeName);
            const newTheme =  new Theme(this.themeDefaults[themeName], themeName, this);
            this.themes.set(themeName, newTheme);
            if( this.theme.name === themeName ) {
                this.theme = newTheme;
            }
        }
    }

    /**
     * Get a list of all themes
     */
    themeList(): [string, Theme][] {
        return Array.from(this.themes);
    }

    /**
     * Set or create a theme with the given name and make it active
     */
    @action
    setTheme(name: string, theme: MantineThemeOverride): void {
        this.themes.set(name, new Theme(theme, name, this));
        const newTheme = this.themes.get(name);
        if (newTheme) {
            newTheme.makeMainTheme();
        }
    }

    /**
     * Get a theme by name
     */
    getTheme(name: string): Theme | undefined {
        return this.themes.get(name);
    }

    /**
     * Delete a theme by name
     */
    @action
    deleteTheme(name: string): boolean {
        // Don't allow deletion of the current active theme
        if (this.theme.name === name) {
            return false;
        }
        return this.themes.delete(name);
    }

    /**
     * Check if a theme exists
     */
    hasTheme(name: string): boolean {
        return this.themes.has(name);
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