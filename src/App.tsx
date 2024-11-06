import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';

import React, { useState, useMemo} from 'react';
import { IconMoon, IconSun, IconSunMoon } from '@tabler/icons-react';
import {
  AppShell,
  createTheme,
  Group,
  MantineProvider,
  MantineThemeOverride,
  ScrollArea,
  Stack,
  Tabs,
  DEFAULT_THEME,
} from '@mantine/core';
import Header from './components/Header/Header';
import JsonEditor from './components/JsonEditor/JsonEditor';
import ThemeControlPanel from './components/ThemeControlPanel/ThemeControlPanel';
import ThemeDisplay from './components/ThemeDisplayPanel/ThemeDisplay';
import appTheme from './data/appTheme.json';
import { ThemeProvider } from './components/ThemeControlPanel/ThemeContext/ThemeContext';


const App: React.FC = () => {
  const defaultTheme = createTheme(appTheme as unknown as MantineThemeOverride);

  const [asideVisible, setAsideVisible] = useState(false);

  const toggleAside = () => {
    setAsideVisible((prev) => !prev);
  };

  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleScheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const [currentContent, setCurrentContent] = useState('Mantine Components');

  const updateDisplayContent = (content: string) => {
    setCurrentContent(content);
  };

  return (
    <ThemeProvider initialTheme={DEFAULT_THEME}>
    <MantineProvider forceColorScheme={mode} theme={defaultTheme}>
      <AppShell
        header={{ height: 80 }}
        navbar={{
          width: 500,
          breakpoint: 'sm',
        }}
        aside={{
          width: 700,
          breakpoint: 'sm',
          collapsed: {
            desktop: !asideVisible,
            mobile: true,
          },
        }}
      >
        <AppShell.Header withBorder>
          <Header
            lightMode={mode === 'light'}
            updateDisplayContent={updateDisplayContent}
            toggleAside={toggleAside}
            toggleScheme={toggleScheme}
            currentContent={currentContent}
          />
        </AppShell.Header>
        <AppShell.Navbar withBorder>
          <ScrollArea scrollbarSize={6}>
            <MantineProvider>
              <ThemeControlPanel/>
            </MantineProvider>
          </ScrollArea>
        </AppShell.Navbar>
        <AppShell.Main>
          <Tabs defaultValue="dark-and-light" w={'100%'}>
            <Tabs.List
              pos={'fixed'}
              w={'100%'}
              bg={'var(--mantine-color-body)'}
              style={{ zIndex: 1 }}
            >
              <Tabs.Tab value="dark" leftSection={<IconMoon size={12}></IconMoon>}>
                Dark
              </Tabs.Tab>
              <Tabs.Tab value="dark-and-light" leftSection={<IconSunMoon size={12}></IconSunMoon>}>
                Dark and Light
              </Tabs.Tab>
              <Tabs.Tab value="light" leftSection={<IconSun size={12}></IconSun>}>
                Light
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel pt={'1.5rem'} value="dark">
              <Group justify="center" grow>
                <ThemeDisplay
                  number={1}
                  mode={'dark'}
                  displayContent={currentContent}
                />
              </Group>
            </Tabs.Panel>
            <Tabs.Panel pt={'1.5rem'} value="dark-and-light">
              <Group gap={0} justify="center" grow>
                <ThemeDisplay
                  number={2}
                  mode={'dark'}
                  displayContent={currentContent}
                />
                <ThemeDisplay
                  number={3}
                  mode={'light'}
                  displayContent={currentContent}
                />
              </Group>
            </Tabs.Panel>
            <Tabs.Panel pt={'1.5rem'} value="light">
              <Group justify="center" grow>
                <ThemeDisplay
                  number={4}
                  mode={'light'}
                  displayContent={currentContent}
                />
              </Group>
            </Tabs.Panel>
          </Tabs>
        </AppShell.Main>
        <AppShell.Aside>
          <Stack p="md">
            <JsonEditor/>
          </Stack>
        </AppShell.Aside>
      </AppShell>
    </MantineProvider>
    </ThemeProvider>
  );
};

export default App;
