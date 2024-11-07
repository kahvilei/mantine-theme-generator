import { RootState } from '../store';
import { DEFAULT_THEME } from '@mantine/core';
import { ColorTuple } from '../types';

const unframeValue = (value: string): string => {
  return value.replace(/calc\((.*?) \* var\(--mantine-scale\)\)/, '$1');
};

// Base selector
export const selectTheme = (state: RootState) => state.theme.theme;

// Color Management
export const selectMainColorShade = (state: RootState, key: string) => {
  if (state.theme.theme.colors?.[key]) {
    return state.theme.theme.colors[key][5];
  }
  return '#000';
};

export const selectPrimaryColor = (state: RootState) => 
  selectTheme(state).primaryColor ?? DEFAULT_THEME.primaryColor;

export const selectColor = (state: RootState, key: string) => {
  if (state.theme.theme.colors?.[key]) {
    return state.theme.theme.colors[key];
  }
  return DEFAULT_THEME.colors[key];
}

export const selectCustomColors = (state: RootState) => {
  const customColors = new Map<string, ColorTuple>();
  for (let color in state.theme.theme.colors) {
    if (state.theme.theme.colors[color] && !DEFAULT_THEME.colors[color]) {
      customColors.set(color, state.theme.theme.colors[color]);
    }
  }
  return customColors;
};

export const selectMantineColors = (state: RootState) => {
  const mantineColors = new Map<string, ColorTuple>();
  for (let color in DEFAULT_THEME.colors) {
    if (state.theme.theme.colors?.[color]) {
      mantineColors.set(color, state.theme.theme.colors[color]);
    } else {
      mantineColors.set(color, DEFAULT_THEME.colors[color] as ColorTuple);
    }
  }
  return mantineColors;
};

export const selectAllColors = (state: RootState) => 
  state.theme.theme.colors ?? DEFAULT_THEME.colors;

export const selectAllMainColorArray = (state: RootState) => 
  Array.from(Object.values(selectAllColors(state))).map(color => 
    color ? color[5] : '#000'
  );

export const selectAllColorKeysArray = (state: RootState) => 
  Array.from(Object.keys(selectAllColors(state)));

// Gradient Management
export const selectDefaultGradient = (state: RootState) => 
  selectTheme(state).defaultGradient ?? DEFAULT_THEME.defaultGradient;

export const selectGradientFrom = (state: RootState) => 
  selectTheme(state).defaultGradient?.from ?? DEFAULT_THEME.defaultGradient.from;

export const selectGradientTo = (state: RootState) => 
  selectTheme(state).defaultGradient?.to ?? DEFAULT_THEME.defaultGradient.to;

export const selectGradientAngle = (state: RootState) => 
  selectTheme(state).defaultGradient?.deg ?? DEFAULT_THEME.defaultGradient.deg;

// Scale, Radius, and Spacing
export const selectScale = (state: RootState) => 
  selectTheme(state).scale ?? DEFAULT_THEME.scale;

export const selectRadius = (state: RootState, key: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
  const value = selectTheme(state).radius?.[key] ?? DEFAULT_THEME.radius[key];
  return value ? unframeValue(value) : value;
};

export const selectDefaultRadius = (state: RootState) => 
  selectTheme(state).defaultRadius ?? DEFAULT_THEME.defaultRadius;

export const selectSpacing = (state: RootState, key: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
  const value = selectTheme(state).spacing?.[key] ?? DEFAULT_THEME.spacing[key];
  return value ? unframeValue(value) : value;
};

// Typography
export const selectHeadingFontFamily = (state: RootState) => 
  selectTheme(state).headings?.fontFamily ?? DEFAULT_THEME.headings?.fontFamily;

export const selectHeadingDefaultWeight = (state: RootState) => 
  selectTheme(state).headings?.fontWeight ?? DEFAULT_THEME.headings?.fontWeight;

export const selectHeadingSize = (state: RootState, key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
  const value = selectTheme(state).headings?.sizes?.[key]?.fontSize ?? 
    DEFAULT_THEME.headings?.sizes?.[key].fontSize;
  return value ? unframeValue(value as string) : value;
};

export const selectHeadingLineHeight = (state: RootState, key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
  const value = selectTheme(state).headings?.sizes?.[key]?.lineHeight ?? 
    DEFAULT_THEME.headings?.sizes?.[key].lineHeight;
  return value ? unframeValue(value as string) : value;
};

export const selectHeadingWeight = (state: RootState, key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => 
  selectTheme(state).headings?.sizes?.[key]?.fontWeight ?? 
  DEFAULT_THEME.headings?.sizes?.[key].fontWeight ??
  selectTheme(state).headings?.fontWeight ?? 
  DEFAULT_THEME.headings?.fontWeight;

// Other Theme Properties
export const selectWhite = (state: RootState) => 
    selectTheme(state).white ?? DEFAULT_THEME.white;
  
  export const selectBlack = (state: RootState) => 
    selectTheme(state).black ?? DEFAULT_THEME.black;
  
  export const selectAutoContrast = (state: RootState) => 
    selectTheme(state).autoContrast ?? DEFAULT_THEME.autoContrast;
  
  export const selectLuminanceThreshold = (state: RootState) => 
    selectTheme(state).luminanceThreshold ?? DEFAULT_THEME.luminanceThreshold;
  
  export const selectBodyFontFamily = (state: RootState) => 
    selectTheme(state).fontFamily ?? DEFAULT_THEME.fontFamily;
  
  export const selectMonospaceFontFamily = (state: RootState) => 
    selectTheme(state).fontFamilyMonospace ?? DEFAULT_THEME.fontFamilyMonospace;
  
  export const selectFontSmoothing = (state: RootState) => 
    selectTheme(state).fontSmoothing ?? DEFAULT_THEME.fontSmoothing;
  
  export const selectFocusRing = (state: RootState) => 
    selectTheme(state).focusRing ?? DEFAULT_THEME.focusRing;
  
  export const selectCursorType = (state: RootState) => 
    selectTheme(state).cursorType ?? DEFAULT_THEME.cursorType;
  
  export const selectRespectReducedMotion = (state: RootState) => 
    selectTheme(state).respectReducedMotion ?? DEFAULT_THEME.respectReducedMotion;
  
  export const selectPrimaryShade = (state: RootState, scheme?: 'light' | 'dark') => {
    const primaryShade = selectTheme(state).primaryShade;
    if (primaryShade && typeof primaryShade === 'object') {
      scheme = scheme ?? 'light';
      return primaryShade[scheme] ?? 5;
    }
    return (primaryShade as number) ?? 5;
  };
  
  export const selectGradientFromMainHex = (state: RootState) => 
    selectMainColorShade(state, selectGradientFrom(state) || 'blue');
  
  export const selectGradientToMainHex = (state: RootState) => 
    selectMainColorShade(state, selectGradientTo(state) || 'blue');
  
  export const selectShadesFromColorString = (state: RootState, key: string) => {
    if (state.theme.theme.colors?.[key]) {
      return state.theme.theme.colors[key];
    }
    return DEFAULT_THEME.colors[key] as ColorTuple;
  };

  export const selectIsSchemeDependentPrimaryShade = (state: RootState) => {
    const primaryShade = selectPrimaryShade(state);
    return typeof primaryShade === 'object';
  };
  