import { useContext } from 'react';
import { Stack, Title } from '@mantine/core';
import ThemeContext from '../ThemeContext/ThemeContext';
import NumberUnitSelector from '../Reusable Controls/NumberUnitSelector';


const HeadingsSettings = () => {
  const theme = useContext(ThemeContext);
  const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
  return (
    <Stack mt="md">
      <Title order={4}>Heading Sizes</Title>
      {headings.map((heading) => (
        <NumberUnitSelector
            key={heading} 
            label={heading}
            value={theme.getHeadingSize(heading) || '0px'}
            onChange={(value) => theme.setHeadingSize(heading, value)}
            min={0}
            max={100}
        />
        ))}
    </Stack>
  );
};

export default HeadingsSettings;
