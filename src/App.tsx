import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import './App.css';

import React, { useState } from 'react';
// Store setup
import { configureStore } from '@reduxjs/toolkit';
import { IconMoon, IconSun, IconSunMoon } from '@tabler/icons-react';
import { Provider } from 'react-redux';
import {
  Card,
  createTheme,
  Group,
  MantineProvider,
  MantineThemeOverride,
  ScrollArea,
  Select,
  Stack,
  Button,
} from '@mantine/core';
import Header from './components/Header/Header';
import ThemeControlPanel from './components/ThemeControlPanel/ThemeControlPanel';
import ThemeDisplay from './components/ThemeDisplayPanel/ThemeDisplay';
import appTheme from './data/appTheme.json';
import themeReducer from './data/ThemeState/themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

const App: React.FC = () => {
  const defaultTheme = createTheme(appTheme as unknown as MantineThemeOverride);
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [currentContent, setCurrentContent] = useState('Mantine Components');
  const [selectedTab, setSelectedTab] = useState('dark');

  const toggleScheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const updateDisplayContent = (content: string) => {
    setCurrentContent(content);
  };

  return (
      <Provider store={store}>
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
      </Provider>
  );
};

export default App;