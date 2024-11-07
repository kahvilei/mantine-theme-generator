import {
  DEFAULT_THEME,
  MantineColorShade,
  MantineColorsTuple,
  MantineThemeOverride,
} from '@mantine/core';
import generateShades from '@/utils/generateColors';

class ThemeManager {
  theme: MantineThemeOverride;
  schemeDependentPrimaryShade: boolean;
  stateFunction: (theme: MantineThemeOverride) => void;
  defaultTheme = DEFAULT_THEME;

  constructor(theme: MantineThemeOverride, stateFunction: (theme: MantineThemeOverride) => void) {
    this.schemeDependentPrimaryShade =
      theme.primaryShade && typeof theme.primaryShade === 'object' ? true : false;
    this.theme = theme;
    this.theme.colors ? this.theme.colors : (this.theme.colors = {});
    //add each mantine color to the theme
    for (let color in DEFAULT_THEME.colors) {
      if (!this.theme.colors[color]) {
        this.theme.colors[color] = DEFAULT_THEME.colors[color];
      }
    }
    this.stateFunction = stateFunction;
  }

  commitChanges() {
    this.stateFunction(this.theme);
  }

  getScale() {
    return this.theme.scale ? this.theme.scale : this.defaultTheme.scale;
  }

  setScale(value: number) {
    this.theme.scale = value;
    this.commitChanges();
  }

  setColor(key: string, value: MantineColorsTuple) {
    this.theme.colors ? (this.theme.colors[key] = value) : (this.theme.colors = { [key]: value });
    this.commitChanges();
  }

  setColorFromString(key: string, value: string) {
    this.theme.colors
      ? (this.theme.colors[key] = generateShades(value) as unknown as MantineColorsTuple)
      : (this.theme.colors = { [key]: generateShades(value) as unknown as MantineColorsTuple });
    this.commitChanges();
  }

  getColor(key: string) {
    if (this.theme.colors && this.theme.colors[key]) return this.theme.colors[key];
    else return undefined;
  }

  updateColor(oldName: string, newName: string) {
    if (oldName !== newName && newName.trim() !== '') {
      const updatedColors = { ...this.theme.colors };
      updatedColors[newName] = updatedColors[oldName];
      delete updatedColors[oldName];
      this.theme.colors = updatedColors;
      if (this.theme.primaryColor === oldName) {
        this.theme.primaryColor = newName;
      }
    }
    this.commitChanges();
  }

  deleteColor(colorName: string) {
    if (this.theme.colors) {
      const updatedColors = { ...this.theme.colors };
      delete updatedColors[colorName];
      this.theme.colors = updatedColors;
      if (this.theme.primaryColor === colorName) {
        this.theme.primaryColor = Object.keys(updatedColors)[0];
      }
      this.commitChanges();
    }
  }

  updateColorShade(colorName: string, index: number, newShade: string) {
    if (this.theme.colors && this.theme.colors[colorName]) {
      const updatedShades = [...this.theme.colors[colorName]];
      updatedShades[index] = newShade;
      this.theme.colors[colorName] = updatedShades as unknown as MantineColorsTuple;
      this.commitChanges();
    }
  }

  getPrimaryColor() {
    return this.theme.primaryColor ? this.theme.primaryColor : this.defaultTheme.primaryColor;
  }

  setPrimaryColor(value: string) {
    this.theme.primaryColor = value;
    this.commitChanges();
  }

  getDefaultGradient() {
    return this.theme.defaultGradient
      ? this.theme.defaultGradient
      : this.defaultTheme.defaultGradient;
  }

  getGradientFrom() {
    return this.theme.defaultGradient
      ? this.theme.defaultGradient.from
      : this.defaultTheme.defaultGradient.from;
  }

  getGradientFromMainHex() {
    return this.getMainColorShade(this.getGradientFrom() || 'blue');
  }

  setGradientFrom(value: string) {
    this.theme.defaultGradient
      ? (this.theme.defaultGradient.from = value)
      : (this.theme.defaultGradient = { from: value, to: this.getGradientTo() });
    this.commitChanges();
  }

  getGradientTo() {
    return this.theme.defaultGradient
      ? this.theme.defaultGradient.to
      : this.defaultTheme.defaultGradient.to;
  }

  setGradientTo(value: string) {
    this.theme.defaultGradient
      ? (this.theme.defaultGradient.to = value)
      : (this.theme.defaultGradient = { from: this.getGradientFrom(), to: value });
    this.commitChanges();
  }

  getGradientToMainHex() {
    return this.getMainColorShade(this.getGradientTo() || 'blue');
  }

  getGradientAngle() {
    return this.theme.defaultGradient
      ? this.theme.defaultGradient.deg
      : this.defaultTheme.defaultGradient.deg;
  }

  setGradientAngle(value: number) {
    this.theme.defaultGradient
      ? (this.theme.defaultGradient.deg = value)
      : (this.theme.defaultGradient = {
          from: this.getGradientFrom(),
          to: this.getGradientTo(),
          deg: value,
        });
    this.commitChanges();
  }

