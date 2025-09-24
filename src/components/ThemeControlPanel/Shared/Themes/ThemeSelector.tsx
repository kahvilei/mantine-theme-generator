import React from 'react';
import { Box, Group } from '@mantine/core';
import Store, { RemoraidStore } from '@/data/Store';
import ThemePreview from './ThemePreview';
import { observer } from "mobx-react-lite";
import classes from './ThemeSelector.module.css';

interface ThemeSelectorProps {
  store?: RemoraidStore,
  userThemes?: boolean
}

const ThemeSelector = observer(({ store = Store, userThemes = false }: ThemeSelectorProps) => {
  const currentThemeName = store.theme.name;
  const themeData = store.filteredThemeList(userThemes);

  const isPremade = (name: string) => store.premadeDefaults.hasOwnProperty(name);
  const isUserTheme = (name: string) => store.userThemes.has(name);

  const handleReset = (name: string) => {
    if (window.confirm(`Reset theme "${name}" to default?`)) {
      store.resetTheme(name);
    }
  };

  const handleDelete = (name: string) => {
    if (window.confirm(`Delete user theme "${name}"? This cannot be undone.`)) {
      store.deleteTheme(name);
    }
  };

  return (
    <Group gap={6}>
      {themeData.map(([_, theme]) => {
        const name = theme.name;
        const showReset = isPremade(name) && theme.isEdited?.(); // require edited flag
        const showDelete = isUserTheme(name);

        return (
          <Box
            key={name}
            className={classes.themeButtonWrap}
            tabIndex={0}
            onClick={() => theme.makeMainTheme()}
            onKeyDown={(e) => { if (e.key === 'Enter') theme.makeMainTheme(); }}
          >
            <ThemePreview
              selected={currentThemeName === name}
              theme={theme}
              name={name}
              onReset={showReset ? () => handleReset(name) : undefined}
              onDelete={showDelete ? () => handleDelete(name) : undefined}
            />
          </Box>
        );
      })}
    </Group>
  );
});

export default ThemeSelector;
