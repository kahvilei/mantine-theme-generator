import React from "react";
import ThemeSelector from "@/components/ThemeControlPanel/Shared/Themes/ThemeSelector";
import ThemeColorSelector from "@/components/ThemeControlPanel/Shared/Colors/ThemeColorSelector";
import Page from "@/components/ThemeControlPanel/Shared/Layout/EditorPage";
import Section from "@/components/ThemeControlPanel/Shared/Layout/EditorSection";
import { IconColorPicker, IconLayout, IconTypeface } from "@tabler/icons-react";
import ThemeFontsSelector from "@/components/ThemeControlPanel/Shared/Fonts/ThemeFontsSelector";
import { useTranslation } from "react-i18next";
import { UploadTheme } from "../Shared/Themes/themeDownloadUpload";

const QuickSetUp = () => {
    // Updated to use new namespace
    const { t } = useTranslation(['theme']);

    return (
        <Page title={t('tabs.themeSelect')}>
            <Section labelIcon={<IconLayout/>} label={t('setup.premadeThemes')}>
                <ThemeSelector/>     
            </Section>
            <Section labelIcon={<IconLayout/>} label={t('setup.userThemes')}>
                <ThemeSelector userThemes/>
                <UploadTheme/>
            </Section>
            
        </Page>
    );
};

export default QuickSetUp;