import React, { useEffect } from 'react';
import {
  Box,
  DEFAULT_THEME,
  MantineThemeOverride,
  Stack,
  Tabs
} from '@mantine/core';
import ColorControl from './ColorControls/ColorControl';
import GeneralControls from './GeneralControls';
import TypographyControl from './TypographyControls';
import ThemeManager from './ThemeContext/ThemeManager/ThemeManager';
import ThemeContext from './ThemeContext/ThemeContext';

interface ThemeControlPanelProps {
  theme: MantineThemeOverride;
  updateTheme: (theme: Partial<MantineThemeOverride>) => void;
}

const ThemeControlPanel: React.FC<ThemeControlPanelProps> = ({ theme, updateTheme }) => {
  const defTheme = DEFAULT_THEME;
  const themeManager = new ThemeManager(theme, updateTheme);

  //this runs once in the case we do not have any theme set
  useEffect(() => {
    //if theme is empty, set it to default theme
    if (Object.keys(theme).length === 0) {
      updateTheme(defTheme);
    }

  }, []);

  return (
    <Box id="control-panel" p={'md'}>
      <ThemeContext.Provider value={themeManager}>
      <Stack>
        <Tabs defaultValue="color">
          <Tabs.List>
            <Tabs.Tab value="color">Color</Tabs.Tab>
            <Tabs.Tab value="typography">Typography</Tabs.Tab>
            <Tabs.Tab value="general">General</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="color">
            <ColorControl />
          </Tabs.Panel>
          <Tabs.Panel value="typography">
            <TypographyControl theme={theme} updateTheme={updateTheme} />
          </Tabs.Panel>
          <Tabs.Panel value="general">
            <GeneralControls theme={theme} updateTheme={updateTheme} />
          </Tabs.Panel>
        </Tabs>
      </Stack>
      </ThemeContext.Provider>
    </Box>
  );
};

export default ThemeControlPanel;
