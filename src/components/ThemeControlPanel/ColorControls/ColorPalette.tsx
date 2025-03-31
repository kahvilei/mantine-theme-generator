import React from 'react';
import { IconPlus } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import { ActionIcon, Group, Popover, Tooltip } from '@mantine/core';
import { Colors } from '@/data/Models/Theme/Colors/Colors';
import { colors as ColorManager } from '@/data/Store';
import ColorEdit from '../Shared/Colors/ColorEditor/ColorEdit';
import ColorEditorPopup from '../Shared/Colors/ColorEditor/ColorEditorPopup';
import classes from './ColorControls.module.css';

interface ColorPaletteProps {
  colorsInstance?: Colors;
}

const ColorPalette: React.FC<ColorPaletteProps> = observer(({ colorsInstance = ColorManager }) => {
  // Get custom colors (type "standard" or "virtual") from the Colors class
  const customColors = colorsInstance.getCustomColors();

  return (
    <>
      <Group gap="xs">
        {customColors.map((colorObject) => (
          <ColorEdit
            key={colorObject.uuid}
            name={colorObject.name}
          />
        ))}
        <Popover withArrow shadow="default" position="bottom">
          <Popover.Target>
            <Tooltip label="Add new color">
              <ActionIcon variant="light" m={0} className={classes.colorAdd}>
                <IconPlus />
              </ActionIcon>
            </Tooltip>
          </Popover.Target>
          <Popover.Dropdown>
            <ColorEditorPopup/>
          </Popover.Dropdown>
        </Popover>
      </Group>
    </>
  );
});

export default ColorPalette;
