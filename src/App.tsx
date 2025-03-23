


import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import './App.css';

import React, { useState } from 'react';
// Store setup
import {
  IconComponents,
  IconDashboard,
  IconForms,
  IconMoon,
  IconPalette,
  IconSun,
  IconSunMoon,
  IconTypography,
} from '@tabler/icons-react';
import {
  Card,
  Center,
  createTheme,
  Group,
  MantineProvider,
  MantineThemeOverride,
  ScrollArea,
  SegmentedControl,
  Stack,
  Tabs,
  Tooltip,
} from '@mantine/core';
import Header from './components/Header/Header';
import ThemeControlPanel from './components/ThemeControlPanel/ThemeControlPanel';
import ThemeDisplay from './components/ThemeDisplayPanel/ThemeDisplay';
import appTheme from './data/appTheme.json';

const App: React.FC = () => {
  const defaultTheme = createTheme(appTheme as unknown as MantineThemeOverride);
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [currentContent, setCurrentContent] = useState<string | null>('Overview');
  const [currentColorScheme, setCurrentColorScheme] = useState<string>('dark');

  const toggleScheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <MantineProvider forceColorScheme={mode} theme={defaultTheme}>
      <div className="app-container">
        {/* Header */}
        <div className="app-header">
          <Header
            lightMode={mode === 'light'}
            toggleScheme={toggleScheme}
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
            <Stack align="center" justify="center" className="main-container">
              <Card className="content-card">
                {/* Custom Tab System */}
                <div className="tab-container">
                  {/* Tab Header */}
                  <Group className="tab-header" justify="space-between" align="center">
                    <Tabs value={currentContent} onChange={setCurrentContent} variant="outline">
                      <Tabs.List className="tab-header-list">
                        <Tabs.Tab value="overview" leftSection={<IconPalette size={16} />}>
                          Overview
                        </Tabs.Tab>
                        <Tabs.Tab value="typography" leftSection={<IconTypography size={16} />}>
                          Typography
                        </Tabs.Tab>
                        <Tabs.Tab value="components" leftSection={<IconComponents size={16} />}>
                          Components
                        </Tabs.Tab>
                        <Tabs.Tab value="forms" leftSection={<IconForms size={16} />}>
                          Forms
                        </Tabs.Tab>
                        <Tabs.Tab value="dashboard" leftSection={<IconDashboard size={16} />}>
                          Dashboard
                        </Tabs.Tab>
                      </Tabs.List>
                    </Tabs>
                    <SegmentedControl
                      value={currentColorScheme}
                      onChange={setCurrentColorScheme}
                      data={[
                        {
                          value: 'dark',
                          label: (
                            <Tooltip label="Light mode">
                              <Center>
                                <IconMoon size={12} />
                              </Center>
                            </Tooltip>
                          ),
                        },
                        {
                          value: 'dark-and-light',
                          label: (
                            <Tooltip label="Side by side">
                              <Center>
                                <IconSunMoon size={12} />
                              </Center>
                            </Tooltip>
                          ),
                        },
                        {
                          value: 'light',
                          label: (
                            <Tooltip label="Light mode">
                              <Center>
                                <IconSun size={12} />
                              </Center>
                            </Tooltip>
                          ),
                        },
                      ]}
                    />
                  </Group>

                  {/* Tab Content */}
                  <ScrollArea
                    scrollbars="y"
                    type="hover"
                    className="tab-content-scroll"
                  >
                    {/* Dark Tab Content */}
                    {currentColorScheme === 'dark' && (
                      <Group justify="center" grow className="theme-display-container">
                        <ThemeDisplay number={1} mode="dark" displayContent={currentContent??'overview'} />
                      </Group>
                    )}

                    {/* Dark and Light Tab Content */}
                    {currentColorScheme === 'dark-and-light' && (
                      <Group gap={0} justify="center" grow className="theme-display-container">
                        <ThemeDisplay number={2} mode="dark" displayContent={currentContent??'overview'} />
                        <ThemeDisplay number={3} mode="light" displayContent={currentContent??'overview'} />
                      </Group>
                    )}

                    {/* Light Tab Content */}
                    {currentColorScheme === 'light' && (
                      <Group justify="center" grow className="theme-display-container">
                        <ThemeDisplay number={4} mode="light" displayContent={currentContent??'overview'} />
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
