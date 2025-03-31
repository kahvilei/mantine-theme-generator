import React from 'react';
import { Box, Popover } from '@mantine/core';
import ColorEditorPopup from '@/components/ThemeControlPanel/Shared/Colors/ColorEditor/ColorEditorPopup';
import ColorSwatch from '@/components/ThemeControlPanel/Shared/Colors/ColorSwatch';

interface ColorEditProps {
  name: string;
}

const ColorEdit: React.FC<ColorEditProps> = ({ name }) => {

  return (
    <Popover
      position="bottom"
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <Box>
          <ColorSwatch name={name} type="edit" />
        </Box>
      </Popover.Target>
      <Popover.Dropdown>
        <ColorEditorPopup name={name}/>
      </Popover.Dropdown>
    </Popover>
  );
};

export default ColorEdit;
