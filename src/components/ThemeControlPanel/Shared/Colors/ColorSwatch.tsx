import React from 'react';
import { IconPencil, IconSelector, IconTrash } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import { ActionIcon, Card, Stack } from '@mantine/core';
import { VirtualColor } from '@/data/Models/Theme/Colors/Color Classes/VirtualColor';
import { colors as ColorManager } from '@/data/Store';
import classes from './ColorSwatch.module.css';
import { Color } from "@/data/Models/Theme/Colors/Color Classes/Color";
import { ShadelessColor } from "@/data/Models/Theme/Colors/Color Classes/ShadelessColor";

interface ColorSwatchProps {
    name?: string; // Either provide a color name
    colorObject?: Color | VirtualColor | ShadelessColor; // Or a direct color object
    type?: 'display' | 'edit' | 'select' | 'delete';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    onClick?: () => void;
    colorsInstance?: typeof ColorManager; // Optional custom colors instance
}

const ColorSwatch: React.FC<ColorSwatchProps> = observer(
    ({
         name,
         colorObject,
         type = 'display',
         size = 'md',
         onClick,
         colorsInstance = ColorManager,
     }) => {

        // Get the color object either directly or by name from the colors instance
        const color = colorObject || (name && colorsInstance.getColorByName(name));

        if (!color) {
            return null;
        }

        // Get color values for light and dark modes from the VirtualColor instance
        const colorLight = color.getShade(undefined, 'light') ?? '#000';
        const colorDark = color.getShade(undefined, 'dark') ?? '#fff';
        const colorIcon = color.getShade(7)

        // Map of icons by type
        const icons = {
            edit: <IconPencil size={14} />,
            select: <IconSelector size={14} />,
            delete: <IconTrash size={14} />,
        };

        return (
            <Card
                bg={`linear-gradient(45deg, ${colorDark} 50%, ${colorLight} 50%)`}
                className={`${classes.colorItem} ${classes[size]}`}
                data-type={type}
                tabIndex={0}
                onClick={onClick}
                title={color.name}
            >
                {type !== 'display' && (
                    <Stack align="flex-end" justify="start">
                        <ActionIcon color={colorIcon} component="div" size="xs">
                            {icons[type]}
                        </ActionIcon>
                    </Stack>
                )}
            </Card>
        );
    }
);

export default ColorSwatch;