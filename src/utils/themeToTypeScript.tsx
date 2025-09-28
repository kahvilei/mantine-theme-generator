import {MantineThemeOverride} from "@mantine/core";
import {VirtualColorProps} from "@/data/Models/Theme/Colors/Color Classes/VirtualColor";
import { toJS } from "mobx";

export const themeToTypeScript = (theme: MantineThemeOverride): string => {

    // Special handling for virtual color functions
    if (theme.colors !== undefined) {
        Object.entries(toJS(theme.colors)).forEach(([colorName, colorValue]) => {
            if (typeof colorValue === 'function') {
                // Get the result of the function to obtain the parameters
                const result = (colorValue as (()=>VirtualColorProps))();

                console.log(result);

                // Replace the function with a string representation that will be properly formatted
                // when converted to TypeScript by themeToTypeScript
                (theme.colors as any)[colorName] = {
                    __isFunction: true,
                    params: {
                        name: result.name,
                        dark: result.dark,
                        light: result.light
                    }
                };
            }
        });
    }
    // Custom formatter to produce TypeScript without unnecessary quotes on property names
    const formatObject = (obj: any, indent: number = 0): string => {
        if (obj === null) {
            return 'null';
        }
        if (obj === undefined) {
            return 'undefined';
        }

        // Handle our special function marker objects
        if (obj && typeof obj === 'object' && obj.__isFunction) {
            // Convert back to a function string representation
            const params = obj.params;
            return `virtualColor({
                ${' '.repeat(indent + 4)}name: '${params.name}',
                ${' '.repeat(indent + 4)}dark: '${params.dark}',
                ${' '.repeat(indent + 4)}light: '${params.light}'
                ${' '.repeat(indent + 2)}})`;
        }

        if (typeof obj !== 'object') {
            // Handle primitives
            if (typeof obj === 'string') {
                return `'${obj.replace(/'/g, "\\'")}'`;
            }
            return String(obj);
        }

        if (Array.isArray(obj)) {
            // Handle arrays
            if (obj.length === 0) {return '[]';}

            const items = obj.map(item => formatObject(item, indent + 2)).join(`,\n${  ' '.repeat(indent + 2)}`);
            return `[\n${' '.repeat(indent + 2)}${items}\n${' '.repeat(indent)}]`;
        }

        // Handle objects
        const entries = Object.entries(obj);
        if (entries.length === 0) {return '{}';}

        const props = entries.map(([key, value]) => {
            // Check if key is a valid JS identifier or needs quotes
            const needsQuotes = !/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ||
                key.includes('-') ||
                key.includes(' ') ||
                /^\d/.test(key);

            const formattedKey = needsQuotes ? `'${key}'` : key;
            return `${' '.repeat(indent + 2)}${formattedKey}: ${formatObject(value, indent + 2)}`;
        }).join(',\n');

        return `{\n${props}\n${' '.repeat(indent)}}`;

    };

    const formattedTheme = formatObject(theme);

    // Generate the TypeScript file content
    return `import { MantineThemeOverride, virtualColor } from '@mantine/core';\n\n` +
        `const theme: MantineThemeOverride = ${formattedTheme};\n\n` +
        `export default theme;`;
};