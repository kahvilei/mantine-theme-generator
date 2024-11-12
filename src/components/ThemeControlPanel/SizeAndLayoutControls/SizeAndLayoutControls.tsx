import { Stack } from '@mantine/core';
import SpacingControls from './SpacingControls';
import Scale from './Scale';
import BreakpointControls from './BreakpointControls';

const SizeAndLayoutControls = () => {

  return (
    <Stack mt="md">
      <Scale />
      <SpacingControls />
      <BreakpointControls />
    </Stack>
  );
};

export default SizeAndLayoutControls;