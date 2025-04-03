import HeadingsSettings from './HeadingsSettings';
import EditorPage from "@/components/ThemeControlPanel/Shared/Layout/EditorPage";
import EditorSection from "@/components/ThemeControlPanel/Shared/Layout/EditorSection";
import { IconTypeface } from "@tabler/icons-react";
import ThemeFontsSelector from "@/components/ThemeControlPanel/Shared/Fonts/ThemeFontsSelector";
import { useTranslation } from 'react-i18next';

const TypographyControl = () => {
    const { t } = useTranslation(['theme']);

    return (
        <EditorPage title={t('typography.settings')}>
            <EditorSection labelIcon={<IconTypeface/>} label={t('setup.fontFamilies')}>
                <ThemeFontsSelector/>
            </EditorSection>
            <HeadingsSettings />
        </EditorPage>
    );
};

export default TypographyControl;