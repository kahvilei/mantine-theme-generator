import React from 'react';
import { IconColorSwatch, IconTrash } from '@tabler/icons-react';
import {
  ActionIcon,
  Button,
  ColorInput,
  ColorPicker,
  ColorSwatch,
  Group,
  Modal,
  Popover,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setColor, 
  updateColorShade, 
  deleteColor 
} from '@/data/ThemeState/themeSlice';
import generateColors from '../../../../utils/generateColors';
import type { ColorTuple } from '@/data/types';
import { RootState } from '@/main';

interface ColorEditorPopupProps {
  colorName?: string;
  colorValue?: string;
  isEditing?: boolean;
  isDefaultColor?: boolean;
}

const ColorEditorPopup: React.FC<ColorEditorPopupProps> = ({
  colorName,
  colorValue,
  isEditing = false,
  isDefaultColor = false,
}) => {
  const dispatch = useDispatch();
  
  const [isShadeModalOpen, setIsShadeModalOpen] = React.useState(false);
  const [currentEditingColor, setCurrentEditingColor] = React.useState(colorName);
  const [newColorName, setNewColorName] = React.useState(colorName);
  const [newColorValue, setNewColorValue] = React.useState(colorValue);

  // Get color shades from Redux state
  const colorShades = useSelector((state: RootState) => 
    currentEditingColor 
      ? state.theme.theme.colors?.[currentEditingColor] 
      : undefined
  );

  const handleUpdateColorShade = (index: number, newShade: string) => {
    if (currentEditingColor) {
      dispatch(updateColorShade({ 
        colorName: currentEditingColor, 
        index, 
        newShade 
      }));
    }
  };

  const handleSetColor = (name: string, color: string) => {
    const generatedColors = generateColors(color) as ColorTuple;
    dispatch(setColor({ 
      key: name, 
      value: generatedColors 
    }));
  };

  const handleDeleteColor = (name: string) => {
    dispatch(deleteColor({ colorName: name }));
  };

  const handleAddColor = () => {
    if (newColorName && newColorValue) {
      handleSetColor(newColorName, newColorValue);
    }
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
                        if (colorName) {
                          handleDeleteColor(colorName);
                        }
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
              if (isEditing && newColorName) {
                handleSetColor(newColorName, color);
              }
            }}
          />
          <ColorPicker
            value={newColorValue}
            onChange={(color) => {
              setNewColorValue(color);
              if (isEditing && newColorName) {
                handleSetColor(newColorName, color);
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
          {colorShades?.map((shade: string, index: number) => (
            <Group key={index}>
              <ColorInput
                value={shade}
                onChange={(color) => handleUpdateColorShade(index, color)}
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