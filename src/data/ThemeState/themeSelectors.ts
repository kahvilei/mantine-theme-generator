import { RootState } from '../store';
import {DEFAULT_THEME, MantineColorsTuple} from '@mantine/core';
import { createSelector } from '@reduxjs/toolkit';

const unframeValue = (value: string): string => {
  return value.replace(/calc\((.*?) \* var\(--mantine-scale\)\)/, '$1');
};

// Base selector
export const selectTheme = (state: RootState) => state.theme.theme;

// Color Management
export const selectMainColorShade = (state: RootState, key: string) => {
  if (state.theme.theme.colors?.[key]) {
    return state.theme.theme.colors[key][5];
  }if (DEFAULT_THEME.colors[key]) {
    return DEFAULT_THEME.colors[key][5];
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

// Base selector for theme colors
const selectThemeColors = (state: RootState) => state.theme.theme.colors;

// Memoized selector for custom colors
export const selectCustomColors = createSelector(
  [selectThemeColors],
  (colors) => {
    const customColors = new Map<string, MantineColorsTuple>();
    if (!colors) {return customColors;}

    for (const color in colors) {
      if (colors[color] && !DEFAULT_THEME.colors[color]) {
        customColors.set(color, colors[color]);
      }
    }
    return customColors;
  }
);

// Memoized selector for Mantine colors
export const selectMantineColors = createSelector(
  [selectThemeColors],
  (colors) => {
    const mantineColors = new Map<string, MantineColorsTuple>();
    
    for (const color in DEFAULT_THEME.colors) {
      if (colors?.[color]) {
        mantineColors.set(color, colors[color]);
      } else {
        mantineColors.set(color, DEFAULT_THEME.colors[color] as MantineColorsTuple);
      }
    }
    return mantineColors;
  }
);

// If you need both custom and mantine colors together
export const selectAllColorsMemoized = createSelector(
  [selectCustomColors, selectMantineColors],
  (customColors, mantineColors) => ({
    customColors,
    mantineColors
  })
);

// If you need just the array of all color names
export const selectColorNames = createSelector(
  [selectThemeColors],
  (colors) => Object.keys(colors || {})
);

// If you need the main shade (index 5) of specific colors
export const makeSelectColorShade = (colorKey: string) =>
  createSelector(
    [selectThemeColors],
    (colors) => colors?.[colorKey]?.[5] || DEFAULT_THEME.colors[colorKey]?.[5] || '#000'
  );

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
      return primaryShade[scheme ?? 'light'] ?? 5;
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
    return DEFAULT_THEME.colors[key] as MantineColorsTuple;
  };

  export const selectIsSchemeDependentPrimaryShade = (state: RootState) => {
    return selectTheme(state).isThemeDependentPrimaryShade ?? true;
  };

  export const selectComponentRules = (state: RootState) =>
    selectTheme(state).components ?? DEFAULT_THEME.components;

  export const selectComponentRuleByName = (state: RootState, name: string) =>
    selectComponentRules(state)[name] ?? DEFAULT_THEME.components[name];

  export const selectBreakpoints = (state: RootState) =>
    selectTheme(state).breakpoints ?? DEFAULT_THEME.breakpoints;
  

  