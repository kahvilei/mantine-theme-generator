import { Stack, Text, Title, Box } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSpacing,
} from '@/data/ThemeState/themeSelectors';
import {
  setSpacing,
} from '@/data/ThemeState/themeSlice';
import { RootState } from '@/data/store';
import NumberUnitSelector from "@/components/ThemeControlPanel/Shared/Input/NumberUnitSelector";

const SpacingControls = () => {
  const dispatch = useDispatch();
  
  const spacingSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  const handleSpacingChange = (size: typeof spacingSizes[number], value: string) => {
    dispatch(setSpacing({ key:size, value:value }));
  };

  return (
    <Box>
      <Title order={4}>Spacing</Title>
      <Stack mt="md">
        {spacingSizes.map((size) => (
          <NumberUnitSelector
            key={size}
            label={size}
            value={useSelector((state: RootState) => selectSpacing(state, size)) || '0px'}
            onChange={(value) => handleSpacingChange(size, value)}
            min={0}
            max={100}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default SpacingControls;