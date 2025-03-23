import { Stack } from '@mantine/core';
import InteractionAndAccessibilityControls from '@/components/ThemeControlPanel/GeneralControls/InteractionAndAccessibility';
import RadiusControls from '@/components/ThemeControlPanel/GeneralControls/RadiusControls';
import BreakpointControls from './BreakpointControls';
import Scale from './Scale';
import SpacingControls from './SpacingControls';

const SizeAndLayoutControls = () => {
  return (
    <Stack>
      <Scale />
      <SpacingControls />
      <BreakpointControls />
      <RadiusControls />
      <InteractionAndAccessibilityControls />
    </Stack>
  );
};

export default SizeAndLayoutControls;
