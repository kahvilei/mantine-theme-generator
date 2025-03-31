import { makeAutoObservable } from "mobx";

type StyleObject = Record<string, string>;
type SelectorStyles = Record<string, StyleObject>;
type PropValue = string | number | boolean;
type DefaultProps = Record<string, PropValue>;

export class Component {
    name: string;
    defaultProps: DefaultProps;
    styles: SelectorStyles;

    constructor(name: string, defaultProps: DefaultProps = {}, styles: SelectorStyles = {}) {
        this.name = name;
        this.defaultProps = defaultProps;
        this.styles = styles;
        makeAutoObservable(this);
    }

    // Default Props methods
    setProp(key: string, value: PropValue): void {
        this.defaultProps[key] = value;
    }

    removeProp(key: string): void {
        delete this.defaultProps[key];
    }

    hasProp(key: string): boolean {
        return key in this.defaultProps;
    }

    // Styles methods
    hasSelector(selector: string): boolean {
        return selector in this.styles;
    }

    addSelector(selector: string): void {
        if (!this.hasSelector(selector)) {
            this.styles[selector] = {};
        }
    }

    removeSelector(selector: string): void {
        delete this.styles[selector];
    }

    setStyle(selector: string, property: string, value: string): void {
        if (!this.hasSelector(selector)) {
            this.addSelector(selector);
        }
        this.styles[selector][property] = value;
    }

    removeStyle(selector: string, property: string): void {
        if (this.hasSelector(selector)) {
            delete this.styles[selector][property];
        }
    }

    hasStyle(selector: string, property: string): boolean {
        return this.hasSelector(selector) && property in this.styles[selector];
    }

    // Utility methods
    clone(): Component {
        return new Component(
            this.name,
            { ...this.defaultProps },
            JSON.parse(JSON.stringify(this.styles))
        );
    }
}