import {makeAutoObservable} from "mobx";

export interface AccessibilitySettings {
    fontSmoothing?: boolean;
    respectReducedMotion?: boolean;
}

export class Accessibility {
    fontSmoothing?: boolean;
    respectReducedMotion?: boolean;

    constructor(config: AccessibilitySettings) {
        this.fontSmoothing = config.fontSmoothing;
        this.respectReducedMotion = config.respectReducedMotion;
        makeAutoObservable(this);
    }
}