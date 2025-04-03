import React from 'react';
import { observer } from 'mobx-react-lite';
import { AngleSlider, Group, Stack } from '@mantine/core';
import ThemeColorSelector from '@/components/ThemeControlPanel/Shared/Colors/ThemeColorSelector';
import { Colors } from '@/data/Models/Theme/Colors/Colors';
import { colors as ColorManager } from '@/data/Store';
// Import added but no translations needed in this component yet
import { useTranslation } from 'react-i18next';

interface GradientControlsProps {
    colorsInstance?: Colors;
}

const GradientControls = observer(({ colorsInstance = ColorManager }: GradientControlsProps) => {
    const { t } = useTranslation(['theme']);

    // Get gradient properties from the Colors instance
    const gradientStart = colorsInstance.defaultGradient?.from || 'blue';
    const gradientEnd = colorsInstance.defaultGradient?.to || 'cyan';
    const gradientAngle = colorsInstance.defaultGradient?.deg || 180;

    // Get color shades for preview
    const startColor = colorsInstance.getColorByName(gradientStart)?.getShade() || '';
    const endColor = colorsInstance.getColorByName(gradientEnd)?.getShade() || '';

    // Handler functions
    const handleGradientFromChange = (color: string) => {
        const to = colorsInstance.defaultGradient?.to || 'cyan';
        const deg = colorsInstance.defaultGradient?.deg || 180;
        colorsInstance.setDefaultGradient(color, to, deg);
    };

    const handleGradientToChange = (color: string) => {
        const from = colorsInstance.defaultGradient?.from || 'blue';
        const deg = colorsInstance.defaultGradient?.deg || 180;
        colorsInstance.setDefaultGradient(from, color, deg);
    };

    const handleGradientAngleChange = (value: number) => {
        const from = colorsInstance.defaultGradient?.from || 'blue';
        const to = colorsInstance.defaultGradient?.to || 'cyan';
        colorsInstance.setDefaultGradient(from, to, value);
    };

    return (
        <Stack gap="xs">
            <Group
                justify="space-between"
                align="center"
                style={{
                    width: '100%',
                    height: '150px',
                    padding: '10px',
                    background: `linear-gradient(${gradientAngle}deg, ${startColor}, ${endColor})`,
                    borderRadius: 'var(--mantine-radius-default)',
                }}
            >
                <ThemeColorSelector
                    mainColor={gradientStart}
                    onSelect={handleGradientFromChange}
                />
                <AngleSlider value={gradientAngle} onChange={handleGradientAngleChange} />
                <ThemeColorSelector
                    mainColor={gradientEnd}
                    onSelect={handleGradientToChange}
                />
            </Group>
        </Stack>
    );
});

export default GradientControls;