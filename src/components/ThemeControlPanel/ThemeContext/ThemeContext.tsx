import React from 'react';
import { DEFAULT_THEME } from '@mantine/core';
import ThemeManager from './ThemeManager/ThemeManager';

const ThemeContext = React.createContext<ThemeManager>(
  new ThemeManager(DEFAULT_THEME, (theme) => {})
);

export default ThemeContext;
