import React, { useEffect } from 'react';
import { IconDownload, IconTrash, IconUpload } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  DEFAULT_THEME,
  FileInput,
  Group,
  MantineThemeOverride,
  Stack,
  Tabs,
  Text,
} from '@mantine/core';
import { downloadTheme, uploadTheme } from '../../utils/themeDownloadUpload';
import ColorControl from './Color Controls/ColorControls';
import GeneralControls from './GeneralControls';
import TypographyControl from './TypographyControls';

interface ThemeControlPanelProps {
  theme: MantineThemeOverride;
  updateTheme: (theme: Partial<MantineThemeOverride>) => void;
}

const ThemeControlPanel: React.FC<ThemeControlPanelProps> = ({ theme, updateTheme }) => {
  const currentTheme = DEFAULT_THEME;

  //this runs once in the case we do not have any theme set
  useEffect(() => {
    //if theme is empty, set it to default theme
    if (Object.keys(theme).length === 0) {
      updateTheme(currentTheme);
    }
  }, []);

  return (
    <Box id="control-panel" p={'md'}>
      <Stack>
        <Tabs defaultValue="color">
          <Tabs.List>
            <Tabs.Tab value="color">Color</Tabs.Tab>
            <Tabs.Tab value="typography">Typography</Tabs.Tab>
            <Tabs.Tab value="general">General</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="color">
            <ColorControl theme={theme} updateTheme={updateTheme} />
          </Tabs.Panel>
          <Tabs.Panel value="typography">
            <TypographyControl theme={theme} updateTheme={updateTheme} />
          </Tabs.Panel>
          <Tabs.Panel value="general">
            <GeneralControls theme={theme} updateTheme={updateTheme} />
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Box>
  );
};

export default ThemeControlPanel;
