import { Stack, Text, } from '@mantine/core';
import RadiusControls from './RadiusControls';
import SpacingControls from './SpacingControls';
import Scale from './Scale';

const SizeAndLayoutControls = () => {

  return (
    <Stack mt="md">
      <Scale />
      <RadiusControls />
      <SpacingControls />
    </Stack>
  );
};

export default SizeAndLayoutControls;