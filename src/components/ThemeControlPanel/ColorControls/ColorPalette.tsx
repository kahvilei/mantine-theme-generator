import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconPlus } from '@tabler/icons-react';
import { ActionIcon, Box, Group, Popover, Title, Tooltip } from '@mantine/core';
import ColorEditorPopup from './Reusable Controls/ColorEditorPopup';
import ColorItem from './Reusable Controls/ColorItem';
import classes from './ColorControls.module.css';
import { 
  selectCustomColors,
} from '@/data/ThemeState/themeSelectors';

const ColorPalette: React.FC = () => {
  const dispatch = useDispatch();
  
  // Use Redux selector instead of context
  const customColors = useSelector(selectCustomColors);

  // Convert Map to Array for rendering
  const colorEntries = React.useMemo(() => 
    Array.from(customColors.entries()),
    [customColors]
  );

  return (
    <Box>
      <Title order={4}>Custom Colors</Title>
      <Group mt="xs">
        {colorEntries.map(([colorName, shades]) => (
          <ColorItem
            key={colorName}
            name={colorName}
            type="theme"
            description=""
          />
        ))}
        <Popover withArrow shadow="default" position="bottom">
          <Popover.Target>
            <Tooltip label="Add new color">
              <ActionIcon color="bg" className={classes.colorAdd}>
                <IconPlus />
              </ActionIcon>
            </Tooltip>
          </Popover.Target>
          <ColorEditorPopup />
        </Popover>
      </Group>
    </Box>
  );
};

export default React.memo(ColorPalette);