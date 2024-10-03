import React, { useState } from 'react';
import { IconEdit, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { Input } from 'postcss';
import {
    ActionIcon,
    Button,
    Card,
    ColorInput,
    ColorPicker,
    ColorSwatch,
    DEFAULT_THEME,
    Group,
    MantineColorShade,
    MantineThemeOverride,
    NumberInput,
    Popover,
    Select,
    SelectProps,
    Slider,
    Stack,
    Switch,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import generateShades from '../../utils/generateColors';
import classes from './ColorControls.module.css';

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
    const [useAutoContrast, setAutoContrast] = useState<boolean>(theme.autoContrast as boolean);

    for (let color in theme.colors) {
        colorKeyColors[color] = theme.colors[color] ? theme.colors[color][5] : '#000';
    }

    //slider marks that displays the color shades as ColorSwatches - theme.colors?[theme.primaryColor][0]
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
                    light:
                        typeof value === 'object'
                            ? (value.light as MantineColorShade)
                            : (value as MantineColorShade),
                    dark:
                        typeof value === 'object'
                            ? (value.dark as MantineColorShade)
                            : (value as MantineColorShade),
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
        <Stack mt="md">
            <Card withBorder padding="lg">
                <Title order={4}>Primary Color Settings</Title>
                <Stack mt="md">
                <Select
                    label="Primary Color"
                    data={Object.keys(theme.colors || currentTheme.colors)}
                    value={
                        theme.primaryColor
                            ? theme.primaryColor
                            : Object.keys(theme.colors || currentTheme.colors)[0]
                    }
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
                        <Text size="sm" mt="md">
                            Light Mode Primary Shade
                        </Text>
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
                                    dark:
                                        typeof theme.primaryShade === 'object'
                                            ? theme.primaryShade.dark
                                                ? theme.primaryShade.dark
                                                : 8
                                            : 8,
                                })
                            }
                        />
                        <Text size="sm" mt="md">
                            Dark Mode Primary Shade
                        </Text>
                        <Slider
                            min={0}
                            max={9}
                            step={1}
                            marks={renderSliderMarks()}
                            value={typeof theme.primaryShade === 'object' ? theme.primaryShade.dark : 8}
                            pb={'3rem'}
                            onChange={(value) =>
                                handlePrimaryShadeChange({
                                    light:
                                        typeof theme.primaryShade === 'object'
                                            ? theme.primaryShade.light
                                                ? theme.primaryShade.light
                                                : 6
                                            : 6,
                                    dark: value,
                                })
                            }
                        />
                    </>
                ) : (
                    <>
                        <Text size="sm" mt="md">
                            Primary Shade
                        </Text>
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
                    )
                }

              
                
                </Stack>
            </Card>
            <Card withBorder padding="lg">

                <Title order={4}>Color Palette</Title>
                <Group mt="xs">
                    {Object.entries(theme.colors || currentTheme.colors).map(([colorName, shades]) => (
                        <Popover key={colorName} withArrow position="bottom" trapFocus>
                            <Popover.Target>
                                <Group>
                                    <ColorSwatch
                                        key={colorName}
                                        color={shades ? (shades[5] as string) : '#000000'}
                                        size={'4rem'}
                                        className={classes.swatchEditor}
                                    >
                                        <IconPencil size="1.5rem" />
                                    </ColorSwatch>
                                </Group>
                            </Popover.Target>
                            <Popover.Dropdown>
                                <Stack>
                                    <Group align="end">
                                        <TextInput label={'name'} placeholder={colorName} />
                                        <ActionIcon color="red" onClick={() => deleteColor(colorName)}>
                                            <IconTrash />
                                        </ActionIcon>
                                    </Group>
                                    <ColorInput
                                        withPicker={false}
                                        pointer
                                        label="color"
                                        placeholder={colorKeyColors[colorName]}
                                        value={colorKeyColors[colorName]}
                                        onBlur={(color) => updateColor(colorName, color.target.innerText)}
                                    />
                                    <ColorPicker
                                        value={colorKeyColors[colorName]}
                                        onChange={(color) => updateColor(colorName, color)}
                                        swatches={Object.values(colorKeyColors)}
                                    />
                                </Stack>
                            </Popover.Dropdown>
                        </Popover>
                    ))}
                    <Popover withArrow position="bottom">
                        <Popover.Target>
                            <Group>
                                <ActionIcon radius={'xl'} size="4rem" color="bg" className={classes.colorAdd}>
                                    <IconPlus />
                                </ActionIcon>
                            </Group>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Text size="sm" mt="md">
                                Add New Color
                            </Text>
                            <Group align="flex-end">
                                <TextInput
                                    label="Color Name"
                                    value={newColorName}
                                    onChange={(event) => setNewColorName(event.currentTarget.value)}
                                />
                                <ColorInput label="Color Value" value={newColorValue} onChange={setNewColorValue} />
                                <Button onClick={addNewColor}>Add</Button>
                            </Group>
                        </Popover.Dropdown>
                    </Popover>
                </Group>
            </Card>
            <Card withBorder padding="lg">
                <Stack mt="md">
                <Title order={4}>Default Gradient Settings</Title>
                <Group grow>
                    <Select
                        data={Object.keys(theme.colors || currentTheme.colors)}
                        value={
                            theme.defaultGradient
                                ? theme.defaultGradient.from
                                : Object.keys(theme.colors || currentTheme.colors)[0]
                        }
                        onChange={(color) =>
                            updateTheme({
                                defaultGradient: {
                                    ...theme.defaultGradient,
                                    from: color?.toString() || 'blue',
                                },
                            })
                        }
                        renderOption={renderColorSelect}
                        leftSection={
                            <ColorSwatch
                                color={
                                    colorKeyColors[theme.defaultGradient ? (theme.defaultGradient.from as string) : '0']
                                }
                                size={20}
                            />
                        }
                    />
                    <Select
                        data={Object.keys(theme.colors || currentTheme.colors)}
                        value={
                            theme.defaultGradient
                                ? theme.defaultGradient.to
                                : Object.keys(theme.colors || currentTheme.colors)[0]
                        }
                        onChange={(color) =>
                            updateTheme({
                                defaultGradient: {
                                    ...theme.defaultGradient,
                                    to: color?.toString() || 'blue',
                                },
                            })
                        }
                        renderOption={renderColorSelect}
                        leftSection={
                            <ColorSwatch
                                color={
                                    colorKeyColors[theme.defaultGradient ? (theme.defaultGradient.to as string) : '0']
                                }
                                size={20}
                            />
                        }
                    />
                </Group>
                <div
                    style={{
                        width: '100%',
                        height: '50px',
                        background: `linear-gradient(to right, ${colorKeyColors[theme.defaultGradient?.from as string]}, ${colorKeyColors[theme.defaultGradient?.to as string]})`,
                        borderRadius: currentTheme.defaultRadius,
                    }}
                />
                </Stack>
            </Card>
        </Stack>
    );
};

export default ColorControl;
