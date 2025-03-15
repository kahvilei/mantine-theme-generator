import {Stack, Text, SegmentedControl, Title, Box, Paper} from '@mantine/core';
import NumberUnitSelector from '../Reusable Controls/NumberUnitSelector';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDefaultRadius,
  selectRadius,
} from '@/data/ThemeState/themeSelectors';
import {
  setDefaultRadius,
  setRadius,
} from '@/data/ThemeState/themeSlice';

import { RootState } from '@/data/store';

const RadiusControls = () => {
  const dispatch = useDispatch();

  const defaultRadius = useSelector(selectDefaultRadius);
  const radiusSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  const handleDefaultRadiusChange = (value: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
    dispatch(setDefaultRadius(value));
  };

  const handleRadiusChange = (size: typeof radiusSizes[number], value: string) => {
    dispatch(setRadius({ key:size, value }));
  };

  return (
    <Box>
      <Title order={4}>Radius</Title>
      <Stack mt="md">
        <Text size="sm">Default Radius</Text>
        <SegmentedControl
          data={[
            { label: 'xs', value: 'xs' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
            { label: 'xl', value: 'xl' }
          ]}
          value={defaultRadius as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
          onChange={(value) => handleDefaultRadiusChange(value as 'xs' | 'sm' | 'md' | 'lg' | 'xl')}
        />
        <Text size="sm">Radius settings</Text>
          <Paper withBorder p={"sm"}>
              <Stack>
        {radiusSizes.map((size) => (
          <NumberUnitSelector
            key={size}
            label={size}
            value={useSelector((state:RootState) => selectRadius(state, size)) || '0px'}
            onChange={(value) => handleRadiusChange(size, value)}
            min={0}
            max={100}
          />
        ))}</Stack></Paper>
      </Stack>
    </Box>
  );
};

export default RadiusControls;