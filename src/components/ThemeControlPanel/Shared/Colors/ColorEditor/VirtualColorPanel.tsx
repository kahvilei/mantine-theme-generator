import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Group, Stack, Text, TextInput } from '@mantine/core';
import ThemeColorSelector from '@/components/ThemeControlPanel/Shared/Colors/ThemeColorSelector';
import { Colors } from '@/data/Models/Theme/Colors/Colors';
import { CustomColor } from '@/data/Models/Theme/Colors/CustomColor';
import { colors as ColorManager } from '@/data/Store';

interface VirtualColorPanelProps {
  colorObject?: CustomColor | null;
  newColorName: string;
  setNewColorName: (name: string) => void;
  isEditing: boolean;
  colorsInstance?: Colors;
}

const VirtualColorPanel: React.FC<VirtualColorPanelProps> = observer(
  ({ colorObject, newColorName, setNewColorName, isEditing, colorsInstance = ColorManager }) => {
    // Initialize with current values if editing, or defaults if creating new
    const [darkColor, setDarkColor] = useState(
      colorObject?.type === 'virtual' ? colorObject.colorKeys.dark : 'blue'
    );

    const [lightColor, setLightColor] = useState(
      colorObject?.type === 'virtual' ? colorObject.colorKeys.light : 'blue'
    );

    useEffect(() => {
      // Update the virtual color whenever source colors change
      if (isEditing && colorObject?.type === 'virtual') {
        colorObject.setVirtualColorSource('dark', darkColor);
        colorObject.setVirtualColorSource('light', lightColor);
      }
    }, [darkColor, lightColor, colorObject, isEditing]);

    const handleAddVirtualColor = () => {
      if (newColorName && !isEditing) {
        // Create a new virtual color
        colorsInstance.createColor(newColorName, 'virtual', { dark: darkColor, light: lightColor });
      }
    };

    return (
      <>
        <TextInput
          label="Name"
          value={newColorName}
          required
          onChange={(event) => setNewColorName(event.currentTarget.value)}
          disabled={isEditing && colorObject?.type === 'override'}
        />

        <Group align="top" gap="lg">
          <Stack gap="xs" flex={1}>
            <Text size="sm">Dark</Text>
            <ThemeColorSelector
              colors={colorsInstance}
              mainColor={darkColor}
              onSelect={setDarkColor}
            />
          </Stack>

          <Stack gap="xs" flex={1}>
            <Text size="sm">Light</Text>
            <ThemeColorSelector
              colors={colorsInstance}
              mainColor={lightColor}
              onSelect={setLightColor}
            />
          </Stack>
        </Group>

        <Group justify="space-between" mt="md">
          {!isEditing && (
            <Button onClick={handleAddVirtualColor} disabled={!newColorName}>
              Add Color
            </Button>
          )}
        </Group>
      </>
    );
  }
);

export default VirtualColorPanel;
