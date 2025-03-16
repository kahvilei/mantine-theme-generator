import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import './App.css';

import React, { useState } from 'react';
// Store setup
import { configureStore } from '@reduxjs/toolkit';
import {IconLayoutSidebar, IconMoon, IconSun, IconSunMoon, IconTrash} from '@tabler/icons-react';
import {Provider, useDispatch} from 'react-redux';
import {
  Card,
  createTheme,
  Group,
  MantineProvider,
  MantineThemeOverride,
  ScrollArea,
  Select,
  Stack,
  Button, Tooltip, Popover, ActionIcon, Text, SelectProps,
} from '@mantine/core';
import Header from './components/Header/Header';
import ThemeControlPanel from './components/ThemeControlPanel/ThemeControlPanel';
import ThemeDisplay from './components/ThemeDisplayPanel/ThemeDisplay';
import appTheme from './data/appTheme.json';
import {setTheme} from './data/ThemeState/themeSlice';
import classes from "@/components/Header/Header.module.css";
import {DownloadThemeButton, UploadThemeButton} from "@/components/Header/themeDownloadUpload";
import premadeThemes from "@/data/premadeThemes.json";
import ThemePreview from "@/components/Header/ThemePreview";


const App: React.FC = () => {
  const defaultTheme = createTheme(appTheme as unknown as MantineThemeOverride);
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [selectedTab, setSelectedTab] = useState('dark');

  const toggleScheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const updateDisplayContent = (content: string) => {
    setCurrentContent(content);
  };

  const [currentThemeName, setCurrentThemeName] = useState('');
  const [currentContent, setCurrentContent] = useState('UI Demo');
  const [opened, setOpened] = useState(false);
  const themes = JSON.parse(JSON.stringify(premadeThemes));

  const dispatch = useDispatch();

  const handlePreMadeThemeSelect = (value: string | null) => {
    setCurrentThemeName(value as string);
    const newTheme = createTheme(themes[value as string]);
    dispatch(setTheme(newTheme));
  };

  const themeOptions: SelectProps['renderOption'] = ({ option }) => (
      <ThemePreview lightMode={mode==='light'} theme={themes[option.value]} name={option.value} />
  );

  const themeData = Object.keys(themes).map((themeName) => ({ value: themeName, label: themeName }));

  return (
        <MantineProvider forceColorScheme={mode} theme={defaultTheme}>
          <div className="app-container">
            {/* Header */}
            <div className="app-header">
              <Header
                  lightMode={mode === 'light'}
                  updateDisplayContent={updateDisplayContent}
                  toggleScheme={toggleScheme}
                  currentContent={currentContent}
                  toggleAside={() => {}} // Empty function since we removed the aside
              />
            </div>

            {/* Main layout */}
            <Card className="app-content" withBorder>
              {/* Navbar / Sidebar */}
              <div className="app-sidebar">
                  <ThemeControlPanel />
              </div>
              {/* Main Content */}
              <div className="app-main">
                <Stack align={'center'} justify={'center'} className="main-container">
                  <Card radius={0} p={0} className="content-card">
                    {/* Custom Tab System */}
                    <div className="tab-container">
                      {/* Tab Header */}
                      <Group className="tab-header" justify={'space-between'}>
                        <Group>
                          <Button
                              variant={selectedTab === 'dark' ? 'filled' : 'subtle'}
                              leftSection={<IconMoon size={12} />}
                              onClick={() => setSelectedTab('dark')}
                              size="sm"
                              className="tab-button"
                          >
                            Dark
                          </Button>
                          <Button
                              variant={selectedTab === 'dark-and-light' ? 'filled' : 'subtle'}
                              leftSection={<IconSunMoon size={12} />}
                              onClick={() => setSelectedTab('dark-and-light')}
                              size="sm"
                              className="tab-button"
                          >
                            Dark and Light
                          </Button>
                          <Button
                              variant={selectedTab === 'light' ? 'filled' : 'subtle'}
                              leftSection={<IconSun size={12} />}
                              onClick={() => setSelectedTab('light')}
                              size="sm"
                              className="tab-button"
                          >
                            Light
                          </Button>
                        </Group>
                        <Group>
                        <Select
                            placeholder="Preview content"
                            data={['UI Demo', 'Article', 'Repository', 'Messaging Service']}
                            value={currentContent || "UI Demo"}
                            onChange={(value) => {
                              updateDisplayContent(value as string);
                              setCurrentContent(value as string);
                            }}
                            allowDeselect={false}
                            className="content-selector"
                        />
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
                          <DownloadThemeButton/>
                          <UploadThemeButton />
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

                      {/* Tab Content */}
                      <ScrollArea scrollbarSize={6} scrollbars="y" type={'hover'} className="tab-content-scroll">
                        {/* Dark Tab Content */}
                        {selectedTab === 'dark' && (
                            <Group justify="center" grow className="theme-display-container">
                              <ThemeDisplay number={1} mode={'dark'} displayContent={currentContent} />
                            </Group>
                        )}

                        {/* Dark and Light Tab Content */}
                        {selectedTab === 'dark-and-light' && (
                            <Group gap={0} justify="center" grow className="theme-display-container">
                              <ThemeDisplay number={2} mode={'dark'} displayContent={currentContent} />
                              <ThemeDisplay number={3} mode={'light'} displayContent={currentContent} />
                            </Group>
                        )}

                        {/* Light Tab Content */}
                        {selectedTab === 'light' && (
                            <Group justify="center" grow className="theme-display-container">
                              <ThemeDisplay number={4} mode={'light'} displayContent={currentContent} />
                            </Group>
                        )}
                      </ScrollArea>
                    </div>
                  </Card>
                </Stack>
              </div>
            </Card>
          </div>
        </MantineProvider>
  );
};

export default App;