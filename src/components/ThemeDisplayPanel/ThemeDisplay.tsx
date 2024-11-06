import React, { useMemo } from 'react';
import { Box, MantineProvider } from '@mantine/core';

import { useThemeContext } from '../ThemeControlPanel/ThemeContext/ThemeContext';

import './ThemeDisplay.css';

import ComponentShowcase from './Demo Pages/ComponentShowcase';
import GitHubRepoDemo from './Demo Pages/GithubRepo';
import MessagingService from './Demo Pages/MessagingService';
import classes from './ThemeDisplay.module.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';

export interface ThemeDisplayProps {
  number: number;
  mode: 'light' | 'dark';
  displayContent: string;
}

const ThemeDisplay: React.FC<ThemeDisplayProps> = ({ number, mode, displayContent }) => {
  const Content = () => {
    switch (displayContent) {
      case 'UI Demo':
        return <ComponentShowcase />;
      case 'Repository':
        return <GitHubRepoDemo />;
      case 'Messaging Service':
        return <MessagingService />;
      default:
        return <ComponentShowcase />;
    }
  };

  const MemoizedContent = useMemo(() => Content, [displayContent]);

  const { theme } = useThemeContext();

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
