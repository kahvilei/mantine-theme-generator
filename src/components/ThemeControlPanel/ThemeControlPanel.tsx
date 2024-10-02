import React, { useEffect } from 'react';
import {
  Stack,
  Text,
  MantineThemeOverride,
  Group,
  ActionIcon,
  Box,
  Tabs,
  FileInput,
  DEFAULT_THEME
} from '@mantine/core';
import { IconTrash, IconDownload, IconUpload } from '@tabler/icons-react';
import { downloadTheme, uploadTheme } from '../../utils/themeDownloadUpload';
import ColorControl from './ColorControls'; 
import TypographyControl from './TypographyControls';
import GeneralControls from './GeneralControls';

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
            <FileInput onChange={(file) => uploadTheme(file, updateTheme)} accept=".json" style={{ display: 'none' }} />
          </Group>
        </Group>
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