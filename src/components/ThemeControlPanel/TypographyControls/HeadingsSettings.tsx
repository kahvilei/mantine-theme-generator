import { Stack, Title } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import NumberUnitSelector from '../Reusable Controls/NumberUnitSelector';
import {
  selectHeadingSize,
  selectHeadingLineHeight,
  selectHeadingWeight,
} from '@/data/ThemeState/themeSelectors';
import {
  setHeadingSize,
  setHeadingLineHeight,
  setHeadingWeight,
} from '@/data/ThemeState/themeSlice';
import { RootState } from '@/data/store';

const HeadingsSettings = () => {
  const dispatch = useDispatch();
  const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

  const getHeadingSize = (heading: typeof headings[number]) => useSelector((state: RootState) => selectHeadingSize(state, heading));
  const getHeadingLineHeight = (heading: typeof headings[number]) => useSelector((state: RootState) => selectHeadingLineHeight(state, heading));
  const getHeadingWeight = (heading: typeof headings[number]) => useSelector((state: RootState) => selectHeadingWeight(state, heading));

  const handleHeadingSizeChange = (heading: typeof headings[number], value: string) => {
    dispatch(setHeadingSize({ key: heading, value: value }));
  };

  const handleHeadingLineHeightChange = (heading: typeof headings[number], value: string) => {
    dispatch(setHeadingLineHeight({ key: heading, value: value }));
  };

  const handleHeadingWeightChange = (heading: typeof headings[number], value: string) => {
    dispatch(setHeadingWeight({ key: heading, value: value }));
  };

  return (
    <Stack mt="md">
      <Title order={4}>Headings</Title>
      {headings.map((heading) => (
        <Stack gap="md" key={heading}>
          <Title order={6} key={heading}>{heading}</Title>
          <NumberUnitSelector
            key={`heading-size-${heading}`} 
            label={'Size'}
            value={getHeadingSize(heading) || '0px'}
            onChange={(value) => handleHeadingSizeChange(heading, value)}
            min={0}
            max={100}
          />
          <NumberUnitSelector
            key={`heading-line-height-${heading}`} 
            label={'Line Height'}
            value={getHeadingLineHeight(heading) || '0px'}
            onChange={(value) => handleHeadingLineHeightChange(heading, value)}
            hasUnits={false}
            step={0.1}
            min={0}
            max={100}
          />
          <NumberUnitSelector
            key={`heading-weight-${heading}`} 
            label={'Weight'}
            value={getHeadingWeight(heading) || '0px'}
            onChange={(value) => handleHeadingWeightChange(heading, value)}
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