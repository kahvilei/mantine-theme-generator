import { DEFAULT_THEME, MantineColorsTuple, MantineThemeOverride } from '@mantine/core';

class ColorManager {
    customColors: Map<string, MantineColorsTuple>;
    mantineColors: Map<string, MantineColorsTuple>;
    theme: MantineThemeOverride;

    constructor(theme: MantineThemeOverride) {
        this.customColors = new Map();
        this.mantineColors = new Map();
        this.theme = theme;
        for (let color in DEFAULT_THEME.colors) {
            this.mantineColors.set(color, DEFAULT_THEME.colors[color]);
        }
        for (let color in theme.colors) {
            if (theme.colors[color] && this.mantineColors.has(color)) {
                this.mantineColors.set(color, theme.colors[color]);
            }
            else if (theme.colors[color] && !this.mantineColors.has(color)) {
                this.customColors.set(color, theme.colors[color]);
            }
        }
    }

    set(key: string, value: MantineColorsTuple) {
        if (this.mantineColors.has(key)) {
            this.mantineColors.set(key, value);
        }
        this.customColors.set(key, value);
    }

    get(key: string) {
        if (this.customColors.has(key)) {
            return this.customColors.get(key);
        }
        return this.mantineColors.get(key);
    }

    getMainColor(key: string) {
        if (this.customColors.has(key)) {
            const color = this.customColors.get(key);
            return color ? color[5] : "#000";
        }
        const color = this.mantineColors.get(key);
        return color ? color[5] : "#000";
    }

    getCustomColors() {
        return this.customColors;
    }

    getMantineColors() {
        return this.mantineColors;
    }

    getAllColors() {
        return new Map([...this.mantineColors, ...this.customColors]);
    }

    getAllMainColorArray() {
        return Array.from(this.getAllColors().values()).map((color) => color[5]);
    }

}

export default ColorManager;
