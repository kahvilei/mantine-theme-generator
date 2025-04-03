// Modified processTypeScriptContent function for uploads
import {VirtualColorProps} from "@/data/Models/Theme/Colors/Color Classes/VirtualColor";

export const processTypeScriptContent = (content: string): any => {
    // First, add the virtualColor function to the evaluation context
    // This is a simplified version just for evaluation - it returns an object with the parameters
    const virtualColor = (params: any) => {
        return {
            ...params,
            __isVirtualColor: true,
        };
    };

    // Simple approach: extract the theme object and evaluate it
    let themeObject;

    // Find the theme object - first try const theme = {...}
    const themeMatch = content.match(/const\s+theme\s*[^=]*=\s*({[\s\S]*?});/);
    if (themeMatch && themeMatch[1]) {
        const themeStr = themeMatch[1];
        // Use eval in a controlled way to convert the object string to a real object
        // eslint-disable-next-line no-eval
        themeObject = eval(`"use strict";
        (function (virtualColor) {
            return ${themeStr};
        })(${virtualColor.toString()})`);

        // Process the theme to convert function string representations back to real functions
        return processThemeObject(themeObject);
    }
};

// Helper function to process theme object after evaluation
const processThemeObject = (theme: any): any => {
    if (!theme || typeof theme !== 'object') {return theme;}

    // Process theme colors to convert virtual color objects back to functions
    if (theme.colors) {
        Object.entries(theme.colors).forEach(([colorName, colorValue]) => {
            // Check if this is a function that returned our marker
            if (colorValue && typeof colorValue === 'object' && (colorValue as any).__isVirtualColor) {
                const params = colorValue as VirtualColorProps;
                // Convert back to a function
                theme.colors[colorName] = () => ({
                    name: params.name,
                    dark: params.dark,
                    light: params.light,
                });
            }
        });
    }

    return theme;
};