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

interface GeneralControlsProps {
  theme: MantineThemeOverride;
  updateTheme: (theme: Partial<MantineThemeOverride>) => void;
}

const GeneralControls: React.FC<GeneralControlsProps> = ({ theme, updateTheme }) => {
  const currentTheme = DEFAULT_THEME;

  return (
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
  );
};

export default GeneralControls;
