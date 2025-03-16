
import React, { useState } from 'react';
import {
  IconBrandGithub,
  IconBrandMantine,
  IconJson,
  IconLayoutSidebar,
  IconSunMoon,
  IconTrash
} from '@tabler/icons-react';
import {
  ActionIcon,
  createTheme,
  Group,
  Popover,
  Select,
  SelectProps,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import premadeThemes from '../../data/premadeThemes.json';
import ThemePreview from './ThemePreview';
import classes from './Header.module.css';
import { useDispatch } from 'react-redux';
import { setTheme } from '@/data/ThemeState/themeSlice';
import { DownloadThemeButton, UploadThemeButton } from './themeDownloadUpload';


interface HeaderProps {
  toggleAside: () => void;
  toggleScheme: () => void;
  lightMode: boolean;
  updateDisplayContent: (content: string) => void;
  currentContent: string;
}

const Header: React.FC<HeaderProps> = ({
  lightMode,
  updateDisplayContent,
  toggleScheme,
}) => {
  const [currentThemeName, setCurrentThemeName] = useState('');
  const [currentContent, setCurrentContent] = useState('UI Demo');
  const defaultTheme = createTheme({});
  const [opened, setOpened] = useState(false);
  const themes = JSON.parse(JSON.stringify(premadeThemes));

  const dispatch = useDispatch();

  const handlePreMadeThemeSelect = (value: string | null) => {
    setCurrentThemeName(value as string);
    const newTheme = createTheme(themes[value as string]);
    dispatch(setTheme(newTheme));
  };

  const themeOptions: SelectProps['renderOption'] = ({ option }) => (
      <ThemePreview lightMode={lightMode} theme={themes[option.value]} name={option.value} />
  );

  const themeData = Object.keys(themes).map((themeName) => ({ value: themeName, label: themeName }));

  return (
    <Group p='sm' h="100%" align="center" justify="space-between">
      <Group>
        <Title size={'1.2rem'} c={'blue'}>
          Mantine Theme Editor
        </Title>
        <Tooltip label="View on GitHub">
        <ActionIcon variant="filled" onClick={() => window.open('https://github.com/kahvilei/mantine-theme-generator', '_blank')}>
          <IconBrandGithub size="1.25rem" />
        </ActionIcon>
        </Tooltip>
        <Tooltip label="View Mantine Documentation">
        <ActionIcon variant="filled" onClick={() => window.open('https://mantine.dev/', '_blank')}>
          <IconBrandMantine size="1.25rem" />
        </ActionIcon>
        </Tooltip>
        <Tooltip label="Toggle Light/Dark Mode">
        <ActionIcon variant="outline" onClick={toggleScheme}>
          <IconSunMoon size="1.25rem" />
        </ActionIcon>
        </Tooltip>
        <Text size="xs" c="dimmed">
          Running on Mantine v7.17.0
        </Text>
      </Group>
      <Group align="center">

        <Select
          placeholder="Select a pre-made theme"
          data={themeData}
          renderOption={themeOptions}
          value={currentThemeName? currentThemeName : 'mantine'}
          onChange={handlePreMadeThemeSelect}
          allowDeselect = {false}
          style={{ width: '200px' }}
          classNames={{option: classes.themePreviewOption, dropdown: classes.themePreviewDropdown, options: classes.themePreviewOptions}}
          comboboxProps={{ width: '500px' }}
        />
        <Tooltip label="Download Theme">
          <DownloadThemeButton/>
        </Tooltip>
        <Tooltip label="Upload Theme">
          <UploadThemeButton />
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
                  setTheme(defaultTheme);
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
      </Group>
    </Group>
  );
};

export default Header;