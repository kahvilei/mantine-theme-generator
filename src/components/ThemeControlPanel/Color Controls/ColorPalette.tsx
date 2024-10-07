import React, { useState } from 'react';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import {
  ActionIcon,
  Button,
  Card,
  ColorInput,
  ColorPicker,
  ColorSwatch,
  DEFAULT_THEME,
  Group,
  MantineThemeOverride,
  Modal,
  Popover,
  SelectProps,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import generateShades from '../../../utils/generateColors';
import classes from './ColorControls.module.css';

interface ColorPaletteProps {
  theme: MantineThemeOverride;
  updateTheme: (theme: Partial<MantineThemeOverride>) => void;
  colorKeyColors: { [key: string]: string };
  setColorKeyColors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  theme,
  updateTheme,
  colorKeyColors,
  setColorKeyColors,
}) => {
  const currentTheme = DEFAULT_THEME;
  const [newColorName, setNewColorName] = useState('');
  const [newColorValue, setNewColorValue] = useState('#000000');
  const [editingColorName, setEditingColorName] = useState<string>('');
  const [isShadeModalOpen, setIsShadeModalOpen] = useState<boolean>(false);
  const [currentEditingColor, setCurrentEditingColor] = useState<string>('');

  for (let color in theme.colors) {
    colorKeyColors[color] = theme.colors[color] ? theme.colors[color][5] : '#000';
  }

  const addNewColor = () => {
    if (newColorName && newColorValue) {
      updateTheme({
        colors: {
          ...theme.colors,
          [newColorName]: generateShades(newColorValue),
        },
      });
      setColorKeyColors({ ...colorKeyColors, [newColorName]: newColorValue });
      setNewColorName('');
      setNewColorValue('#000000');
    }
  };

  const updateColor = (colorName: string, newBaseColor: string) => {
    updateTheme({
      colors: {
        ...theme.colors,
        [colorName]: generateShades(newBaseColor),
      },
    });
    setColorKeyColors((prevColors) => ({
      ...prevColors,
      [colorName]: newBaseColor,
    }));
  };

  const updateColorName = (oldName: string, newName: string) => {
    if (oldName !== newName && newName.trim() !== '') {
      const updatedColors = { ...theme.colors };
      updatedColors[newName] = updatedColors[oldName];
      delete updatedColors[oldName];
      updateTheme({ colors: updatedColors });
      if (theme.primaryColor === oldName) {
        updateTheme({ primaryColor: newName });
      }
      setColorKeyColors((prevColors) => {
        const updatedKeyColors = { ...prevColors };
        updatedKeyColors[newName] = updatedKeyColors[oldName];
        delete updatedKeyColors[oldName];
        return updatedKeyColors;
      });
    }
    // make sure the input is made undefined after the change
    setEditingColorName('');
  };

  const deleteColor = (colorName: string) => {
    const updatedColors = { ...theme.colors };
    delete updatedColors[colorName];
    updateTheme({ colors: updatedColors });
    if (theme.primaryColor === colorName) {
      updateTheme({ primaryColor: Object.keys(updatedColors)[0] });
    }
    setColorKeyColors((prevColors) => {
      const updatedKeyColors = { ...prevColors };
      delete updatedKeyColors[colorName];
      return updatedKeyColors;
    });
  };

  const openShadeModal = (colorName: string) => {
    setCurrentEditingColor(colorName);
    setIsShadeModalOpen(true);
  };

  const updateColorShade = (index: number, newShade: string) => {
    if (theme.colors && theme.colors[currentEditingColor]) {
      const updatedShades = [...theme.colors[currentEditingColor]];
      updatedShades[index] = newShade;
      updateTheme({
        colors: {
          ...theme.colors,
          [currentEditingColor]: updatedShades,
        },
      });
    }
  };

  return (
    <Card withBorder padding="lg">
      <Title order={4}>Color Palette</Title>
      <Group mt="xs">
        {Object.entries(theme.colors || currentTheme.colors).map(([colorName, shades]) => (
          <Popover key={colorName} withArrow position="bottom">
            <Popover.Target>
              <ColorSwatch
                color={shades ? (shades[5] as string) : '#000000'}
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
                  value={colorKeyColors[colorName]}
                  onChange={(color) => updateColor(colorName, color)}
                />
                <ColorPicker
                  value={colorKeyColors[colorName]}
                  onChange={(color) => updateColor(colorName, color)}
                  swatches={Object.values(colorKeyColors)}
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
          {theme.colors &&
            theme.colors[currentEditingColor] &&
            theme.colors[currentEditingColor].map((shade, index) => (
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
