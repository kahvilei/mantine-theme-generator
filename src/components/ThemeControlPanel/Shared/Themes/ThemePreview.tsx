import React from 'react';
import { Group, Text, Box, DEFAULT_THEME, ActionIcon } from '@mantine/core';
import classes from './ThemeSelector.module.css';

interface ThemePreviewProps {
  theme: any;
  name: string;
  selected?: boolean;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ theme, name, selected=false }) => {
  const colors = theme.colors?theme.colors:DEFAULT_THEME.colors;
  const primaryColor = theme.primaryColor?theme.primaryColor:'blue';
  const primaryShade = theme.primaryShade?theme.primaryShade.dark?theme.primaryShade.dark:theme.primaryShade:DEFAULT_THEME.primaryShade;
  const fontFamily = theme.headers?theme.headers.fontFamily:DEFAULT_THEME.fontFamily;

  const mainColor = colors[primaryColor]?colors[primaryColor][primaryShade]:DEFAULT_THEME.colors[primaryColor][primaryShade];
  
  const borderColor = mainColor;

  const lightMode = false;

  const fontColor = lightMode ? 'black' : colors.dark?colors.dark[0]:DEFAULT_THEME.colors.dark[0];
  const backgroundColor = lightMode ? 'white' : colors.dark?colors.dark[7]:DEFAULT_THEME.colors.dark[7];
  const accentColor = lightMode ? colors.dark?colors.grey[3]:DEFAULT_THEME.colors.grey[3] : colors.dark?colors.dark[5]:DEFAULT_THEME.colors.dark[5];


  return (
    <Box p="xs" className={classes.themePreview} bd={selected?`.1rem solid ${borderColor}`:`.1rem solid ${backgroundColor}`} style={{ backgroundColor, fontFamily, borderRadius:'.5rem', border:`4px solid ${borderColor}`}}>
      <Group justify="space-between" gap="xs">
        <Text size="sm" fw={500} style={{ color: fontColor }}>
          {name}
        </Text>
        <Group gap="5px">
            <ActionIcon component='div' radius={'lg'} variant='filled' color={mainColor} size='sm' />
        </Group>
      </Group>
    </Box>
  );
};

export default ThemePreview;
       