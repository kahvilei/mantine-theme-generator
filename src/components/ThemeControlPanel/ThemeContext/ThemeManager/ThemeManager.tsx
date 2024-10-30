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
  //state function will be react hook
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

  updateColor(oldName: string, newName: string, value?: MantineColorsTuple) {
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
      : (this.theme.defaultGradient = { from: this.getGradientFrom(), to: this.getGradientTo(), deg: value });
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
}

export default ThemeManager;
