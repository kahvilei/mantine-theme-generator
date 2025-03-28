import {makeAutoObservable} from "mobx";
import {frameValue, unFrameValue} from "@/utils/frameValues";

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export class Sizes {
    scale?: number;
    fontScale?: number;
    radius?: Record<Size, string>;
    spacing?: Record<Size, string>;
    defaultRadius?: Size;
    breakpoints: Record<Size, string>;

    constructor(config: SpacingSettings) {
        this.scale = config.scale;
        this.fontScale = config.fontScale;
        this.radius = config.radius;
        this.spacing = config.spacing;
        this.defaultRadius = config.defaultRadius;
        this.breakpoints = config.breakpoints;
        makeAutoObservable(this);
    }

    setSpacingSize(size: Size, value: string) {
        if(this.spacing !== undefined) {
            // @ts-ignore
            this.spacing = {}
        }
        // @ts-ignore
        this.spacing[size] = frameValue(value);
    }

    getSpacingSize(size: Size):string {
        return unFrameValue(this.spacing?this.spacing[size]:'0');
    }

    getScale() {
        return this.scale;
    }

    setScale(value: number) {
        this.scale = value;
    }

    getBreakPoints() {
        return Object.entries(this.breakpoints);
    }

    setBreakPoint(size: Size, value: string) {
        this.breakpoints[size] = frameValue(value);
    }

    getBreakPoint(size: Size) {
        return unFrameValue(this.breakpoints[size]);
    }
}
export interface SpacingSettings {
    scale?: number;
    fontScale?: number;
    radius?: Record<Size, string>;
    spacing?: Record<Size, string>;
    defaultRadius?: Size;
    breakpoints: Record<Size, string>;
}
