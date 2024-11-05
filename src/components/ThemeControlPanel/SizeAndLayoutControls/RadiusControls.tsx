import { useContext } from 'react';
import { Stack, Text, SegmentedControl, Title, Box} from '@mantine/core';
import ThemeContext from '../ThemeContext/ThemeContext';
import NumberUnitSelector from '../Reusable Controls/NumberUnitSelector';

const RadiusControls = ({ }) => {
  const theme = useContext(ThemeContext);
  const radiusSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
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
        value={theme.getDefaultRadius() as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
        onChange={(value) => theme.setDefaultRadius(value as 'xs' | 'sm' | 'md' | 'lg' | 'xl')}
      />
      <Text size="sm">Radius settings</Text>
        {radiusSizes.map((size) => (
        <NumberUnitSelector
            key={size}
            label={size}
            value={theme.getRadius(size) || '0px'}
            onChange={(value) => theme.setRadius(size, value)}
            min={0}
            max={100}
        />
        ))}     
    </Stack>
    </Box>
  );
};

export default RadiusControls;