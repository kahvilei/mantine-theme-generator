import { ActionIcon } from "@mantine/core";
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
    backdropFilter: 'string',
    
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
      'AspectRatio',
      'Center',
      'Container',
      'Flex',
      'Grid',
      'Group',
      'SimpleGrid',
      'Space',
      'Stack'
    ],
    inputs: [
      'AngleSlider',
      'Checkbox',
      'Chip',
      'ColorInput',
      'ColorPicker',
      'Fieldset',
      'FileInput',
      'Input',
      'JsonInput',
      'NativeSelect',
      'NumberInput',
      'PasswordInput',
      'PinInput',
      'Radio',
      'Rating',
      'SegmentedControl',
      'Slider',
      'Switch',
      'Textarea',
      'TextInput'
    ],
    combobox: [
      'Autocomplete',
      'Combobox',
      'MultiSelect',
      'Pill',
      'PillsInput',
      'Select',
      'TagsInput'
    ],
    buttons: [
      'ActionIcon',
      'Button',
      'CloseButton',
      'CopyButton',
      'FileButton',
      'UnstyledButton'
    ],
    navigation: [
      'Anchor',
      'Breadcrumbs',
      'Burger',
      'NavLink',
      'Pagination',
      'Stepper',
      'Tabs',
      'Tree'
    ],
    feedback: [
      'Alert',
      'Loader',
      'Notification',
      'Progress',
      'RingProgress',
      'SemiCircleProgress',
      'Skeleton'
    ],
    overlays: [
      'Affix',
      'Dialog',
      'Drawer',
      'FloatingIndicator',
      'HoverCard',
      'LoadingOverlay',
      'Menu',
      'Modal',
      'Overlay',
      'Popover',
      'Tooltip'
    ],
    dataDisplay: [
      'Accordion',
      'Avatar',
      'BackgroundImage',
      'Badge',
      'Card',
      'ColorSwatch',
      'Image',
      'Indicator',
      'Kbd',
      'NumberFormatter',
      'Spoiler',
      'ThemeIcon',
      'Timeline'
    ],
    typography: [
      'Blockquote',
      'Code',
      'Highlight',
      'List',
      'Mark',
      'Table',
      'Text',
      'Title',
      'TypographyStylesProvider'
    ],
    misc: [
      'Box',
      'Collapse',
      'Divider',
      'FocusTrap',
      'Paper',
      'Portal',
      'ScrollArea',
      'Transition',
      'VisuallyHidden'
    ]
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