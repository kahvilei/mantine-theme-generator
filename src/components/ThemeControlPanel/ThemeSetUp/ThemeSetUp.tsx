import ThemeSelector from "@/components/ThemeControlPanel/Shared/Themes/ThemeSelector";
import Page from "@/components/ThemeControlPanel/Shared/Layout/EditorPage";
import Section from "@/components/ThemeControlPanel/Shared/Layout/EditorSection";
import { useTranslation } from "react-i18next";
import { UploadTheme } from "../Shared/Themes/themeDownloadUpload";

const ThemeSetUp = () => {
    // Updated to use new namespace
    const { t } = useTranslation(['theme']);

    return (
        <Page title={t('tabs.themeSelect')}>
            <Section label={t('setup.premadeThemes')}>
                <ThemeSelector themeType={'app'}/>     
            </Section>
            <Section label={t('setup.userThemes')}>
                <ThemeSelector themeType={'user'}/>
                <UploadTheme/>
            </Section>
            
        </Page>
    );
};

export default ThemeSetUp;