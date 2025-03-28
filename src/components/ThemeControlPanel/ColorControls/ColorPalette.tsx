import React from 'react';
import { useSelector} from 'react-redux';
import { IconPlus } from '@tabler/icons-react';
import { ActionIcon, Group, Popover, Title, Tooltip } from '@mantine/core';
import ColorEditorPopup from '../Shared/Colors/ColorEditor/ColorEditorPopup';
import ColorEdit from '../Shared/Colors/ColorEditor/ColorEdit';
import classes from './ColorControls.module.css';
import { 
  selectCustomColors,
} from '@/data/OldReduxJunk/themeSelectors';


const ColorPalette: React.FC = () => {
  
  // Use Redux selector instead of context
  const customColors = useSelector(selectCustomColors);

  // Convert Map to Array for rendering
  const colorEntries = React.useMemo(() => 
    Array.from(customColors.entries()),
    [customColors]
  );

  return (
    <>
      <Group gap="xs">
        {colorEntries.map(([colorName]) => (
          <ColorEdit
            key={colorName}
            name={colorName}
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
            <ColorEditorPopup />
          </Popover.Dropdown>
        </Popover>
      </Group>
    </>
  );
};

export default React.memo(ColorPalette);