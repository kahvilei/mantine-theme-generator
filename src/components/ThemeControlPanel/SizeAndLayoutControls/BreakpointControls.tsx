import { Stack, Text, Title, Box } from '@mantine/core';
import NumberUnitSelector from '../Reusable Controls/NumberUnitSelector';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBreakpoints,
} from '@/data/ThemeState/themeSelectors';
import {
  setBreakpoint,
} from '@/data/ThemeState/themeSlice';

const BreakpointControls = () => {
  const dispatch = useDispatch();

  const breakpoints = useSelector(selectBreakpoints);
  const breakpointSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  const handleBreakpointChange = (size: typeof breakpointSizes[number], value: string) => {
    dispatch(setBreakpoint({ key: size, value }));
  };

  return (
    <Box>
      <Title order={4}>Breakpoints</Title>
      <Stack mt="md">
        {breakpointSizes.map((size) => (
          <NumberUnitSelector
            key={size}
            label={size}
            value={breakpoints[size] || '0px'}
            onChange={(value) => handleBreakpointChange(size, value)}
            min={0}
            max={2000}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default BreakpointControls;