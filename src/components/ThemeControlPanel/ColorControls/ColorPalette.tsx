import React, { useState, useContext } from 'react';
import { IconPencil, IconPlus } from '@tabler/icons-react';
import {
  ActionIcon,
  Card,
  ColorSwatch,
  Group,
  Popover,
  Title,
  MantineColorsTuple
} from '@mantine/core';
import ThemeContext from '../ThemeContext/ThemeContext';
import classes from './ColorControls.module.css';
import ColorEditorPopup from './Reusable Controls/ColorEditorPopup';

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
      themeManager.updateColor(oldName, newName, themeManager.getColor(oldName) || [] as unknown as MantineColorsTuple);
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
              onColorNameChange={(name) => setEditingColorName(name)}
              onColorValueChange={(color) => updateColor(colorName, color)}
              onSave={() => updateColorName(colorName, editingColorName)}
              onDelete={() => deleteColor(colorName)}
              isEditing={true}
              themeManager={themeManager}
            />
          </Popover>
        ))}
        <Popover withArrow position="bottom">
          <Popover.Target>
            <ActionIcon radius={'xl'} size="4rem" color="bg" className={classes.colorAdd}>
              <IconPlus />
            </ActionIcon>
          </Popover.Target>
          <ColorEditorPopup
            colorName={newColorName}
            colorValue={newColorValue}
            onColorNameChange={setNewColorName}
            onColorValueChange={setNewColorValue}
            onSave={addNewColor}
            themeManager={themeManager}
          />
        </Popover>
      </Group>
    </Card>
  );
};

export default ColorPalette;