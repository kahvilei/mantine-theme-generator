import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Card, Stack, Tabs, Title } from '@mantine/core';
import Store from '@/data/Store';
import NumberUnitSelector from '@/components/ThemeControlPanel/Shared/Input/NumberUnitSelector';


const HeadingsSettings = observer(() => {
    const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
    const typography = Store.theme.typography
    const fontFamily = typography.getHeadingFontFamily();

    const handleHeadingSizeChange = (heading: typeof headings[number], value: string) => {
        typography.setHeadingSize(heading, value);
    };

    const handleHeadingLineHeightChange = (heading: typeof headings[number], value: string) => {
        typography.setHeadingLineHeight(heading, value);
    };

    const handleHeadingWeightChange = (heading: typeof headings[number], value: string) => {
        typography.setHeadingWeight(heading, value);
    };

    const HeadingPreview = ({ heading }: { heading: typeof headings[number] }) => {
        const size = typography.getHeadingSize(heading);
        const lineHeight = typography.getHeadingLineHeight(heading);
        const weight = typography.getHeadingWeight(heading);

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
                value={typography.getHeadingSize(heading) || '0px'}
                onChange={(value) => handleHeadingSizeChange(heading, value)}
                min={0}
                max={100}
            />
            <NumberUnitSelector
                key={`heading-line-height-${heading}`}
                label={'Line Height'}
                value={typography.getHeadingLineHeight(heading) || '0px'}
                onChange={(value) => handleHeadingLineHeightChange(heading, value)}
                hasUnits={false}
                step={0.1}
                min={0}
                max={100}
            />
            <NumberUnitSelector
                key={`heading-weight-${heading}`}
                label={'Weight'}
                value={typography.getHeadingWeight(heading) || '0px'}
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
});

export default HeadingsSettings;