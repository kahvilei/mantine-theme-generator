import React from 'react';
import { observer } from 'mobx-react-lite';
import { SegmentedControl, Stack, Switch, Text, Title } from '@mantine/core';
import { Accessibility } from '@/data/Models/Theme/Accessibility/Accessibility';
import { Interaction } from '@/data/Models/Theme/Interaction/Interaction';
import {
  accessibility as AccessibilityManager,
  interaction as InteractionManager,
} from '@/data/Store';

interface InteractionAndAccessibilityControlsProps {
  accessibility?: Accessibility;
  interaction?: Interaction;
}

const InteractionAndAccessibilityControls = observer(
  ({
    accessibility = AccessibilityManager,
    interaction = InteractionManager,
  }: InteractionAndAccessibilityControlsProps) => {
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
        <Title order={4}>Interaction and Accessibility</Title>

        <Text size="sm">Focus Ring</Text>
        <SegmentedControl
          data={[
            { value: 'auto', label: 'Auto' },
            { value: 'always', label: 'Always' },
            { value: 'never', label: 'Never' },
          ]}
          value={interaction.focusRing || 'auto'}
          onChange={(value) => handleFocusRingChange(value as 'auto' | 'always' | 'never')}
        />

        <Text size="sm">Accessibility</Text>
        <Switch
          label="Font Smoothing"
          checked={accessibility.fontSmoothing || false}
          onChange={(event) => handleFontSmoothingChange(event.currentTarget.checked)}
        />

        <Switch
          label="Respect Reduced Motion"
          checked={accessibility.respectReducedMotion || false}
          onChange={(event) => handleRespectReducedMotionChange(event.currentTarget.checked)}
        />

        <Text size="sm">Cursor Type</Text>
        <SegmentedControl
          data={[
            { label: 'Default', value: 'default' },
            { label: 'Pointer', value: 'pointer' },
          ]}
          value={interaction.cursorType || 'default'}
          onChange={(value) => handleCursorTypeChange(value as 'default' | 'pointer')}
        />
      </Stack>
    );
  }
);

export default InteractionAndAccessibilityControls;
