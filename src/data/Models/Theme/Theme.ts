import { action, computed, makeAutoObservable, reaction, runInAction, toJS } from "mobx";
import { MantineThemeOverride } from "@mantine/core";
import { Colors, ColorSettings } from "@/data/Models/Theme/Colors/Colors";
import { Sizes, SpacingSettings } from "@/data/Models/Theme/SizeAndSpacing/Sizes";
import { Typography, TypographySettings } from "@/data/Models/Theme/Typography/Typography";
import { RemoraidStore, USER_THEME_PREFIX } from "@/data/Store";
import { Interaction, InteractionSettings } from "@/data/Models/Theme/Interaction/Interaction";
import { Accessibility, AccessibilitySettings } from "@/data/Models/Theme/Accessibility/Accessibility";
import { Components, ComponentSettings } from "@/data/Models/Theme/Components/Components";
import debounce from "lodash.debounce";
import { themeToTypeScript } from "@/utils/themeToTypeScript";

const SAVE_DEBOUNCE_MS = 1000;
const COMPILE_DEBOUNCE_MS = 100;

export type HeadingSize = {
  fontSize?: string;
  lineHeight?: string;
  fontWeight?: string;
};

export class Theme {
  config: ThemeStateInternals;
  typography: Typography;
  colors: Colors;
  sizes: Sizes;
  interaction: Interaction;
  accessibility: Accessibility;
  components: Components;

  name: string;
  edited = false;
  private store?: RemoraidStore;

  private _compiled: MantineThemeOverride = {};
  private _compiledWithVirtuals: MantineThemeOverride = {};

  private debouncedSave: () => void;
  private triggerCompile: () => void;
  private triggerCompileWithVirtuals: () => void;

  constructor(theme: MantineThemeOverride, name: string, store?: RemoraidStore) {
    this.config = theme as ThemeStateInternals;
    this.typography = new Typography(this.config);
    this.colors = new Colors(this.config);
    this.sizes = new Sizes(this.config);
    this.accessibility = new Accessibility(this.config);
    this.components = new Components(this.config);
    this.interaction = new Interaction(this.config);
    this.name = name;
    this.store = store;

    makeAutoObservable(this);

    // Debounced save to avoid too many localStorage writes
    this.debouncedSave = debounce(() => {
      localStorage.setItem(
        `${USER_THEME_PREFIX}${this.name}`,
            themeToTypeScript({...toJS(this._compiledWithVirtuals)})
        );
    }, SAVE_DEBOUNCE_MS);

    // Debounced compile
    this.triggerCompile = debounce(() => {
      runInAction(() => { this._compiled = this.compile(false); });
    }, COMPILE_DEBOUNCE_MS);

    this.triggerCompileWithVirtuals = debounce(() => {
      runInAction(() => { this._compiledWithVirtuals = this.compile(true); });
    }, COMPILE_DEBOUNCE_MS);

    // Initial compile
    this._compiled = this.compile(false);
    this._compiledWithVirtuals = this.compile(true);

    // Observe deep changes to theme sections and auto-save
    reaction(
      () => [
        toJS(this.colors),
        toJS(this.sizes),
        toJS(this.typography),
        toJS(this.interaction),
        toJS(this.accessibility),
        toJS(this.components)
      ],
      () => this.save()
    );
  }

  @computed
  get compiled(): MantineThemeOverride { 
    const theme = {...toJS(this._compiledWithVirtuals)}; // gotta return as a clone bc the mobx proxy gets funky in createTheme
    if (theme.colors){
      for (let [name, color] of Object.entries(theme.colors) ?? []) {
        if (typeof color === 'function') {
          theme.colors[name] = (color as Function)();
        }
      }
    }
    return theme;
  }

  @computed
  get compiledWithVirtuals(): MantineThemeOverride { return {...toJS(this._compiledWithVirtuals)} } // gotta return as a clone bc the mobx proxy gets funky

  @action
  reset() {
    this.store?.resetTheme(this.name);
  }

  makeActiveTheme() {
    this.store?.setActiveTheme(this);
  }

  save() {
    this.edited = true;
    this.debouncedSave();
    this.scheduleCompile();
  }

  scheduleCompile() {
    this.triggerCompile();
    this.triggerCompileWithVirtuals();
  }

  compile(keepFunctions = false): MantineThemeOverride {
    const compiled: MantineThemeOverride = {};
    const omit = ['colorMap'];

    const mapDeep = (source: any, target: any) => {
      if (!source || typeof source !== 'object') return;

      Object.entries(source).forEach(([key, value]) => {
        if (value == null || omit.includes(key)) return;

        if (typeof value === 'function') {
          target[key] = keepFunctions ? value : value();
        } else if (Array.isArray(value)) {
          target[key] = [...value];
        } else if (typeof value === 'object') {
            if (!target[key]) {
                target[key] = {};
            }
            mapDeep(value, target[key]);
        } else {
          target[key] = value;
        }
      });
    };

    mapDeep(this.colors, compiled);
    mapDeep(this.typography, compiled);
    mapDeep(this.sizes, compiled);
    mapDeep(this.accessibility, compiled);
    mapDeep(this.interaction, compiled);

    if (this.components.rules?.size) {
      compiled.components = {};
      for (const [name, cfg] of this.components.rules) {
        compiled.components[name] = {
          defaultProps: cfg.defaultProps ? { ...cfg.defaultProps } : undefined,
          styles: cfg.styles ? { ...cfg.styles } : undefined
        };
      }
    }

    return compiled;
  }
}

export type ThemeStateInternals =
  ColorSettings &
  SpacingSettings &
  TypographySettings &
  InteractionSettings &
  AccessibilitySettings &
  ComponentSettings;
