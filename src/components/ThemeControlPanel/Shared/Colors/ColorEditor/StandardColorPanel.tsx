import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, ColorInput, ColorPicker, Group, Stack, TextInput } from '@mantine/core';
import { Colors } from '@/data/Models/Theme/Colors/Colors';
import { CustomColor } from '@/data/Models/Theme/Colors/CustomColor';
import { colors as ColorManager } from '@/data/Store';
import generateColors from '@/utils/generateColors';

interface StandardColorPanelProps {
  colorObject?: CustomColor | null;
  newColorName: string;
  setNewColorName: (name: string) => void;
  isEditing: boolean;
  isMantine: boolean;
  colorsInstance?: Colors;
}

const StandardColorPanel: React.FC<StandardColorPanelProps> = observer(
  ({
    colorObject,
    newColorName,
    setNewColorName,
    isEditing,
    isMantine,
    colorsInstance = ColorManager,
  }) => {
    // Get base color (5th shade) if editing, or use a default color for new ones
    const baseShadeIndex = 5;
    const defaultColor = '#1c7ed6'; // A default blue color

    // Use the color object's shade if it exists, or default for new colors
    const initialColor = colorObject
      ? colorObject.getShade(baseShadeIndex) || defaultColor
      : defaultColor;

    const [newColorValue, setNewColorValue] = useState(initialColor);

    const handleUpdateColorShade = (index: number, newShade: string) => {
      if (colorObject) {
        colorObject.setShade(index, newShade);
      }
    };

    const handleSetColor = (name: string, color: string) => {
      // Generate a color tuple from the base color
      const generatedColors = generateColors(color);

      // For existing colors, update all shades
      if (isEditing && colorObject) {
        generatedColors.forEach((shade, index) => {
          colorObject.setShade(index, shade);
        });
      } else {
        // Create a new color
        const newColor = colorsInstance.createColor(name, 'standard');
        if (newColor) {
          generatedColors.forEach((shade, index) => {
            newColor.setShade(index, shade);
          });
        }
      }
    };

    const handleAddColor = () => {
      if (newColorName && newColorValue) {
        handleSetColor(newColorName, newColorValue);
      }
    };

    const handleColorChange = (color: string) => {
      setNewColorValue(color);
      if (isEditing && colorObject) {
        handleSetColor(colorObject.name, color);
      }
    };

    // Get all shades if editing an existing color
    const allShades = colorObject ? colorObject.getAllShades() : [];

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

          {isEditing && colorObject && (
            <Stack gap={2}>
              {allShades.map((shade: string, index: number) => (
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
          )}
        </Group>
      </>
    );
  }
);

export default StandardColorPanel;
