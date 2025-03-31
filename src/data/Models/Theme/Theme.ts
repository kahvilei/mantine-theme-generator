import {makeAutoObservable} from "mobx";
import { MantineThemeOverride } from "@mantine/core";
import { Colors, ColorSettings } from "@/data/Models/Theme/Colors/Colors";
import { Sizes, SpacingSettings } from "@/data/Models/Theme/SizeAndSpacing/Sizes";
import { Typography, TypographySettings } from "@/data/Models/Theme/Typography/Typography";
import { RemoraidStore } from "@/data/Store";
import {Interaction, InteractionSettings} from "@/data/Models/Theme/Interaction/Interaction";
import {Accessibility, AccessibilitySettings} from "@/data/Models/Theme/Accessibility/Accessibility";
import {Components, ComponentSettings} from "@/data/Models/Theme/Components/Components";


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
    interaction: Interaction;
    accessibility: Accessibility;
    components: Components;

    name: string;
    private readonly store?: RemoraidStore;

    constructor(theme: MantineThemeOverride, name:string, store?: RemoraidStore) {
        this.config = theme as ThemeStateInternals;
        this.typography = new Typography(this.config);
        this.colors = new Colors(this.config);
        this.sizes = new Sizes(this.config);
        this.accessibility = new Accessibility(this.config);
        this.components = new Components(this.config);
        this.interaction = new Interaction(this.config);

        this.store = store;
        this.name = name;
        makeAutoObservable(this);
    }

    makeMainTheme() {
        this.store?.setMainTheme(this)
    }

    //gets all manager values and generates our theme
    compile = (): MantineThemeOverride => {
        // Start with a fresh object
        const compiledTheme: MantineThemeOverride = {};

        // Helper function to deeply map properties from source to target
        const mapDeepProperties = (source: any, target: any, path: string = '') => {
            if (!source || typeof source !== 'object') {return;}

            Object.entries(source).forEach(([key, value]) => {
                const currentPath = path ? `${path}.${key}` : key;

                if (value === null || value === undefined) {

                } else if (Array.isArray(value)) {
                    // Special handling for arrays - create a copy using spread
                    target[key] = [...value];
                } else if (typeof value === 'object') {
                    // For objects, create a nested structure
                    if (!target[key]) {target[key] = {};}
                    mapDeepProperties(value, target[key], currentPath);
                } else {
                    // For primitive values, assign directly
                    target[key] = value;
                }
            });
        };

        // Map properties from each theme section
        mapDeepProperties(this.colors, compiledTheme);
        mapDeepProperties(this.typography, compiledTheme);
        mapDeepProperties(this.sizes, compiledTheme);
        mapDeepProperties(this.accessibility, compiledTheme);
        mapDeepProperties(this.interaction, compiledTheme);

        // Special handling for components since they have a special structure
        if (this.components.rules && Array.from(this.components.rules).length > 0) {
            compiledTheme.components = {};
            for (const [componentName, componentConfig] of Array.from(this.components.rules)) {
                compiledTheme.components[componentName] = {
                    defaultProps: componentConfig.defaultProps ? {...componentConfig.defaultProps} : undefined,
                    styles: componentConfig.styles ? {...componentConfig.styles} : undefined
                };
            }
        }

        return compiledTheme;
    }

}

type ThemeStateInternals = ColorSettings & SpacingSettings & TypographySettings & InteractionSettings & AccessibilitySettings & ComponentSettings;
