import React from 'react';
import { observer } from 'mobx-react-lite';
import {Box, createTheme, Group, MantineProvider, Stack} from '@mantine/core';
import { Theme as ThemeClass } from '@/data/Models/Theme/Theme';
import { theme } from '@/data/Store';
import classes from './ThemeDisplay.module.css';

import './ThemeDisplay.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';

import { Components } from '@/components/ThemeDisplayPanel/Demo Pages/Components';
import { Dashboard } from '@/components/ThemeDisplayPanel/Demo Pages/Dashboard';
import { Forms } from '@/components/ThemeDisplayPanel/Demo Pages/Forms';
import { Typography } from '@/components/ThemeDisplayPanel/Demo Pages/Typography';

export interface ThemeDisplayProps {
  number: number;
  mode: 'light' | 'dark';
  displayContent: string;
  themeOverride?: ThemeClass; // Optional theme prop to allow explicit theme passing
}

const ThemeDisplay: React.FC<ThemeDisplayProps> = observer(
  ({ number, mode, displayContent, themeOverride = theme }) => {
    // Get theme from MobX store if not explicitly provided
    const currentTheme = createTheme(themeOverride.compile());

    // Memoize each content page
    const Content = () => {
      switch (displayContent) {
        case 'typography':
          return <Typography theme={currentTheme} />;
        case 'components':
          return <Components />;
        case 'forms':
          return <Forms />;
        case 'dashboard':
          return <Dashboard />;
        default:
          return <Dashboard />;
      }
    };

    return (
        <Box className={classes.displayWipe}>
      <MantineProvider
        theme={currentTheme}
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
          <Stack align="center">
          <Group className={classes.displayContent}>
            <Content />
          </Group>
          </Stack>
        </Box>
      </MantineProvider></Box>
    );
  }
);

export default ThemeDisplay;
