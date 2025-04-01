import React, { useEffect, useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import { ActionIcon, Group, SegmentedControl, Stack, Text, Tooltip } from '@mantine/core';
import { Colors } from '@/data/Models/Theme/Colors/Colors';
import { colors as ColorManager } from '@/data/Store';
import StandardColorPanel from './StandardColorPanel';
import VirtualColorPanel from './VirtualColorPanel';
import {VirtualColor} from "@/data/Models/Theme/Colors/Color Classes/VirtualColor";

interface ColorEditorPopupProps {
  name?: string;
  colorsInstance?: Colors;
}

const ColorEditorPopup: React.FC<ColorEditorPopupProps> = observer(
  ({ name, colorsInstance = ColorManager }) => {
    const isEditing = Boolean(name);

    // Get the color object if editing
    const colorObject = name ? colorsInstance.getColorByName(name) : null;

    // State for new color name
    const [newColorName, setNewColorName] = useState(name || '');

    useEffect(() => {
        colorObject?.rename(newColorName);
    }, [newColorName]);

    // State for color type (virtual or standard)
    const [isVirtual, setIsVirtual] = useState((colorObject instanceof VirtualColor) || false);

    // Check if it's a Mantine default color
    const isMantine = colorObject?.type === 'override' || false;

    const handleDeleteColor = (uuid: string) => {
      colorsInstance.deleteColor(uuid);
    };

    return (
      <Stack gap="md">
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            {isEditing ? 'Update' : 'Add'} color
          </Text>

          {!isEditing ? (
            <SegmentedControl
              data={[
                { value: 'Standard', label: 'Standard' },
                { value: 'Virtual', label: 'Virtual' },
              ]}
              value={isVirtual ? 'Virtual' : 'Standard'}
              onChange={(value) => setIsVirtual(value === 'Virtual')}
            />
          ) : !isMantine && colorObject ? (
            <Tooltip label="Permanently delete color">
              <ActionIcon color="red" onClick={() => handleDeleteColor(colorObject.uuid)}>
                <IconTrash />
              </ActionIcon>
            </Tooltip>
          ) : null}
        </Group>

        {isVirtual ? (
          <VirtualColorPanel
            colorObject={colorObject as VirtualColor}
            newColorName={newColorName}
            setNewColorName={setNewColorName}
            isEditing={isEditing}
            colorsInstance={colorsInstance}
          />
        ) : (
          <StandardColorPanel
            colorObject={colorObject}
            newColorName={newColorName}
            setNewColorName={setNewColorName}
            isEditing={isEditing}
            isMantine={isMantine}
            colorsInstance={colorsInstance}
          />
        )}
      </Stack>
    );
  }
);

export default ColorEditorPopup;
