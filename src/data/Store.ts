import { makeAutoObservable } from "mobx";
import { DEFAULT_THEME, MantineThemeOverride } from "@mantine/core";
import { premadeThemes } from "@/data/Models/Theme/premadeThemes";
import { Sizes } from "@/data/Models/Theme/SizeAndSpacing/Sizes";
import { Theme } from '@/data/Models/Theme/Theme';
import { Components } from './Models/Theme/Components/Components';
import { Typography } from './Models/Theme/Typography/Typography';
import {Accessibility} from "@/data/Models/Theme/Accessibility/Accessibility";
import {Interaction} from "@/data/Models/Theme/Interaction/Interaction";
import {Colors} from "@/data/Models/Theme/Colors/Colors";


export class RemoraidStore {
    themes: Map<string, Theme>
    themeDefaults = premadeThemes
    theme: Theme
    constructor() {
        this.themes = new Map();
        for (const [name, theme] of Object.entries(this.themeDefaults)) {
            this.themes.set(name, new Theme(theme, name, this))
        }
        this.theme = this.themes.get('Mantine')??new Theme(DEFAULT_THEME, 'Mantine', this)
        makeAutoObservable(this);
    }

    setMainTheme(theme: Theme) {
        this.theme = theme;
    }

    resetTheme(theme: string) {
        this.themes.set(theme, new Theme(premadeThemes[theme], theme, this));
    }

    themeList() : [string, Theme][]{
        return Array.from(this.themes);
    }

    setTheme(name: string, theme: MantineThemeOverride) {
        this.themes.set(name, new Theme(theme, name, this));
        const newTheme = this.themes.get(name);
        if (newTheme) {
            newTheme.makeMainTheme();
        }
    }

}
const Root = new RemoraidStore();


export const theme: Theme = new Proxy({} as Theme, {
    get: (_, prop: keyof Theme) => {
        return Root.theme[prop];
    }
});

export const colors: Colors = new Proxy({} as Colors, {
    get: (_, prop: string) => {
        // Type safety for property access
        if (prop in Root.theme.colors) {
            return Root.theme.colors[prop as keyof Colors];
        }
        return undefined;
    },
    set: (_, prop: string, value: any): boolean => {
        // Type safety for property setting
        if (prop in Root.theme.colors) {
            // Use type assertion for setting
            (Root.theme.colors as any)[prop] = value;
            return true;
        }
        console.warn(`Attempted to set invalid property "${prop}" on Colors object`);
        return false;
    }
});

export const typography: Typography = new Proxy({} as Typography, {
    get: (_, prop: keyof Typography) => {
        return Root.theme.typography[prop];
    }
});

export const sizes: Sizes = new Proxy({} as Sizes, {
    get: (_, prop: keyof Sizes) => {
        return Root.theme.sizes[prop];
    }
});

export const components: Components = new Proxy({} as Components, {
    get: (_, prop: keyof Components) => {
        return Root.theme.components[prop];
    }
});

export const accessibility: Accessibility = new Proxy({} as Accessibility, {
    get: (_, prop: keyof Accessibility) => {
        return Root.theme.accessibility[prop];
    }
});

export const interaction: Interaction = new Proxy({} as Interaction, {
    get: (_, prop: keyof Interaction) => {
        return Root.theme.interaction[prop];
    }
});

export default Root;
