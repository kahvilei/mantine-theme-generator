import React, { useState } from 'react';
import {
  Stack,
  Switch,
  Select,
  Slider,
  Text,
  ColorInput,
  NumberInput,
  useMantineTheme,
  MantineThemeOverride,
  MantineColorShade,
  Group,
  SegmentedControl,
  Autocomplete,
  Accordion,
  Button,
  TextInput,
  ActionIcon,
  ColorPicker,
  Box,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

interface ThemeControlPanelProps {
  theme: MantineThemeOverride;
  updateTheme: (theme: Partial<MantineThemeOverride>) => void;
}

const commonFonts = [
  'Arial', 'Helvetica', 'Verdana', 'Tahoma', 'Trebuchet MS', 'Times New Roman', 'Georgia',
  'Garamond', 'Courier New', 'Brush Script MT', 'Roboto', 'Open Sans', 'Lato', 'Montserrat',
  'Raleway', 'Oswald', 'Ubuntu', 'Source Sans Pro',
];

const monospaceFonts = [
  'Consolas', 'Courier New', 'Lucida Console', 'Monaco', 'Menlo', 'DejaVu Sans Mono',
  'Bitstream Vera Sans Mono', 'Courier', 'Fira Code', 'Source Code Pro', 'Ubuntu Mono', 'JetBrains Mono',
];

// Function to generate color shades
const generateShades = (baseColor: string): string[] => {
  // This is a placeholder function. You should implement a proper shade generation algorithm here.
  // For now, we'll just return an array of the same color 10 times.

  return Array(10).fill(baseColor);
};

const ThemeControlPanel: React.FC<ThemeControlPanelProps> = ({ theme, updateTheme }) => {
  const currentTheme = useMantineTheme();

  //if theme is currently empty, set it to the current theme
  if (Object.keys(theme).length === 0) {
    updateTheme(currentTheme);
  }

  const [newColorName, setNewColorName] = useState('');
  const [newColorValue, setNewColorValue] = useState('#000000');

  const addNewColor = () => {
    if (newColorName && newColorValue) {
      updateTheme({
        colors: {
          ...theme.colors,
          [newColorName]: generateShades(newColorValue),
        },
      });
      setNewColorName('');
      setNewColorValue('#000000');
    }
  };

  const updateColor = (colorName: string, newBaseColor: string) => {
    updateTheme({
      colors: {
        ...theme.colors,
        [colorName]: generateShades(newBaseColor),
      },
    });
  };

  const deleteColor = (colorName: string) => {
    const updatedColors = { ...theme.colors };
    delete updatedColors[colorName];
    updateTheme({ colors: updatedColors });
    if (theme.primaryColor === colorName) {
      updateTheme({ primaryColor: Object.keys(updatedColors)[0] });
    }
  };

  return (
    <Box id="control-panel" style={{ width: '400px', maxHeight: '100vh', height: '100vh', overflowY: 'auto', borderRight: '1px solid grey'}}>
      <Stack gap="md" p="md">
        <Text size="xl">Theme Controls</Text>
        <Accordion>
          <Accordion.Item value="colors">
            <Accordion.Control>Color Palette</Accordion.Control>
            <Accordion.Panel>
              <Select
                label="Primary Color"
                data={Object.keys(theme.colors || currentTheme.colors)}
                value={theme.primaryColor}
                onChange={(value) => updateTheme({ primaryColor: value as string })}
              />

              <Text size="sm" mt="md">Manage Colors</Text>
              {Object.entries(theme.colors || currentTheme.colors).map(([colorName, shades]) => (
                <Group key={colorName} mt="xs">
                  <ColorInput
                    value={shades? shades[5]: '#000000'}
                    onChange={(color) => updateColor(colorName, color)}
                  />
                  <Text size="sm">{colorName}</Text>
                  <ActionIcon color="red" onClick={() => deleteColor(colorName)}>
                    <IconTrash size="1rem" />
                  </ActionIcon>
                </Group>
              ))}

              <Text size="sm" mt="md">Add New Color</Text>
              <Group align="flex-end">
                <TextInput
                  label="Color Name"
                  value={newColorName}
                  onChange={(event) => setNewColorName(event.currentTarget.value)}
                />
                <ColorInput
                  label="Color Value"
                  value={newColorValue}
                  onChange={setNewColorValue}
                />
                <Button onClick={addNewColor}>Add</Button>
              </Group>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="general">
            <Accordion.Control>General Settings</Accordion.Control>
            <Accordion.Panel>
              <Text size="sm">Primary Shade</Text>
              <Slider
                min={0}
                max={9}
                step={1}
                value={typeof theme.primaryShade === 'number' ? Number(theme.primaryShade) : Number(currentTheme.primaryShade)}
                onChange={(value) => updateTheme({ primaryShade: value as MantineColorShade })}
              />

              <Select
                label="Focus Ring"
                data={[
                  { value: 'auto', label: 'Auto' },
                  { value: 'always', label: 'Always' },
                  { value: 'never', label: 'Never' },
                ]}
                value={theme.focusRing}
                onChange={(value) => updateTheme({ focusRing: value as 'auto' | 'always' | 'never' })}
              />

              <NumberInput
                label="Scale"
                min={0.1}
                max={2}
                step={0.1}
                value={theme.scale}
                onChange={(value) => updateTheme({ scale: Number(value) })}
              />

              <Switch
                label="Font Smoothing"
                checked={theme.fontSmoothing}
                onChange={(event) => updateTheme({ fontSmoothing: event.currentTarget.checked })}
              />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="fonts">
            <Accordion.Control>Fonts</Accordion.Control>
            <Accordion.Panel>
              <Autocomplete
                label="Font Family"
                data={commonFonts}
                value={theme.fontFamily}
                onChange={(value) => updateTheme({ fontFamily: value })}
                placeholder="Select or type a font family"
              />

              <Autocomplete
                label="Monospace Font Family"
                data={monospaceFonts}
                value={theme.fontFamilyMonospace}
                onChange={(value) => updateTheme({ fontFamilyMonospace: value })}
                placeholder="Select or type a monospace font family"
              />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="other">
            <Accordion.Control>Other Settings</Accordion.Control>
            <Accordion.Panel>
              <Text size="sm">Default Radius</Text>
              <Slider
                min={0}
                max={20}
                step={1}
                value={typeof theme.defaultRadius === 'number' ? theme.defaultRadius as number : currentTheme.defaultRadius as number}
                onChange={(value) => updateTheme({ defaultRadius: value })}
              />

              <Switch
                label="Respect Reduced Motion"
                checked={theme.respectReducedMotion}
                onChange={(event) => updateTheme({ respectReducedMotion: event.currentTarget.checked })}
              />

              <Text size="sm">Cursor Type</Text>
              <SegmentedControl
                data={[
                  { label: 'Default', value: 'default' },
                  { label: 'Pointer', value: 'pointer' },
                ]}
                value={theme.cursorType}
                onChange={(value) => updateTheme({ cursorType: value as 'default' | 'pointer' })}
              />

              <Text size="sm">Default Gradient</Text>
              <Group grow>
                <ColorPicker
                  format="rgba"
                  value={theme.defaultGradient?.from}
                  onChange={(color) => updateTheme({
                    defaultGradient: {
                      ...theme.defaultGradient,
                      from: color,
                    },
                  })}
                />
                <ColorPicker
                  format="rgba"
                  value={theme.defaultGradient?.to}
                  onChange={(color) => updateTheme({
                    defaultGradient: {
                      ...theme.defaultGradient,
                      to: color,
                    },
                  })}
                />
              </Group>

              <NumberInput
                label="Luminance Threshold"
                min={0}
                max={1}
                step={0.1}
                value={theme.luminanceThreshold}
                onChange={(value) => updateTheme({ luminanceThreshold: typeof value === 'number' ? value : 0 })}
              />

              <Switch
                label="Auto Contrast"
                checked={theme.autoContrast}
                onChange={(event) => updateTheme({ autoContrast: event.currentTarget.checked })}
              />
            </Accordion.Panel>
          </Accordion.Item>

        </Accordion>
      </Stack>
    </Box>
  );
};

export default ThemeControlPanel;