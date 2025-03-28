import { Slider, Stack, Text } from '@mantine/core';
import { sizes } from '@/data/Store';
import {observer} from "mobx-react-lite";

const Scale = observer(() => {

  return (
    <Stack>
      <Text size="sm">Scale</Text>
      <Slider
        min={0.1}
        max={2}
        step={0.1}
        value={sizes.getScale()}
        onChange={(value) => sizes.setScale(value)}
        marks={[
          { value: 0.5, label: '0.5x' },
          { value: 1, label: '1x' },
          { value: 1.5, label: '1.5x' },
          { value: 2, label: '2x' },
        ]}
        label={(value) => `${value}x`}
      />
    </Stack>
  );
});

export default Scale;