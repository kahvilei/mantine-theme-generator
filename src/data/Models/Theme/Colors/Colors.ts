import {DEFAULT_THEME, MantineColorsTuple} from "@mantine/core";
import {CustomColor} from "@/data/Models/Theme/Colors/CustomColor";
import {makeAutoObservable} from "mobx";

export type HeadingSize = {
    fontSize?: string;
    lineHeight?: string;
    fontWeight?: string;
};

const DEFAULT_COLORS_ARRAY = Object.entries(DEFAULT_THEME.colors);
const DEFAULT_COLORS = DEFAULT_THEME.colors;

export class Colors{
    //each color object will be responsible for grabbing and updating their own shades from the colors record
    colorMap: Map<string, CustomColor>; // Now maps UUID to CustomColor

    colors?: Record<string, MantineColorsTuple>;
    primaryColor?: string;
    primaryShade?: number | { light: number; dark: number };

    white?: string;
    black?: string;

    //Visibility
    autoContrast?: boolean;
    luminanceThreshold?: number;
    isThemeDependentPrimaryShade?: boolean;

    // Gradients
    defaultGradient?: {
        from: string;
        to: string;
        deg?: number;
    };

    constructor(config: ColorSettings) {
        this.colorMap = new Map();
        this.colors = config.colors as Record<string, MantineColorsTuple>;
        this.primaryColor = config.primaryColor;
        this.primaryShade = config.primaryShade as number | { light: number; dark: number };
        this.isThemeDependentPrimaryShade = ((this.primaryShade as { light: number; dark: number }).light !== undefined);
        this.white = config.white;
        this.black = config.black;
        this.autoContrast = config.autoContrast;
        this.luminanceThreshold = config.luminanceThreshold as number;
        this.defaultGradient = config.defaultGradient;

        // Process existing colors in config
        for (const [key, value] of Object.entries(this.colors || {})) {
            // Check if it's a virtual color (has name property)
            const isVirtualColor = typeof value === 'object' && 'name' in value;

            let colorObj: CustomColor;

            if (isVirtualColor) {
                // Handle virtual color created with virtualColor()
                const virtualColor = value as unknown as { name: string, dark: string, light: string };
                colorObj = new CustomColor({
                    name: key,
                    type: 'virtual',
                    colorKeys: {
                        dark: virtualColor.dark,
                        light: virtualColor.light
                    }
                }, this);
            } else {
                // Handle standard color (array of color values)
                // eslint-disable-next-line no-lonely-if
                if (DEFAULT_COLORS[key] !== undefined) {
                    colorObj = new CustomColor({
                        name: key,
                        type: 'override'
                    }, this);
                } else {
                    colorObj = new CustomColor({
                        name: key,
                        type: 'standard'
                    }, this);
                }
            }

            // Store by UUID instead of name
            this.colorMap.set(colorObj.uuid, colorObj);
        }

        // Add any missing default colors from DEFAULT_COLORS_ARRAY
        for (const [key, value] of DEFAULT_COLORS_ARRAY) {
            if (!this.getColorByName(key)) {
                // Create new color object
                const colorObj = new CustomColor({
                    name: key,
                    type: 'override'
                }, this);

                // Store by UUID
                this.colorMap.set(colorObj.uuid, colorObj);

                // Add to the config.colors object if not already present
                if (!(key in this.colors)) {
                    this.colors[key] = value;
                }
            }
        }

        makeAutoObservable(this);
    }

    // Get color by name (new method)
    getColorByName(name: string): CustomColor | undefined {
        for (const color of this.colorMap.values()) {
            if (color.name === name) {
                return color;
            }
        }
        return undefined;
    }

    // Get color by UUID
    getColorByUUID(uuid: string): CustomColor | undefined {
        return this.colorMap.get(uuid);
    }

    getColorsArray() {
        // Return an array of [name, colorTuple] pairs from the theme config
        return Object.entries(this.colors || {});
    }

    // Gets all CustomColor objects
    getAllColors(): CustomColor[] {
        return Array.from(this.colorMap.values());
    }

    //gets all color objects from our map with type set to "override"
    getOverrideColors(): CustomColor[] {
        return this.getAllColors().filter(color => color.type === 'override');
    }

