import React, { useState } from 'react';
import { Stack, MantineThemeOverride } from '@mantine/core';
import PrimaryColorSettings from './PrimaryColorSettings';
import ColorPalette from './ColorPalette';
import ColorDefaults from './ColorDefaultsSettings';

interface ColorPanelProps {
    theme: MantineThemeOverride;
    updateTheme: (theme: Partial<MantineThemeOverride>) => void;
}

const ColorPanel: React.FC<ColorPanelProps> = ({ theme, updateTheme }) => {
    const [colorKeyColors, setColorKeyColors] = useState<{ [key: string]: string }>({});

    // Initialize colorKeyColors
    for (let color in theme.colors) {
        colorKeyColors[color] = theme.colors[color] ? theme.colors[color][5] : '#000';
    }

    return (
        <Stack mt="md">
            <PrimaryColorSettings 
                theme={theme} 
                updateTheme={updateTheme} 
                colorKeyColors={colorKeyColors}
            />
            <ColorPalette 
                theme={theme} 
                updateTheme={updateTheme} 
                colorKeyColors={colorKeyColors}
                setColorKeyColors={setColorKeyColors}
            />
            <ColorDefaults 
                theme={theme} 
                updateTheme={updateTheme} 
                colorKeyColors={colorKeyColors}
            />
        </Stack>
    );
};

export default ColorPanel;