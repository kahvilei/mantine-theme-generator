
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Group, Stack, Text, TextInput } from '@mantine/core';
import ThemeColorSelector from '@/components/ThemeControlPanel/Shared/Colors/ThemeColorSelector';
import { selectVirtualColor } from '@/data/OldReduxJunk/themeSelectors';
import { RootState } from '@/main';
import {updateColor} from "@/data/OldReduxJunk/themeSlice";


interface VirtualColorPanelProps {
  colorName?: string;
  isEditing: boolean;
  setNewColorName: (newColorName: string) => void;
}

const VirtualColorPanel: React.FC<VirtualColorPanelProps> = ({
  colorName,
  isEditing,
  setNewColorName,
}) => {
  const dispatch = useDispatch();
  const oldName = colorName;

  const [newName] = useState(colorName);
  const virtualColor = useSelector((state: RootState) =>
    selectVirtualColor(state, oldName ?? 'blue')
  );

  const [darkColor, setDarkColor] = useState(virtualColor.dark);
  const [lightColor, setLightColor] = useState(virtualColor.light);

  useEffect(() => {
    dispatch(updateColor({ oldName, newName }));
  }, [newName]);

  useEffect(() => {
    handleAddVirtualColor();
  }, [darkColor, lightColor]);

  const handleAddVirtualColor = () => {
    if (newName) {

    }
  };

  return (
    <>
      <TextInput
        label="Name"
        value={newName}
        required
        onChange={(event) => setNewColorName(event.currentTarget.value)}
      />

      <Group align="top" gap="lg">
        <Stack gap="xs" flex={1}>
          <Text size="sm">Dark</Text>
          <ThemeColorSelector mainColor={darkColor} onSelect={setDarkColor} />
        </Stack>

        <Stack gap="xs" flex={1}>
          <Text size="sm">Light</Text>
          <ThemeColorSelector mainColor={lightColor} onSelect={setLightColor} />
        </Stack>
      </Group>

      <Group justify="space-between" mt="md">
        {!isEditing && (
          <Button onClick={handleAddVirtualColor} disabled={!newName}>
            Add Color
          </Button>
        )}
      </Group>
    </>
  );
};

export default VirtualColorPanel;
