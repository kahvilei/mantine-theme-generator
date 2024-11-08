import { root } from "postcss";

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
  
  // Component-specific default props
  export const COMPONENT_DEFAULT_PROPS = {
    Button: {
      props : {
        color: 'color',
        size: ['xs', 'sm', 'md', 'lg', 'xl'],
        radius: ['xs', 'sm', 'md', 'lg', 'xl'],
        padding: ['xs', 'sm', 'md', 'lg', 'xl'],
        variant: ['filled', 'light', 'outline', 'subtle', 'default', 'gradient'],
        disabled: 'boolean',
        fullWidth: 'boolean',
        compact: 'boolean',
        loading: 'boolean',
        loaderPosition: ['left', 'right', 'center'],
        },
      styleApi: ['root', 'label', 'inner', 'section', 'loader'],
    },
    
    ActionIcon: {
      props: {
        color: 'color',
        size: 'dimension',
        radius: 'dimension',
        padding: 'dimension',
        variant: ['filled', 'light', 'outline', 'subtle', 'default', 'gradient'],
        disabled: 'boolean',
        fullWidth: 'boolean',
      },
      styleApi: ['root', 'label', 'inner', 'section', 'loader'],
    },
    
    Card: {
      padding: ['xs', 'sm', 'md', 'lg', 'xl'],
      radius: ['xs', 'sm', 'md', 'lg', 'xl'],
      withBorder: 'boolean',
      shadow: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    
    Badge: {
      gradient: {
        from: 'color',
        to: 'color',
        deg: 'number',
      },
    },
    
    Input: {
      placeholder: 'string',
      icon: 'boolean',
    },
    
    Paper: {
      padding: ['xs', 'sm', 'md', 'lg', 'xl'],
      radius: ['xs', 'sm', 'md', 'lg', 'xl'],
      withBorder: 'boolean',
      shadow: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    
    Avatar: {
      size: ['xs', 'sm', 'md', 'lg', 'xl'],
      radius: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
      color: 'color',
    },
  
    Tooltip: {
      position: ['top', 'right', 'bottom', 'left'],
      withArrow: 'boolean',
      arrowSize: 'number',
      color: 'color',
      radius: ['xs', 'sm', 'md', 'lg', 'xl'],
    },

    Text: {
      size: ['xs', 'sm', 'md', 'lg', 'xl'],
      weight: ['400', '500', '600', '700', '800'],
      transform: ['uppercase', 'lowercase', 'capitalize', 'none'],
    },

    Stack: {
      direction: ['row', 'column'],
      align: ['start', 'center', 'end', 'stretch', 'baseline'],
      justify: ['start', 'center', 'end', 'space-between', 'space-around'],
      gap: 'dimension',
    },

    Group: {
      direction: ['row', 'column'],
      align: ['start', 'center', 'end', 'stretch', 'baseline'],
      justify: ['start', 'center', 'end', 'space-between', 'space-around'],
      gap: 'dimension',
    },

    Container: {
      size: ['xs', 'sm', 'md', 'lg', 'xl'],
    },

    Grid: {
      columns: 'number',
      spacing: 'dimension',
    },

    Flex: {
      direction: ['row', 'column'],
      align: ['start', 'center', 'end', 'stretch', 'baseline'],
      justify: ['start', 'center', 'end', 'space-between', 'space-around'],
    },

    Space: {
      size: 'dimension',
    },

    Title: {
      order: ['1', '2', '3', '4', '5', '6'],
    },

    
  } as const;

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

  
export const MANTINE_COMPONENTS = [
  // Layout
  'AppShell',
  'Center',
  'Container',
  'Flex',
  'Grid',
  'Group',
  'Paper',
  'SimpleGrid',
  'Space',
  'Stack',

  // Buttons & Inputs
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
  'TransferList',

  // Navigation
  'Anchor',
  'Breadcrumbs',
  'Burger',
  'NavLink',
  'Pagination',
  'Stepper',
  'Tabs',

  // Data Display
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
  'Title',

  // Overlay
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
  'Tooltip',

  // Feedback
  'Alert',
  'Notification',

  // Miscellaneous
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
  'UnstyledButton',

  // Data Tables
  'DataTable',

  // Dropzone
  'Dropzone',

  // Color Swatches
  'ColorSwatch',
  'ThemeIcon',
] as const;

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
  export const getPropInputType = (propDef: unknown): 'select' | 'color' | 'number' | 'text' | 'boolean' => {
    if (Array.isArray(propDef)) return 'select';
    if (propDef === 'color') return 'color';
    if (propDef === 'number') return 'number';
    if (propDef === 'boolean') return 'boolean';
    if (propDef === 'dimension') return 'text'; // Could be made into a specialized input
    return 'text';
  };
  
  export const getAvailablePropsForComponent = (componentName: keyof typeof COMPONENT_DEFAULT_PROPS) => {
    return COMPONENT_DEFAULT_PROPS[componentName] || {};
  };

  export const getAvailableStyleProps = () => {
    return COMMON_STYLE_PROPS;
  }
  
  export const getStyleSelectorOptions = () => {
    return ['root', 'label', 'input', 'description', 'error', 'icon', 'inner'];
  };

  export const getMantineComponentProps = (componentName: string) => {
    return COMPONENT_DEFAULT_PROPS[componentName as keyof typeof COMPONENT_DEFAULT_PROPS];
  };