import {makeAutoObservable} from "mobx";
import {Colors} from "@/data/Models/Theme/Colors/Colors";
import {MantineColorsTuple} from "@mantine/core";

type ColorType = "standard" | "virtual" | "override" | "shadeless";
type ColorKeys = {
    light: string;
    dark: string;
}
type Color = string;
export interface CustomColorInput {
    name: string;
    type: ColorType;
    value?: Color;
    colorKeys?: ColorKeys;
}

export class CustomColor {
    readonly uuid: string;

    name: string;
    type: ColorType;
    value?: Color;
    colorKeys: ColorKeys;

    private readonly manager: Colors;

    constructor({name, type, value, colorKeys} : CustomColorInput, ColorManager: Colors) {
        this.uuid = crypto.randomUUID();
        this.name = name;
        this.colorKeys = colorKeys ?? {light: name, dark: name};
        this.value = value;
        this.type = type ?? 'standard';
        this.manager = ColorManager;
        makeAutoObservable(this);
    }

    // Get a specific shade by index (0-9 for Mantine colors)
    getShade(index?: number, scheme: 'light' | 'dark' = 'light'): string {
        if (this.type === 'virtual') {
            // For virtual colors, we need to get the shade from the source color
            const sourceColorName = this.colorKeys[scheme];
            const sourceColor = this.manager.getColorByName(sourceColorName);

            if (sourceColor) {
                return sourceColor.getShade(index, scheme);
            }
            return '';
        }
        // For standard and override colors
        return this.manager.colors?.[this.name]?.[index??this.manager.getPrimaryShade(scheme)] || '';
    }

    // Set a specific shade by index
    setShade(index: number, value: string): void {
        if (this.type === 'virtual') {
            // Virtual colors don't directly set shades, they reference other colors

        } else if (this.manager.colors && this.manager.colors[this.name]) {
            // @ts-ignore
            this.manager.colors[this.name][index] = value;
        }
    }

    // Get the entire color tuple
    getColorTuple(scheme: 'light' | 'dark' = 'light'): MantineColorsTuple | undefined {
        if (this.type === 'virtual') {
            const sourceColorName = this.colorKeys[scheme];
            const sourceColor = this.manager.getColorByName(sourceColorName);
            if (!sourceColor) {return undefined;}

            return sourceColor.getColorTuple(scheme);
        }
        return this.manager.colors?.[this.name];
    }

    // Get all shades as an array
    getAllShades(scheme: 'light' | 'dark' = 'light'): string[] {
        const colorTuple = this.getColorTuple(scheme);
        if (!colorTuple) {return [];}
        return Array.from(colorTuple);
    }

    // Set the virtual color source for a specific color scheme
    setVirtualColorSource(colorScheme: 'light' | 'dark', sourceName: string): void {
        if (this.type === 'virtual' && this.manager.getColorByName(sourceName)) {
            this.colorKeys[colorScheme] = sourceName;
        }
    }

    // Change the type of this color
    setType(newType: ColorType): void {
        // Don't allow changing virtual colors to other types unless we have a fallback
        if (this.type === 'virtual' && newType !== 'virtual') {
            // Create a standard color by copying current virtual color values
            const currentTuple = this.getColorTuple();
            if (currentTuple && this.manager.colors) {
                this.manager.colors[this.name] = [...currentTuple];
            }
        }
        this.type = newType;
    }

    // Rename the color - updated for UUID-based storage
    rename(newName: string): void {
        if (newName === this.name || this.manager.getColorByName(newName)) {
            return; // Don't rename if name is the same or already exists
        }

        // Update colors record - this still uses names as keys
        if (this.manager.colors && this.manager.colors[this.name]) {
            this.manager.colors[newName] = this.manager.colors[this.name];
            delete this.manager.colors[this.name];
        }

        // Update primary color if needed
        if (this.manager.primaryColor === this.name) {
            this.manager.primaryColor = newName;
        }

        // Update gradient if needed
        if (this.manager.defaultGradient) {
            if (this.manager.defaultGradient.from === this.name) {
                this.manager.defaultGradient.from = newName;
            }
            if (this.manager.defaultGradient.to === this.name) {
                this.manager.defaultGradient.to = newName;
            }
        }

        // Update virtual colors that reference this color
        for (const color of this.manager.colorMap.values()) {
            if (color.type === 'virtual') {
                if (color.colorKeys.light === this.name) {
                    color.colorKeys.light = newName;
                }
                if (color.colorKeys.dark === this.name) {
                    color.colorKeys.dark = newName;
                }
            }
        }

        // Update the name property
        this.name = newName;
    }

    // Check if this color is the primary color
    isPrimary(): boolean {
        return this.name === this.manager.primaryColor;
    }

    // Make this color the primary color
    makePrimary(): void {
        this.manager.setPrimaryColor(this.name);
    }

    // Clone this color with a new name
    clone(newName: string): CustomColor | null {
        if (this.manager.getColorByName(newName)) {
            return null; // Name already exists
        }

        let newColor: CustomColor;

        if (this.type === 'virtual') {
            newColor = new CustomColor({
                name: newName,
                type: 'virtual',
                colorKeys: {...this.colorKeys}
            }, this.manager);
        } else {
            // For standard and override colors, copy the color tuple
            if (this.manager.colors && this.manager.colors[this.name]) {
                this.manager.colors[newName] = [...this.manager.colors[this.name]];
            }

            newColor = new CustomColor({
                name: newName,
                type: this.type
            }, this.manager);
        }

        // Store by UUID
        this.manager.colorMap.set(newColor.uuid, newColor);
        return newColor;
    }

}