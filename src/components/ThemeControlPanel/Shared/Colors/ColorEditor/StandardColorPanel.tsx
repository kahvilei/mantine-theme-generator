import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  ColorInput,
  ColorPicker,
  Group,
  MantineColorsTuple,
  Stack,
  TextInput,
} from '@mantine/core';
import { selectColor } from '@/data/OldReduxJunk/themeSelectors';
import { setColor, updateColorShade } from '@/data/OldReduxJunk/themeSlice';
import { RootState } from '@/main';
import generateColors from '@/utils/generateColors';

interface StandardColorPanelProps {
  colorName?: string;
  isEditing: boolean;
  isMantine: boolean;
  setNewColorName: (newColorName: string) => void;
}

const StandardColorPanel: React.FC<StandardColorPanelProps> = ({
  colorName,
  isEditing,
  isMantine,
  setNewColorName,
}) => {
  const dispatch = useDispatch();
  const defaultColorName = colorName || 'blue';

  const [newColorName] = useState(colorName);
  const colorObject = useSelector((state: RootState) => selectColor(state, defaultColorName));

  // Get base color (5th shade)
  const color = colorObject ? (colorObject as MantineColorsTuple)[5] : '#000';
  const [newColorValue, setNewColorValue] = useState(color);

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
              <Button onClick={handleAddColor} disabled={!newColorName}>
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
    </>
  );
};

export default StandardColorPanel;
