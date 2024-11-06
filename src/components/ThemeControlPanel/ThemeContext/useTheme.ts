import { useReducer, useCallback } from 'react';
import { themeReducer, ThemeAction } from './themeReducer';
import { MantineThemeOverride, MantineColorsTuple, MantineColorShade } from '@mantine/core';
import { DEFAULT_THEME } from '@mantine/core';

export const useTheme = (initialTheme: MantineThemeOverride) => {
  const [theme, dispatch] = useReducer(themeReducer, initialTheme);
  const defaultTheme = DEFAULT_THEME;

  const unframeValue = (value: string): string => {
    return value.replace(/calc\((.*?) \* var\(--mantine-scale\)\)/, '$1');
  };

  // Replace Theme
    const setTheme = useCallback((theme: MantineThemeOverride) => {
        dispatch({ type: 'SET_THEME', theme });
    }, []);

  // Color Management
  const setColor = useCallback((key: string, value: MantineColorsTuple) => {
    dispatch({ type: 'SET_COLOR', key, value });
  }, []);

  const setColorFromString = useCallback((key: string, value: string) => {
    dispatch({ type: 'SET_COLOR_FROM_STRING', key, value });
  }, []);

  const updateColor = useCallback((oldName: string, newName: string) => {
    dispatch({ type: 'UPDATE_COLOR', oldName, newName });
  }, []);

  const deleteColor = useCallback((colorName: string) => {
    dispatch({ type: 'DELETE_COLOR', colorName });
  }, []);

  const updateColorShade = useCallback((colorName: string, index: number, newShade: string) => {
    dispatch({ type: 'UPDATE_COLOR_SHADE', colorName, index, newShade });
  }, []);

  const setPrimaryColor = useCallback((value: string) => {
    dispatch({ type: 'SET_PRIMARY_COLOR', value });
  }, []);

  // Gradient Management
  const setGradientFrom = useCallback((value: string) => {
    dispatch({ type: 'SET_GRADIENT_FROM', value });
  }, []);

  const setGradientTo = useCallback((value: string) => {
    dispatch({ type: 'SET_GRADIENT_TO', value });
  }, []);

  const setGradientAngle = useCallback((value: number) => {
    dispatch({ type: 'SET_GRADIENT_ANGLE', value });
  }, []);

  // Scale Management
  const setScale = useCallback((value: number) => {
    dispatch({ type: 'SET_SCALE', value });
  }, []);

  // Primary Shade Management
  const setPrimaryShade = useCallback((value: MantineColorShade) => {
    dispatch({ type: 'SET_PRIMARY_SHADE', value });
  }, []);

  // Radius Management
  const setDefaultRadius = useCallback((value: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
    dispatch({ type: 'SET_DEFAULT_RADIUS', value });
  }, []);

  const setRadius = useCallback((key: 'xs' | 'sm' | 'md' | 'lg' | 'xl', value: string) => {
    dispatch({ type: 'SET_RADIUS', key, value });
  }, []);

  // Spacing Management
  const setSpacing = useCallback((key: 'xs' | 'sm' | 'md' | 'lg' | 'xl', value: string) => {
    dispatch({ type: 'SET_SPACING', key, value });
  }, []);

  // Color Theme Management
  const setWhite = useCallback((value: string) => {
    dispatch({ type: 'SET_WHITE', value });
  }, []);

  const setBlack = useCallback((value: string) => {
    dispatch({ type: 'SET_BLACK', value });
  }, []);

  const setAutoContrast = useCallback((value: boolean) => {
    dispatch({ type: 'SET_AUTO_CONTRAST', value });
  }, []);

  const setLuminanceThreshold = useCallback((value: number) => {
    dispatch({ type: 'SET_LUMINANCE_THRESHOLD', value });
  }, []);

  // Typography Management
  const setHeadingFontFamily = useCallback((value: string) => {
    dispatch({ type: 'SET_HEADING_FONT_FAMILY', value });
  }, []);

  const setHeadingDefaultWeight = useCallback((value: string) => {
    dispatch({ type: 'SET_HEADING_DEFAULT_WEIGHT', value });
  }, []);

  const setHeadingSize = useCallback((key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', value: string) => {
    dispatch({ type: 'SET_HEADING_SIZE', key, value });
  }, []);

  const setHeadingLineHeight = useCallback((key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', value: string) => {
    dispatch({ type: 'SET_HEADING_LINE_HEIGHT', key, value });
  }, []);

  const setHeadingWeight = useCallback((key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', value: string) => {
    dispatch({ type: 'SET_HEADING_WEIGHT', key, value });
  }, []);

  const setBodyFontFamily = useCallback((value: string) => {
    dispatch({ type: 'SET_BODY_FONT_FAMILY', value });
  }, []);

  const setMonospaceFontFamily = useCallback((value: string) => {
    dispatch({ type: 'SET_MONOSPACE_FONT_FAMILY', value });
  }, []);

  // Accessibility and UI Preferences
  const setFontSmoothing = useCallback((value: boolean) => {
    dispatch({ type: 'SET_FONT_SMOOTHING', value });
  }, []);

  const setFocusRing = useCallback((value: "always" | "auto" | "never") => {
    dispatch({ type: 'SET_FOCUS_RING', value });
  }, []);

  const setCursorType = useCallback((value: "default" | "pointer") => {
    dispatch({ type: 'SET_CURSOR_TYPE', value });
  }, []);

  const setRespectReducedMotion = useCallback((value: boolean) => {
    dispatch({ type: 'SET_RESPECT_REDUCED_MOTION', value });
  }, []);

  // Getter functions - these don't need to be memoized as they're just accessing state
  const getScale = () => theme.scale ?? defaultTheme.scale;
  
  const getPrimaryColor = () => theme.primaryColor ?? defaultTheme.primaryColor;
  
  const getDefaultGradient = () => theme.defaultGradient ?? defaultTheme.defaultGradient;
  
  const getGradientFrom = () => theme.defaultGradient?.from ?? defaultTheme.defaultGradient.from;
  
  const getGradientTo = () => theme.defaultGradient?.to ?? defaultTheme.defaultGradient.to;
  
  const getGradientAngle = () => theme.defaultGradient?.deg ?? defaultTheme.defaultGradient.deg;
  
  const getMainColorShade = (key: string) => {
    if (theme.colors && theme.colors[key]) {
      return theme.colors[key][5];
    }
    return '#000';
  };

  const getGradientFromMainHex = () => getMainColorShade(getGradientFrom() || 'blue');
  
  const getGradientToMainHex = () => getMainColorShade(getGradientTo() || 'blue');

  const getShadesFromColorString = (key: string) => {
    if (theme.colors && theme.colors[key]) {
      return theme.colors[key];
    }
    return defaultTheme.colors[key];
  };

  const getColor = (key: string) => {
    if (theme.colors && theme.colors[key]) {
      return theme.colors[key];
    }
    return defaultTheme.colors[key];
  };

  const getCustomColors = () => {
    const customColors = new Map<string, MantineColorsTuple>();
    for (let color in theme.colors) {
      if (theme.colors[color] && !defaultTheme.colors[color]) {
        customColors.set(color, theme.colors[color]);
      }
    }
    return customColors;
  };

  const getMantineColors = () => {
    const mantineColors = new Map<string, MantineColorsTuple>();
    for (let color in defaultTheme.colors) {
      if (theme.colors?.[color]) {
        mantineColors.set(color, theme.colors[color]);
      } else {
        mantineColors.set(color, defaultTheme.colors[color]);
      }
    }
    return mantineColors;
  };

  const getAllColors = () => theme.colors ?? defaultTheme.colors;

  const getAllMainColorArray = () => 
    Array.from(Object.values(getAllColors() || {})).map(color => 
      color ? color[5] : '#000'
    );

  const getAllColorKeysArray = () => Array.from(Object.keys(getAllColors()));

  const getRadius = (key: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
    const value = theme.radius ? theme.radius[key] : defaultTheme.radius[key];
    return value ? unframeValue(value) : value;
  };

  const getDefaultRadius = () => theme.defaultRadius ?? defaultTheme.defaultRadius;

  const getSpacing = (key: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
    const value = theme.spacing ? theme.spacing[key] : defaultTheme.spacing[key];
    return value ? unframeValue(value) : value;
  };

  const getWhite = () => theme.white ?? defaultTheme.white;
  
  const getBlack = () => theme.black ?? defaultTheme.black;
  
  const getAutoContrast = () => theme.autoContrast ?? defaultTheme.autoContrast;
  
  const getLuminanceThreshold = () => theme.luminanceThreshold ?? defaultTheme.luminanceThreshold;

  const getHeadingFontFamily = () => theme.headings?.fontFamily ?? defaultTheme.headings?.fontFamily;
  
  const getHeadingDefaultWeight = () => theme.headings?.fontWeight ?? defaultTheme.headings?.fontWeight;

  const getHeadingSize = (key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
    const value = theme.headings?.sizes?.[key]?.fontSize ?? defaultTheme.headings?.sizes?.[key].fontSize;
    return value ? unframeValue(value as string) : value;
  };

  const getHeadingLineHeight = (key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
    const value = theme.headings?.sizes?.[key]?.lineHeight ?? defaultTheme.headings?.sizes?.[key].lineHeight;
    return value ? unframeValue(value as string) : value;
  };

  const getHeadingWeight = (key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => 
    theme.headings?.sizes?.[key]?.fontWeight ?? 
    defaultTheme.headings?.sizes?.[key].fontWeight ?? 
    theme.headings?.fontWeight ?? 
    defaultTheme.headings?.fontWeight;

  const getBodyFontFamily = () => theme.fontFamily ?? defaultTheme.fontFamily;
  
  const getMonospaceFontFamily = () => theme.fontFamilyMonospace ?? defaultTheme.fontFamilyMonospace;
  
  const getFontSmoothing = () => theme.fontSmoothing ?? defaultTheme.fontSmoothing;
  
  const getFocusRing = () => theme.focusRing ?? defaultTheme.focusRing;
  
  const getCursorType = () => theme.cursorType ?? defaultTheme.cursorType;
  
  const getRespectReducedMotion = () => theme.respectReducedMotion ?? defaultTheme.respectReducedMotion;

  const getPrimaryShade = (scheme?: 'light' | 'dark') => {
    if (theme.primaryShade && typeof theme.primaryShade === 'object' && scheme) {
      return theme.primaryShade[scheme] ?? 5;
    }
    return (theme.primaryShade as number) ?? 5;
  };

  const isSchemeDependentPrimaryShade = () => {
    if(!theme.primaryShade) return false;
    return theme.primaryShade && typeof theme.primaryShade === 'object';
  }

  return {
    theme,
    // Replace Theme
    setTheme,
    // Color Management
    setColor,
    setColorFromString,
    updateColor,
    deleteColor,
    updateColorShade,
    setPrimaryColor,
    // Gradient Management
    setGradientFrom,
    setGradientTo,
    setGradientAngle,
    // Scale Management
    setScale,
    // Primary Shade Management
    setPrimaryShade,
    // Radius Management
    setDefaultRadius,
    setRadius,
    // Spacing Management
    setSpacing,
    // Color Theme Management
    setWhite,
    setBlack,
    setAutoContrast,
    setLuminanceThreshold,
    // Typography Management
    setHeadingFontFamily,
    setHeadingDefaultWeight,
    setHeadingSize,
    setHeadingLineHeight,
    setHeadingWeight,
    setBodyFontFamily,
    setMonospaceFontFamily,
    // Accessibility and UI Preferences
    setFontSmoothing,
    setFocusRing,
    setCursorType,
    setRespectReducedMotion,
    // Getters
    getScale,
    getPrimaryColor,
    getDefaultGradient,
    getGradientFrom,
    getGradientTo,
    getGradientAngle,
    getMainColorShade,
    getGradientFromMainHex,
    getGradientToMainHex,
    getShadesFromColorString,
    getColor,
    getCustomColors,
    getMantineColors,
    getAllColors,
    getAllMainColorArray,
    getAllColorKeysArray,
    getDefaultRadius,
    getRadius,
    getSpacing,
    getWhite,
    getBlack,
    getAutoContrast,
    getLuminanceThreshold,
    getHeadingFontFamily,
    getHeadingDefaultWeight,
    getHeadingSize,
    getHeadingLineHeight,
    getHeadingWeight,
    getBodyFontFamily,
    getMonospaceFontFamily,
    getFontSmoothing,
    getFocusRing,
    getCursorType,
    getRespectReducedMotion,
    getPrimaryShade,
    isSchemeDependentPrimaryShade,
  };
};