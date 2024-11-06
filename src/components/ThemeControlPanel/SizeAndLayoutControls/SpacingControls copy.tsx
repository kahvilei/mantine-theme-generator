import { useContext } from 'react';
import { Stack, Text, Title, Box} from '@mantine/core';
import ThemeContext from '../ThemeContext/ThemeContext';
import NumberUnitSelector from '../Reusable Controls/NumberUnitSelector';

const SpacingControls = ({ }) => {
  const theme = useContext(ThemeContext);
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
            value={theme.getSpacing(size) || '0px'}
            onChange={(value) => theme.setSpacing(size, value)}
            min={0}
            max={100}
        />
        ))}     
    </Stack>
    </Box>
  );
};

export default SpacingControls;