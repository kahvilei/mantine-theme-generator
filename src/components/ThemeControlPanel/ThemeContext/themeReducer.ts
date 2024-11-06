import { MantineThemeOverride, MantineColorsTuple, MantineColorShade } from '@mantine/core';
import generateShades from '@/utils/generateColors';

// Action Types
export type ThemeAction =
  // Replace Theme
  | { type: 'SET_THEME'; theme: MantineThemeOverride }
  // Color Management
  | { type: 'SET_COLOR'; key: string; value: MantineColorsTuple }
  | { type: 'SET_COLOR_FROM_STRING'; key: string; value: string }
  | { type: 'UPDATE_COLOR'; oldName: string; newName: string }
  | { type: 'DELETE_COLOR'; colorName: string }
  | { type: 'UPDATE_COLOR_SHADE'; colorName: string; index: number; newShade: string }
  | { type: 'SET_PRIMARY_COLOR'; value: string }
  // Gradient Management
  | { type: 'SET_GRADIENT_FROM'; value: string }
  | { type: 'SET_GRADIENT_TO'; value: string }
  | { type: 'SET_GRADIENT_ANGLE'; value: number }
  // Scale Management
  | { type: 'SET_SCALE'; value: number }
  // Primary Shade Management
  | { type: 'SET_PRIMARY_SHADE'; value: MantineColorShade }
  // Border Radius Management
  | { type: 'SET_DEFAULT_RADIUS'; value: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }
  | { type: 'SET_RADIUS'; key: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; value: string }
  // Spacing Management
  | { type: 'SET_SPACING'; key: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; value: string }
  // Color Theme Management
  | { type: 'SET_WHITE'; value: string }
  | { type: 'SET_BLACK'; value: string }
  | { type: 'SET_AUTO_CONTRAST'; value: boolean }
  | { type: 'SET_LUMINANCE_THRESHOLD'; value: number }
  // Typography Management
  | { type: 'SET_HEADING_FONT_FAMILY'; value: string }
  | { type: 'SET_HEADING_DEFAULT_WEIGHT'; value: string }
  | { type: 'SET_HEADING_SIZE'; key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; value: string }
  | { type: 'SET_HEADING_LINE_HEIGHT'; key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; value: string }
  | { type: 'SET_HEADING_WEIGHT'; key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; value: string }
  | { type: 'SET_BODY_FONT_FAMILY'; value: string }
  | { type: 'SET_MONOSPACE_FONT_FAMILY'; value: string }
  // Accessibility and UI Preferences
  | { type: 'SET_FONT_SMOOTHING'; value: boolean }
  | { type: 'SET_FOCUS_RING'; value: "always" | "auto" | "never" }
  | { type: 'SET_CURSOR_TYPE'; value: "default" | "pointer" }
  | { type: 'SET_RESPECT_REDUCED_MOTION'; value: boolean };

const frameValue = (value: string): string => {
  return `calc(${value} * var(--mantine-scale))`;
};

