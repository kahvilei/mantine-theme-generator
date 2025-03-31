import React from 'react';
import { Box, Group } from '@mantine/core';
import Store, {RemoraidStore} from '@/data/Store';
import ThemePreview from './ThemePreview';
import classes from './ThemeSelector.module.css';
import {observer} from "mobx-react-lite";

interface ThemeSelectorProps {
  store?: RemoraidStore,
}

const ThemeSelector= observer(({store = Store}:ThemeSelectorProps) => {
  const currentThemeName = store.theme.name;
  const themeData = store.themeList();

  return (
    <Group gap={6}>
      {themeData.map(([_, theme]) => (
        <Box
          key={theme.name}
          className={classes.themeButtonWrap}
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            theme.makeMainTheme();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              theme.makeMainTheme();
            }
          }}
        >
          <ThemePreview
            selected={currentThemeName === theme.name}
            theme={theme}
            name={theme.name}
          />
        </Box>
      ))}
    </Group>
  );
});

export default ThemeSelector;
