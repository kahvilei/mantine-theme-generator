;
// StandardColorPanel.tsx
import React, { useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionIcon, Button, ColorInput, ColorPicker, Group, MantineColorsTuple, Stack, TextInput, Tooltip } from '@mantine/core';
import { selectColor } from '@/data/ThemeState/themeSelectors';
import { deleteColor, setColor, updateColorShade } from '@/data/ThemeState/themeSlice';
import { RootState } from '@/main';
import generateColors from '@/utils/generateColors';


interface StandardColorPanelProps {
  colorName?: string;
  isEditing: boolean;
  isMantine: boolean;
}

const StandardColorPanel: React.FC<StandardColorPanelProps> = ({
  colorName,
  isEditing,
  isMantine,
}) => {
  const dispatch = useDispatch();
  const defaultColorName = colorName || 'blue';

  const [newColorName, setNewColorName] = useState(colorName);
  const colorObject = useSelector((state: RootState) => selectColor(state, defaultColorName));

  // Get base color (5th shade)
  const color = colorObject ? (colorObject as MantineColorsTuple)[5] : '#000';
  const [newColorValue, setNewColorValue] = useState(color);

  const handleDeleteColor = (name: string) => {
    dispatch(deleteColor({ colorName: name }));
  };

  const handleUpdateColorShade = (index: number, newShade: string) => {
    if (colorName) {
      dispatch(
        updateColorShade({
          colorName,
          index,
          newShade,
        })
      );
    }
  };

  const handleSetColor = (name: string, color: string) => {
    const generatedColors = generateColors(color);
    dispatch(
      setColor({
        key: name,
        value: generatedColors as unknown as MantineColorsTuple,
      })
    );
  };

  const handleAddColor = () => {
    if (newColorName && newColorValue) {
      handleSetColor(newColorName, newColorValue);
    }
  };

  const handleColorChange = (color: string) => {
    setNewColorValue(color);
    if (isEditing && newColorName) {
      handleSetColor(newColorName, color);
    }
  };

  return (
    <>
      <Group align="top">
        <Stack flex={1}>
          {!isMantine && (
            <TextInput
              label="Name"
              value={newColorName}
              required
              onChange={(event) => setNewColorName(event.currentTarget.value)}
            />
          )}

          <ColorInput
            label="Color"
            value={newColorValue}
            required
            withPicker={false}
            onChange={handleColorChange}
          />

          <ColorPicker format="rgba" value={newColorValue} onChange={handleColorChange} />

          {!isEditing && (
            <Group justify="left">
              <Button onClick={handleAddColor} disabled={!newColorName || !newColorValue}>
                Add Color
              </Button>
            </Group>
          )}
        </Stack>

        <Stack gap={2}>
          {(colorObject as MantineColorsTuple)?.map((shade: string, index: number) => (
            <Group key={index}>
              <ColorInput
                value={shade}
                onChange={(color) => handleUpdateColorShade(index, color)}
                aria-label={`Shade ${index}`}
                popoverProps={{
                  withinPortal: false,
                }}
                w={150}
              />
            </Group>
          ))}
        </Stack>
      </Group>

      {isEditing && !isMantine && (
        <Group justify="right" mt="sm">
          <Tooltip label="Permanently delete color">
            <ActionIcon
              variant="light"
              color="red"
              onClick={() => colorName && handleDeleteColor(colorName)}
            >
              <IconTrash />
            </ActionIcon>
          </Tooltip>
        </Group>
      )}
    </>
  );
};

export default StandardColorPanel;
