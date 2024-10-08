import React, { useState } from 'react';
import { MantineThemeOverride, Stack, DEFAULT_THEME, MantineColorsTuple } from '@mantine/core';
import ColorDefaults from './ColorDefaultsSettings';
import ColorPalette from './ColorPalette';
import PrimaryColorSettings from './PrimaryColorSettings';

interface ColorPanelProps {
  theme: MantineThemeOverride;
  updateTheme: (theme: Partial<MantineThemeOverride>) => void;
}

const ColorPanel: React.FC<ColorPanelProps> = ({ theme, updateTheme }) => {
  const [colorKeyColors, setColorKeyColors] = useState<{ [key: string]: string }>({});
  const [mantineDefaultColorNames, setMantineDefaultColorNames] = useState<{ [key: string]: string }>({});

  for (let color in DEFAULT_THEME.colors) {
    mantineDefaultColorNames[color] = color;
  }

  // Initialize colorKeyColors
  for (let color in theme.colors) {
    colorKeyColors[color] = theme.colors[color] ? theme.colors[color][5] : '#000';
  }

  return (
    <Stack mt="md">
      <PrimaryColorSettings
        theme={theme}
        updateTheme={updateTheme}
        colorKeyColors={colorKeyColors}
      />
      <ColorPalette
        theme={theme}
        updateTheme={updateTheme}
        colorKeyColors={colorKeyColors}
        setColorKeyColors={setColorKeyColors}
      />
      <ColorDefaults theme={theme} updateTheme={updateTheme} colorKeyColors={colorKeyColors} />
    </Stack>
  );
};

export default ColorPanel;