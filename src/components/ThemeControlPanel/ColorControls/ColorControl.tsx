import React from 'react';
import { Stack } from '@mantine/core';
import ColorDefaults from './ColorDefaultsSettings';
import ColorPalette from './ColorPalette';
import PrimaryColorSettings from './PrimaryColorSettings';
import GradientControls from './GradientControls';

const ColorPanel: React.FC = () => {
  return (
    <Stack mt="md">
      <PrimaryColorSettings />
      <ColorPalette />
      <GradientControls />
      <ColorDefaults />
    </Stack>
  );
};

export default ColorPanel;
