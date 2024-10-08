import React, { useEffect, useState } from 'react';
import {
  Card,
  ColorSwatch,
  DEFAULT_THEME,
  Group,
  MantineColorShade,
  MantineThemeOverride,
  NumberInput,
  Select,
  SelectProps,
  Stack,
  Switch,
  Text,
  Title,
} from '@mantine/core';
import generateShades from '../../../utils/generateColors';
import ColorManager from './ColorManager';

interface PrimaryColorSettingsProps {
  theme: MantineThemeOverride;
  updateTheme: (theme: Partial<MantineThemeOverride>) => void;
  colorKeyColors: { [key: string]: string };
}

export const ColorSelector: React.FC<{
  colors: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}> = ({ colors, selectedIndex, onSelect }) => {
  return (
    <Group gap={1} h={50} justify='stretch' align='stretch' wrap='nowrap' style={{ borderRadius: '5px', }}>
      {colors.map((color, index) => (
        <Stack
          key={index}
          bg={color}
          w={'100%'}
          align='center'
          justify='center'
          c={'white'}
          onClick={() => onSelect(index)}
          style={{
            cursor: 'pointer',
            border: index === selectedIndex ? '2px solid white' : '2px solid transparent',
            zIndex: index === selectedIndex ? 1 : 0,
            transform: index === selectedIndex ? 'scale(1.2)' : 'scale(1)',
            borderRadius: index === 0 ? 'var(--mantine-radius-default) 0 0 var(--mantine-radius-default)' : index === colors.length - 1 ? '0 var(--mantine-radius-default) var(--mantine-radius-default) 0' : '0',
          }}
        >
          {index === selectedIndex && (
            <Text>
              {index}
            </Text>
          )}
        </Stack>
      ))}
    </Group>
  );
};

const PrimaryColorSettings: React.FC<PrimaryColorSettingsProps> = ({
  theme,
  updateTheme,
  colorKeyColors,
}) => {
  const currentTheme = DEFAULT_THEME;
  const [useVariableColorShades, setUseVariableColorShades] = useState<boolean>(false);
  const [useAutoContrast, setAutoContrast] = useState<boolean>(theme.autoContrast as boolean);

  const colorManager = new ColorManager(theme);

  useEffect(() => {
    setAutoContrast(theme.autoContrast as boolean);
    let current = theme.primaryShade;
    setUseVariableColorShades((typeof theme.primaryShade === 'object') && (theme.primaryShade.light != undefined) && (theme.primaryShade.dark != undefined));
  }
    , [theme]);

  const handlePrimaryShadeChange = (value: number | { light: number; dark: number }) => {
    if (typeof value === 'object') {
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

  const renderColorSelect: SelectProps['renderOption'] = ({ option, checked }) => {
      return (
        <Group>
          <ColorSwatch color={colorManager.getMainColor(option.value)} size={'20px'} />
          <Text fw={700}>{option.value}</Text>
        </Group>
      );
  }

  const primaryColor = theme.primaryColor || Object.keys(theme.colors || currentTheme.colors)[0];
  const primaryShades = theme.colors?.[primaryColor] || generateShades('#000');

  return (
    <Card withBorder padding="lg">
      <Title order={4}>Primary Color Settings</Title>
      <Stack gap="xl" mt="md">
        <Select
          label="Primary Color"
          data={[
            { group: 'Custom Colors', items: Array.from(colorManager.getCustomColors().keys()) },
            { group: 'Mantine Colors', items: Array.from(colorManager.getMantineColors().keys()) }
          ]}
          value={primaryColor}
          onChange={(value) => updateTheme({ primaryColor: value as string })}
          renderOption={renderColorSelect}
          leftSection={
            <ColorSwatch
              color={colorKeyColors[primaryColor]}
              size={20}
            />
          }
        />
        <Stack>
          <Switch
            label="Use different shades for light and dark modes"
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
              <ColorSelector
                colors={primaryShades as string[]}
                selectedIndex={typeof theme.primaryShade === 'object' ? theme.primaryShade.light ? theme.primaryShade.light : 6 : 6}
                onSelect={(value) => handlePrimaryShadeChange({
                  light: value,
                  dark: typeof theme.primaryShade === 'object' ? theme.primaryShade.dark ? theme.primaryShade.dark : 6 : 8,
                })}
              />
              <Text size="sm" mt="md">Dark Mode Primary Shade</Text>
              <ColorSelector
                colors={primaryShades as string[]}
                selectedIndex={typeof theme.primaryShade === 'object' ? theme.primaryShade.dark ? theme.primaryShade.dark : 6 : 8}
                onSelect={(value) => handlePrimaryShadeChange({
                  light: typeof theme.primaryShade === 'object' ? theme.primaryShade.light ? theme.primaryShade.light : 6 : 6,
                  dark: value,
                })}
              />
            </>
          ) : (
            <>
              <Text size="sm" mt="md">Primary Shade</Text>
              <ColorSelector
                colors={primaryShades as string[]}
                selectedIndex={typeof theme.primaryShade === 'number' ? theme.primaryShade : 6}
                onSelect={(value) => handlePrimaryShadeChange(value)}
              />
            </>
          )}
        </Stack>

        <Stack>
          <Switch
            label="Auto Contrast"
            checked={theme.autoContrast}
            onChange={(event) => {
              updateTheme({ autoContrast: event.currentTarget.checked });
              setAutoContrast(event.currentTarget.checked);
            }}
          />

          {useAutoContrast && (
            <NumberInput
              label="Luminance Threshold"
              min={0}
              max={1}
              step={0.1}
              value={theme.luminanceThreshold}
              onChange={(value) =>
                updateTheme({ luminanceThreshold: typeof value === 'number' ? value : 0 })
              }
            />
          )}</Stack>
      </Stack>
    </Card>
  );
};

export default PrimaryColorSettings;