import React from 'react';
import { Stack, Text, SegmentedControl, Slider, NumberInput, Group } from '@mantine/core';
import { MantineThemeOverride, DEFAULT_THEME } from '@mantine/core';
import RadiusControls from './RadiusControls';
import SpacingControls from './SpacingControls';

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
      <RadiusControls />
      <SpacingControls />
    </Stack>
  );
};

export default SizeAndLayoutControls;