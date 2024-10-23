import React, { useState } from 'react';
import { ActionIcon, Button, Card, ColorSwatch, Group, Popover, Stack, Text, Tooltip } from '@mantine/core';
import { IconPencil, IconRefresh, IconRestore } from '@tabler/icons-react';
import { DEFAULT_THEME } from '@mantine/core'; // Import the default theme
import ColorEditorPopup from './ColorEditorPopup'; // Adjust the import path

interface DefaultColorItemProps {
    name: string;
    description: string;
    color: string;
    onReset: () => void;
    onEdit: (color: string) => void;
}

const DefaultColorItem: React.FC<DefaultColorItemProps> = ({
    name,
    description,
    color,
    onReset,
    onEdit,
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const defaultColor = DEFAULT_THEME.colors[name][5]; // Assuming the default color is at index 5

    return (
        <Card withBorder padding='xs' radius='sm'>
        <Group justify="space-between" wrap='nowrap'>
            <Group wrap='nowrap'>
                <ColorSwatch color={color} size={20} />
                <Stack gap={0}>
                    <Text>{name}</Text>
                    <Text size="xs" c="dimmed">{description}</Text>
                </Stack>
            </Group>
            <Group wrap='nowrap'>
                {color !== defaultColor && (
                    <Tooltip label="Reset to default mantine color">
                        <ActionIcon c="red" variant="outline" onClick={onReset}>
                            <IconRestore size={16} />
                        </ActionIcon >
                    </Tooltip>
                )}
                <Popover
                    opened={isEditing}
                    onClose={() => setIsEditing(false)}
                >
                    <Popover.Target>
                        <Tooltip label="Edit color">
                        <ActionIcon variant="outline" onClick={() => setIsEditing(true)}>
                            <IconPencil size={16} />
                        </ActionIcon>
                        </Tooltip>
                    </Popover.Target>
                    <Popover.Dropdown>
                        
                        <ColorEditorPopup
                            colorName={name}
                            colorValue={color}
                            onColorNameChange={() => { }} // No-op
                            onColorValueChange={onEdit}
                            onSave={() => setIsEditing(false)}
                        /></Popover.Dropdown>
                </Popover>
            </Group>
        </Group></Card>
    );
};

export default DefaultColorItem;