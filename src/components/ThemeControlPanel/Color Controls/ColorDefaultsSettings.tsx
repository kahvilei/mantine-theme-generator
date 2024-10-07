import React from 'react';
import {
  Card,
  ColorInput,
  ColorSwatch,
  DEFAULT_THEME,
  Group,
  MantineThemeOverride,
  Select,
  SelectProps,
  Stack,
  Text,
  Title,
} from '@mantine/core';

interface ColorDefaultsProps {
  theme: MantineThemeOverride;
  updateTheme: (theme: Partial<MantineThemeOverride>) => void;
  colorKeyColors: { [key: string]: string };
}

const ColorDefaults: React.FC<ColorDefaultsProps> = ({ theme, updateTheme, colorKeyColors }) => {
  const currentTheme = DEFAULT_THEME;

  const renderColorSelect: SelectProps['renderOption'] = ({ option, checked }) => (
    <Group>
      <ColorSwatch color={colorKeyColors[option.value]} size={'20px'} />
      <Text>{option.value}</Text>
    </Group>
  );

  return (
    <Card withBorder padding="lg">
      <Stack mt="md">
        <Title order={4}>Color Defaults</Title>
        <Group grow>
          <Select
            label="Default Gradient From"
            data={Object.keys(theme.colors || currentTheme.colors)}
            value={
              theme.defaultGradient?.from || Object.keys(theme.colors || currentTheme.colors)[0]
            }
            onChange={(color) =>
              updateTheme({
                defaultGradient: {
                  ...theme.defaultGradient,
                  from: color?.toString() || 'blue',
                },
              })
            }
            renderOption={renderColorSelect}
            leftSection={
              <ColorSwatch
                color={colorKeyColors[theme.defaultGradient?.from as string] || '#000'}
                size={20}
              />
            }
          />
          <Select
            label="Default Gradient To"
            data={Object.keys(theme.colors || currentTheme.colors)}
            value={theme.defaultGradient?.to || Object.keys(theme.colors || currentTheme.colors)[0]}
            onChange={(color) =>
              updateTheme({
                defaultGradient: {
                  ...theme.defaultGradient,
                  to: color?.toString() || 'blue',
                },
              })
            }
            renderOption={renderColorSelect}
            leftSection={
              <ColorSwatch
                color={colorKeyColors[theme.defaultGradient?.to as string] || '#000'}
                size={20}
              />
            }
          />
        </Group>
        <div
          style={{
            width: '100%',
            height: '50px',
            background: `linear-gradient(to right, ${colorKeyColors[theme.defaultGradient?.from as string]}, ${colorKeyColors[theme.defaultGradient?.to as string]})`,
            borderRadius: currentTheme.defaultRadius,
          }}
        />
        <ColorInput
          label="White"
          value={theme.white || '#ffffff'}
          onChange={(color) => updateTheme({ white: color })}
        />
        <ColorInput
          label="Black"
          value={theme.black || '#000000'}
          onChange={(color) => updateTheme({ black: color })}
        />
      </Stack>
    </Card>
  );
};

export default ColorDefaults;
