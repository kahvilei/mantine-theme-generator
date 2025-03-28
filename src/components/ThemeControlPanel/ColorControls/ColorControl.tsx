import React from 'react';
import { IconAspectRatio, IconColorPicker, IconColorSwatch } from '@tabler/icons-react';
import ThemeColorSelector from '@/components/ThemeControlPanel/Shared/Colors/ThemeColorSelector';
import EditorPage from '@/components/ThemeControlPanel/Shared/Layout/EditorPage';
import Section from '@/components/ThemeControlPanel/Shared/Layout/EditorSection';
import ColorDefaults from './ColorDefaultsSettings';
import ColorPalette from './ColorPalette';
import GradientControls from './GradientControls';

const ColorPanel = () => {
  return (
    <EditorPage title="Color Controls">
      <Section labelIcon={<IconColorPicker />} label="Primary color">
        <ThemeColorSelector label="Primary Color" />
      </Section>
      <Section labelIcon={<IconColorSwatch />} label="Custom colors">
        <ColorPalette/>
      </Section>
      <Section labelIcon={<IconAspectRatio />} label="Default gradient">
        <GradientControls />
      </Section>
      <Section labelIcon={<IconColorSwatch />} label="Mantine color overrides">
        <ColorDefaults />
      </Section>
    </EditorPage>
  );
};

export default ColorPanel;
