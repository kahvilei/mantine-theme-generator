import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Box, MantineProvider } from '@mantine/core';
import ComponentShowcase from './Demo Pages/ComponentShowcase';
import GitHubRepoDemo from './Demo Pages/GithubRepo';
import MessagingService from './Demo Pages/MessagingService';
import ArticleDemo from './Demo Pages/ArticleDemo';
import classes from './ThemeDisplay.module.css';
import './ThemeDisplay.css';
import { selectTheme } from '@/data/ThemeState/themeSelectors';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';

export interface ThemeDisplayProps {
  number: number;
  mode: 'light' | 'dark';
  displayContent: string;
}

const ThemeDisplay: React.FC<ThemeDisplayProps> = ({ number, mode, displayContent }) => {
  // Get theme from Redux instead of context
  const theme = useSelector(selectTheme);

  //memoize each content page

  const Content = () => {
    switch (displayContent) {
      case 'UI Demo':
        return <ComponentShowcase />;
      case 'Article':
        return <ArticleDemo />;
      case 'Repository':
        return <GitHubRepoDemo />;
      case 'Messaging Service':
        return <MessagingService />;
      default:
        return <ComponentShowcase />;
    }
  };

  const MemoizedContent = useMemo(() => Content, [displayContent]);

  return (
    <MantineProvider
      theme={{ ...theme as any }}
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