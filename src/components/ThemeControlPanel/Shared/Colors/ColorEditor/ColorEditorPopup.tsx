;
// ColorEditorPopup.tsx - Main component
import React, { useEffect, useMemo, useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionIcon, Group, Popover, SegmentedControl, Stack, Text, Tooltip } from '@mantine/core';
import { selectColor } from '@/data/OldReduxJunk/themeSelectors';
import { deleteColor, updateColor } from '@/data/OldReduxJunk/themeSlice';
import { RootState } from '@/main';
import { checkIsMantine } from '@/utils/checkIsMantine';
import { isVirtualColor } from '@/utils/isVirtualColor';
import StandardColorPanel from './StandardColorPanel';
import VirtualColorPanel from './VirtualColorPanel';


interface ColorEditorPopupProps {
  colorName?: string;
}

const ColorEditorPopup: React.FC<ColorEditorPopupProps> = ({ colorName }) => {
  const dispatch = useDispatch();
  const isEditing = Boolean(colorName);
  const defaultColorName = colorName || 'blue';

  const oldName = colorName;
  const [newName, setNewColorName] = useState(colorName);

  const colorObject = useSelector((state: RootState) => selectColor(state, defaultColorName));
  const [isVirtual, setIsVirtual] = useState(() => isVirtualColor(colorObject));

  const isMantine = useMemo(() => checkIsMantine(colorName), [colorName]);

  useEffect(() => {
    dispatch(updateColor({ oldName, newName }));
  }, [newName]);

  const handleDeleteColor = (name: string) => {
    dispatch(deleteColor({ colorName: name }));
  };

  return (
    <Popover.Dropdown variant="shadow">
      <Stack>
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
          ) : !isMantine ? (
            <Tooltip label="Permanently delete color">
              <ActionIcon color="red" onClick={() => colorName && handleDeleteColor(colorName)}>
                <IconTrash />
              </ActionIcon>
            </Tooltip>
          ) : null}
        </Group>

        {isVirtual ? (
          <VirtualColorPanel
            colorName={newName}
            setNewColorName={setNewColorName}
            isEditing={isEditing}
          />
        ) : (
          <StandardColorPanel
            colorName={newName}
            setNewColorName={setNewColorName}
            isEditing={isEditing}
            isMantine={isMantine}
          />
        )}
      </Stack>
    </Popover.Dropdown>
  );
};

export default ColorEditorPopup;
