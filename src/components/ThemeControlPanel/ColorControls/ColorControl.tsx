import { Stack } from '@mantine/core';
import ColorDefaults from './ColorDefaultsSettings';
import ColorPalette from './ColorPalette';
import GradientControls from './GradientControls';
import PrimaryColorSettings from './PrimaryColorSettings';

const ColorPanel = () => {
  return (
    <Stack>
        <ColorPalette />
        <PrimaryColorSettings />
        <GradientControls />
        <ColorDefaults />
    </Stack>
  );
};

export default ColorPanel;
