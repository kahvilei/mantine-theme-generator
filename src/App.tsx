import '@mantine/core/styles.css';
import React, { useState } from 'react';
import { MantineProvider, MantineThemeOverride, Group, useMantineTheme, createTheme, MantineThemeProvider } from '@mantine/core';
import ThemeDisplay from './components/ThemeDisplayPanel/ThemeDisplay';
import {theme} from './theme';

import ThemeControlPanel from './components/ThemeControlPanel/ThemeControlPanel';

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
    <MantineProvider forceColorScheme = {colorScheme}>
    <div style={{ display: 'flex' }}>
      <MantineProvider 
        forceColorScheme = {colorScheme}
        theme={defaultTheme}
        getRootElement={() => document.querySelector<HTMLElement>("#control-panel") ?? undefined}
        cssVariablesSelector="#control-panel"
      >
        <ThemeControlPanel theme={theme} updateTheme={updateTheme} />
      </MantineProvider>
      <MantineProvider 
        forceColorScheme = {colorScheme}
        theme={theme}
        getRootElement={() => document.querySelector<HTMLElement>("#display-panel") ?? undefined}
        cssVariablesSelector="#display-panel"
      >
        <div style={{ flex: 1 }}>
          <ThemeDisplay />
        </div> 
      </MantineProvider>

    </div>
    </MantineProvider>

  );
};

export default App;