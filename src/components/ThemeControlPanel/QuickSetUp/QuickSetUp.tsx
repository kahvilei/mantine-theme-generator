import {createTheme, Select, SelectProps, Stack} from '@mantine/core';
import {setTheme} from "@/data/ThemeState/themeSlice";
import ThemePreview from "@/components/Header/ThemePreview";
import React, {useState} from "react";
import premadeThemes from "@/data/premadeThemes.json";
import {useDispatch} from "react-redux";

const QuickSetUp = () => {
    const themes = JSON.parse(JSON.stringify(premadeThemes));
    const [currentThemeName, setCurrentThemeName] = useState('');
    const dispatch = useDispatch();

    const handlePreMadeThemeSelect = (value: string | null) => {
        setCurrentThemeName(value as string);
        const newTheme = createTheme(themes[value as string]);
        dispatch(setTheme(newTheme));
    };

    const themeOptions: SelectProps['renderOption'] = ({ option }) => (
        <ThemePreview theme={themes[option.value]} name={option.value} />
    );

    const themeData = Object.keys(themes).map((themeName) => ({ value: themeName, label: themeName }));

    return (
        <Stack>
              <Select
                  placeholder="Select a pre-made theme"
                  data={themeData}
                  renderOption={themeOptions}
                  value={currentThemeName ? currentThemeName : 'mantine'}
                  onChange={handlePreMadeThemeSelect}
                  allowDeselect={false}
              />
        </Stack>
    );
};

export default QuickSetUp;