import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Paper, SegmentedControl, Stack, Text, Title } from '@mantine/core';
import NumberUnitSelector from '@/components/ThemeControlPanel/Shared/Input/NumberUnitSelector';
import { Size, Sizes } from '@/data/Models/Theme/SizeAndSpacing/Sizes';
import { sizes as SizesManager } from '@/data/Store';
import { useTranslation } from 'react-i18next';

interface RadiusControlsProps {
    sizes?: Sizes;
}

const RadiusControls = observer(({ sizes = SizesManager }: RadiusControlsProps) => {
    const { t } = useTranslation(['theme']);
    const radiusSizes: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

    const handleDefaultRadiusChange = (value: Size) => {
        sizes?.setDefaultRadius(value);
    };

    const handleRadiusChange = (size: Size, value: string) => {
        // Ensure radius object exists
        if (!sizes.radius) {
            sizes.radius = {} as Record<Size, string>;
        }
        sizes?.setRadiusSize(size, value);
    };

    return (
        <Box>
            <Title order={4}>{t('layout.radius.title')}</Title>
            <Stack mt="md">
                <Text size="sm">{t('layout.radius.default')}</Text>
                <SegmentedControl
                    data={[
                        { label: 'xs', value: 'xs' },
                        { label: 'sm', value: 'sm' },
                        { label: 'md', value: 'md' },
                        { label: 'lg', value: 'lg' },
                        { label: 'xl', value: 'xl' },
                    ]}
                    value={sizes.defaultRadius as string || 'md'}
                    onChange={(value) => handleDefaultRadiusChange(value as Size)}
                />
                <Text size="sm">{t('layout.radius.settings')}</Text>
                <Paper withBorder p="sm">
                    <Stack>
                        {radiusSizes.map((size) => (
                            <NumberUnitSelector
                                key={size}
                                label={size}
                                value={sizes?.getRadiusSize(size)}
                                onChange={(value) => handleRadiusChange(size, value)}
                                min={0}
                                max={100}
                            />
                        ))}
                    </Stack>
                </Paper>
            </Stack>
        </Box>
    );
});

export default RadiusControls;