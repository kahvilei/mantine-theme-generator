import { Slider, Stack, Text } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectScale } from '@/data/ThemeState/themeSelectors';
import { setScale } from '@/data/ThemeState/themeSlice';

const Scale = () => {
  const dispatch = useDispatch();
  const scale = useSelector(selectScale);

  const handleScaleChange = (value: number) => {
    dispatch(setScale(value));
  };

  return (
    <Stack>
      <Text size="sm">Scale</Text>
      <Slider
        min={0.1}
        max={2}
        step={0.1}
        value={scale}
        onChange={(value) => handleScaleChange(value)}
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
};

export default Scale;