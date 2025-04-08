import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {Button, ColorInput, ColorPicker, Group, Stack, TextInput, Text, SegmentedControl} from '@mantine/core';
import { Colors } from '@/data/Models/Theme/Colors/Colors';
import { colors as ColorManager } from '@/data/Store';
import generateColors from '@/utils/generateColors';
import { ShadelessColor } from "@/data/Models/Theme/Colors/Color Classes/ShadelessColor";
import { Color } from "@/data/Models/Theme/Colors/Color Classes/Color";
import { useTranslation } from 'react-i18next';
import { generateColors as generateShades } from '@mantine/colors-generator';

interface StandardColorPanelProps {
    colorObject?: Color | ShadelessColor | null;
    newColorName: string;
    setNewColorName: (name: string) => void;
    isEditing: boolean;
    isMantine: boolean;
    colorsInstance?: Colors;
}

const StandardColorPanel: React.FC<StandardColorPanelProps> = observer(
    ({
         colorObject,
         newColorName,
         setNewColorName,
         isEditing,
         isMantine,
         colorsInstance = ColorManager,
     }) => {
        const { t } = useTranslation(['theme']);

        // Get base color (5th shade) if editing, or use a default color for new ones
        const baseShadeIndex = 5;
        const defaultColor = '#1c7ed6'; // A default blue color

        // Use the color object's shade if it exists, or default for new colors
        const initialColor = colorObject
            ? colorObject.getShade(baseShadeIndex) || defaultColor
            : defaultColor;

        const [newColorValue, setNewColorValue] = useState(initialColor);
        const [useMantineShades, setUseMantineShades] = useState(false);

        const handleUpdateColorShade = (index: number, newShade: string) => {
            if (colorObject) {
                colorObject.setShade(index, newShade);
            }
        };

        const [isShadeless] = useState((colorObject instanceof ShadelessColor) || false);

        const handleSetColor = (name: string, color: string) => {
            // Generate a color tuple from the base color
            if (isShadeless) {
                (colorObject as ShadelessColor)?.setColor(color);
            } else {
                // Use either custom or Mantine shade generation based on switch
                const generatedColors = useMantineShades
                    ? generateShades(color) // Mantine's function (adjust parameters as needed)
                    : generateColors(color);    // Custom function

                // For existing colors, update all shades
                if (isEditing && colorObject) {
                    generatedColors.forEach((shade, index) => {
                        colorObject.setShade(index, shade);
                    });
                } else {
                    colorsInstance.createColor(name, color);
                }
            }
        };

        const handleAddColor = () => {
            if (newColorName && newColorValue) {
                handleSetColor(newColorName, newColorValue);
            }
        };

        const handleColorChange = (color: string) => {
            setNewColorValue(color);
            if (isEditing && colorObject) {
                handleSetColor(colorObject.name, color);
            }
        };

        // Get all shades if editing an existing color
        const allShades = colorObject ? colorObject.getAllShades() : [];

        return (
            <>
                <Group align="top">
                    <Stack flex={1}>
                        {!isMantine && (
                            <TextInput
                                label={t('colors.editor.name')}
                                value={newColorName}
                                required
                                onChange={(event) => setNewColorName(event.currentTarget.value)}
                            />
                        )}

                        <ColorInput
                            label={t('colors.editor.color')}
                            value={newColorValue}
                            required
                            withPicker={false}
                            onChange={handleColorChange}
                        />

                        <ColorPicker format="rgba" value={newColorValue} onChange={handleColorChange} />

                        {!isEditing && (
                            <Group justify="left">
                                <Button onClick={handleAddColor} disabled={!newColorName}>
                                    {t('colors.editor.addColorButton')}
                                </Button>
                            </Group>
                        )}

                        {!isShadeless && (
                            <Stack justify="space-between" gap='xs'>
                                <Text c='dimmed' size="sm">{t('colors.editor.shadeStrategy')}</Text>
                                <SegmentedControl
                                    data={[
                                        t('colors.editor.focused'),
                                        t('colors.editor.fullRange')
                                    ]}
                                    value={useMantineShades?t('colors.editor.focused'):t('colors.editor.fullRange')}
                                    onChange={(value) => setUseMantineShades(value === t('colors.editor.focused'))}
                                    size="md"
                                />
                            </Stack>
                        )}
                    </Stack>

                    {isEditing && colorObject && !isShadeless && (
                        <Stack gap={2}>
                            {allShades.map((shade: string, index: number) => (
                                <Group key={index}>
                                    <ColorInput
                                        value={shade}
                                        onChange={(color) => handleUpdateColorShade(index, color)}
                                        aria-label={t('colors.editor.shade', { index })}
                                        popoverProps={{
                                            withinPortal: false,
                                        }}
                                        w={150}
                                    />
                                </Group>
                            ))}
                        </Stack>
                    )}
                </Group>
            </>
        );
    }
);

export default StandardColorPanel;