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
  Button,
  TextInput,
  ActionIcon,
  ColorPicker,
  Box,
  Tabs,
  FileInput,
  DEFAULT_THEME
} from '@mantine/core';
import { IconTrash, IconDownload, IconUpload } from '@tabler/icons-react';
import generateShades from '../../utils/generateColors';

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

const ThemeControlPanel: React.FC<ThemeControlPanelProps> = ({ theme, updateTheme }) => {
  const currentTheme = useMantineTheme();

  if (Object.keys(theme).length === 0) {
    theme = DEFAULT_THEME;
  }

  const [newColorName, setNewColorName] = useState('');
  const [newColorValue, setNewColorValue] = useState('#000000');
  const [colorKeyColors, setColorKeyColors] = useState<{ [key: string]: string }>({});
  const [useVariableColorShades, setUseVariableColorShades] = useState<boolean>(
    typeof theme.primaryShade === 'object'
  );

  for (let color in theme.colors) {
    colorKeyColors[color] = theme.colors[color] ? theme.colors[color][5] : '#000';
  }

  const addNewColor = () => {
    if (newColorName && newColorValue) {
      updateTheme({
        colors: {
          ...theme.colors,
          [newColorName]: generateShades(newColorValue),
        },
      });
      setColorKeyColors({ ...colorKeyColors, [newColorName]: newColorValue });
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
    for (let color in theme.colors) {
      colorKeyColors[color] = theme.colors[color] ? theme.colors[color][5] : newBaseColor;
    }
  };

  const deleteColor = (colorName: string) => {
    const updatedColors = { ...theme.colors };
    delete updatedColors[colorName];
    updateTheme({ colors: updatedColors });
    if (theme.primaryColor === colorName) {
      updateTheme({ primaryColor: Object.keys(updatedColors)[0] });
    }
  };

  const downloadTheme = (theme: MantineThemeOverride) => {
    const themeString = JSON.stringify(theme, null, 2);
    const blob = new Blob([themeString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mantine-theme.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  const uploadTheme = (payload: File | null) => {
    const file = payload;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const theme = JSON.parse(e.target?.result as string);
        updateTheme(theme);
      };
      reader.readAsText(file);
    }
  };

  const handlePrimaryShadeChange = (value: number | { light: number; dark: number }) => {
    if (useVariableColorShades) {
      updateTheme({
        primaryShade: {
          light: typeof value === 'object' ? value.light as MantineColorShade : value as MantineColorShade,
          dark: typeof value === 'object' ? value.dark as MantineColorShade : value as MantineColorShade,
        },
      });
    } else {
      updateTheme({ primaryShade: value as MantineColorShade });
    }
  };

  return (
    <Box id="control-panel" style={{ width: '500px', maxHeight: '100vh', height: '100vh', overflowY: 'auto', borderRight: '1px solid grey' }}>
      <Stack gap="md" p="md">
        <Group justify="space-between">
          <Text size="xl">Mantine Theme Editor</Text>
          <Group align="right">
            <ActionIcon color={"red"} onClick={() => updateTheme(currentTheme)}>
              <IconTrash size="1.5rem" />
            </ActionIcon>
            <ActionIcon color={"green"} onClick={() => downloadTheme(theme)}>
              <IconDownload size="1.5rem" />
            </ActionIcon>
            <ActionIcon onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}>
              <IconUpload size="1.5rem" />
            </ActionIcon>
            <FileInput onChange={uploadTheme} accept=".json" style={{ display: 'none' }} />
          </Group>
        </Group>
        <Tabs defaultValue="color">
          <Tabs.List>
            <Tabs.Tab value="color">Color</Tabs.Tab>
            <Tabs.Tab value="typography">Typography</Tabs.Tab>
            <Tabs.Tab value="general">General</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="color">
            <Stack mt="md">
              <Select
                label="Primary Color"
                data={Object.keys(theme.colors || currentTheme.colors)}
                value={theme.primaryColor ? theme.primaryColor : Object.keys(theme.colors || currentTheme.colors)[0]}
                onChange={(value) => updateTheme({ primaryColor: value as string })}
              />

              <Switch
                label="Use variable color shades"
                checked={useVariableColorShades}
                onChange={(event) => {
                  setUseVariableColorShades(event.currentTarget.checked);
                  if (event.currentTarget.checked) {
                    handlePrimaryShadeChange({ light: 6, dark: 8 });
                  } else {
                    handlePrimaryShadeChange(6);
                  }
                }}
              />

              {useVariableColorShades ? (
                <>
                  <Text size="sm" mt="md">Light Mode Primary Shade</Text>
                  <Slider
                    min={0}
                    max={9}
                    step={1}
                    value={typeof theme.primaryShade === 'object' ? theme.primaryShade.light : 6}
                    onChange={(value) => handlePrimaryShadeChange({
                      light: value,
                      dark: typeof theme.primaryShade === 'object' ? theme.primaryShade.dark ? theme.primaryShade.dark : 8 : 8
                    })}
                  />
                  <Text size="sm" mt="md">Dark Mode Primary Shade</Text>
                  <Slider
                    min={0}
                    max={9}
                    step={1}
                    value={typeof theme.primaryShade === 'object' ? theme.primaryShade.dark : 8}
                    onChange={(value) => handlePrimaryShadeChange({
                      light: typeof theme.primaryShade === 'object' ? theme.primaryShade.light ? theme.primaryShade.light : 6 : 6,
                      dark: value
                    })}
                  />
                </>
              ) : (
                <>
                  <Text size="sm" mt="md">Primary Shade</Text>
                  <Slider
                    min={0}
                    max={9}
                    step={1}
                    value={typeof theme.primaryShade === 'number' ? theme.primaryShade : 6}
                    onChange={(value) => handlePrimaryShadeChange(value)}
                  />
                </>
              )}

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

              <Text size="sm" mt="md">Manage Colors</Text>
              {Object.entries(theme.colors || currentTheme.colors).map(([colorName, shades]) => (
                <Group key={colorName} mt="xs">
                  <ColorInput
                    value={shades ? shades[5] : '#000000'}
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

              <Text size="sm" mt="md">Default Gradient</Text>
              <Group grow>
                <ColorInput
                  format="rgba"
                  value={theme.defaultGradient?.from}
                  onChange={(color) => updateTheme({
                    defaultGradient: {
                      ...theme.defaultGradient,
                      from: color,
                    },
                  })}
                  swatches={Object.values(colorKeyColors)}
                />
                <ColorInput
                  format="rgba"
                  value={theme.defaultGradient?.to}
                  onChange={(color) => updateTheme({
                    defaultGradient: {
                      ...theme.defaultGradient,
                      to: color,
                    },
                  })}
                  swatches={Object.values(colorKeyColors)}
                />
              </Group>
              <div
                style={{
                  width: '100%',
                  height: '50px',
                  background: `linear-gradient(to right, ${theme.defaultGradient?.from}, ${theme.defaultGradient?.to})`,
                  borderRadius: currentTheme.defaultRadius,
                }}
              />
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="typography">
            <Stack mt="md">
              <Autocomplete
                label="Main Font Family"
                data={commonFonts}
                value={theme.fontFamily}
                onChange={(value) => updateTheme({ fontFamily: value })}
                placeholder="Select or type a font family"
              />

              <Autocomplete
                label="Heading Font Family"
                data={commonFonts}
                value={theme.headings?.fontFamily}
                onChange={(value) => updateTheme({ headings: { ...theme.headings, fontFamily: value } })}
                placeholder="Select or type a font family"
              />

              <Autocomplete
                label="Monospace Font Family"
                data={monospaceFonts}
                value={theme.fontFamilyMonospace}
                onChange={(value) => updateTheme({ fontFamilyMonospace: value })}
                placeholder="Select or type a monospace font family"
              />

              <Switch
                label="Font Smoothing"
                checked={theme.fontSmoothing}
                onChange={(event) => updateTheme({ fontSmoothing: event.currentTarget.checked })}
              />
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="general">
            <Stack mt="md">
              <Text size="sm">Focus Ring</Text>
              <SegmentedControl
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

            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Box>
  );
};

export default ThemeControlPanel;