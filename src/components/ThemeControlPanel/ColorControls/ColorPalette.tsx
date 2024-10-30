import React, { useContext, useMemo, useState } from 'react';
import { IconPencil, IconPlus } from '@tabler/icons-react';
import { ActionIcon, Card, ColorSwatch, Group, Popover, Title, Tooltip } from '@mantine/core';
import ThemeContext from '../ThemeContext/ThemeContext';
import ColorEditorPopup from './Reusable Controls/ColorEditorPopup';
import ColorItem from './Reusable Controls/ColorItem';
import classes from './ColorControls.module.css';

const ColorPalette: React.FC = () => {
  const themeManager = useContext(ThemeContext);
  const [newColorName] = useState('');
  const [newColorValue] = useState('#000000');

  // Memoize the custom colors to avoid unnecessary re-renders
  const customColors = useMemo(() => {
    return Array.from(themeManager.getCustomColors().entries());
  }, [themeManager.getCustomColors()]);

  return (
    <Card withBorder padding="lg">
      <Title order={4}>Custom Colors</Title>
      <Group mt="xs">
        {customColors.map(([colorName, shades]) => (
          <ColorItem
            key={colorName}
            name={colorName}
            type="theme"
            description=""
            color={themeManager.getMainColorShade(colorName)}
            onEdit={(color) => themeManager.setColorFromString(colorName, color)}
            onReset={() => themeManager.deleteColor(colorName)}
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
    </Card>
  );
};

export default ColorPalette;
