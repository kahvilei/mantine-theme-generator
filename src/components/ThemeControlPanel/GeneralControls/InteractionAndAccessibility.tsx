import React from 'react';
import { observer } from 'mobx-react-lite';
import { SegmentedControl, Stack, Switch, Text, Title } from '@mantine/core';
import { Accessibility } from '@/data/Models/Theme/Accessibility/Accessibility';
import { Interaction } from '@/data/Models/Theme/Interaction/Interaction';
import {
    accessibility as AccessibilityManager,
    interaction as InteractionManager,
} from '@/data/Store';
import { useTranslation } from 'react-i18next';

interface InteractionAndAccessibilityControlsProps {
    accessibility?: Accessibility;
    interaction?: Interaction;
}

const InteractionAndAccessibilityControls = observer(
    ({
         accessibility = AccessibilityManager,
         interaction = InteractionManager,
     }: InteractionAndAccessibilityControlsProps) => {
        const { t } = useTranslation(['theme']);

        const handleFocusRingChange = (value: 'auto' | 'always' | 'never') => {
            interaction.focusRing = value;
        };

        const handleRespectReducedMotionChange = (checked: boolean) => {
            accessibility.respectReducedMotion = checked;
        };

        const handleCursorTypeChange = (value: 'default' | 'pointer') => {
            interaction.cursorType = value;
        };

        const handleFontSmoothingChange = (checked: boolean) => {
            accessibility.fontSmoothing = checked;
        };

        return (
            <Stack>
                <Title order={4}>{t('interaction.title')}</Title>

                <Text size="sm">{t('interaction.focusRing')}</Text>
                <SegmentedControl
                    data={[
                        { value: 'auto', label: t('interaction.options.auto') },
                        { value: 'always', label: t('interaction.options.always') },
                        { value: 'never', label: t('interaction.options.never') },
                    ]}
                    value={interaction.focusRing || 'auto'}
                    onChange={(value) => handleFocusRingChange(value as 'auto' | 'always' | 'never')}
                />

                <Text size="sm">{t('interaction.accessibility')}</Text>
                <Switch
                    label={t('interaction.fontSmoothing')}
                    checked={accessibility.fontSmoothing || false}
                    onChange={(event) => handleFontSmoothingChange(event.currentTarget.checked)}
                />

                <Switch
                    label={t('interaction.respectReducedMotion')}
                    checked={accessibility.respectReducedMotion || false}
                    onChange={(event) => handleRespectReducedMotionChange(event.currentTarget.checked)}
                />

                <Text size="sm">{t('interaction.cursorType')}</Text>
                <SegmentedControl
                    data={[
                        { label: t('interaction.options.default'), value: 'default' },
                        { label: t('interaction.options.pointer'), value: 'pointer' },
                    ]}
                    value={interaction.cursorType || 'default'}
                    onChange={(value) => handleCursorTypeChange(value as 'default' | 'pointer')}
                />
            </Stack>
        );
    }
);

export default InteractionAndAccessibilityControls;