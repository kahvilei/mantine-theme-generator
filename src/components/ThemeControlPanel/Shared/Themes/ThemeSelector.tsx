import React from 'react';
import { Box, Group } from '@mantine/core';
import Store from '@/data/Store';
import ThemePreview from './ThemePreview';
import classes from './ThemeSelector.module.css';
import {observer} from "mobx-react-lite";

const ThemeSelector= observer(() => {
  const currentThemeName = Store.theme.name;
  const themeData = Store.themeList();

  return (
    <Group gap={6}>
      {themeData.map(([name, theme]) => (
        <Box
          key={name}
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
            theme={theme.value}
            name={theme.name}
          />
        </Box>
      ))}
    </Group>
  );
});

export default ThemeSelector;
