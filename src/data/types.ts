// types.ts
export type ColorTuple = [
    string, // 0
    string, // 1
    string, // 2
    string, // 3
    string, // 4
    string, // 5
    string, // 6
    string, // 7 
    string, // 8
    string  // 9
  ];
  
export type HeadingSize = {
fontSize?: string;
lineHeight?: string | number;
fontWeight?: number;
};

export interface ThemeState {
theme: {
    // Colors
    colors?: Record<string, ColorTuple>;
    primaryColor?: string;
    primaryShade?: number | { light: number; dark: number };
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
};
}