// FontLoader.tsx
import { useEffect, useRef } from 'react';

// Track which fonts we've already loaded to avoid duplicates
const loadedFonts = new Set<string>();

// System fonts that don't need to be loaded from Google Fonts
const systemFonts = [
    'Arial', 'Helvetica', 'Verdana', 'Tahoma', 'Trebuchet MS',
    'Times New Roman', 'Georgia', 'Garamond', 'Courier New',
    'Consolas', 'Lucida Console', 'Monaco', 'Menlo', 'DejaVu Sans Mono',
    'Bitstream Vera Sans Mono', 'Courier', '-apple-system', 'BlinkMacSystemFont',
];

// Helper function to convert font family name to Google Fonts format
// e.g. "Open Sans" becomes "Open+Sans"
export const formatFontFamily = (fontFamily: string): string => {
    return fontFamily.replace(/\s+/g, '+');
};

// Check if a font is a Google Font (not a system font)
export const isGoogleFont = (fontFamily: string): boolean => {
    return !systemFonts.includes(fontFamily);
};

// Debounce function
const debounce = <F extends (...args: any[]) => any>(
    func: F,
    waitFor: number
): ((...args: Parameters<F>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<F>): void => {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => func(...args), waitFor);
    };
};

// Load a single custom Google Font (not in our predefined list)
export const loadCustomGoogleFont = (fontFamily: string): void => {
    if (!fontFamily || loadedFonts.has(fontFamily)) {return;}

    // Assume any custom font is a Google Font
    const formattedFontFamily = formatFontFamily(fontFamily);
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${formattedFontFamily}:wght@400;500;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    loadedFonts.add(fontFamily);
};

// Debounced version of the loadCustomGoogleFont function (2 seconds)
const debouncedLoadCustomGoogleFont = debounce(loadCustomGoogleFont, 2000);

interface FontLoaderProps {
    predefinedFonts: string[];
    customFonts: string[];
}

// Component to manage loading multiple fonts
const FontLoader = ({ customFonts }:FontLoaderProps) => {

    const prevCustomFonts = useRef<string[]>([]);
    // Load all predefined Google fonts on component mount or when they change
    // Load any custom fonts when they're added with debounce
    useEffect(() => {
        // Check if the array has actually changed (more efficient than loading every time)
        const hasNewFonts = customFonts.some(font => !prevCustomFonts.current.includes(font));

        if (hasNewFonts) {
            // Store current custom fonts for the next comparison
            prevCustomFonts.current = [...customFonts];

            // Find new fonts that haven't been loaded yet
            const newFonts = customFonts.filter(font =>
                font && !loadedFonts.has(font) && isGoogleFont(font)
            );

            // Process each new font with debounce
            newFonts.forEach(font => {
                debouncedLoadCustomGoogleFont(font);
            });
        }
    }, [customFonts]);

};

export default FontLoader;