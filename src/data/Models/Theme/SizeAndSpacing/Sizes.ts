import {makeAutoObservable} from "mobx";
import {DEFAULT_THEME} from "@mantine/core";

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export class Sizes {
    scale?: number;
    fontScale?: number;
    radius: Record<Size, string>;
    spacing: Record<Size, string>;
    defaultRadius: Size | number | string;
    breakpoints: Record<Size, string>;

    constructor(config: SpacingSettings) {
        this.scale = config.scale;
        this.fontScale = config.fontScale;
        this.radius = config.radius??DEFAULT_THEME.radius
        this.spacing = config.spacing??DEFAULT_THEME.spacing
        this.defaultRadius = config.defaultRadius??DEFAULT_THEME.defaultRadius;
        this.breakpoints = config.breakpoints??DEFAULT_THEME.breakpoints
        makeAutoObservable(this);
    }

    setSpacingSize(size: Size, value: string) {
        this.spacing[size] = value;
    }

    getSpacingSize(size: Size):string | undefined{
        return this.spacing[size];
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
        this.breakpoints[size] = value;
    }

    getBreakPoint(size: Size) {
        return this.breakpoints[size];
    }

    setRadiusSize(size: Size, value: string) {
        this.radius[size] = value;
    }

    getRadiusSize(size: Size): string {
        return this.radius?.[size];
    }

    setDefaultRadius(value: Size) {
        this.defaultRadius = value;
    }

    getDefaultRadius(): Size | number | string {
        return this.defaultRadius;
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
