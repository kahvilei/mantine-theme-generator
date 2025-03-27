;
// VirtualColorPanel.tsx
import React, { useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionIcon, Button, Group, Stack, Text, TextInput, Tooltip } from '@mantine/core';
import ThemeColorSelector from '@/components/ThemeControlPanel/Shared/Colors/ThemeColorSelector';
import { selectVirtualColor } from '@/data/ThemeState/themeSelectors';
import { deleteColor, setVirtualColor } from '@/data/ThemeState/themeSlice';
import { RootState } from '@/main';


interface VirtualColorPanelProps {
  colorName?: string;
  isEditing: boolean;
  isMantine: boolean;
}

const VirtualColorPanel: React.FC<VirtualColorPanelProps> = ({
  colorName,
  isEditing,
  isMantine,
}) => {
  const dispatch = useDispatch();
  const defaultColorName = colorName || 'blue';

  const [newColorName, setNewColorName] = useState(colorName);
  const virtualColor = useSelector((state: RootState) =>
    selectVirtualColor(state, defaultColorName)
  );

  const [darkColor, setDarkColor] = useState(virtualColor.dark);
  const [lightColor, setLightColor] = useState(virtualColor.light);

  const handleDeleteColor = (name: string) => {
    dispatch(deleteColor({ colorName: name }));
  };

  const handleAddVirtualColor = () => {
    if (newColorName) {
      dispatch(
        setVirtualColor({
          key: newColorName,
          value: {
            dark: darkColor,
            light: lightColor,
          },
        })
      );
    }
  };

  return (
    <>
      {!isEditing && (
        <TextInput
          label="Name"
          value={newColorName}
          required
          onChange={(event) => setNewColorName(event.currentTarget.value)}
        />
      )}

      <Group align="top" gap="lg">
        <Stack gap="xs" flex={1}>
          <Text size="sm">Dark Theme</Text>
          <ThemeColorSelector mainColor={darkColor} onSelect={setDarkColor} />
        </Stack>

        <Stack gap="xs" flex={1}>
          <Text size="sm">Light Theme</Text>
          <ThemeColorSelector mainColor={lightColor} onSelect={setLightColor} />
        </Stack>
      </Group>

      <Group justify="space-between" mt="md">
        {!isEditing ? (
          <Button onClick={handleAddVirtualColor} disabled={!newColorName}>
            Add Color
          </Button>
        ) : !isMantine ? (
          <Tooltip label="Permanently delete color">
            <ActionIcon
              variant="light"
              color="red"
              onClick={() => colorName && handleDeleteColor(colorName)}
            >
              <IconTrash />
            </ActionIcon>
          </Tooltip>
        ) : null}
      </Group>
    </>
  );
};

export default VirtualColorPanel;
