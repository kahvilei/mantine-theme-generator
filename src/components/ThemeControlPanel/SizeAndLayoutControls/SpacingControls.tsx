import { Stack, Text, Title, Box} from '@mantine/core';
import NumberUnitSelector from '../Reusable Controls/NumberUnitSelector';
import { useThemeContext } from '../ThemeContext/ThemeContext';

const SpacingControls = ({ }) => {
  const { getSpacing, setSpacing } = useThemeContext();
  
  const spacingSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  return (
    <Box>
      <Title order={4}>Spacing</Title>
    <Stack mt="md">
      <Text size="sm">Spacing settings</Text>
        {spacingSizes.map((size) => (
        <NumberUnitSelector
            key={size}
            label={size}
            value={getSpacing(size) || '0px'}
            onChange={(value) => setSpacing(size, value)}
            min={0}
            max={100}
        />
        ))}     
    </Stack>
    </Box>
  );
};

export default SpacingControls;