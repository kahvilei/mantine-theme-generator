import {Box, createTheme, Group, MantineThemeOverride, Paper, Select, SelectProps, Stack, Text} from '@mantine/core';
import {setTheme} from "@/data/ThemeState/themeSlice";
import ThemePreview from "./ThemePreview";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import classes from "./ThemeSelector.module.css";
import {IconLayout} from "@tabler/icons-react";




interface ThemeSelectorInterface {
    themes: Record<string, Partial<MantineThemeOverride>>;
}

const ThemeSelector = ({themes}:ThemeSelectorInterface) => {
    const [currentThemeName, setCurrentThemeName] = useState('');
    const dispatch = useDispatch();


    const handlePreMadeThemeSelect = (value: string | null) => {
        setCurrentThemeName(value as string);
        dispatch(setTheme(createTheme(themes[value as string])));
    };

    const themeData = Object.keys(themes).map((themeName) => ({ value: themes[themeName], name: themeName }));


    return (
        <Group gap={6}>
            {themeData.map((theme: {value: Partial<MantineThemeOverride>, name: string}) => (
                <Box
                    key={theme.name}
                    className={classes.themeButtonWrap}
                    tabIndex={0}
                    onClick={
                    (e) => {
                        e.preventDefault();
                        handlePreMadeThemeSelect(theme.name)}
                    }
                    onKeyDown={
                        (e) => {

                            if (e.key === 'Enter') {
                            handlePreMadeThemeSelect(theme.name)}}
                    }>

                <ThemePreview selected={currentThemeName === theme.name} theme={theme.value} name={theme.name} />
                </Box>
            ))}
        </Group>
    );
};

export default ThemeSelector;
