import React, { useState } from 'react';
import {
    Stack,
    Switch,
    Select,
    SelectProps,
    Slider,
    Text,
    ColorInput,
    NumberInput,
    MantineThemeOverride,
    MantineColorShade,
    Group,
    Button,
    TextInput,
    ActionIcon,
    DEFAULT_THEME,
    ColorSwatch,
    Popover,
    ColorPicker,
} from '@mantine/core';
import { IconEdit, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import generateShades from '../../utils/generateColors';
import classes from './ColorControls.module.css';
import { Input } from 'postcss';


interface ColorControlProps {
    theme: MantineThemeOverride;
    updateTheme: (theme: Partial<MantineThemeOverride>) => void;
}

const ColorControl: React.FC<ColorControlProps> = ({ theme, updateTheme }) => {
    const currentTheme = DEFAULT_THEME;

    const [newColorName, setNewColorName] = useState('');
    const [newColorValue, setNewColorValue] = useState('#000000');
    const [colorKeyColors, setColorKeyColors] = useState<{ [key: string]: string }>({});
    const [useVariableColorShades, setUseVariableColorShades] = useState<boolean>(
        typeof theme.primaryShade === 'object'
    );

    for (let color in theme.colors) {
        colorKeyColors[color] = theme.colors[color] ? theme.colors[color][5] : '#000';
    }

    const addNewColor = () => {
        if (newColorName && newColorValue) {
            updateTheme({
                colors: {
                    ...theme.colors,
                    [newColorName]: generateShades(newColorValue),
                },
            });
            setColorKeyColors({ ...colorKeyColors, [newColorName]: newColorValue });
            setNewColorName('');
            setNewColorValue('#000000');

        }
    };

    const updateColor = (colorName: string, newBaseColor: string) => {
        updateTheme({
            colors: {
                ...theme.colors,
                [colorName]: generateShades(newBaseColor),
            },
        });
        for (let color in theme.colors) {
            colorKeyColors[color] = theme.colors[color] ? theme.colors[color][5] : newBaseColor;
        }
    };

    const deleteColor = (colorName: string) => {
        const updatedColors = { ...theme.colors };
        delete updatedColors[colorName];
        updateTheme({ colors: updatedColors });
        if (theme.primaryColor === colorName) {
            updateTheme({ primaryColor: Object.keys(updatedColors)[0] });
        }
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
            <ColorSwatch
                color={colorKeyColors[option.value]}
                size={'20px'}
            />
            <Text>{option.value}</Text>
        </Group>
    );

    return (

        <Stack mt="md">
            <Select
                label="Primary Color"
                data={Object.keys(theme.colors || currentTheme.colors)}
                value={theme.primaryColor ? theme.primaryColor : Object.keys(theme.colors || currentTheme.colors)[0]}
                onChange={(value) => updateTheme({ primaryColor: value as string })}
                renderOption={renderColorSelect}
                leftSection={<ColorSwatch color={colorKeyColors[theme.primaryColor ? theme.primaryColor : '0']} size={20} />}
            />

            <Switch
                label="Use variable color shades"
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
                        value={typeof theme.primaryShade === 'object' ? theme.primaryShade.light : 6}
                        onChange={(value) => handlePrimaryShadeChange({
                            light: value,
                            dark: typeof theme.primaryShade === 'object' ? theme.primaryShade.dark ? theme.primaryShade.dark : 8 : 8
                        })}
                    />
                    <Text size="sm" mt="md">Dark Mode Primary Shade</Text>
                    <Slider
                        min={0}
                        max={9}
                        step={1}
                        value={typeof theme.primaryShade === 'object' ? theme.primaryShade.dark : 8}
                        onChange={(value) => handlePrimaryShadeChange({
                            light: typeof theme.primaryShade === 'object' ? theme.primaryShade.light ? theme.primaryShade.light : 6 : 6,
                            dark: value
                        })}
                    />
                </>
            ) : (
                <>
                    <Text size="sm" mt="md">Primary Shade</Text>
                    <Slider
                        min={0}
                        max={9}
                        step={1}
                        value={typeof theme.primaryShade === 'number' ? theme.primaryShade : 6}
                        onChange={(value) => handlePrimaryShadeChange(value)}
                    />
                </>
            )}

            <NumberInput
                label="Luminance Threshold"
                min={0}
                max={1}
                step={0.1}
                value={theme.luminanceThreshold}
                onChange={(value) => updateTheme({ luminanceThreshold: typeof value === 'number' ? value : 0 })}
            />

            <Switch
                label="Auto Contrast"
                checked={theme.autoContrast}
                onChange={(event) => updateTheme({ autoContrast: event.currentTarget.checked })}
            />

            <Text size="sm" mt="md">Color Palette</Text>
            <Group mt="xs">
                {Object.entries(theme.colors || currentTheme.colors).map(([colorName, shades]) => (
                    <Popover
                        key={colorName}
                        withArrow
                        position="bottom"
                        trapFocus
                    >
                        <Popover.Target>
                            <Group>
                                <ColorSwatch
                                    key={colorName}
                                    color={shades ? shades[5] as string : '#000000'}
                                    size={'4rem'}
                                    className={classes.swatchEditor}
                                >
                                    <IconPencil size="1.5rem" />
                                </ColorSwatch>
                            </Group>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Stack>
                                <Group>
                                    <TextInput label={'name'} placeholder={colorName} />

                                </Group>
                                <ColorInput withPicker={false} pointer label="color" placeholder={colorKeyColors[colorName]} value={colorKeyColors[colorName]} onBlur={(color) => updateColor(colorName, color.target.innerText)} />
                                <ColorPicker
                                    value={colorKeyColors[colorName]}
                                    onChange={(color) => updateColor(colorName, color)}
                                    swatches={Object.values(colorKeyColors)}
                                />
                            </Stack>
                        </Popover.Dropdown>
                    </Popover>

                ))}
                <Popover
                    withArrow
                    position="bottom"
                >
                    <Popover.Target>
                        <Group>
                            <ActionIcon radius={'xl'} size='4rem' color="bg" className={classes.colorAdd}>
                                <IconPlus/>
                            </ActionIcon>
                        </Group>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Text size="sm" mt="md">Add New Color</Text>
                        <Group align="flex-end">
                            <TextInput
                                label="Color Name"
                                value={newColorName}
                                onChange={(event) => setNewColorName(event.currentTarget.value)}
                            />
                            <ColorInput
                                label="Color Value"
                                value={newColorValue}
                                onChange={setNewColorValue}
                            />
                            <Button onClick={addNewColor}>Add</Button>
                        </Group>
                    </Popover.Dropdown>
                </Popover>
            </Group>



            <Text size="sm" mt="md">Default Gradient</Text>
            <Group grow>
                <ColorInput
                    format="rgba"
                    value={theme.defaultGradient?.from}
                    onChange={(color) => updateTheme({
                        defaultGradient: {
                            ...theme.defaultGradient,
                            from: color,
                        },
                    })}
                    swatches={Object.values(colorKeyColors)}
                />
                <ColorInput
                    format="rgba"
                    value={theme.defaultGradient?.to}
                    onChange={(color) => updateTheme({
                        defaultGradient: {
                            ...theme.defaultGradient,
                            to: color,
                        },
                    })}
                    swatches={Object.values(colorKeyColors)}
                />
            </Group>
            <div
                style={{
                    width: '100%',
                    height: '50px',
                    background: `linear-gradient(to right, ${theme.defaultGradient?.from}, ${theme.defaultGradient?.to})`,
                    borderRadius: currentTheme.defaultRadius,
                }}
            />
        </Stack>
    );
};

export default ColorControl;