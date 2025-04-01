import React from "react";
import ThemeSelector from "@/components/ThemeControlPanel/Shared/Themes/ThemeSelector";
import ThemeColorSelector from "@/components/ThemeControlPanel/Shared/Colors/ThemeColorSelector";
import Page from "@/components/ThemeControlPanel/Shared/Layout/EditorPage";
import Section from "@/components/ThemeControlPanel/Shared/Layout/EditorSection";

import {IconColorPicker, IconLayout, IconTypeface} from "@tabler/icons-react";
import ThemeFontsSelector from "@/components/ThemeControlPanel/Shared/Fonts/ThemeFontsSelector";


const QuickSetUp = () => {
    return (
        <Page title="Quick Setup">
            <Section labelIcon={<IconLayout/>} label="Premade themes">
                <ThemeSelector/>
            </Section>
            <Section labelIcon={<IconColorPicker/>} label="Primary color">
                <ThemeColorSelector label="Primary VirtualColor"/>
            </Section>
            <Section labelIcon={<IconTypeface/>} label="Font Families">
                <ThemeFontsSelector/>
            </Section>
        </Page>
    );
};

export default QuickSetUp;