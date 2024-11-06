import { Stack, Text, Slider} from '@mantine/core';
import RadiusControls from './RadiusControls';
import SpacingControls from './SpacingControls';

import { useThemeContext } from '../ThemeContext/ThemeContext';

const SizeAndLayoutControls = () => {
  const { getScale, setScale } = useThemeContext();

  return (
    <Stack mt="md">
      <Stack>
        <Text size="sm">Scale</Text>
        <Slider
          min={0.1}
          max={2}
          step={0.1}
          value={getScale()}
          onChange={(value) => setScale(value)}
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