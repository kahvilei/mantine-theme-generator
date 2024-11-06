import { useContext } from 'react';
import { Stack, Title } from '@mantine/core';
import ThemeContext from '../ThemeContext/ThemeContext';
import NumberUnitSelector from '../Reusable Controls/NumberUnitSelector';


const HeadingsSettings = () => {
  const theme = useContext(ThemeContext);
  const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
  return (
    <Stack mt="md">
      <Title order={4}>Headings</Title>
      {headings.map((heading) => (
        <Stack gap="md" key={heading}>
        <Title order={6} key={heading}>{heading}</Title>
        <NumberUnitSelector
            key={`heading-size-${heading}`} 
            label={'Size'}
            value={theme.getHeadingSize(heading) || '0px'}
            onChange={(value) => theme.setHeadingSize(heading, value)}
            min={0}
            max={100}
        />
        <NumberUnitSelector
            key={`heading-line-height-${heading}`} 
            label={'Line Height'}
            value={theme.getHeadingLineHeight(heading) || '0px'}
            onChange={(value) => theme.setHeadingLineHeight(heading, value)}
            hasUnits={false}
            step={0.1}
            min={0}
            max={100}
        />
        <NumberUnitSelector
            key={`heading-weight-${heading}`} 
            label={'Weight'}
            value={theme.getHeadingWeight(heading) || '0px'}
            onChange={(value) => theme.setHeadingWeight(heading, value)}
            hasUnits={false}
            step={100}
            min={100}
            max={800}
        />
        </Stack>
        ))}
    </Stack>
  );
};

export default HeadingsSettings;
