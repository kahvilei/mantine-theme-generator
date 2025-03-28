import HeadingsSettings from './HeadingsSettings';
import EditorPage from "@/components/ThemeControlPanel/Shared/Layout/EditorPage";
import EditorSection from "@/components/ThemeControlPanel/Shared/Layout/EditorSection";
import {IconTypeface} from "@tabler/icons-react";
import ThemeFontsSelector from "@/components/ThemeControlPanel/Shared/Fonts/ThemeFontsSelector";


const TypographyControl = () => {

    return (
        <EditorPage title="Typeography Settings">
            <EditorSection labelIcon={<IconTypeface/>} label="Font Families">
                 <ThemeFontsSelector/>
            </EditorSection>
            <HeadingsSettings />
        </EditorPage>
    );
};

export default TypographyControl;