import React, { useEffect, useState } from 'react';
import {
  IconBrandGithub,
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
  FileInput,
  Group,
  MantineThemeOverride,
  Popover,
  Select,
  SelectProps,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import premadeThemes from '../../data/premadeThemes.json';
import { downloadTheme, uploadTheme } from '../../utils/themeDownloadUpload';
import ThemePreview from './ThemePreview';
import classes from './Header.module.css';
import { useDispatch } from 'react-redux';
import { setTheme } from '@/data/ThemeState/themeSlice';


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
  toggleAside,
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

  const themeOptions: SelectProps['renderOption'] = ({ option, checked }) => (
      <ThemePreview lightMode={lightMode} theme={themes[option.value]} name={option.value} />
  );

  const themeData = Object.keys(themes).map((themeName) => ({ value: themeName, label: themeName }));

  return (
    <Group p={'md'} h={'100%'} align="center" justify="space-between">
      <Group>
        <Title size={'1.2rem'} c={'blue'}>
          Mantine Theme Editor
        </Title>
        <ActionIcon variant="filled" onClick={() => window.open('https://github.com/kahvilei/mantine-theme-generator', '_blank')}>
          <IconBrandGithub size="1.25rem" />
        </ActionIcon>
        <ActionIcon variant="outline" onClick={toggleScheme}>
          <IconSunMoon size="1.25rem" />
        </ActionIcon>
      </Group>
      <Group align="center">
        <Select
          placeholder="Preview content"
          data={['UI Demo', 'Article', 'Repository', 'Messaging Service']}
          value={currentContent? currentContent : "UI Demo"}
          onChange={(value) => {updateDisplayContent(value as string); setCurrentContent(value as string)}}
          allowDeselect = {false}
          style={{ width: '300px' }}
        />
        <Select
          placeholder="Select a pre-made theme"
          data={themeData}
          renderOption={themeOptions}
          value={currentThemeName? currentThemeName : 'mantine'}
          onChange={handlePreMadeThemeSelect}
          allowDeselect = {false}
          style={{ width: '300px' }}
          classNames={{option: classes.themePreviewOption, dropdown: classes.themePreviewDropdown}}
        />
        <Tooltip label="Toggle JSON Sidebar">
          <ActionIcon variant="outline" onClick={toggleAside}>
            <IconJson size="1.25rem" />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Download Theme">
          <ActionIcon variant="outline" onClick={() => downloadTheme('json')}>
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
        <FileInput
          onChange={(file) => { if (file) uploadTheme(file); }}
          accept=".json"
          style={{ display: 'none' }}
        />
      </Group>
    </Group>
  );
};

export default Header;