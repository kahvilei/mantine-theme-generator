import React from 'react';
import { Card, Group, Text, Box, DEFAULT_THEME, ColorSwatch, ActionIcon } from '@mantine/core';
import { IconAdCircle, IconApple, IconDog, IconLeaf, IconPalette, IconTrash, IconTrashFilled, IconUser } from '@tabler/icons-react';
import classes from './Header.module.css';

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
  const defaultRadius = theme.defaultRadius?theme.defaultRadius:DEFAULT_THEME.defaultRadius;

  const mainColor = colors[primaryColor]?colors[primaryColor][primaryShade]:DEFAULT_THEME.colors[primaryColor][primaryShade];
  const firstFontFamily = fontFamily.split(',')[0].replace(/['"]+/g, '');

  const gray = colors['gray']?colors['gray'][5]:DEFAULT_THEME.colors['gray'][5];
  const borderColor = mainColor;
  
  const fontColor = lightMode ? 'black' : colors['dark']?colors['dark'][0]:DEFAULT_THEME.colors['dark'][0];
  const fontColorSecondary = lightMode ? gray : colors['dark']?colors['dark'][2]:DEFAULT_THEME.colors['dark'][2];
  const backgroundColor = lightMode ? 'white' : colors['dark']?colors['dark'][7]:DEFAULT_THEME.colors['dark'][7];


  return (
    <Box p="xs" className={classes.themePreview} style={{ backgroundColor: backgroundColor, fontFamily:fontFamily, width:"100%", borderRadius:'.5rem', border:`2px solid ${borderColor}`}}>
      <Group justify="space-between" gap="xs">
        <Text size="sm" fw={500} style={{ color: fontColor }}>
          {name}
        </Text>
        <Group gap="5px">
            <ActionIcon component='div' variant='filled' color={mainColor} size='sm' style={{borderRadius:`var(--mantine-radius-${defaultRadius})`}}>
                <IconPalette/>
            </ActionIcon>
        </Group>
      </Group>
    </Box>
  );
};

export default ThemePreview;
       