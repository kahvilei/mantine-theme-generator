import { makeAutoObservable } from "mobx";
import { Component } from "./Component";

export interface ComponentSettings {
    components?: Record<string, {
        defaultProps?: Record<string, any>;
        styles?: Record<string, Record<string, string>>;
    }>;
}

export class Components {
    rules: Map<string, Component>;

    constructor(config: ComponentSettings = {}) {
        this.rules = new Map();
        
        // Initialize from config
        if (config.components) {
            Object.entries(config.components).forEach(([name, data]) => {
                this.rules.set(name, new Component(
                    name,
                    data.defaultProps || {},
                    data.styles || {}
                ));
            });
        }

        makeAutoObservable(this);
    }

    // Rule management
    getRule(name: string): Component | undefined {
        return this.rules.get(name);
    }

    hasRule(name: string): boolean {
        return this.rules.has(name);
    }

    addRule(name: string): Component {
        if (this.hasRule(name)) {
            return this.rules.get(name)!;
        }

        const rule = new Component(name);
        this.rules.set(name, rule);
        return rule;
    }

    removeRule(name: string): boolean {
        return this.rules.delete(name);
    }

    // Utility methods
    getAllRules(): Component[] {
        return Array.from(this.rules.values());
    }

    getAllRuleNames(): string[] {
        return Array.from(this.rules.keys());
    }

    // For compatibility with the MantineThemeOverride format
    toThemeObject(): Record<string, any> {
        const componentsObject: Record<string, any> = {};

        this.rules.forEach((rule, name) => {
            componentsObject[name] = {
                defaultProps: { ...rule.defaultProps },
                styles: { ...rule.styles }
            };
        });

        return componentsObject;
    }
}