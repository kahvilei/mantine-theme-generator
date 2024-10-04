import React, { useState } from 'react';
import {
    Card,
    ColorSwatch,
    DEFAULT_THEME,
    Group,
    MantineColorShade,
    MantineThemeOverride,
    NumberInput,
    Select,
    SelectProps,
    Slider,
    Stack,
    Switch,
    Text,
    Title,
} from '@mantine/core';
import generateShades from '../../../utils/generateColors';

interface PrimaryColorSettingsProps {
    theme: MantineThemeOverride;
    updateTheme: (theme: Partial<MantineThemeOverride>) => void;
    colorKeyColors: { [key: string]: string };
}

const PrimaryColorSettings: React.FC<PrimaryColorSettingsProps> = ({ theme, updateTheme, colorKeyColors }) => {
    const currentTheme = DEFAULT_THEME;
    const [useVariableColorShades, setUseVariableColorShades] = useState<boolean>(
        typeof theme.primaryShade === 'object'
    );
    const [useAutoContrast, setAutoContrast] = useState<boolean>(theme.autoContrast as boolean);

    const renderSliderMarks = () => {
        const marks = [];
        const primaryColor = theme.primaryColor ? theme.primaryColor : 'blue';
        const primaryShades = theme.colors ? theme.colors[primaryColor] : generateShades('#000');
        for (let i = 0; i < 10; i++) {
            marks.push({
                value: i,
                label: (
                    <ColorSwatch
                        color={primaryShades?.[i] ?? '#000'}
                        size={20}
                    />
                ),
            });
        }
        return marks;
    };

    const handlePrimaryShadeChange = (value: number | { light: number; dark: number }) => {
        if (useVariableColorShades) {
            updateTheme({
                primaryShade: {
                    light: typeof value === 'object' ? value.light as MantineColorShade : value as MantineColorShade,
                    dark: typeof value === 'object' ? value.dark as MantineColorShade : value as MantineColorShade,
                },
            });
        } else {
            updateTheme({ primaryShade: value as MantineColorShade });
        }
    };

    const renderColorSelect: SelectProps['renderOption'] = ({ option, checked }) => (
        <Group>
            <ColorSwatch color={colorKeyColors[option.value]} size={'20px'} />
            <Text>{option.value}</Text>
        </Group>
    );

    return (
        <Card withBorder padding="lg">
            <Title order={4}>Primary Color Settings</Title>
            <Stack mt="md">
                <Select
                    label="Primary Color"
                    data={Object.keys(theme.colors || currentTheme.colors)}
                    value={theme.primaryColor || Object.keys(theme.colors || currentTheme.colors)[0]}
                    onChange={(value) => updateTheme({ primaryColor: value as string })}
                    renderOption={renderColorSelect}
                    leftSection={
                        <ColorSwatch
                            color={colorKeyColors[theme.primaryColor ? theme.primaryColor : '0']}
                            size={20}
                        />
                    }
                />

                <Switch
                    label="Use different shades for light and dark modes"
                    checked={useVariableColorShades}
                    onChange={(event) => {
                        setUseVariableColorShades(event.currentTarget.checked);
                        if (event.currentTarget.checked) {
                            handlePrimaryShadeChange({ light: 6, dark: 8 });
                        } else {
                            handlePrimaryShadeChange(6);
                        }
                    }}
                />

                {useVariableColorShades ? (
                    <>
                        <Text size="sm" mt="md">Light Mode Primary Shade</Text>
                        <Slider
                            min={0}
                            max={9}
                            step={1}
                            marks={renderSliderMarks()}
                            value={typeof theme.primaryShade === 'object' ? theme.primaryShade.light : 6}
                            pb={'l'}
                            onChange={(value) =>
                                handlePrimaryShadeChange({
                                    light: value,
                                    dark: typeof theme.primaryShade === 'object' ? theme.primaryShade.dark ?? 8 : 8,
                                })
                            }
                        />
                        <Text size="sm" mt="md">Dark Mode Primary Shade</Text>
                        <Slider
                            min={0}
                            max={9}
                            step={1}
                            marks={renderSliderMarks()}
                            value={typeof theme.primaryShade === 'object' ? theme.primaryShade.dark : 8}
                            pb={'3rem'}
                            onChange={(value) =>
                                handlePrimaryShadeChange({
                                    light: typeof theme.primaryShade === 'object' ? theme.primaryShade.light ?? 6 : 6,
                                    dark: value,
                                })
                            }
                        />
                    </>
                ) : (
                    <>
                        <Text size="sm" mt="md">Primary Shade</Text>
                        <Slider
                            min={0}
                            max={9}
                            step={1}
                            marks={renderSliderMarks()}
                            value={typeof theme.primaryShade === 'number' ? theme.primaryShade : 6}
                            onChange={(value) => handlePrimaryShadeChange(value)}
                            pb={'3rem'}
                        />
                    </>
                )}
                
                <Switch
                    label="Auto Contrast"
                    checked={theme.autoContrast}
                    onChange={(event) => {
                        updateTheme({ autoContrast: event.currentTarget.checked })
                        setAutoContrast(event.currentTarget.checked)
                    }}
                />

                {useAutoContrast && (
                    <NumberInput
                        label="Luminance Threshold"
                        min={0}
                        max={1}
                        step={0.1}
                        value={theme.luminanceThreshold}
                        onChange={(value) => 
                            updateTheme({ luminanceThreshold: typeof value === 'number' ? value : 0 })
                        }
                    />
                )}
            </Stack>
        </Card>
    );
};

export default PrimaryColorSettings;