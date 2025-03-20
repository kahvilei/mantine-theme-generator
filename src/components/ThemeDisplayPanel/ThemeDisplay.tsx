import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Box, MantineProvider } from '@mantine/core';
import classes from './ThemeDisplay.module.css';

import './ThemeDisplay.css';

import { selectTheme } from '@/data/ThemeState/themeSelectors';

import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';

import { Overview } from '@/components/ThemeDisplayPanel/Demo Pages/Overview';
import { Typography } from "@/components/ThemeDisplayPanel/Demo Pages/Typography";
import {Components} from "@/components/ThemeDisplayPanel/Demo Pages/Components";
import {Forms} from "@/components/ThemeDisplayPanel/Demo Pages/Forms";
import {Dashboard} from "@/components/ThemeDisplayPanel/Demo Pages/Dashboard";

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
      case 'overview':
        return <Overview />;
      case 'typography':
        return <Typography theme={theme} />
      case 'components':
        return <Components />;
      case 'forms':
        return <Forms />;
        case 'dashboard':
          return <Dashboard />;
      default:
        return <Overview />;
    }
  };

  const MemoizedContent = useMemo(() => Content, [displayContent]);

  return (
    <MantineProvider
      theme={{ ...(theme as any) }}
      forceColorScheme={mode}
      getRootElement={() =>
        document.querySelector<HTMLElement>(`#display-panel-${mode}-${number}`) ?? undefined
      }
      cssVariablesSelector={`#display-panel-${mode}-${number}`}
    >
      <Box
        h="100%"
        p="xl"
        id={`display-panel-${mode}-${number}`}
        className={`scheme-override-${mode} ${classes.displayPanel}`}
        bg="var(--mantine-color-body)"
      >
        <MemoizedContent />
      </Box>
    </MantineProvider>
  );
};

export default ThemeDisplay;
