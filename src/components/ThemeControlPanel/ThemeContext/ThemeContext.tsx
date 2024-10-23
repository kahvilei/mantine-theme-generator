import React from 'react';
import ThemeManager from './ThemeManager/ThemeManager';
import { DEFAULT_THEME } from '@mantine/core';

const ThemeContext = React.createContext<ThemeManager>(
    new ThemeManager(DEFAULT_THEME, (theme) => {}),
  );

export default ThemeContext;

  