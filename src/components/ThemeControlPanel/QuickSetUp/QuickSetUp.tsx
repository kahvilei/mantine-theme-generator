import {MantineThemeOverride} from '@mantine/core';
import premadeThemes from "@/components/ThemeControlPanel/Shared/Themes/premadeThemes.json";

import React from "react";
import ThemeSelector from "@/components/ThemeControlPanel/Shared/Themes/ThemeSelector";
import ThemeColorSelector from "@/components/ThemeControlPanel/Shared/Colors/ThemeColorSelector";
import Page from "@/components/ThemeControlPanel/Shared/Layout/EditorPage";
import Section from "@/components/ThemeControlPanel/Shared/Layout/EditorSection";

import {IconColorSwatch, IconLayout, IconTypeface} from "@tabler/icons-react";
import ThemeFontsSelector from "@/components/ThemeControlPanel/Shared/Fonts/ThemeFontsSelector";


const QuickSetUp = () => {
    return (
        <Page title="Quick Setup">
            <Section labelIcon={<IconLayout/>} label="Premade themes">
                <ThemeSelector themes={premadeThemes as unknown as Record<string, Partial<MantineThemeOverride>>} />
            </Section>
            <Section labelIcon={<IconColorSwatch/>} label="Primary color">
                <ThemeColorSelector label="Primary Color"/>
            </Section>
            <Section labelIcon={<IconTypeface/>} label="Font Families">
                <ThemeFontsSelector/>
            </Section>
        </Page>
    );
};

export default QuickSetUp;