import { ActionIcon } from "@mantine/core";
import { root } from "postcss";
import componentProps from '@/data/mantineProps.json'

export type ComponentProps = typeof componentProps;

// Shared style properties that apply to all components
export const COMMON_STYLE_PROPS = {
    // Layout
    display: ['none', 'block', 'inline', 'flex', 'grid', 'inline-block'],
    position: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
    width: 'dimension',
    height: 'dimension',
    margin: 'dimension',
    padding: 'dimension',
    
    // Typography
    color: 'color',
    fontSize: 'dimension',
    fontWeight: ['400', '500', '600', '700', '800'],
    lineHeight: 'dimension',
    textAlign: ['left', 'center', 'right', 'justify'],
    letterSpacing: 'dimension',
    
    // Flexbox
    alignItems: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
    justifyContent: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'],
    gap: 'dimension',
    
    // Backgrounds & Borders
    backgroundColor: 'color',
    borderRadius: 'dimension',
    border: 'dimension',
    boxShadow: 'string',
    
    // Transitions
    transition: 'string',
    transform: 'string',
  } as const;

  ActionIcon
  
  // Component-specific default props
  
  // Categorized components for UI organization
  export const CATEGORIZED_COMPONENTS = {
    layout: [
      'AppShell',
      'Center',
      'Container',
      'Flex',
      'Grid',
      'Group',
      'Paper',
      'SimpleGrid',
      'Space',
      'Stack'
    ],
    inputs: [
      'ActionIcon',
      'Autocomplete',
      'Button',
      'Checkbox',
      'ChipGroup',
      'Chip',
      'ColorInput',
      'ColorPicker',
      'FileInput',
      'Input',
      'JsonInput',
      'MultiSelect',
      'NativeSelect',
      'NumberInput',
      'PasswordInput',
      'PinInput',
      'Radio',
      'Rating',
      'SegmentedControl',
      'Select',
      'Slider',
      'Switch',
      'Textarea',
      'TextInput',
      'TransferList'
    ],
    navigation: [
      'Anchor',
      'Breadcrumbs',
      'Burger',
      'NavLink',
      'Pagination',
      'Stepper',
      'Tabs'
    ],
    dataDisplay: [
      'Accordion',
      'Avatar',
      'Badge',
      'Card',
      'Carousel',
      'Code',
      'Image',
      'Indicator',
      'Kbd',
      'List',
      'Loader',
      'Mark',
      'Highlight',
      'Progress',
      'RingProgress',
      'Skeleton',
      'Spoiler',
      'Table',
      'Text',
      'Timeline',
      'Title'
    ],
    overlay: [
      'Affix',
      'Dialog',
      'Drawer',
      'HoverCard',
      'LoadingOverlay',
      'Menu',
      'Modal',
      'Overlay',
      'Popover',
      'Portal',
      'Tooltip'
    ],
    feedback: ['Alert', 'Notification'],
    miscellaneous: [
      'BackgroundImage',
      'Box',
      'CloseButton',
      'Collapse',
      'Divider',
      'FocusTrap',
      'MediaQuery',
      'ScrollArea',
      'Transition',
      'TypographyStylesProvider',
      'Blockquote',
      'UnstyledButton'
    ],
    dataHandling: ['DataTable', 'Dropzone'],
    visual: ['ColorSwatch', 'ThemeIcon']
  } as const;

  //common css selectors
    export const COMMON_CSS_SELECTORS = {
        root: 'root',
        label: 'label',
        input: 'input',
        description: 'description',
        error: 'error',
        icon: 'icon',
        inner: 'inner',
    } as const;
  
  // Helper type to handle the prop value types
  export type PropValue = string | number | boolean;
  
  // Helper functions to handle prop values based on their definition
  export const getPropInputType = (propDef: unknown): 'select' | 'color' | 'number' | 'text' | 'boolean' | 'dimension' => {
    if (Array.isArray(propDef)) return 'select';
    if (propDef === 'color') return 'color';
    if (propDef === 'number') return 'number';
    if (propDef === 'boolean') return 'boolean';
    if (propDef === 'dimension') return 'dimension';
    return 'text';
  }

  export const getAvailablePropsForComponent = (componentName: keyof ComponentProps) => {
    return componentProps[componentName].props || {};
  };

  export const getAvailableStyleProps = () => {
    return COMMON_STYLE_PROPS;
  }
  
  export const getStyleSelectorOptions = (componentName: keyof ComponentProps) => {
    return componentProps[componentName].styleApi || [];
  };

  export const getMantineComponentProps = (componentName: keyof ComponentProps) => {
    return componentProps[componentName] || {};
  };