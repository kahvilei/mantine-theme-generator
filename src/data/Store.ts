import { makeAutoObservable } from "mobx";
import {DEFAULT_THEME, MantineThemeOverride} from "@mantine/core";
import { premadeThemes } from "@/data/Models/Theme/premadeThemes";
import { Theme } from "@/data/Models/Theme/Theme";


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

    themeList(){
        return Object.entries(this.themes.values());
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

export const theme = Root.theme;
export const colors = theme.colors;
export const typography = theme.typography;
export const sizes = theme.sizes;

export default Root;

