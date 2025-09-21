import React from 'react';
import { Box, Group } from '@mantine/core';
import Store, { RemoraidStore } from '@/data/Store';
import ThemePreview from './ThemePreview';
import { observer } from "mobx-react-lite";
import classes from './ThemeSelector.module.css';

interface ThemeSelectorProps {
  store?: RemoraidStore,
}

const ThemeSelector = observer(({ store = Store }: ThemeSelectorProps) => {
  const currentThemeName = store.theme.name;
  const themeData = store.themeList();

  const isPremade = (name: string) => store.premadeDefaults.hasOwnProperty(name);
  const isUserTheme = (name: string) => store.userThemes.has(name);

  return (
    <Group gap={6}>
      {themeData.map(([_, theme]) => (
        <Box
          key={theme.name}
          className={classes.themeButtonWrap}
          tabIndex={0}
          onClick={() => theme.makeMainTheme()}
          onKeyDown={(e) => { if (e.key === 'Enter') theme.makeMainTheme(); }}
        >
          <ThemePreview
            selected={currentThemeName === theme.name}
            theme={theme}
            name={theme.name}
            onReset={isPremade(theme.name) ? () => store.resetTheme(theme.name) : undefined}
            onDelete={isUserTheme(theme.name) ? () => store.deleteTheme(theme.name) : undefined}
          />
        </Box>
      ))}
    </Group>
  );
});

export default ThemeSelector;
