import React from 'react';
import { IconPencil, IconSelector, IconTrash } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import { ActionIcon, Card, Stack } from '@mantine/core';
import { CustomColor } from '@/data/Models/Theme/Colors/CustomColor';
import { colors as ColorManager } from '@/data/Store';
import classes from './ColorSwatch.module.css';

interface ColorSwatchProps {
  name?: string; // Either provide a color name
  colorObject?: CustomColor; // Or a direct color object
  type?: 'display' | 'edit' | 'select' | 'delete';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  colorsInstance?: typeof ColorManager; // Optional custom colors instance
}

const ColorSwatch: React.FC<ColorSwatchProps> = observer(
  ({
    name,
    colorObject,
    type = 'display',
    size = 'md',
    onClick,
    colorsInstance = ColorManager,
  }) => {
    // Get the color object either directly or by name from the colors instance
    const color = colorObject || (name && colorsInstance.getColorByName(name));

    if (!color) {
      console.error('ColorSwatch: No valid color provided');
      return null;
    }

    // Get color values for light and dark modes from the CustomColor instance
    const colorLight = color.getShade(undefined, 'light');
    const colorDark = color.getShade(undefined, 'dark');

    // Map of icons by type
    const icons = {
      edit: <IconPencil size={14} />,
      select: <IconSelector size={14} />,
      delete: <IconTrash size={14} />,
    };

    return (
      <Card
        bg={`-moz-linear-gradient(45deg, ${colorDark} 50%, ${colorLight} 50%)`}
        className={`${classes.colorItem} ${classes[size]}`}
        data-type={type}
        tabIndex={0}
        onClick={onClick}
        title={color.name}
      >
        {type !== 'display' && (
          <Stack align="flex-end" justify="start">
            <ActionIcon component="div" size="xs">
              {icons[type]}
            </ActionIcon>
          </Stack>
        )}
      </Card>
    );
  }
);

export default ColorSwatch;
