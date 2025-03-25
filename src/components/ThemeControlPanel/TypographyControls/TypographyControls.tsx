import { Switch} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';

import HeadingsSettings from './HeadingsSettings';

import {
    selectFontSmoothing,
} from '@/data/ThemeState/themeSelectors';
import {
    setFontSmoothing,
} from '@/data/ThemeState/themeSlice';
import EditorPage from "@/components/ThemeControlPanel/Shared/Layout/EditorPage";
import EditorSection from "@/components/ThemeControlPanel/Shared/Layout/EditorSection";
import {IconTypeface} from "@tabler/icons-react";
import ThemeFontsSelector from "@/components/ThemeControlPanel/Shared/Fonts/ThemeFontsSelector";


const TypographyControl = () => {
    const dispatch = useDispatch();

    // Selectors
    const fontSmoothing = useSelector(selectFontSmoothing);

    const handleFontSmoothingChange = (checked: boolean) => {
        dispatch(setFontSmoothing(checked));
    };


    return (
        <EditorPage title="Typeography Settings">

            <EditorSection labelIcon={<IconTypeface/>} label="Font Families">
                 <ThemeFontsSelector/>
            </EditorSection>


            <Switch
                label="Font Smoothing"
                checked={fontSmoothing}
                onChange={(event) => handleFontSmoothingChange(event.currentTarget.checked)}
            />

            <HeadingsSettings />
        </EditorPage>
    );
};

export default TypographyControl;