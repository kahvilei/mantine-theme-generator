import { Stack, Text, Slider} from '@mantine/core';
import RadiusControls from './RadiusControls';
import SpacingControls from './SpacingControls';

import ThemeContext from '../ThemeContext/ThemeContext';
import { useContext } from 'react';

const SizeAndLayoutControls = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack mt="md">
      <Stack>
        <Text size="sm">Scale</Text>
        <Slider
          min={0.1}
          max={2}
          step={0.1}
          value={theme.getScale()}
          onChange={(value) => theme.setScale(value)}
          marks={[
            { value: 0.5, label: '0.5x' },
            { value: 1, label: '1x' },
            { value: 1.5, label: '1.5x' },
            { value: 2, label: '2x' },
          ]}
          label={(value) => `${value}x`}
        />
      </Stack>
      <RadiusControls />
      <SpacingControls />
    </Stack>
  );
};

export default SizeAndLayoutControls;