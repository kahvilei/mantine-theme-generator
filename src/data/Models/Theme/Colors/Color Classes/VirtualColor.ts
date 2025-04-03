import {action, makeObservable, observable} from "mobx";
import {Colors} from "@/data/Models/Theme/Colors/Colors";
import {MantineColorsTuple, virtualColor} from "@mantine/core";
import {Color} from "@/data/Models/Theme/Colors/Color Classes/Color";

export interface VirtualColorProps {
    name: string;
    light?: string;
    dark?: string;
}

export class VirtualColor extends Color {
    @observable
    light: string;

    @observable
    dark: string;

    constructor({name, light, dark}: VirtualColorProps, colorManager: Colors) {
        super({name, type: "custom"}, colorManager);

        // Default to using the name as both light and dark source if not provided
        this.light = light ?? name;
        this.dark = dark ?? name;

        makeObservable(this);
        this.render();
    }

    // Get a specific shade by index (0-9 for Mantine colors)
    getShade(index?: number, scheme: 'light' | 'dark' = 'light'): string {
        // Get the source color name based on the scheme
        const sourceColorName = scheme === 'light' ? this.light : this.dark;
        const sourceColor = this.manager.getColorByName(sourceColorName);

        if (sourceColor) {
            return sourceColor.getShade(index, scheme);
        }
        return '';
    }

    // override parent class to do nothing
    setShade(): void {
        //do nothing
    }

    // Get the entire color tuple
    getColorTuple(scheme: 'light' | 'dark' = 'light'): MantineColorsTuple | undefined {
        const sourceColorName = scheme === 'light' ? this.light : this.dark;
        const sourceColor = this.manager.getColorByName(sourceColorName);
        if (!sourceColor) {return undefined;}
        return sourceColor.getColorTuple(scheme);
    }

    // Get all shades as an array
    getAllShades(scheme: 'light' | 'dark' = 'light'): string[] {
        const colorTuple = this.getColorTuple(scheme);
        if (!colorTuple) {return [];}
        return Array.from(colorTuple);
    }

    // Set the virtual color source for a specific color scheme
    @action
    setVirtualColorSource(scheme: 'light' | 'dark', name: string): void {
        if (scheme === 'light') {
            this.light = name;
        } else {
            this.dark = name;
        }
        this.render();
    }

    @action
    render(): void {
        if (this.manager.colors) {
            this.manager.colors[this.name] = () => {
                return virtualColor({
                    name: this.name,
                    light: this.light,
                    dark: this.dark
                });
            };
        }
    }
}