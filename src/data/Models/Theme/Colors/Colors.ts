import {DEFAULT_THEME, MantineColorsTuple} from "@mantine/core";
import {VirtualColor} from "@/data/Models/Theme/Colors/Color Classes/VirtualColor";
import {action, makeAutoObservable, } from "mobx";
import {Color} from "@/data/Models/Theme/Colors/Color Classes/Color";
import {ShadelessColor} from "@/data/Models/Theme/Colors/Color Classes/ShadelessColor";
import generateColors from "@/utils/generateColors";

const DEFAULT_COLORS_ARRAY = Object.entries(DEFAULT_THEME.colors);
const DEFAULT_COLORS = DEFAULT_THEME.colors;

export class Colors{
    //each color object will be responsible for grabbing and updating their own shades from the colors record
    colorMap: Map<string, Color | VirtualColor>; // Now maps UUID to VirtualColor

    colors?: Record<string, MantineColorsTuple | (()=>MantineColorsTuple)>;
    primaryColor?: string;
    primaryShade?: number | { light: number; dark: number };

    white?: string;
    black?: string;

    //Visibility
    autoContrast?: boolean;
    luminanceThreshold?: number;
    isThemeDependentPrimaryShade?: boolean;

    defaultGradient?: {
        from: string;
        to: string;
        deg?: number;
    };

    constructor(config: ColorSettings) {
        this.colorMap = new Map();
        this.colors = config.colors as Record<string, MantineColorsTuple | (()=>MantineColorsTuple)>;
        this.primaryColor = config.primaryColor?.toString();
        this.primaryShade = config.primaryShade as number | { light: number; dark: number };
        this.isThemeDependentPrimaryShade = ((this.primaryShade as { light: number; dark: number }).light !== undefined);
        this.white = config.white;
        this.black = config.black;
        this.autoContrast = config.autoContrast;
        this.luminanceThreshold = config.luminanceThreshold as number;
        this.defaultGradient = config.defaultGradient;

        const white = new ShadelessColor({name:'white'}, this)
        const black = new ShadelessColor({name:'black'}, this)
        this.colorMap.set(white.uuid, white);
        this.colorMap.set(black.uuid, black);

        // Process existing colors in config
        for (const [key, value] of Object.entries(config.colors || {})) {
            // Check if it's a virtual color (has name property)
            const isVirtualColor = typeof value === 'object' && 'name' in value || typeof value === 'function';
            let valueVirtual: { name: string, dark: string, light: string } | undefined;
            if (typeof value === 'function'){
                valueVirtual = (value as ()=>MantineColorsTuple)()as unknown as { name: string, dark: string, light: string };
            }

            let colorObj: Color | VirtualColor;

            if (isVirtualColor) {
                // Handle virtual color created with virtualColor()
                const virtualColorProps = valueVirtual??value as unknown as { name: string, dark: string, light: string };
                colorObj = new VirtualColor({
                    name: key,
                    dark: virtualColorProps.dark,
                    light: virtualColorProps.light
                }, this);

            } else {
                // Handle standard color (array of color values)
                // eslint-disable-next-line no-lonely-if
                if (DEFAULT_COLORS[key] !== undefined) {
                    colorObj = new Color({
                        name: key,
                        type: 'override'
                    }, this);
                } else {
                    colorObj = new Color({
                        name: key,
                        type: 'custom'
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
                const colorObj = new Color({
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

    getPrimaryColor(): string{
        return this.primaryColor??'blue';
    }

    // Get color by name (new method)
    getColorByName(name: string): Color | VirtualColor | ShadelessColor | undefined {
        for (const color of this.colorMap.values()) {
            if (color.name === name) {
                return color;
            }
        }
        return undefined;
    }

    // Get color by UUID
    getColorByUUID(uuid: string): Color | undefined {
        return this.colorMap.get(uuid);
    }

    // Gets all VirtualColor objects
    getAllColors(): Color[] {
        return Array.from(this.colorMap.values());
    }

    //gets all color objects from our map with type set to "override"
    getOverrideColors(): Color[] {
        return this.getAllColors().filter(color => (color.type === 'override' && !(color instanceof ShadelessColor)));
    }

    getMantineColors() {
        return DEFAULT_COLORS_ARRAY.map(([name, _]) => {
            return this.getColorByName(name)
        })
    }

    //returns array of color object of type standard and virtual
    getCustomColors(): (Color | VirtualColor)[] {
        return this.getAllColors().filter(color =>
            color.type === 'custom'
        );
    }

    //returns [dark, grey, white, black]
    getLayoutColors(): Color[] {
        const layoutColorNames = ['dark', 'gray', 'white', 'black'];
        return this.getAllColors().filter(color =>
            layoutColorNames.includes(color.name)
        );
    }

    //returns [red, yellow, orange, green]
    getSituationColors(): Color[] {
        const situationColorNames = ['red', 'yellow', 'orange', 'green'];
        return this.getAllColors().filter(color =>
            situationColorNames.includes(color.name)
        );
    }

    //gets override colors that do not fall into the layout or situation colors
    getTheRest(): Color[] {
        const excludedColorNames = ['dark', 'gray', 'white', 'black', 'red', 'yellow', 'orange', 'green'];
        return this.getOverrideColors().filter(color =>
            !excludedColorNames.includes(color.name)
        );
    }

    // Update primary color
    @action
    setPrimaryColor(colorName: string): void {
        if (this.getColorByName(colorName) !== undefined) {
            this.primaryColor = colorName;
        }
    }

    // Update primary shade
    @action
    setPrimaryShade(shade: number | { light: number; dark: number }): void {
        this.primaryShade = shade;
        this.isThemeDependentPrimaryShade = ((this.primaryShade as { light: number; dark: number }).light !== undefined);
    }

    // Set color contrast settings
    @action
    setAutoContrast(enabled: boolean): void {
        this.autoContrast = enabled;
    }

    // Set luminance threshold
    @action
    setLuminanceThreshold(value: number): void {
        this.luminanceThreshold = value;
    }

    // Update gradient settings
    @action
    setDefaultGradient(from: string, to: string, deg: number = 45): void {
        this.defaultGradient = { from, to, deg };
    }

    // Update white/black colors
    @action
    setWhite(value: string): void {
        this.white = value;
    }

    @action
    setBlack(value: string): void {
        this.black = value;
    }

    // Create a new color
    createColor(name: string, value?: {light: string, dark: string} | string): Color | VirtualColor | null {
        if(this.colors === undefined) {
            this.colors = DEFAULT_COLORS;
        }

        // Check if name already exists
        if (this.getColorByName(name)) {
            return null;
        }

        if (typeof value === 'string') {
            const generatedColors = generateColors(value);
            this.colorMap.set(name, new Color({name}, this));
            this.colors[name] = generatedColors as unknown as MantineColorsTuple;
        } else {
            this.colorMap.set(name, new VirtualColor({name, ...value}, this));
        }
        return this.colorMap.get(name)??null;
    }

    // Delete a color
    deleteColor(uuid: string): boolean {
        const color = this.getColorByUUID(uuid);
        if (!color) {return false;}

        // Can't delete color if it's the primary color
        if (color.name === this.primaryColor) {
            this.primaryColor = 'blue';
        }

        // Remove from colors object if it exists there
        if (this.colors && this.colors[color.name]) {
            delete this.colors[color.name];
        }

        // Check if any virtual colors reference this color
        for (const otherColor of this.colorMap.values()) {
            if (otherColor instanceof VirtualColor) {
                if (otherColor.light === color.name || otherColor.dark === color.name) {
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