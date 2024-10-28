import React, { useState, useMemo } from 'react';
import { Box, MantineProvider, MantineThemeOverride } from '@mantine/core';

import './ThemeDisplay.css';

import ComponentShowcase from './Demo Pages/ComponentShowcase';
import GitHubRepoDemo from './Demo Pages/GithubRepo';
import classes from './ThemeDisplay.module.css';

export interface ThemeDisplayProps {
  number: number;
  mode: 'light' | 'dark';
  theme: Partial<MantineThemeOverride>;
  displayContent: string;
}

const ThemeDisplay: React.FC<ThemeDisplayProps> = ({ number, mode, theme, displayContent }) => {

  const Content = () => {
    switch (displayContent) {
      case 'Mantine Components':
        return <ComponentShowcase />;
      case 'Repository':
        return <GitHubRepoDemo />;
      default:
        return <ComponentShowcase />;
    }
  };

  const MemoizedContent = useMemo(() => Content, [displayContent]);

  return (
    <MantineProvider
      theme={{ ...theme }}
      forceColorScheme={mode}
      getRootElement={() =>
        document.querySelector<HTMLElement>(`#display-panel-${mode}-${number}`) ?? undefined
      }
      cssVariablesSelector={`#display-panel-${mode}-${number}`}
    >
      <Box
        h={'100%'}
        p={'xl'}
        id={`display-panel-${mode}-${number}`}
        className={`scheme-override-${mode} ${classes.displayPanel}`}
        bg={'var(--mantine-color-body)'}
      >
        <MemoizedContent />
      </Box>
    </MantineProvider>
  );
};

export default ThemeDisplay;
