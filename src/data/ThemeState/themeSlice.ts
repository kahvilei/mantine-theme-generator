// themeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_THEME } from '@mantine/core';
import { ThemeState, ColorTuple, HeadingSize } from '@/data/types';
import generateShades from '@/utils/generateColors';
import { s } from 'vite/dist/node/types.d-aGj9QkWt';

const initialState: ThemeState = {
  theme: {
    colors: Object.entries(DEFAULT_THEME.colors).reduce((acc, [key, value]) => {
      acc[key] = value as ColorTuple;
      return acc;
    }, {} as Record<string, ColorTuple>),
    primaryColor: DEFAULT_THEME.primaryColor,
    primaryShade: DEFAULT_THEME.primaryShade,
    isThemeDependentPrimaryShade: false,
    
    white: DEFAULT_THEME.white,
    black: DEFAULT_THEME.black,
    defaultGradient: {
      from: DEFAULT_THEME.defaultGradient.from,
      to: DEFAULT_THEME.defaultGradient.to,
      deg: DEFAULT_THEME.defaultGradient.deg,
    },
    scale: DEFAULT_THEME.scale,
    radius: {
      xs: DEFAULT_THEME.radius.xs,
      sm: DEFAULT_THEME.radius.sm,
      md: DEFAULT_THEME.radius.md,
      lg: DEFAULT_THEME.radius.lg,
      xl: DEFAULT_THEME.radius.xl,
    },
    spacing: {
      xs: DEFAULT_THEME.spacing.xs,
      sm: DEFAULT_THEME.spacing.sm,
      md: DEFAULT_THEME.spacing.md,
      lg: DEFAULT_THEME.spacing.lg,
      xl: DEFAULT_THEME.spacing.xl,
    },
    defaultRadius: 'md',
    fontFamily: DEFAULT_THEME.fontFamily,
    fontFamilyMonospace: DEFAULT_THEME.fontFamilyMonospace,
    headings: {
      fontFamily: DEFAULT_THEME.headings?.fontFamily,
      fontWeight: DEFAULT_THEME.headings?.fontWeight,
      sizes: DEFAULT_THEME.headings?.sizes as Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', HeadingSize>,
    },
    focusRing: DEFAULT_THEME.focusRing,
    cursorType: DEFAULT_THEME.cursorType,
    fontSmoothing: DEFAULT_THEME.fontSmoothing,
    respectReducedMotion: DEFAULT_THEME.respectReducedMotion,
    autoContrast: DEFAULT_THEME.autoContrast,
    luminanceThreshold: DEFAULT_THEME.luminanceThreshold,

    components: DEFAULT_THEME.components
  }
};

