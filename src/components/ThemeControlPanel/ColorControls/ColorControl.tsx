import {Stack, Title} from '@mantine/core';
import ColorDefaults from './ColorDefaultsSettings';
import ColorPalette from './ColorPalette';
import GradientControls from './GradientControls';
import PrimaryColorSettings from './PrimaryColorSettings';

const ColorPanel = () => {
  return (
      <Stack gap="xl">
        <Title order={2}>Color Controls</Title>
        <PrimaryColorSettings />
          <ColorPalette />
        <GradientControls />
        <ColorDefaults />
    </Stack>
  );
};

export default ColorPanel;
