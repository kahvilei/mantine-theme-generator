import React from 'react';
import {Group, Text, Box, DEFAULT_THEME, MantineColorsTuple} from '@mantine/core';
import classes from './ThemeSelector.module.css';
import ColorSwatch from "@/components/ThemeControlPanel/Shared/Colors/ColorSwatch";
import {Theme} from "@/data/Models/Theme/Theme";
import {observer} from "mobx-react-lite";

interface ThemePreviewProps {
  theme: Theme;
  name: string;
  selected?: boolean;
}

const ThemePreview: React.FC<ThemePreviewProps> = observer(({ theme, selected=false }: ThemePreviewProps) => {
  const colors = theme.colors.colors?theme.colors.colors:DEFAULT_THEME.colors;
  const primaryColor = theme.colors.primaryColor?theme.colors.primaryColor:'blue';
  const hex = theme.colors.getColorByName(primaryColor)?.getShade();
  const fontFamily = theme.typography.headings?theme.typography.headings.fontFamily:DEFAULT_THEME.fontFamily;

  const lightMode = false;

  const dark = colors.dark as MantineColorsTuple;

  const fontColor = lightMode ? 'black' : dark?dark[0]:DEFAULT_THEME.colors.dark[0];
  const backgroundColor = lightMode ? 'white' : dark?dark[7]:DEFAULT_THEME.colors.dark[7];


  return (
    <Box p="xs" className={classes.themePreview} bd={selected?`.1rem solid ${hex}`:`.1rem solid ${backgroundColor}`} style={{ backgroundColor, fontFamily, borderRadius:'.5rem', border:`4px solid ${hex}`}}>
      <Group justify="space-between" gap="xs">
        <Text size="sm" fw={500} style={{ color: fontColor }}>
          {theme.name}
        </Text>
        <Group gap="5px">
            <ColorSwatch size="xs" colorsInstance={theme.colors} name={primaryColor}/>
        </Group>
      </Group>
    </Box>
  );
});

export default ThemePreview;
       