import { RemoraidStore } from '@/data/Store';
import { frameValue, unFrameValue } from '@/utils/frameValues';
import {DEFAULT_THEME} from "@mantine/core";

/**
 * Configuration for a theme component proxy
 */
interface ProxyConfig<T> {
  // Properties that need framing when set
  framingProps?: Array<keyof T | string>;

  // Methods whose return values need unframing
  unframingMethods?: Array<keyof T | string>;

  // Custom framing function (defaults to frameValue)
  frameFunction?: (value: any) => any;

  // Custom unframing function (defaults to unFrameValue)
  unframeFunction?: (value: any) => any;
}

/**
 * Creates a type-safe proxy for theme components with customizable framing/unframing
 */
export function createThemeComponentProxy<T extends object>(
  store: RemoraidStore,
  componentGetter: (store: RemoraidStore) => T,
  config: ProxyConfig<T> = {}
): T {
  // Default config
  const {
    framingProps = [],
    unframingMethods = [],
    frameFunction = frameValue,
    unframeFunction = unFrameValue,
  } = config;

  // Convert arrays to sets for faster lookups
  const framingPropsSet = new Set(framingProps);
  const unframingPropsSet = new Set(framingProps);
  const unframingMethodsSet = new Set(unframingMethods);

  return new Proxy({} as T, {
    get: (_, prop: string | symbol) => {
      // Skip Symbol properties
      if (typeof prop !== 'string') {
        return undefined;
      }

      const component = componentGetter(store);
      if (!component || !(prop in component)) {
        return undefined;
      }

      const value = component[prop as keyof T];

      // Handle methods with return values that need unframing
      if (typeof value === 'function' && unframingMethodsSet.has(prop as keyof T | string)) {
        return function (...args: any[]) {
          // Call the original method
          const result = value.apply(component, args);

          // Unframe the result if it's a string
          if (typeof result === 'string') {
            return unframeFunction(result);
          }

          return result;
        };
      }

      // Handle normal methods by binding them to the component
      if (typeof value === 'function') {
        return value.bind(component);
      }

      // Handle properties that need unframing
      if (typeof value === 'string' && unframingPropsSet.has(prop as keyof T | string)) {
        return unframeFunction(value);
      }

      // Return raw value for other properties
      return value;
    },

    set: (_, prop: string | symbol, newValue: any): boolean => {
      // Skip Symbol properties
      if (typeof prop !== 'string') {return false;}

      const component = componentGetter(store);
      if (!component || !(prop in component)) {
        console.warn(`Attempted to set invalid property "${String(prop)}" on component`);
        return false;
      }

      // Handle properties that need framing
      if (typeof newValue === 'string' && framingPropsSet.has(prop as keyof T | string)) {
        (component as any)[prop] = frameFunction(newValue);
      } else {
        // Set raw value for other properties
        (component as any)[prop] = newValue;
      }

      return true;
    },
  });
}
