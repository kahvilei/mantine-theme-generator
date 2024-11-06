import React, { useContext, useMemo, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { ActionIcon, Box, Group, Popover, Title, Tooltip } from '@mantine/core';
import { useThemeContext } from '../ThemeContext/ThemeContext';
import ColorEditorPopup from './Reusable Controls/ColorEditorPopup';
import ColorItem from './Reusable Controls/ColorItem';
import classes from './ColorControls.module.css';

const ColorPalette: React.FC = () => {
  
  const [newColorName] = useState('');
  const [newColorValue] = useState('#000000');
  const { getCustomColors, getMainColorShade, setColorFromString, deleteColor } = useThemeContext();

  // Memoize the custom colors to avoid unnecessary re-renders
  const customColors = useMemo(() => {
    return Array.from(getCustomColors().entries());
  }, [getCustomColors()]);

  return (
    <Box>
      <Title order={4}>Custom Colors</Title>
      <Group mt="xs">
        {customColors.map(([colorName, shades]) => (
          <ColorItem
            key={colorName}
            name={colorName}
            type="theme"
            description=""
            color={getMainColorShade(colorName)}
            onEdit={(color) => setColorFromString(colorName, color)}
            onReset={() => deleteColor(colorName)}
          />
        ))}
        <Popover withArrow shadow="default" position="bottom">
          <Popover.Target>
            <Tooltip label="Add new color">
              <ActionIcon color="bg" className={classes.colorAdd}>
                <IconPlus />
              </ActionIcon>
            </Tooltip>
          </Popover.Target>
          <ColorEditorPopup colorName={newColorName} colorValue={newColorValue} />
        </Popover>
      </Group>
    </Box>
  );
};

export default ColorPalette;
