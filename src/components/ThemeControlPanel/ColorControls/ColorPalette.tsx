import React, { useState, useContext } from 'react';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import {
  ActionIcon,
  Button,
  Card,
  ColorInput,
  ColorPicker,
  ColorSwatch,
  Group,
  Modal,
  Popover,
  Stack,
  Text,
  TextInput,
  Title,
  MantineColorsTuple
} from '@mantine/core';
import ThemeContext from '../ThemeContext/ThemeContext';
import classes from './ColorControls.module.css';

const ColorPalette: React.FC = () => {
  const themeManager = useContext(ThemeContext);
  const [newColorName, setNewColorName] = useState('');
  const [newColorValue, setNewColorValue] = useState('#000000');
  const [editingColorName, setEditingColorName] = useState<string>('');
  const [isShadeModalOpen, setIsShadeModalOpen] = useState<boolean>(false);
  const [currentEditingColor, setCurrentEditingColor] = useState<string>('');

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
    // We need to add a method to ThemeManager to handle color deletion
    themeManager.deleteColor(colorName);
  };

  const openShadeModal = (colorName: string) => {
    setCurrentEditingColor(colorName);
    setIsShadeModalOpen(true);
  };

  const updateColorShade = (index: number, newShade: string) => {
    // We need to add a method to ThemeManager to handle updating individual shades
    themeManager.updateColorShade(currentEditingColor, index, newShade);
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
            <Popover.Dropdown>
              <Stack>
                <Group align="end">
                  <TextInput
                    label={'name'}
                    value={editingColorName || colorName}
                    onChange={(event) => setEditingColorName(event.currentTarget.value)}
                    onBlur={() => updateColorName(colorName, editingColorName)}
                  />
                  <ActionIcon color="red" onClick={() => deleteColor(colorName)}>
                    <IconTrash />
                  </ActionIcon>
                </Group>
                <ColorInput
                  withPicker={false}
                  pointer
                  label="color"
                  value={themeManager.getMainColorShade(colorName)}
                  onChange={(color) => updateColor(colorName, color)}
                />
                <ColorPicker
                  value={themeManager.getMainColorShade(colorName)}
                  onChange={(color) => updateColor(colorName, color)}
                  swatches={themeManager.getAllMainColorArray()}
                />
                <Button onClick={() => openShadeModal(colorName)}>Fine-tune Shades</Button>
              </Stack>
            </Popover.Dropdown>
          </Popover>
        ))}
        <Popover withArrow position="bottom">
          <Popover.Target>
            <ActionIcon radius={'xl'} size="4rem" color="bg" className={classes.colorAdd}>
              <IconPlus />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <Text size="sm" mt="md">
              Add New Color
            </Text>
            <Group align="flex-end">
              <TextInput
                label="Color Name"
                value={newColorName}
                onChange={(event) => setNewColorName(event.currentTarget.value)}
              />
              <ColorInput label="Color Value" value={newColorValue} onChange={setNewColorValue} />
              <Button onClick={addNewColor}>Add</Button>
            </Group>
          </Popover.Dropdown>
        </Popover>
      </Group>

      <Modal
        opened={isShadeModalOpen}
        onClose={() => setIsShadeModalOpen(false)}
        title={`Fine-tune Shades for ${currentEditingColor}`}
      >
        <Stack>
          {themeManager.getColor(currentEditingColor)?.map((shade, index) => (
            <Group key={index}>
              <ColorInput
                value={shade}
                onChange={(color) => updateColorShade(index, color)}
                label={`Shade ${index}`}
                style={{ flex: 1 }}
              />
              <ColorSwatch color={shade} size={30} />
            </Group>
          ))}
        </Stack>
      </Modal>
    </Card>
  );
};

export default ColorPalette;


