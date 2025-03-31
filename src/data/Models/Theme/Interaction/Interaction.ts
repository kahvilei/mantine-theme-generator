import {makeAutoObservable} from "mobx";

export interface InteractionSettings {
    focusRing?: 'auto' | 'always' | 'never';
    cursorType?: 'default' | 'pointer';
    activeClassName?: string;
}

export class Interaction {
    focusRing?: 'auto' | 'always' | 'never';
    cursorType?: 'default' | 'pointer';
    activeClassName?: string;

    constructor(config: InteractionSettings) {
        this.focusRing = config.focusRing;
        this.cursorType = config.cursorType;
        this.activeClassName = config.activeClassName;
        makeAutoObservable(this);
    }
}