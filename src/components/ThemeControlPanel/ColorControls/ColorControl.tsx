import React from 'react';
import { Stack } from '@mantine/core';
import ColorDefaults from './ColorDefaultsSettings';
import ColorPalette from './ColorPalette';
import PrimaryColorSettings from './PrimaryColorSettings';


const ColorPanel: React.FC = () => {

  return (
    <Stack mt="md">
      <PrimaryColorSettings/>
      <ColorPalette/>
      <ColorDefaults/>
    </Stack>
  );
};

export default ColorPanel;