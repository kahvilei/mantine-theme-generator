import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, Group, ScrollArea, Stack, Tabs, Text, Title } from '@mantine/core';
import { RootState } from '@/data/store';
import { selectHeadingFontFamily, selectHeadingLineHeight, selectHeadingSize, selectHeadingWeight } from '@/data/ThemeState/themeSelectors';
import { setHeadingLineHeight, setHeadingSize, setHeadingWeight } from '@/data/ThemeState/themeSlice';
import NumberUnitSelector from '@/components/ThemeControlPanel/Shared/Input/NumberUnitSelector';


const HeadingsSettings = () => {
  const dispatch = useDispatch();
  const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
  const fontFamily = useSelector(selectHeadingFontFamily);

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

  const HeadingPreview = ({ heading }: { heading: typeof headings[number] }) => {
    const size = getHeadingSize(heading);
    const lineHeight = getHeadingLineHeight(heading);
    const weight = getHeadingWeight(heading);

    return (
        <Card
            style={{
              fontFamily,
              fontSize: size,
              lineHeight,
              fontWeight: weight,
              padding: '10px',
              marginTop: '10px',
              minHeight: '10rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
        >
          {heading.toUpperCase()} Preview Text
        </Card>
    );
  };

  const HeadingSettings = ({ heading }: { heading: typeof headings[number] }) => (
      <Stack gap="md">
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
        <HeadingPreview heading={heading} />
      </Stack>
  );

  return (
      <Stack mt="md">
        <Title order={4}>Headings</Title>
        <Tabs defaultValue="h1">
          <Tabs.List>
            {headings.map((heading) => (
                <Tabs.Tab key={heading} value={heading}>
                  {heading.toUpperCase()}
                </Tabs.Tab>
            ))}
          </Tabs.List>

          <Box mt="md">
            {headings.map((heading) => (
                <Tabs.Panel key={heading} value={heading}>
                  <HeadingSettings heading={heading} />
                </Tabs.Panel>
            ))}
          </Box>
        </Tabs>
      </Stack>
  );
};

export default HeadingsSettings;