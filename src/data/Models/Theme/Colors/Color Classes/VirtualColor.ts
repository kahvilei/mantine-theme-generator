import {action, makeObservable, observable} from "mobx";
import {Colors} from "@/data/Models/Theme/Colors/Colors";
import {MantineColorsTuple, virtualColor} from "@mantine/core";
import {Color} from "@/data/Models/Theme/Colors/Color Classes/Color";

type ColorKeys = {
    light: string;
    dark: string;
}
export interface VirtualColorProps {
    name: string;
    colorKeys?: ColorKeys;
}


export class VirtualColor extends Color{
    @observable
    colorKeys: ColorKeys;

    constructor({name, colorKeys} : VirtualColorProps, colorManager: Colors) {
        super({name, type:"custom"}, colorManager);
        this.colorKeys = colorKeys ?? {light: name, dark: name};
        makeObservable(this);
        this.render();
    }

    // Get a specific shade by index (0-9 for Mantine colors)
    getShade(index?: number, scheme: 'light' | 'dark' = 'light'): string {
        // For virtual colors, we need to get the shade from the source color
        const sourceColorName = this.colorKeys[scheme];
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
        const sourceColorName = this.colorKeys[scheme];
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
        this.colorKeys[scheme] = name;
        this.render();
    }

    @action
    render():void{
        if(this.manager.colors) {
            this.manager.colors[this.name] = () => {return virtualColor({name: this.name, ...this.colorKeys})};
        }
    }

}