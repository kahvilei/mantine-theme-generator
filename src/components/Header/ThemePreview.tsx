import React from 'react';
import { Group, Text, Box, DEFAULT_THEME, ActionIcon } from '@mantine/core';
import classes from '../Header/Header.module.css';

interface ThemePreviewProps {
  theme: any;
  name: string;
  lightMode?: boolean;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ theme, name, lightMode=false }) => {
  const colors = theme.colors?theme.colors:DEFAULT_THEME.colors;
  const primaryColor = theme.primaryColor?theme.primaryColor:'blue';
  const primaryShade = theme.primaryShade?theme.primaryShade.dark?theme.primaryShade.dark:theme.primaryShade:DEFAULT_THEME.primaryShade;
  const fontFamily = theme.fontFamily?theme.fontFamily:DEFAULT_THEME.fontFamily;

  const mainColor = colors[primaryColor]?colors[primaryColor][primaryShade]:DEFAULT_THEME.colors[primaryColor][primaryShade];
  
  const borderColor = mainColor;
  
  const fontColor = lightMode ? 'black' : colors.dark?colors.dark[0]:DEFAULT_THEME.colors.dark[0];
  const backgroundColor = lightMode ? 'white' : colors.dark?colors.dark[7]:DEFAULT_THEME.colors.dark[7];


  return (
    <Box p="xs" className={classes.themePreview} bd={`2px solid ${borderColor}`} style={{ backgroundColor, fontFamily, width:"100%", borderRadius:'.5rem', border:`4px solid ${borderColor}`}}>
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
       