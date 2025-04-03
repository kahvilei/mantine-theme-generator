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
import { useTranslation } from 'react-i18next';

const ColorPanel = () => {
    // Updated to use new namespace
    const { t } = useTranslation(['theme']);

    return (
        <EditorPage title={t('colors.panel.title')}>
            <Section labelIcon={<IconColorPicker />} label={t('colors.panel.primaryColor')}>
                <ThemeColorSelector label={t('colors.panel.primaryColorSelector')} />
            </Section>
            <Section labelIcon={<IconColorSwatch />} label={t('colors.panel.customColors')}>
                <ColorPalette />
            </Section>
            <Section labelIcon={<IconColorSwatch />} label={t('colors.panel.mantineOverrides')}>
                <SubSection label={t('colors.panel.contentColors')}>
                    <MantineColorEdit group="content" />
                </SubSection>
                <SubSection label={t('colors.panel.situationalColors')}>
                    <MantineColorEdit group="situation" />
                </SubSection>
                <SubSection label={t('colors.panel.otherOverrides')}>
                    <MantineColorEdit group="other" />
                </SubSection>
            </Section>
            <Section labelIcon={<IconAspectRatio />} label={t('colors.panel.defaultGradient')}>
                <GradientControls />
            </Section>
        </EditorPage>
    );
};

export default ColorPanel;