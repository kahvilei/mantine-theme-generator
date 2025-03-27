// ColorEditorPopup.tsx - Main component
import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Group,
  Popover,
  SegmentedControl,
  Stack,
  Text,
} from '@mantine/core';
import { selectColor } from '@/data/ThemeState/themeSelectors';
import { RootState } from '@/main';
import { checkIsMantine } from '@/utils/checkIsMantine';
import { isVirtualColor } from '@/utils/isVirtualColor';
import StandardColorPanel from './StandardColorPanel';
import VirtualColorPanel from './VirtualColorPanel';

interface ColorEditorPopupProps {
  colorName?: string;
  isDefaultColor?: boolean;
}

const ColorEditorPopup: React.FC<ColorEditorPopupProps> = ({ colorName }) => {
  const isEditing = Boolean(colorName);
  const defaultColorName = colorName || 'blue';

  const colorObject = useSelector((state: RootState) => selectColor(state, defaultColorName));
  const [isVirtual, setIsVirtual] = useState(() => isVirtualColor(colorObject));

  const isMantine = useMemo(() => checkIsMantine(colorName), [colorName]);

  return (
      <Popover.Dropdown variant="shadow">
        <Stack>
          <Group justify="space-between">
            <Text size="sm" color="gray">
              {isEditing ? 'Update' : 'Add'} color
            </Text>

            {!isEditing && (
                <SegmentedControl
                    data={[
                      { value: 'Standard', label: 'Standard' },
                      { value: 'Virtual', label: 'Virtual' }
                    ]}
                    value={isVirtual ? 'Virtual' : 'Standard'}
                    onChange={(value) => setIsVirtual(value === 'Virtual')}
                />
            )}
          </Group>

          {isVirtual ? (
              <VirtualColorPanel
                  colorName={colorName}
                  isEditing={isEditing}
                  isMantine={isMantine}
              />
          ) : (
              <StandardColorPanel
                  colorName={colorName}
                  isEditing={isEditing}
                  isMantine={isMantine}
              />
          )}
        </Stack>
      </Popover.Dropdown>
  );
};

export default ColorEditorPopup;