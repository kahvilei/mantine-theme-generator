import React, { createContext } from 'react';
import { useTheme } from './useTheme';
import { MantineThemeOverride } from '@mantine/core';

const ThemeContext = createContext<ReturnType<typeof useTheme> | null>(null);

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  initialTheme: MantineThemeOverride;
}> = ({ children, initialTheme }) => {
  const themeContext = useTheme(initialTheme);

  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
};