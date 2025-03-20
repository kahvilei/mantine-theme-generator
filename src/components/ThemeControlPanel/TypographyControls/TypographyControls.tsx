import { Autocomplete, Stack, Switch, Group, Text } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import HeadingsSettings from './HeadingsSettings';
import FontLoader from './FontLoader';
import {
    selectBodyFontFamily,
    selectHeadingFontFamily,
    selectMonospaceFontFamily,
    selectFontSmoothing,
} from '@/data/ThemeState/themeSelectors';
import {
    setBodyFontFamily,
    setHeadingFontFamily,
    setMonospaceFontFamily,
    setFontSmoothing,
} from '@/data/ThemeState/themeSlice';

// Common system fonts
const systemFonts = [
    'Arial',
    'Helvetica',
    'Verdana',
    'Tahoma',
    'Trebuchet MS',
    'Times New Roman',
    'Georgia',
    'Garamond',
    'Courier New',
    'Brush Script MT',
];

// Popular Google Fonts
const googleFonts = [
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Raleway',
    'Oswald',
    'Ubuntu',
    'Source Sans Pro',
    'Poppins',
    'Nunito',
    'Playfair Display',
    'Merriweather',
    'Noto Sans',
    'PT Sans',
    'Rubik',
];

// All fonts for the body and headings with grouping
const groupedCommonFonts = [
    { group: 'System Fonts', items: systemFonts },
    { group: 'Google Fonts', items: googleFonts }
];

// Monospace fonts (system and Google) with grouping
const systemMonospaceFonts = [
    'Consolas',
    'Courier New',
    'Lucida Console',
    'Monaco',
    'Menlo',
    'DejaVu Sans Mono',
    'Bitstream Vera Sans Mono',
    'Courier',
];

const googleMonospaceFonts = [
    'Fira Code',
    'Source Code Pro',
    'Ubuntu Mono',
    'JetBrains Mono',
    'Roboto Mono',
    'Space Mono',
    'IBM Plex Mono',
];

// All monospace fonts with grouping
const groupedMonospaceFonts = [
    { group: 'System Monospace Fonts', items: systemMonospaceFonts },
    { group: 'Google Monospace Fonts', items: googleMonospaceFonts }
];

// Flat arrays for checking if a font is in our predefined lists
const allCommonFonts = [...systemFonts, ...googleFonts];
const allMonospaceFonts = [...systemMonospaceFonts, ...googleMonospaceFonts];
const allPredefinedFonts = [...allCommonFonts, ...allMonospaceFonts];

// Font preview option component
interface FontOptionProps {
    value: string;
    label: string;
    isMonospace?: boolean;
}

const FontOption = ({ value }: FontOptionProps) => {

    return (
            <Text ff={value} size="sm">{value}</Text>
    );
};

const TypographyControl = () => {
    const dispatch = useDispatch();

    // Selectors
    const bodyFontFamily = useSelector(selectBodyFontFamily);
    const headingFontFamily = useSelector(selectHeadingFontFamily);
    const monospaceFontFamily = useSelector(selectMonospaceFontFamily);
    const fontSmoothing = useSelector(selectFontSmoothing);

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

    const handleFontSmoothingChange = (checked: boolean) => {
        dispatch(setFontSmoothing(checked));
    };

    // For custom font input (not in the predefined list)
    const [customFonts, setCustomFonts] = useState<string[]>([]);

    //adds any needed fonts to css
    FontLoader({predefinedFonts:allPredefinedFonts,customFonts})

    useEffect(() => {
        const newCustomFonts: string[] = [];

        // Check if current fonts are custom (not in our predefined lists)
        if (bodyFontFamily && !allPredefinedFonts.includes(bodyFontFamily)) {
            newCustomFonts.push(bodyFontFamily);
        }

        if (headingFontFamily && !allPredefinedFonts.includes(headingFontFamily)) {
            newCustomFonts.push(headingFontFamily);
        }

        if (monospaceFontFamily && !allPredefinedFonts.includes(monospaceFontFamily)) {
            newCustomFonts.push(monospaceFontFamily);
        }

        if (newCustomFonts.length > 0) {
            setCustomFonts(prev => {
                const combined = [...prev, ...newCustomFonts];
                // Remove duplicates
                return [...new Set(combined)];
            });
        }
    }, [bodyFontFamily, headingFontFamily, monospaceFontFamily]);

    return (
        <Stack>

            <Group mb="xs">
                <Text fw={500}>Typography Settings</Text>
            </Group>

            <Autocomplete
                label="Main Font Family"
                data={groupedCommonFonts}
                value={bodyFontFamily}
                onChange={handleBodyFontFamilyChange}
                placeholder="Select or type a font family"
                renderOption={(props) => (
                        <FontOption value={props.option.value} label={props.option.value} />
                )}
            />

            <Autocomplete
                label="Heading Font Family"
                data={groupedCommonFonts}
                value={headingFontFamily}
                onChange={handleHeadingFontFamilyChange}
                placeholder="Select or type a font family"
                renderOption={(props) => (
                        <FontOption
                            value={props.option.value}
                            label={props.option.value}
                        />
                )}
            />

            <Autocomplete
                label="Monospace Font Family"
                data={groupedMonospaceFonts}
                value={monospaceFontFamily}
                onChange={handleMonospaceFontFamilyChange}
                placeholder="Select or type a monospace font family"
                renderOption={(props) => (
                        <FontOption
                            value={props.option.value}
                            label={props.option.value}
                        />
                )}

            />

            <Switch
                label="Font Smoothing"
                checked={fontSmoothing}
                onChange={(event) => handleFontSmoothingChange(event.currentTarget.checked)}
            />

            <HeadingsSettings />
        </Stack>
    );
};

export default TypographyControl;