// themeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MantineThemeOverride, MantineColorsTuple, MantineColorShade } from '@mantine/core';
import { DEFAULT_THEME } from '@mantine/core';
import generateShades from '@/utils/generateColors';
import { WritableDraft } from 'immer';

interface ThemeState {
  theme: MantineThemeOverride;
}

const initialState: ThemeState = {
  theme: DEFAULT_THEME
};

const frameValue = (value: string): string => {
  return `calc(${value} * var(--mantine-scale))`;
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Replace Theme
    setTheme: (state, action: PayloadAction<MantineThemeOverride>) => {
      state.theme = action.payload as WritableDraft<MantineThemeOverride>;
    },
    // Color Management
    setColor: (state, action: PayloadAction<{ key: string; value: MantineColorsTuple }>) => {
      state.theme.colors = {
        ...state.theme.colors,
        [action.payload.key]: action.payload.value
      };
    },
    setColorFromString: (state, action: PayloadAction<{ key: string; value: string }>) => {
      state.theme.colors = {
        ...state.theme.colors,
        [action.payload.key]: generateShades(action.payload.value) as unknown as MantineColorsTuple
      };
    },
    updateColor: (state, action: PayloadAction<{ oldName: string; newName: string }>) => {
      if (action.payload.oldName === action.payload.newName || action.payload.newName.trim() === '') {
        return;
      }
      const { [action.payload.oldName]: colorValue, ...otherColors } = state.theme.colors || {};
      state.theme.colors = {
        ...otherColors,
        [action.payload.newName]: colorValue
      };
      if (state.theme.primaryColor === action.payload.oldName) {
        state.theme.primaryColor = action.payload.newName;
      }
    },
    deleteColor: (state, action: PayloadAction<{ colorName: string }>) => {
      const { [action.payload.colorName]: _, ...remainingColors } = state.theme.colors || {};
      state.theme.colors = remainingColors;
      if (state.theme.primaryColor === action.payload.colorName) {
        state.theme.primaryColor = Object.keys(remainingColors)[0];
      }
    },
    updateColorShade: (state, action: PayloadAction<{ colorName: string; index: number; newShade: string }>) => {
      if (!state.theme.colors?.[action.payload.colorName]) return;
      const shades = [...(state.theme.colors[action.payload.colorName] || [])];
      shades[action.payload.index] = action.payload.newShade;
      state.theme.colors = {
        ...state.theme.colors,
        [action.payload.colorName]: shades as unknown as MantineColorsTuple
      };
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.theme.primaryColor = action.payload;
    },
    setPrimaryShade: (state, action: PayloadAction<number | { light: number; dark: number }>) => {
      state.theme.primaryShade = action.payload as MantineColorShade;
    },

    // Gradient Management
    setGradientFrom: (state, action: PayloadAction<string>) => {
      state.theme.defaultGradient = {
        ...state.theme.defaultGradient,
        from: action.payload
      };
    },
    setGradientTo: (state, action: PayloadAction<string>) => {
      state.theme.defaultGradient = {
        ...state.theme.defaultGradient,
        to: action.payload
      };
    },
    setGradientAngle: (state, action: PayloadAction<number>) => {
      state.theme.defaultGradient = {
        ...state.theme.defaultGradient,
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
      state.theme.radius = {
        ...state.theme.radius,
        [action.payload.key]: frameValue(action.payload.value)
      };
    },

    // Spacing Management
    setSpacing: (state, action: PayloadAction<{ key: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; value: string }>) => {
      state.theme.spacing = {
        ...state.theme.spacing,
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
        }
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
        }
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
        }
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
  }
});

export const {
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
} = themeSlice.actions;

export default themeSlice.reducer;