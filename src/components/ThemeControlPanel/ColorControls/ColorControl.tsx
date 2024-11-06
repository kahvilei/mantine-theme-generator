import React from 'react';
import { Stack } from '@mantine/core';
import ColorDefaults from './ColorDefaultsSettings';
import ColorPalette from './ColorPalette';
import GradientControls from './GradientControls';
import PrimaryColorSettings from './PrimaryColorSettings';

const ColorPanel: React.FC = () => {
  return (
    <Stack>
      <PrimaryColorSettings />
      <GradientControls />
      <ColorPalette />
      <ColorDefaults /> 
    </Stack>
  );
};

export default ColorPanel;