export const themeReducer = (
  state: MantineThemeOverride,
  action: ThemeAction
): MantineThemeOverride => {
  switch (action.type) {
    // Replace Theme
    case 'SET_THEME':
      return action.theme;
    // Color Management
    case 'SET_COLOR':
      return {
        ...state,
        colors: {
          ...state.colors,
          [action.key]: action.value
        }
      };

    case 'SET_COLOR_FROM_STRING':
      return {
        ...state,
        colors: {
          ...state.colors,
          [action.key]: generateShades(action.value) as unknown as MantineColorsTuple
        }
      };

    case 'UPDATE_COLOR':
      if (action.oldName === action.newName || action.newName.trim() === '') {
        return state;
      }
      const { [action.oldName]: colorValue, ...otherColors } = state.colors || {};
      return {
        ...state,
        colors: {
          ...otherColors,
          [action.newName]: colorValue
        },
        primaryColor: state.primaryColor === action.oldName ? action.newName : state.primaryColor
      };

    case 'DELETE_COLOR':
      const { [action.colorName]: _, ...remainingColors } = state.colors || {};
      return {
        ...state,
        colors: remainingColors,
        primaryColor: state.primaryColor === action.colorName
          ? Object.keys(remainingColors)[0]
          : state.primaryColor
      };

    case 'UPDATE_COLOR_SHADE':
      if (!state.colors?.[action.colorName]) return state;
      return {
        ...state,
        colors: {
          ...state.colors,
          [action.colorName]: (state.colors[action.colorName] ?? []).map((shade, i) =>
            i === action.index ? action.newShade : shade
          ) as unknown as MantineColorsTuple
        }
      };

    case 'SET_PRIMARY_COLOR':
      return {
        ...state,
        primaryColor: action.value
      };

    // Gradient Management
    case 'SET_GRADIENT_FROM':
      return {
        ...state,
        defaultGradient: {
          ...state.defaultGradient,
          from: action.value
        }
      };

    case 'SET_GRADIENT_TO':
      return {
        ...state,
        defaultGradient: {
          ...state.defaultGradient,
          to: action.value
        }
      };

    case 'SET_GRADIENT_ANGLE':
      return {
        ...state,
        defaultGradient: {
          ...state.defaultGradient,
          deg: action.value
        }
      };

    // Scale Management
    case 'SET_SCALE':
      return {
        ...state,
        scale: action.value
      };

    // Primary Shade Management
    case 'SET_PRIMARY_SHADE':
      return {
        ...state,
        primaryShade: action.value
      };

    // Radius Management
    case 'SET_DEFAULT_RADIUS':
      return {
        ...state,
        defaultRadius: action.value
      };

    case 'SET_RADIUS':
      return {
        ...state,
        radius: {
          ...state.radius,
          [action.key]: frameValue(action.value)
        }
      };

    // Spacing Management
    case 'SET_SPACING':
      return {
        ...state,
        spacing: {
          ...state.spacing,
          [action.key]: frameValue(action.value)
        }
      };

    // Color Theme Management
    case 'SET_WHITE':
      return {
        ...state,
        white: action.value
      };

    case 'SET_BLACK':
      return {
        ...state,
        black: action.value
      };

    case 'SET_AUTO_CONTRAST':
      return {
        ...state,
        autoContrast: action.value
      };

    case 'SET_LUMINANCE_THRESHOLD':
      return {
        ...state,
        luminanceThreshold: action.value
      };

    // Typography Management
    case 'SET_HEADING_FONT_FAMILY':
      return {
        ...state,
        headings: {
          ...state.headings,
          fontFamily: action.value
        }
      };

    case 'SET_HEADING_DEFAULT_WEIGHT':
      return {
        ...state,
        headings: {
          ...state.headings,
          fontWeight: action.value
        }
      };

    case 'SET_HEADING_SIZE':
      return {
        ...state,
        headings: {
          ...state.headings,
          sizes: {
            ...state.headings?.sizes,
            [action.key]: {
              ...state.headings?.sizes?.[action.key],
              fontSize: frameValue(action.value)
            }
          }
        }
      };

    case 'SET_HEADING_LINE_HEIGHT':
      return {
        ...state,
        headings: {
          ...state.headings,
          sizes: {
            ...state.headings?.sizes,
            [action.key]: {
              ...state.headings?.sizes?.[action.key],
              lineHeight: action.value
            }
          }
        }
      };

    case 'SET_HEADING_WEIGHT':
      return {
        ...state,
        headings: {
          ...state.headings,
          sizes: {
            ...state.headings?.sizes,
            [action.key]: {
              ...state.headings?.sizes?.[action.key],
              fontWeight: action.value
            }
          }
        }
      };

    case 'SET_BODY_FONT_FAMILY':
      return {
        ...state,
        fontFamily: action.value
      };

    case 'SET_MONOSPACE_FONT_FAMILY':
      return {
        ...state,
        fontFamilyMonospace: action.value
      };

    // Accessibility and UI Preferences
    case 'SET_FONT_SMOOTHING':
      return {
        ...state,
        fontSmoothing: action.value
      };

    case 'SET_FOCUS_RING':
      return {
        ...state,
        focusRing: action.value
      };

    case 'SET_CURSOR_TYPE':
      return {
        ...state,
        cursorType: action.value
      };

    case 'SET_RESPECT_REDUCED_MOTION':
      return {
        ...state,
        respectReducedMotion: action.value
      };

    default:
      return state;
  }
};