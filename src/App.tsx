import '@mantine/core/styles.css';
import React, { useState } from 'react';
import { MantineProvider, MantineThemeOverride, Group, useMantineTheme, createTheme, MantineThemeProvider, Tabs } from '@mantine/core';
import ThemeDisplay from './components/ThemeDisplayPanel/ThemeDisplay';
import { theme } from './theme';

import ThemeControlPanel from './components/ThemeControlPanel/ThemeControlPanel';
import { IconMoon, IconSun, IconSunLow, IconSunMoon } from '@tabler/icons-react';

const App: React.FC = () => {
  const defaultTheme = createTheme({});
  const [theme, setTheme] = useState<MantineThemeOverride>({
    ...defaultTheme
  });


  const updateTheme = (newThemeProperties: Partial<MantineThemeOverride>) => {
    setTheme(prevTheme => ({
      ...prevTheme,
      ...newThemeProperties
    }));
  };

  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark');


  return (
    <MantineProvider forceColorScheme={colorScheme}>
      <div style={{ display: 'flex' }}>
        <MantineProvider
          theme={defaultTheme}
          getRootElement={() => document.querySelector<HTMLElement>("#control-panel") ?? undefined}
          cssVariablesSelector="#control-panel"
        >
          <ThemeControlPanel theme={theme} updateTheme={updateTheme} />
        </MantineProvider>
        <Tabs defaultValue="dark-and-light" w={'100%'}>
          <Tabs.List>
            <Tabs.Tab value="dark" leftSection={<IconMoon size={12}></IconMoon>}>Dark</Tabs.Tab>
            <Tabs.Tab value="dark-and-light" leftSection={<IconSunMoon size={12}></IconSunMoon>}>Dark and Light</Tabs.Tab>
            <Tabs.Tab value="light" leftSection={<IconSun size={12}></IconSun>}>Light</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="dark">
          <Group justify='center'>
            <ThemeDisplay mode={'dark'} theme={theme}/>
          </Group>
          </Tabs.Panel>
          <Tabs.Panel value="dark-and-light">
            <Group justify='center'>
              <ThemeDisplay mode={'dark'} theme={theme}/>
              <ThemeDisplay mode={'light'} theme={theme}/>
            </Group>
          </Tabs.Panel>
          <Tabs.Panel value="light">
            <Group justify='center'>
            <ThemeDisplay mode={'light'} theme={theme}/>
            </Group>
          </Tabs.Panel>
        </Tabs>
      </div>
    </MantineProvider>

  );
};

export default App;