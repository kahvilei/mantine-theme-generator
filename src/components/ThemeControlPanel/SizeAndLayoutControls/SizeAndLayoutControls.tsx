import { Stack } from '@mantine/core';
import SpacingControls from './SpacingControls';
import Scale from './Scale';
import BreakpointControls from './BreakpointControls';

const SizeAndLayoutControls = () => {

  return (
    <Stack>
      <Scale />
      <SpacingControls />
      <BreakpointControls />
    </Stack>
  );
};

export default SizeAndLayoutControls;