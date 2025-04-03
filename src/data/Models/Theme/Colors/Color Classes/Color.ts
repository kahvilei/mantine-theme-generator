import {action, makeObservable, observable} from "mobx";
import {Colors} from "@/data/Models/Theme/Colors/Colors";
import {MantineColorsTuple} from "@mantine/core";
import {VirtualColor} from "@/data/Models/Theme/Colors/Color Classes/VirtualColor";

type ColorType = "custom" | "override";

export interface CustomColorInput {
    name: string;
    type?: ColorType;
}

export class Color {
    readonly uuid: string;

    @observable
    name: string;

    type: ColorType;

    readonly manager: Colors;

    constructor({name, type} : CustomColorInput, ColorManager: Colors) {
        this.uuid = crypto.randomUUID();
        this.name = name;
        this.type = type ?? 'custom';
        this.manager = ColorManager;
        makeObservable(this);
    }

    // Get a specific shade by index (0-9 for Mantine colors)
    getShade(index?: number, scheme: 'light' | 'dark' = 'light'): string {
        return (this.manager.colors?.[this.name] as MantineColorsTuple)?.[index??this.manager.getPrimaryShade(scheme)] ;
    }

    // Get the entire color tuple
    getColorTuple(_scheme: 'light' | 'dark' = 'light'): MantineColorsTuple | undefined{
        return this.manager.colors?.[this.name] as MantineColorsTuple
    }

    // Get all shades as an array
    getAllShades(): string[] {
        const colorTuple = this.getColorTuple();
        if (!colorTuple) {return [];}
        return Array.from(colorTuple);
    }

    // Set a specific shade by index
    @action
    setShade(index: number, value: string): void {
        (this.manager.colors?.[this.name] as unknown as string[])[index] = value;
    }

    // Rename the color - updated for UUID-based storage
    @action
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
            if (color instanceof VirtualColor) {
                if (color.light === this.name) {
                    color.light = newName;
                }
                if (color.dark === this.name) {
                    color.dark = newName;
                }
            }
        }

        // Update the name property
        this.name = newName;
    }

    // Check if this color is the primary color
    @action
    isPrimary(): boolean {
        return this.name === this.manager.primaryColor;
    }

    // Make this color the primary color
    @action
    makePrimary(): void {
        this.manager.setPrimaryColor(this.name);
    }

}