    //returns array of color object of type standard and virtual
    getCustomColors(): CustomColor[] {
        return this.getAllColors().filter(color =>
            color.type === 'standard' || color.type === 'virtual'
        );
    }

    //returns [dark, grey, white, black]
    getLayoutColors(): CustomColor[] {
        const layoutColorNames = ['dark', 'gray', 'white', 'black'];
        return this.getAllColors().filter(color =>
            layoutColorNames.includes(color.name)
        );
    }

    //returns [red, yellow, orange, green]
    getSituationColors(): CustomColor[] {
        const situationColorNames = ['red', 'yellow', 'orange', 'green'];
        return this.getAllColors().filter(color =>
            situationColorNames.includes(color.name)
        );
    }

    //gets override colors that do not fall into the layout or situation colors
    getTheRest(): CustomColor[] {
        const excludedColorNames = ['dark', 'gray', 'white', 'black', 'red', 'yellow', 'orange', 'green'];
        return this.getOverrideColors().filter(color =>
            !excludedColorNames.includes(color.name)
        );
    }

    // Update primary color
    setPrimaryColor(colorName: string): void {
        if (this.getColorByName(colorName)) {
            this.primaryColor = colorName;
        }
    }

    // Update primary shade
    setPrimaryShade(shade: number | { light: number; dark: number }): void {
        this.primaryShade = shade;
        this.isThemeDependentPrimaryShade = ((this.primaryShade as { light: number; dark: number }).light !== undefined);
    }

    // Set color contrast settings
    setAutoContrast(enabled: boolean): void {
        this.autoContrast = enabled;
    }

    // Set luminance threshold
    setLuminanceThreshold(value: number): void {
        this.luminanceThreshold = value;
    }

    // Update gradient settings
    setDefaultGradient(from: string, to: string, deg: number = 45): void {
        this.defaultGradient = { from, to, deg };
    }

    // Update white/black colors
    setWhite(value: string): void {
        this.white = value;
    }

    setBlack(value: string): void {
        this.black = value;
    }

    // Create a new color
    createColor(name: string, type: "standard" | "virtual" | "override" | "shadeless", colorKeys?: {light: string, dark: string}): CustomColor | null {
        // Check if name already exists
        if (this.getColorByName(name)) {
            return null;
        }

        const newColor = new CustomColor({
            name,
            type,
            colorKeys
        }, this);

        this.colorMap.set(newColor.uuid, newColor);

        // If it's not a virtual color, initialize the color tuple in the colors object
        if (type !== 'virtual' && this.colors) {
            // Create a default color tuple
            this.colors[name] = ['#ffffff', '#f2f2f2', '#e6e6e6', '#d9d9d9', '#cccccc', '#bfbfbf', '#b3b3b3', '#a6a6a6', '#999999', '#8c8c8c'];
        }

        return newColor;
    }

    // Delete a color
    deleteColor(uuid: string): boolean {
        const color = this.getColorByUUID(uuid);
        if (!color) {return false;}

        // Can't delete color if it's the primary color
        if (color.name === this.primaryColor) {return false;}

        // Remove from colors object if it exists there
        if (this.colors && this.colors[color.name]) {
            delete this.colors[color.name];
        }

        // Check if any virtual colors reference this color
        for (const otherColor of this.colorMap.values()) {
            if (otherColor.type === 'virtual') {
                if (otherColor.colorKeys.light === color.name || otherColor.colorKeys.dark === color.name) {
                    return false; // Can't delete a color that's referenced by a virtual color
                }
            }
        }

        // Remove from colorMap
        return this.colorMap.delete(uuid);
    }

    getPrimaryShade(scheme: "light" | "dark" = "light"): number {
        if(this.isThemeDependentPrimaryShade){
            return scheme === "light" ? (((this.primaryShade as {light:number}).light)?? 5 ): ((this.primaryShade as {dark:number}).dark)?? 5 ;
        }
        return this.primaryShade as number;
    }
}

export interface ColorSettings {
    // Colors
    colors: Record<string, MantineColorsTuple>;
    primaryColor?: string;
    primaryShade?: number | { light: number; dark: number };
    isThemeDependentPrimaryShade?: boolean;
    white?: string;
    black?: string;

    //Visibility
    autoContrast?: boolean;
    luminanceThreshold?: number;

    // Gradients
    defaultGradient?: {
        from: string;
        to: string;
        deg?: number;
    };
}