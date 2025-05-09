import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Group, Stack, Text, TextInput } from '@mantine/core';
import ThemeColorSelector from '@/components/ThemeControlPanel/Shared/Colors/ThemeColorSelector';
import { Colors } from '@/data/Models/Theme/Colors/Colors';
import { VirtualColor } from '@/data/Models/Theme/Colors/Color Classes/VirtualColor';
import { colors as ColorManager } from '@/data/Store';
import { useTranslation } from 'react-i18next';

interface VirtualColorPanelProps {
    colorObject?: VirtualColor | null;
    newColorName: string;
    setNewColorName: (name: string) => void;
    isEditing: boolean;
    colorsInstance?: Colors;
}

const VirtualColorPanel: React.FC<VirtualColorPanelProps> = observer(
    ({ colorObject, newColorName, setNewColorName, isEditing, colorsInstance = ColorManager }) => {
        const { t } = useTranslation(['theme']);

        // Initialize with current values if editing, or defaults if creating new
        const [darkColor, setDarkColor] = useState(
            colorObject ? colorObject.dark : 'blue'
        );

        const [lightColor, setLightColor] = useState(
            colorObject ? colorObject.light : 'blue'
        );

        useEffect(() => {
            // Update the virtual color whenever source colors change
            if (isEditing && colorObject) {
                colorObject.setVirtualColorSource('dark', darkColor);
                colorObject.setVirtualColorSource('light', lightColor);
            }
        }, [darkColor, lightColor, colorObject, isEditing]);

        const handleAddVirtualColor = () => {
            if (newColorName && !isEditing) {
                colorsInstance.createColor(newColorName, { dark: darkColor, light: lightColor });
            }
        };

        return (
            <>
                <TextInput
                    label={t('colors.editor.name')}
                    value={newColorName}
                    required
                    onChange={(event) => setNewColorName(event.currentTarget.value)}
                    disabled={isEditing && colorObject?.type === 'override'}
                />

                <Group align="top" gap="lg">
                    <Stack gap="xs" flex={1}>
                        <Text size="sm">{t('colors.editor.dark')}</Text>
                        <ThemeColorSelector
                            mainColor={darkColor}
                            onSelect={setDarkColor}
                        />
                    </Stack>

                    <Stack gap="xs" flex={1}>
                        <Text size="sm">{t('colors.editor.light')}</Text>
                        <ThemeColorSelector
                            mainColor={lightColor}
                            onSelect={setLightColor}
                        />
                    </Stack>
                </Group>

                <Group justify="space-between" mt="md">
                    {!isEditing && (
                        <Button onClick={handleAddVirtualColor} disabled={!newColorName}>
                            {t('colors.editor.addColorButton')}
                        </Button>
                    )}
                </Group>
            </>
        );
    }
);

export default VirtualColorPanel;