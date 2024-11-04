import React, { useEffect, useState } from 'react';
import {
  IconDownload,
  IconJson,
  IconLayoutSidebar,
  IconSunMoon,
  IconTrash,
  IconUpload,
} from '@tabler/icons-react';
import {
  ActionIcon,
  createTheme,
  DEFAULT_THEME,
  FileInput,
  Group,
  MantineThemeOverride,
  Popover,
  Select,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import premadeThemes from '../../data/premadeThemes.json';
import { downloadTheme, uploadTheme } from '../../utils/themeDownloadUpload';
import { M } from 'vite/dist/node/types.d-aGj9QkWt';

interface HeaderProps {
  theme: MantineThemeOverride;
  updateTheme: (theme: Partial<MantineThemeOverride>) => void;
  toggleAside: () => void;
  toggleScheme: () => void;
  updateDisplayContent: (content: string) => void;
  currentContent: string;
}

const Header: React.FC<HeaderProps> = ({
  theme,
  updateTheme,
  currentContent,
  updateDisplayContent,
  toggleAside,
  toggleScheme,
}) => {
  const currentTheme = createTheme({});
  const defaultTheme = createTheme({});
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (Object.keys(theme).length === 0) {
      updateTheme(currentTheme);
    }
  }, []);

  const handlePreMadeThemeSelect = (value: string | null) => {
    let themes = JSON.parse(JSON.stringify(premadeThemes));
    updateTheme(themes[value as string]);
  };

  return (
    <Group p={'md'} h={'100%'} align="center" justify="space-between">
      <Group>
        <Title size={'1.2rem'} c={'primary'}>
          Mantine Theme Editor
        </Title>
        <ActionIcon variant="outline" onClick={toggleScheme}>
          <IconSunMoon size="1.25rem" />
        </ActionIcon>
      </Group>
      <Group align="center">
        <Select
          placeholder="Preview content"
          data={['Mantine Components', 'Repository', 'Messaging Service']}
          value={currentContent}
          onChange={(value) => updateDisplayContent(value as string)}
          style={{ width: '200px' }}
        />
        <Select
          placeholder="Select a pre-made theme"
          data={Object.keys(premadeThemes)}
          onChange={handlePreMadeThemeSelect}
          style={{ width: '200px' }}
        />
        <Tooltip label="Toggle JSON Sidebar">
          <ActionIcon variant="outline" onClick={toggleAside}>
            <IconJson size="1.25rem" />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Download Theme">
          <ActionIcon variant="outline" onClick={() => downloadTheme(theme)}>
            <IconDownload size="1.25rem" />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Upload Theme">
          <ActionIcon
            variant="outline"
            onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
          >
            <IconUpload size="1.25rem" />
          </ActionIcon>
        </Tooltip>
        <Popover opened={opened} onClose={() => setOpened(false)} position="bottom" withArrow>
          <Popover.Target>
            <Tooltip label="Reset Theme">
              <ActionIcon variant="outline" color="red" onClick={() => setOpened(true)}>
                <IconTrash size="1.25rem" />
              </ActionIcon>
            </Tooltip>
          </Popover.Target>
          <Popover.Dropdown>
            <Text size="sm">
              Are you sure you want to reset the theme? This will delete all current changes.
            </Text>
            <Group mt="md">
              <ActionIcon
                variant="filled"
                color="red"
                onClick={() => {
                  updateTheme(defaultTheme);
                  setOpened(false);
                }}
              >
                <IconTrash size="1.25rem" />
              </ActionIcon>
              <ActionIcon variant="outline" onClick={() => setOpened(false)}>
                <IconLayoutSidebar size="1.25rem" />
              </ActionIcon>
            </Group>
          </Popover.Dropdown>
        </Popover>
        <FileInput
          onChange={(file) => uploadTheme(file, updateTheme)}
          accept=".json"
          style={{ display: 'none' }}
        />
      </Group>
    </Group>
  );
};

export default Header;
