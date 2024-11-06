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
} from '@mantine/core';
import Header from './components/Header/Header';
import JsonEditor from './components/JsonEditor/JsonEditor';
import ThemeControlPanel from './components/ThemeControlPanel/ThemeControlPanel';
import ThemeDisplay from './components/ThemeDisplayPanel/ThemeDisplay';
import appTheme from './data/appTheme.json';

const MemoizedHeader = React.memo(Header);


const App: React.FC = () => {
  const defaultTheme = createTheme(appTheme as unknown as MantineThemeOverride);

  const [theme, setTheme] = useState<MantineThemeOverride>({
    ...defaultTheme,
  });

  const updateTheme = (newThemeProperties: Partial<MantineThemeOverride>) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      ...newThemeProperties,
    }));
  };

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

  const memoizedHeader = useMemo(
    () => (
      <MemoizedHeader
        theme={defaultTheme}
        updateTheme={setTheme}
        toggleAside={toggleAside}
        lightMode={mode === 'light'}
        toggleScheme={toggleScheme}
        currentContent={currentContent}
        updateDisplayContent={updateDisplayContent}
      />
    ),
    []
  );

  return (
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
          {memoizedHeader}
        </AppShell.Header>
        <AppShell.Navbar withBorder>
          <ScrollArea scrollbarSize={6}>
            <MantineProvider>
              <ThemeControlPanel theme={theme} updateTheme={updateTheme} />
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
                  theme={theme}
                  displayContent={currentContent}
                />
              </Group>
            </Tabs.Panel>
            <Tabs.Panel pt={'1.5rem'} value="dark-and-light">
              <Group gap={0} justify="center" grow>
                <ThemeDisplay
                  number={2}
                  mode={'dark'}
                  theme={theme}
                  displayContent={currentContent}
                />
                <ThemeDisplay
                  number={3}
                  mode={'light'}
                  theme={theme}
                  displayContent={currentContent}
                />
              </Group>
            </Tabs.Panel>
            <Tabs.Panel pt={'1.5rem'} value="light">
              <Group justify="center" grow>
                <ThemeDisplay
                  number={4}
                  mode={'light'}
                  theme={theme}
                  displayContent={currentContent}
                />
              </Group>
            </Tabs.Panel>
          </Tabs>
        </AppShell.Main>
        <AppShell.Aside>
          <Stack p="md">
            <JsonEditor
              theme={JSON.stringify(theme, null, 2)}
            />
          </Stack>
        </AppShell.Aside>
      </AppShell>
    </MantineProvider>
  );
};

export default App;
