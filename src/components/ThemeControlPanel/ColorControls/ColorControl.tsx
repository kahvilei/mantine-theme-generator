import React from 'react';
import { IconAspectRatio, IconColorPicker, IconColorSwatch } from '@tabler/icons-react';
import MantineColorEdit from '@/components/ThemeControlPanel/Shared/Colors/MantineColorEdit';
import ThemeColorSelector from '@/components/ThemeControlPanel/Shared/Colors/ThemeColorSelector';
import EditorPage from '@/components/ThemeControlPanel/Shared/Layout/EditorPage';
import Section, {
  EditorSubSection as SubSection,
} from '@/components/ThemeControlPanel/Shared/Layout/EditorSection';
import ColorPalette from './ColorPalette';
import GradientControls from './GradientControls';

const ColorPanel = () => {
  return (
    <EditorPage title="Color Controls">
      <Section labelIcon={<IconColorPicker />} label="Primary color">
        <ThemeColorSelector label="Primary Color" />
      </Section>
      <Section labelIcon={<IconColorSwatch />} label="Custom colors">
        <ColorPalette />
      </Section>
      <Section labelIcon={<IconColorSwatch />} label="Mantine color overrides">
        <SubSection label="Content colors">
          <MantineColorEdit group="content" />
        </SubSection>
        <SubSection label="Situational colors">
          <MantineColorEdit group="situation" />
        </SubSection>
        <SubSection label="Other mantine color overrides">
          <MantineColorEdit group="other" />
        </SubSection>
      </Section>
      <Section labelIcon={<IconAspectRatio />} label="Default gradient">
        <GradientControls />
      </Section>
    </EditorPage>
  );
};

export default ColorPanel;