  getMainColorShade(key: string) {
    if (this.theme.colors && this.theme.colors[key]) {
      return this.theme.colors[key][5];
    }
    return '#000';
  }

  getShadesFromColorString(key: string) {
    if (this.theme.colors && this.theme.colors[key]) {
      return this.theme.colors[key];
    }
    return this.defaultTheme.colors[key];
  }

  getCustomColors() {
    // we will go through all the colors in the theme and check if they are in the default theme
    // if they are not in the default theme, we will add them to the custom colors
    const customColors = new Map<string, MantineColorsTuple>();
    for (let color in this.theme.colors) {
      if (this.theme.colors[color] && !this.defaultTheme.colors[color]) {
        customColors.set(color, this.theme.colors[color]);
      }
    }
    return customColors;
  }

  getMantineColors() {
    // we will go through all the colors in the theme and check if they are in the default theme
    // if they are in the default theme, we will add them to the mantine colors
    const mantineColors = new Map<string, MantineColorsTuple>();
    for (let color in this.defaultTheme.colors) {
      if (!this.theme.colors) {
        this.theme.colors = {};
      }
      if (this.theme.colors[color] && this.defaultTheme.colors[color]) {
        mantineColors.set(color, this.theme.colors[color]);
      } else if (!this.theme.colors[color]) {
        mantineColors.set(color, this.defaultTheme.colors[color]);
      }
    }
    return mantineColors;
  }

  getAllColors() {
    return this.theme.colors ? this.theme.colors : this.defaultTheme.colors;
  }

  getAllMainColorArray() {
    return Array.from(Object.values(this.getAllColors() || {})).map((color) =>
      color ? color[5] : '#000'
    );
  }

  getAllColorKeysArray() {
    return Array.from(Object.keys(this.getAllColors()));
  }

  setPrimaryShade = (value: number | { light: number; dark: number }) => {
    if (typeof value === 'object') {
      this.schemeDependentPrimaryShade = true;
      this.theme.primaryShade = {
        light:
          typeof value === 'object'
            ? (value.light as MantineColorShade)
            : (value as MantineColorShade),
        dark:
          typeof value === 'object'
            ? (value.dark as MantineColorShade)
            : (value as MantineColorShade),
      };
    } else {
      this.schemeDependentPrimaryShade = false;
      this.theme.primaryShade = value as MantineColorShade;
    }
    this.commitChanges();
  };

  getPrimaryShade(scheme?: 'light' | 'dark') {
    if (this.theme.primaryShade && typeof this.theme.primaryShade === 'object' && scheme) {
      return this.theme.primaryShade[scheme] ? this.theme.primaryShade[scheme] : 5;
    } else {
      return this.theme.primaryShade as number;
    }
  }

  getDefaultRadius() {
    return this.theme.defaultRadius ? this.theme.defaultRadius : this.defaultTheme.defaultRadius;
  }

  setDefaultRadius(value: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
    this.theme.defaultRadius = value;
    this.commitChanges();
  }

  private frameValue(value: string): string {
    return `calc(${value} * var(--mantine-scale))`;
  }

  private unframeValue(value: string): string {
    return value.replace(/calc\((.*?) \* var\(--mantine-scale\)\)/, '$1');
  }

  getRadius(key: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
    const value = this.theme.radius ? this.theme.radius[key] : this.defaultTheme.radius[key];
    return value ? this.unframeValue(value) : value;
  }

  setRadius(key: 'xs' | 'sm' | 'md' | 'lg' | 'xl', value: string) {
    const framedValue = this.frameValue(value);
    this.theme.radius 
      ? (this.theme.radius[key] = framedValue) 
      : (this.theme.radius = { [key]: framedValue });
    this.commitChanges();
  }

  getSpacing(key: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
    const value = this.theme.spacing ? this.theme.spacing[key] : this.defaultTheme.spacing[key];
    return value ? this.unframeValue(value) : value;
  }

  setSpacing(key: 'xs' | 'sm' | 'md' | 'lg' | 'xl', value: string) {
    const framedValue = this.frameValue(value);
    this.theme.spacing 
      ? (this.theme.spacing[key] = framedValue) 
      : (this.theme.spacing = { [key]: framedValue });
    this.commitChanges();
  }

  getWhite() {
    return this.theme.white ? this.theme.white : this.defaultTheme.white;
  }

  setWhite(value: string) {
    this.theme.white = value;
    this.commitChanges();
  }

  getBlack() {
    return this.theme.black ? this.theme.black : this.defaultTheme.black;
  }

  setBlack(value: string) {
    this.theme.black = value;
    this.commitChanges();
  }

  getAutoContrast() {
    return this.theme.autoContrast ? this.theme.autoContrast : this.defaultTheme.autoContrast;
  }

  setAutoContrast(value: boolean) {
    this.theme.autoContrast = value;
    this.commitChanges();
  }

