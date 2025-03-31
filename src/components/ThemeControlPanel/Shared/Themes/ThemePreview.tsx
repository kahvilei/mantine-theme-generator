import React from 'react';
import { Group, Text, Box, DEFAULT_THEME } from '@mantine/core';
import classes from './ThemeSelector.module.css';
import ColorSwatch from "@/components/ThemeControlPanel/Shared/Colors/ColorSwatch";

interface ThemePreviewProps {
  theme: any;
  name: string;
  selected?: boolean;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ theme, name, selected=false }) => {
  const colors = theme.colors.colors?theme.colors.colors:DEFAULT_THEME.colors;
  const primaryColor = theme.colors.primaryColor?theme.colors.primaryColor:'blue';
  const hex = theme.colors.getColorByName(primaryColor).getShade();
  const fontFamily = theme.headers?theme.headers.fontFamily:DEFAULT_THEME.fontFamily;

  const lightMode = false;

  const fontColor = lightMode ? 'black' : colors.dark?colors.dark[0]:DEFAULT_THEME.colors.dark[0];
  const backgroundColor = lightMode ? 'white' : colors.dark?colors.dark[7]:DEFAULT_THEME.colors.dark[7];


  return (
    <Box p="xs" className={classes.themePreview} bd={selected?`.1rem solid ${hex}`:`.1rem solid ${backgroundColor}`} style={{ backgroundColor, fontFamily, borderRadius:'.5rem', border:`4px solid ${hex}`}}>
      <Group justify="space-between" gap="xs">
        <Text size="sm" fw={500} style={{ color: fontColor }}>
          {name}
        </Text>
        <Group gap="5px">
            <ColorSwatch size="xs" colorsInstance={theme.colors} name={primaryColor}/>
        </Group>
      </Group>
    </Box>
  );
};

export default ThemePreview;
       