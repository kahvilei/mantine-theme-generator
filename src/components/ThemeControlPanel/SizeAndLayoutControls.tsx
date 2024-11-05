import React from 'react';
import {
  DEFAULT_THEME,
  MantineThemeOverride,
  NumberInput,
  SegmentedControl,
  Slider,
  Stack,
  Switch,
  Text,
} from '@mantine/core';

interface SizeAndLayoutControlsProps {
  theme: MantineThemeOverride;
  updateTheme: (theme: Partial<MantineThemeOverride>) => void;
}

const SizeAndLayoutControls: React.FC<SizeAndLayoutControlsProps> = ({ theme, updateTheme }) => {
  const currentTheme = DEFAULT_THEME;

  return (
    <Stack mt="md">
      <Stack>
        <Text size="sm">Scale</Text>
        <Slider
          min={0.1}
          max={2}
          step={0.1}
          value={theme.scale}
          onChange={(value) => updateTheme({ scale: value })}
          marks={[
            { value: 0.5, label: '0.5x' },
            { value: 1, label: '1x' },
            { value: 1.5, label: '1.5x' },
            { value: 2, label: '2x' },
          ]}
          label={(value) => `${value}x`}
        />
      </Stack>

      <Text size="sm">Default Radius</Text>
      <SegmentedControl
        data={[
          { label: 'xs', value: '2' },
          { label: 'sm', value: '4' },
          { label: 'md', value: '8' },
          { label: 'lg', value: '12' },
          { label: 'xl', value: '16' }
        ]}
        value={
          typeof theme.defaultRadius === 'number' 
            ? theme.defaultRadius.toString()
            : currentTheme.defaultRadius?.toString() || '8'
        }
        onChange={(value) => updateTheme({ defaultRadius: parseInt(value) })}
      />

    </Stack>
  );
};

export default SizeAndLayoutControls;
