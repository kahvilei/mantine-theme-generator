import React from 'react';
import { Group, Text, Box, ActionIcon, DEFAULT_THEME, MantineColorsTuple, Tooltip, Stack, Card } from '@mantine/core';
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
  const primaryColor = theme.colors.primaryColor ? theme.colors.primaryColor : 'blue';
  const fontFamily = theme.typography.headings ? theme.typography.headings.fontFamily : DEFAULT_THEME.fontFamily;

  return (
    <Card
      p="xs"
      className={classes.themePreview}
      style={{
        fontFamily,
        borderRadius: '.5rem',
      }}
      withBorder={selected}
    >
      <Group justify="space-between" align="center" gap="xs">
        <Group gap="xs">
          <Text size="sm" fw={500}>
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
    </Card>
  );
});

export default ThemePreview;
