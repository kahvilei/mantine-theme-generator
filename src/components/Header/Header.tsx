import React, { useEffect, useState } from 'react';
import { IconDownload, IconTrash, IconUpload, IconLayoutSidebar } from '@tabler/icons-react';
import {
  ActionIcon,
  DEFAULT_THEME,
  FileInput,
  Group,
  MantineThemeOverride,
  Popover,
  Text,
  Title,
  Tooltip,
  Select,
} from '@mantine/core';
import { downloadTheme, uploadTheme } from '../../utils/themeDownloadUpload';
import premadeThemes from '../../data/premadeThemes.json';

interface HeaderProps {
  theme: MantineThemeOverride;
  updateTheme: (theme: Partial<MantineThemeOverride>) => void;
  toggleAside: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, updateTheme, toggleAside }) => {
  const currentTheme = DEFAULT_THEME;
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (Object.keys(theme).length === 0) {
      updateTheme(currentTheme);
    }
  }, []);

  const handlePreMadeThemeSelect = (value: string | null) => {
    if (value && value in premadeThemes) {
      const selectedTheme = premadeThemes[value as keyof typeof premadeThemes];
      updateTheme(selectedTheme);
    }
  };

  return (
    <Group p={'md'} h={'100%'} align="center" justify="space-between">
      <Group>
        <Title size={'1.2rem'} c={'blue.8'}>
          Mantine Theme Editor
        </Title>
        <Select
          placeholder="Select a pre-made theme"
          data={Object.keys(premadeThemes)}
          onChange={handlePreMadeThemeSelect}
          style={{ width: '200px' }}
        />
      </Group>
      <Group align="right">
        <Tooltip label="Toggle Sidebar">
          <ActionIcon variant="outline" onClick={toggleAside}>
            <IconLayoutSidebar size="1.25rem" />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Download Theme">
          <ActionIcon variant="outline" onClick={() => downloadTheme(theme)}>
            <IconDownload size="1.25rem" />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Upload Theme">
          <ActionIcon variant="outline" onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}>
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
                  updateTheme(currentTheme);
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