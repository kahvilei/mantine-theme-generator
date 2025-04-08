import {action} from "mobx";
import {Colors} from "@/data/Models/Theme/Colors/Colors";
import {colorsTuple, MantineColorsTuple} from "@mantine/core";
import {Color} from "@/data/Models/Theme/Colors/Color Classes/Color";

export interface ShadelessColorInput {
    name: "white" | "black";
}

export class ShadelessColor extends Color{

    constructor({name} : ShadelessColorInput, colorManager: Colors) {
        super({name, type:"override"}, colorManager);
    }

    // Get a specific shade by index (0-9 for Mantine colors)
    getShade(): string {
        if (this.name === "white") {
            return this.manager.white??"#fff";
        } if (this.name === "black") {
            return this.manager.black??"#fff";
        }
        return this.manager.black??"#fff";
    }

    setShade(): void {
       //do nothing
    }

    getAccessor(){
        return `theme.${this.name}`;
    }

    @action
    setColor(color: string): void {
        if (this.name === "white") {
            this.manager.white = color;
        } if (this.name === "black") {
            this.manager.black = color;
        }
    }

    // Get the entire color tuple
    getColorTuple(): MantineColorsTuple | undefined {
        return colorsTuple(this.getShade());
    }

    // Get all shades as an array
    getAllShades(): string[] {
        return this.getColorTuple() as unknown as string[];
    }

}