const frameValue = (value: string): string => {
  return `calc(${value} * var(--mantine-scale))`;
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Replace Theme
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    // Color Management
    setColor: (state, action: PayloadAction<{ key: string; value: ColorTuple }>) => {
      state.theme.colors = {
        ...state.theme.colors,
        [action.payload.key]: action.payload.value
      };
    },
    setColorFromString: (state, action: PayloadAction<{ key: string; value: string }>) => {
      state.theme.colors = {
        ...state.theme.colors,
        [action.payload.key]: generateShades(action.payload.value) as ColorTuple
      };
    },
    updateColor: (state, action: PayloadAction<{ oldName: string; newName: string }>) => {
      if (!state.theme.colors || action.payload.oldName === action.payload.newName || !action.payload.newName.trim()) {
        return;
      }
      
      const { [action.payload.oldName]: colorValue, ...rest } = state.theme.colors;
      state.theme.colors = {
        ...rest,
        [action.payload.newName]: colorValue
      };

      if (state.theme.primaryColor === action.payload.oldName) {
        state.theme.primaryColor = action.payload.newName;
      }
    },
    deleteColor: (state, action: PayloadAction<{ colorName: string }>) => {
      if (!state.theme.colors) return;
      
      const { [action.payload.colorName]: _, ...rest } = state.theme.colors;
      state.theme.colors = rest;

      if (state.theme.primaryColor === action.payload.colorName) {
        state.theme.primaryColor = Object.keys(rest)[0];
      }
    },
    updateColorShade: (state, action: PayloadAction<{ colorName: string; index: number; newShade: string }>) => {
      if (!state.theme.colors?.[action.payload.colorName]) return;
      const shades = [...(state.theme.colors[action.payload.colorName] || [])];
      shades[action.payload.index] = action.payload.newShade;
      state.theme.colors = {
        ...state.theme.colors,
        [action.payload.colorName]: shades as ColorTuple
      };
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.theme.primaryColor = action.payload;
    },
    setPrimaryShade: (state, action: PayloadAction<number | { light: number; dark: number }>) => {
      if (typeof action.payload === 'number') {
        state.theme.isThemeDependentPrimaryShade = false;
        state.theme.primaryShade = action.payload;
      } else {
        state.theme.isThemeDependentPrimaryShade = true;
        state.theme.primaryShade = action.payload;
      }
    },

    // Gradient Management
    setGradientFrom: (state, action: PayloadAction<string>) => {
      const currentGradient = state.theme.defaultGradient ?? DEFAULT_THEME.defaultGradient;
      state.theme.defaultGradient = {
        from: action.payload,
        to: currentGradient.to,
        deg: currentGradient.deg
      };
    },
    
    setGradientTo: (state, action: PayloadAction<string>) => {
      const currentGradient = state.theme.defaultGradient ?? DEFAULT_THEME.defaultGradient;
      state.theme.defaultGradient = {
        from: currentGradient.from,
        to: action.payload,
        deg: currentGradient.deg
      };
    },
    
    setGradientAngle: (state, action: PayloadAction<number>) => {
      const currentGradient = state.theme.defaultGradient ?? DEFAULT_THEME.defaultGradient;
      state.theme.defaultGradient = {
        from: currentGradient.from,
        to: currentGradient.to,
        deg: action.payload
      };
    },

    // Scale Management
    setScale: (state, action: PayloadAction<number>) => {
      state.theme.scale = action.payload;
    },

    // Radius Management
    setDefaultRadius: (state, action: PayloadAction<'xs' | 'sm' | 'md' | 'lg' | 'xl'>) => {
      state.theme.defaultRadius = action.payload;
    },
    setRadius: (state, action: PayloadAction<{ key: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; value: string }>) => {
      const currentRadius = state.theme.radius ?? DEFAULT_THEME.radius;
      state.theme.radius = {
        xs: currentRadius.xs,
        sm: currentRadius.sm,
        md: currentRadius.md,
        lg: currentRadius.lg,
        xl: currentRadius.xl,
        [action.payload.key]: frameValue(action.payload.value)
      };
    },
    
    setSpacing: (state, action: PayloadAction<{ key: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; value: string }>) => {
      const currentSpacing = state.theme.spacing ?? DEFAULT_THEME.spacing;
      state.theme.spacing = {
        xs: currentSpacing.xs,
        sm: currentSpacing.sm,
        md: currentSpacing.md,
        lg: currentSpacing.lg,
        xl: currentSpacing.xl,
        [action.payload.key]: frameValue(action.payload.value)
      };
    },

    // Color Theme Management
    setWhite: (state, action: PayloadAction<string>) => {
      state.theme.white = action.payload;
    },
    setBlack: (state, action: PayloadAction<string>) => {
      state.theme.black = action.payload;
    },
    setAutoContrast: (state, action: PayloadAction<boolean>) => {
      state.theme.autoContrast = action.payload;
    },
    setLuminanceThreshold: (state, action: PayloadAction<number>) => {
      state.theme.luminanceThreshold = action.payload;
    },

    // Typography Management
    setHeadingFontFamily: (state, action: PayloadAction<string>) => {
      state.theme.headings = {
        ...state.theme.headings,
        fontFamily: action.payload
      };
    },
    setHeadingDefaultWeight: (state, action: PayloadAction<string>) => {
      state.theme.headings = {
        ...state.theme.headings,
        fontWeight: action.payload 
      };
    },
    setHeadingSize: (state, action: PayloadAction<{ key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; value: string }>) => {
      state.theme.headings = {
        ...state.theme.headings,
        sizes: {
          ...state.theme.headings?.sizes,
          [action.payload.key]: {
            ...state.theme.headings?.sizes?.[action.payload.key],
            fontSize: frameValue(action.payload.value)
          }
        } as Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', HeadingSize>
      };
    },
    setHeadingLineHeight: (state, action: PayloadAction<{ key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; value: string }>) => {
      state.theme.headings = {
        ...state.theme.headings,
        sizes: {
          ...state.theme.headings?.sizes,
          [action.payload.key]: {
            ...state.theme.headings?.sizes?.[action.payload.key],
            lineHeight: action.payload.value
          }
        } as Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', HeadingSize>
      };
    },
    setHeadingWeight: (state, action: PayloadAction<{ key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; value: string }>) => {
      state.theme.headings = {
        ...state.theme.headings,
        sizes: {
          ...state.theme.headings?.sizes,
          [action.payload.key]: {
            ...state.theme.headings?.sizes?.[action.payload.key],
            fontWeight: action.payload.value
          }
        } as Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', HeadingSize>
      };
    },
    setBodyFontFamily: (state, action: PayloadAction<string>) => {
      state.theme.fontFamily = action.payload;
    },
    setMonospaceFontFamily: (state, action: PayloadAction<string>) => {
      state.theme.fontFamilyMonospace = action.payload;
    },

    // Accessibility and UI Preferences
    setFontSmoothing: (state, action: PayloadAction<boolean>) => {
      state.theme.fontSmoothing = action.payload;
    },
    setFocusRing: (state, action: PayloadAction<"always" | "auto" | "never">) => {
      state.theme.focusRing = action.payload;
    },
    setCursorType: (state, action: PayloadAction<"default" | "pointer">) => {
      state.theme.cursorType = action.payload;
    },
    setRespectReducedMotion: (state, action: PayloadAction<boolean>) => {
      state.theme.respectReducedMotion = action.payload;
    },

    setComponentRules: (state, action: PayloadAction<Record<string, any>>) => {
      state.theme.components = action.payload;
    },

    setComponentRule: (state, action: PayloadAction<{ key: string; value: any }>) => {
      state.theme.components = {
        ...state.theme.components,
        [action.payload.key]: action.payload.value
      };
    },

    deleteComponentRule: (state, action: PayloadAction<string>) => {
      if (!state.theme.components) return;
      const { [action.payload]: _, ...rest } = state.theme.components;
      state.theme.components = rest;
    }
  }
});

export const {
  setTheme,
  setColor,
  setColorFromString,
  updateColor,
  deleteColor,
  updateColorShade,
  setPrimaryColor,
  setPrimaryShade,
  setGradientFrom,
  setGradientTo,
  setGradientAngle,
  setScale,
  setDefaultRadius,
  setRadius,
  setSpacing,
  setWhite,
  setBlack,
  setAutoContrast,
  setLuminanceThreshold,
  setHeadingFontFamily,
  setHeadingDefaultWeight,
  setHeadingSize,
  setHeadingLineHeight,
  setHeadingWeight,
  setBodyFontFamily,
  setMonospaceFontFamily,
  setFontSmoothing,
  setFocusRing,
  setCursorType,
  setRespectReducedMotion,
  setComponentRules,
  setComponentRule,
  deleteComponentRule
} = themeSlice.actions;

export default themeSlice.reducer;