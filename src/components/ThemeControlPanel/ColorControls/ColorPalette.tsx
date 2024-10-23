import React, { useContext, useState } from 'react';
import { IconPencil, IconPlus } from '@tabler/icons-react';
import {
  ActionIcon,
  Card,
  ColorSwatch,
  Group,
  MantineColorsTuple,
  Popover,
  Title,
} from '@mantine/core';
import ThemeContext from '../ThemeContext/ThemeContext';
import ColorEditorPopup from './Reusable Controls/ColorEditorPopup';
import classes from './ColorControls.module.css';

const ColorPalette: React.FC = () => {
  const themeManager = useContext(ThemeContext);
  const [newColorName, setNewColorName] = useState('');
  const [newColorValue, setNewColorValue] = useState('#000000');
  const [editingColorName, setEditingColorName] = useState<string>('');

  const addNewColor = () => {
    if (newColorName && newColorValue) {
      themeManager.setColorFromString(newColorName, newColorValue);
      setNewColorName('');
      setNewColorValue('#000000');
    }
  };

  const updateColor = (colorName: string, newBaseColor: string) => {
    themeManager.setColorFromString(colorName, newBaseColor);
  };
  const updateColorName = (oldName: string, newName: string) => {
    if (oldName !== newName && newName.trim() !== '') {
      themeManager.updateColor(
        oldName,
        newName,
        themeManager.getColor(oldName) || ([] as unknown as MantineColorsTuple)
      );
    }
    setEditingColorName('');
  };
  const deleteColor = (colorName: string) => {
    themeManager.deleteColor(colorName);
  };

  return (
    <Card withBorder padding="lg">
      <Title order={4}>Custom Colors</Title>
      <Group mt="xs">
        {Array.from(themeManager.getCustomColors().entries()).map(([colorName, shades]) => (
          <Popover key={colorName} withArrow position="bottom">
            <Popover.Target>
              <ColorSwatch
                color={shades ? shades[5] : '#000000'}
                size={'4rem'}
                className={classes.swatchEditor}
              >
                <IconPencil size="1.5rem" />
              </ColorSwatch>
            </Popover.Target>
            <ColorEditorPopup
              colorName={editingColorName || colorName}
              colorValue={themeManager.getMainColorShade(colorName)}
              isEditing={true}
            />
          </Popover>
        ))}
        <Popover withArrow position="bottom">
          <Popover.Target>
            <ActionIcon radius={'xl'} size="4rem" color="bg" className={classes.colorAdd}>
              <IconPlus />
            </ActionIcon>
          </Popover.Target>
          <ColorEditorPopup colorName={newColorName} colorValue={newColorValue} />
        </Popover>
      </Group>
    </Card>
  );
};

export default ColorPalette;
