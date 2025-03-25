import { Group } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectBodyFontFamily,
    selectHeadingFontFamily,
    selectMonospaceFontFamily,

} from '@/data/ThemeState/themeSelectors';
import {
    setBodyFontFamily,
    setHeadingFontFamily,
    setMonospaceFontFamily,

} from '@/data/ThemeState/themeSlice';
import {TypeFaceSelector} from "@/components/ThemeControlPanel/Shared/Fonts/TypeFaceSelector";

const ThemeFontsSelector = () => {
    const dispatch = useDispatch();

    // Selectors
    const bodyFontFamily = useSelector(selectBodyFontFamily);
    const headingFontFamily = useSelector(selectHeadingFontFamily);
    const monospaceFontFamily = useSelector(selectMonospaceFontFamily);

    // Action handlers
    const handleBodyFontFamilyChange = (value: string) => {
        dispatch(setBodyFontFamily(value));
    };

    const handleHeadingFontFamilyChange = (value: string) => {
        dispatch(setHeadingFontFamily(value));
    };

    const handleMonospaceFontFamilyChange = (value: string) => {
        dispatch(setMonospaceFontFamily(value));
    };


    return (
    <Group gap={7}>
        <TypeFaceSelector label="Body" value={bodyFontFamily} onSelect={handleBodyFontFamilyChange}/>
        <TypeFaceSelector label="Headings" value={headingFontFamily} onSelect={handleHeadingFontFamilyChange}/>
        <TypeFaceSelector label="Monospace" value={monospaceFontFamily} onSelect={handleMonospaceFontFamilyChange}/>
    </Group>
    );
};

export default ThemeFontsSelector;