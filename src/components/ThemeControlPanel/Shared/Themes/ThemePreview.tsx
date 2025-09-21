import React from 'react';
import { Group, Text, Box, ActionIcon, DEFAULT_THEME, MantineColorsTuple, Tooltip, Stack } from '@mantine/core';
import { IconTrash, IconRefresh } from '@tabler/icons-react';
import classes from './ThemeSelector.module.css';
import ColorSwatch from "@/components/ThemeControlPanel/Shared/Colors/ColorSwatch";
import { Theme } from "@/data/Models/Theme/Theme";
import { observer } from "mobx-react-lite";
import ThemeColorSelector from '../Colors/ThemeColorSelector';
import ThemeFontsSelector from '../Fonts/ThemeFontsSelector';
import { useTranslation } from 'react-i18next';
import Section from "@/components/ThemeControlPanel/Shared/Layout/EditorSection";

interface ThemePreviewProps {
  theme: Theme;
  name: string;
  selected?: boolean;
  onReset?: () => void;   
  onDelete?: () => void;  
}

const ThemePreview: React.FC<ThemePreviewProps> = observer(({ theme, selected = false, onReset, onDelete }: ThemePreviewProps) => {
  const colors = theme.colors.colors ? theme.colors.colors : DEFAULT_THEME.colors;
  const primaryColor = theme.colors.primaryColor ? theme.colors.primaryColor : 'blue';
  const hex = theme.colors.getColorByName(primaryColor)?.getShade(undefined, 'dark');
  const fontFamily = theme.typography.headings ? theme.typography.headings.fontFamily : DEFAULT_THEME.fontFamily;

  const lightMode = false;

  const dark = colors.dark as MantineColorsTuple;

  const fontColor = lightMode ? 'black' : dark ? dark[0] : DEFAULT_THEME.colors.dark[0];
  const backgroundColor = lightMode ? 'white' : dark ? dark[7] : DEFAULT_THEME.colors.dark[7];
  const { t } = useTranslation(['theme']);

  return (
    <Box
      p="xs"
      className={classes.themePreview}
      style={{
        fontFamily,
        borderRadius: '.5rem',
      }}
    >
      <Group justify="space-between" align="center" gap="xs">
        <Group gap="xs">
          <Text size="sm" fw={500} style={{ color: fontColor }}>
            {theme.name}
          </Text>
          <ColorSwatch size="xs" colorsInstance={theme.colors} name={primaryColor} />
          <ColorSwatch size="xs" colorsInstance={theme.colors} name={"dark"} />
          <ColorSwatch size="xs" colorsInstance={theme.colors} name={"gray"} />
        </Group>

        <Group gap="xs">
          {onReset && (
            <Tooltip label="Reset theme" position="top">
              <ActionIcon
                size="sm"
                variant="light"
                onClick={(e) => {
                  e.stopPropagation();
                  onReset();
                }}
              >
                <IconRefresh size={16} />
              </ActionIcon>
            </Tooltip>
          )}

          {onDelete && (
            <Tooltip label="Delete theme" position="top">
              <ActionIcon
                size="sm"
                color="red"
                variant="light"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      </Group>
    </Box>
  );
});

export default ThemePreview;
