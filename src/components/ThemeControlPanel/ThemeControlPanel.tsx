import React, { useEffect } from 'react';
import { ActionIcon, Box, DEFAULT_THEME, MantineThemeOverride, Stack, Tabs, Tooltip } from '@mantine/core';
import ColorControl from './ColorControls/ColorControl';
import GeneralControls from './GeneralControls';
import ThemeContext from './ThemeContext/ThemeContext';
import ThemeManager from './ThemeContext/ThemeManager/ThemeManager';
import TypographyControl from './TypographyControls';
import { IconPalette, IconResize, IconScale, IconSettings, IconTypeface } from '@tabler/icons-react';

import classes from './ThemeControlPanel.module.css';
import SizeAndLayoutControls from './SizeAndLayoutControls';

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
    <Box id="control-panel" p={'0'}>
      <ThemeContext.Provider value={themeManager}>
        <Stack>
          <Tabs variant="pills" defaultValue="color" orientation="vertical" >
            <Tabs.List variant="filled" p="sm" className={classes.tabList}>
              <Stack pos={'fixed'}>
              <Tabs.Tab value="color">
                <Tooltip label="Color">
                <ActionIcon size="md" variant="transparent" radius="xl">
                  <IconPalette size="xl" />
                </ActionIcon>
                </Tooltip>
              </Tabs.Tab>
              <Tabs.Tab value="typography">
                <Tooltip label="Typography">
                <ActionIcon size="md" variant="transparent" radius="xl">
                  <IconTypeface size="xl" />
                </ActionIcon>
                </Tooltip>
              </Tabs.Tab>
              <Tabs.Tab value="size-and-layout">
                <Tooltip label="Size and Layout">
                <ActionIcon size="md" variant="transparent" radius="xl">
                  <IconResize size="xl" />
                </ActionIcon>
                </Tooltip>
              </Tabs.Tab>
              <Tabs.Tab value="general">
                <Tooltip label="General">
                <ActionIcon size="md" variant="transparent" radius="xl">
                  <IconSettings size="xl" />
                </ActionIcon>
                </Tooltip>
              </Tabs.Tab></Stack>
            </Tabs.List>
            <Tabs.Panel className={classes.tabPanel} value="color">
              <ColorControl />
            </Tabs.Panel>
            <Tabs.Panel className={classes.tabPanel} value="typography">
              <TypographyControl theme={theme} updateTheme={updateTheme} />
            </Tabs.Panel>
            <Tabs.Panel className={classes.tabPanel} value="size-and-layout">
               <SizeAndLayoutControls theme={theme} updateTheme={updateTheme} />
            </Tabs.Panel>
            <Tabs.Panel className={classes.tabPanel} value="general">
              <GeneralControls theme={theme} updateTheme={updateTheme} />
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </ThemeContext.Provider>
    </Box>
  );
};

export default ThemeControlPanel;
