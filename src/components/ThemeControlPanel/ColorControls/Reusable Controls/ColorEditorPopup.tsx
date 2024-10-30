import React, { useContext } from 'react';
import { IconColorSwatch, IconTrash } from '@tabler/icons-react';
import {
  ActionIcon,
  Button,
  ColorInput,
  ColorPicker,
  ColorSwatch,
  Group,
  MantineColorsTuple,
  Modal,
  Popover,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import generateColors from '../../../../utils/generateColors';
import ThemeContext from '../../ThemeContext/ThemeContext';

interface ColorEditorPopupProps {
  colorName: string;
  colorValue: string;
  isEditing?: boolean;
  isDefaultColor?: boolean; // New prop to indicate if the color is a default color
}

const ColorEditorPopup: React.FC<ColorEditorPopupProps> = ({
  colorName,
  colorValue,
  isEditing = false,
  isDefaultColor = false, // Default to false
}) => {
  const [isShadeModalOpen, setIsShadeModalOpen] = React.useState(false);
  const [currentEditingColor, setCurrentEditingColor] = React.useState(colorName);
  const [newColorName, setNewColorName] = React.useState(colorName);
  const [newColorValue, setNewColorValue] = React.useState(colorValue);
  const themeManager = useContext(ThemeContext);

  const updateColorShade = (index: number, newShade: string) => {
    themeManager.updateColorShade(currentEditingColor, index, newShade);
  };

  const handleAddColor = () => {
    themeManager.setColor(
      newColorName,
      generateColors(newColorValue) as unknown as MantineColorsTuple
    );
  };

  return (
    <>
      <Popover.Dropdown variant="shadow">
        <Stack>
          <Group justify="space-between">
            <Text size="sm" color="gray">
              {isEditing ? 'Update' : 'Add'} color
            </Text>

            {isEditing && (
              <Group gap={5}>
                <Tooltip label="Fine-tune color shades">
                  <ActionIcon onClick={() => setIsShadeModalOpen(true)}>
                    <IconColorSwatch />
                  </ActionIcon>
                </Tooltip>
                {isEditing && !isDefaultColor && (
                  <Tooltip label="Permanently delete color">
                    <ActionIcon
                      variant="light"
                      color="red"
                      onClick={() => {
                        themeManager.deleteColor(colorName);
                      }}
                    >
                      <IconTrash />
                    </ActionIcon>
                  </Tooltip>
                )}
              </Group>
            )}
          </Group>

          {!isDefaultColor && (
            <TextInput
              label="Color Name"
              value={newColorName}
              required
              onChange={(event) => setNewColorName(event.currentTarget.value)}
            />
          )}

          <ColorInput
            label="Color Value"
            value={newColorValue}
            required
            onChange={(color) => {
              setNewColorValue(color);
              if (isEditing) {
                themeManager.setColor(
                  newColorName,
                  generateColors(color) as unknown as MantineColorsTuple
                );
              }
            }}
          />
          <ColorPicker
            value={newColorValue}
            onChange={(color) => {
              setNewColorValue(color);
              if (isEditing) {
                themeManager.setColor(
                  newColorName,
                  generateColors(color) as unknown as MantineColorsTuple
                );
              }
            }}
          />
          {!isEditing && (
            <Group justify="left">
              <Button onClick={handleAddColor}>Add Color</Button>
            </Group>
          )}
        </Stack>
      </Popover.Dropdown>

      <Modal
        opened={isShadeModalOpen}
        onClose={() => setIsShadeModalOpen(false)}
        title={`Fine-tune Shades for ${currentEditingColor}`}
      >
        <Stack>
          {themeManager.getColor(currentEditingColor)?.map((shade: string, index: number) => (
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
    </>
  );
};

export default ColorEditorPopup;
