// types.ts
  
import {MantineColorsTuple} from "@mantine/core";

export type HeadingSize = {
fontSize?: string;
lineHeight?: string;
fontWeight?: string;
};

export interface ThemeState {
theme: {
    // Colors
    colors?: Record<string, MantineColorsTuple>;
    primaryColor?: string;
    primaryShade?: number | { light: number; dark: number };
    isThemeDependentPrimaryShade?: boolean;
    white?: string;
    black?: string;
    
    // Gradients
    defaultGradient?: {
    from: string;
    to: string;
    deg?: number;
    };

    // Spacing and Sizing
    scale?: number;
    fontScale?: number;
    radius?: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>;
    spacing?: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>;
    defaultRadius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    breakpoints: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>;

    // Typography
    fontFamily?: string;
    fontFamilyMonospace?: string;
    headings?: {
    fontFamily?: string;
    fontWeight?: string;
    sizes?: Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', HeadingSize>;
    };

    // Other properties
    focusRing?: 'auto' | 'always' | 'never';
    cursorType?: 'default' | 'pointer';
    activeClassName?: string;
    fontSmoothing?: boolean;
    respectReducedMotion?: boolean;
    autoContrast?: boolean;
    luminanceThreshold?: number;

    // components
    components?: {
    [key: string]: any;
    };
};
}