  getLuminanceThreshold() {
    return this.theme.luminanceThreshold
      ? this.theme.luminanceThreshold
      : this.defaultTheme.luminanceThreshold;
  }

  setLuminanceThreshold(value: number) {
    this.theme.luminanceThreshold = value;
    this.commitChanges();
  }

  getHeadingFontFamily() {
    return this.theme.headings?.fontFamily
      ? this.theme.headings.fontFamily
      : this.defaultTheme.headings?.fontFamily;
  }

  setHeadingFontFamily(value: string) {
    this.theme.headings 
      ? (this.theme.headings.fontFamily = value) 
      : (this.theme.headings = { fontFamily: value });
    this.commitChanges();
  }

  getHeadingDefaultWeight() {
    return this.theme.headings?.fontWeight
      ? this.theme.headings.fontWeight
      : this.defaultTheme.headings?.fontWeight;
  }

  setHeadingDefaultWeight(value: string) {
    this.theme.headings 
      ? (this.theme.headings.fontWeight = value) 
      : (this.theme.headings = { fontWeight: value });
    this.commitChanges();
  }

  getHeadingSize(key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') {
    return this.theme.headings?.sizes
      ? this.unframeValue(this.theme.headings.sizes[key]?.fontSize as string)
      : this.unframeValue(this.defaultTheme.headings?.sizes[key].fontSize as unknown as string);
  }

  setHeadingSize(key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', value: string) {
    const framedValue = this.frameValue(value);
    this.theme.headings
      ? (this.theme.headings.sizes ? (this.theme.headings.sizes[key] = { ...this.theme.headings.sizes[key], fontSize: framedValue }) : this.theme.headings.sizes = { [key]: { fontSize: framedValue } })
      : (this.theme.headings = { sizes: { [key]: {fontSize: framedValue} } });
    this.commitChanges();
  }

  getHeadingLineHeight(key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') {
    return this.theme.headings?.sizes
      ? this.unframeValue(this.theme.headings.sizes[key]?.lineHeight as string)
      : this.unframeValue(this.defaultTheme.headings?.sizes[key].lineHeight as string);
  }

  setHeadingLineHeight(key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', value: string) {
    this.theme.headings
      ? (this.theme.headings.sizes ? (this.theme.headings.sizes[key] = { ...this.theme.headings.sizes[key], lineHeight: value }) : this.theme.headings.sizes = { [key]: { lineHeight: value } })
      : (this.theme.headings = { sizes: { [key]: { lineHeight: value } } });
    this.commitChanges();
  }

  getHeadingWeight(key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') {
    return this.theme.headings?.sizes
      ? this.theme.headings.sizes[key]?.fontWeight
      : this.defaultTheme.headings?.sizes[key].fontWeight? this.defaultTheme.headings.sizes[key].fontWeight : this.theme.headings?.fontWeight ? this.theme.headings.fontWeight : this.defaultTheme.headings?.fontWeight;
  }

  setHeadingWeight(key: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', value: string) {
    this.theme.headings
      ? (this.theme.headings.sizes ? (this.theme.headings.sizes[key] = { ...this.theme.headings.sizes[key], fontWeight: value }) : this.theme.headings.sizes = { [key]: { fontWeight: value } })
      : (this.theme.headings = { sizes: { [key]: { fontWeight: value } } });
    this.commitChanges();
  }

  getBodyFontFamily() {
    return this.theme.fontFamily
      ? this.theme.fontFamily
      : this.defaultTheme?.fontFamily;
  }

  setBodyFontFamily(value: string) {
    this.theme.fontFamily = value;
    this.commitChanges();
  }

  getMonospaceFontFamily() {
    return this.theme.fontFamilyMonospace
      ? this.theme.fontFamilyMonospace
      : this.defaultTheme.fontFamilyMonospace;
  }

  setMonospaceFontFamily(value: string) {
    this.theme.fontFamilyMonospace = value;
    this.commitChanges();
  }

  getFontSmoothing() {
    return this.theme.fontSmoothing ? this.theme.fontSmoothing : this.defaultTheme.fontSmoothing;
  }

  setFontSmoothing(value: boolean) {
    this.theme.fontSmoothing = value;
    this.commitChanges();
  }

  getFocusRing() {
    return this.theme.focusRing ? this.theme.focusRing : this.defaultTheme.focusRing;
  }

  setFocusRing(value: "always" | "auto" | "never") {
    this.theme.focusRing = value;
    this.commitChanges();
  }

  getCursorType() {
    return this.theme.cursorType ? this.theme.cursorType : this.defaultTheme.cursorType;
  }

  setCursorType(value: "default" | "pointer") {
    this.theme.cursorType = value;
    this.commitChanges();
  }

  getRespectReducedMotion() {
    return this.theme.respectReducedMotion
      ? this.theme.respectReducedMotion
      : this.defaultTheme.respectReducedMotion;
  }

  setRespectReducedMotion(value: boolean) {
    this.theme.respectReducedMotion = value;
    this.commitChanges();
  }

}

export default ThemeManager;