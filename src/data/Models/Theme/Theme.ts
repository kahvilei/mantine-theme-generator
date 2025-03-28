import {MantineThemeOverride} from "@mantine/core";
import {makeAutoObservable} from "mobx";
import {Typography, TypographySettings} from "@/data/Models/Theme/Typography/Typography";
import {Colors, ColorSettings} from "@/data/Models/Theme/Colors/Colors";
import {Sizes, SpacingSettings} from "@/data/Models/Theme/SizeAndSpacing/Sizes";
import {RemoraidStore} from "@/data/Store";

export type HeadingSize = {
    fontSize?: string;
    lineHeight?: string;
    fontWeight?: string;
};

export class Theme{
    config: ThemeStateInternals;
    typography: Typography;
    colors: Colors;
    sizes: Sizes;
    name: string;
    private readonly store?: RemoraidStore;

    constructor(theme: MantineThemeOverride, name:string, store?: RemoraidStore) {
        this.config = theme as ThemeStateInternals;
        this.typography = new Typography(this.config);
        this.colors = new Colors(this.config);
        this.sizes = new Sizes(this.config);
        this.store = store;
        this.name = name;
        makeAutoObservable(this);
    }

    makeMainTheme() {
        this.store?.setMainTheme(this)
    }

}

type ThemeStateInternals = ColorSettings & SpacingSettings & TypographySettings & AccessibilitySettings & ComponentSettings;


interface AccessibilitySettings {
    focusRing?: 'auto' | 'always' | 'never';
    cursorType?: 'default' | 'pointer';
    activeClassName?: string;
    fontSmoothing?: boolean;
    respectReducedMotion?: boolean;
}

interface ComponentSettings {
    components?: {
        [key: string]: any;
    };
}