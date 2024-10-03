import React, { useEffect, useState } from 'react';
import { IconDownload, IconTrash, IconUpload } from '@tabler/icons-react';
import {
  Button,
  DEFAULT_THEME,
  FileInput,
  Group,
  MantineThemeOverride,
  Popover,
  Text,
  Title,
} from '@mantine/core';
import { downloadTheme, uploadTheme } from '../../utils/themeDownloadUpload';

interface HeaderProps {
  theme: MantineThemeOverride;
  updateTheme: (theme: Partial<MantineThemeOverride>) => void;
}

const Header: React.FC<HeaderProps> = ({ theme, updateTheme }) => {
  const currentTheme = DEFAULT_THEME;
  const [opened, setOpened] = useState(false);

  // This runs once in the case we do not have any theme set
  useEffect(() => {
    // If theme is empty, set it to default theme
    if (Object.keys(theme).length === 0) {
      updateTheme(currentTheme);
    }
  }, []);

  return (
    <Group p={'md'} h={'100%'} align="center" justify="space-between">
      <Title size={'1.2rem'} c={'blue.8'}>
        Mantine Theme Editor
      </Title>
      <Group align="right">
        <Button
          leftSection={<IconDownload size="1.5rem" />}
          color="green"
          onClick={() => downloadTheme(theme)}
        >
          Download theme
        </Button>
        <Button
          leftSection={<IconUpload size="1.5rem" />}
          onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
        >
          Upload theme
        </Button>
        <Popover opened={opened} onClose={() => setOpened(false)} position="bottom" withArrow>
          <Popover.Target>
            <Button
              leftSection={<IconTrash size="1.5rem" />}
              color="red"
              onClick={() => setOpened(true)}
            >
              Reset theme
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Text size="sm">
              Are you sure you want to reset the theme? This will delete all current changes.
            </Text>
            <Group mt="md">
              <Button
                color="red"
                onClick={() => {
                  updateTheme(currentTheme);
                  setOpened(false);
                }}
              >
                Yes
              </Button>
              <Button variant="outline" onClick={() => setOpened(false)}>
                No
              </Button>
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
