import React, { useContext, useState } from 'react';
import { IconColorSwatch, IconRestore } from '@tabler/icons-react';
import {
  ActionIcon,
  Card,
  Collapse,
  ColorInput,
  DEFAULT_THEME,
  Group,
  Stack,
  Tooltip,
} from '@mantine/core';
// Import the default theme
import ThemeContext from '../../ThemeContext/ThemeContext'; // Import the theme manager

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
  const themeManager = useContext(ThemeContext);

  return (
    <Card withBorder padding="xs" radius="sm">
      <Stack gap="m">
        <Group justify="space-between" align="start" wrap="nowrap">
          <Group w={'75%'} wrap="nowrap">
            <ColorInput
              label={name}
              description={description}
              value={color}
              w={'100%'}
              onChange={(value) => onEdit(value)}
            />
          </Group>
          <Group gap="xs" wrap="nowrap">
            {color !== defaultColor && (
              <Tooltip label="Reset to default mantine color">
                <ActionIcon c="red" variant="outline" onClick={onReset}>
                  <IconRestore size={16} />
                </ActionIcon>
              </Tooltip>
            )}

            <Tooltip label="Fine-tune shades">
              <ActionIcon variant="outline" onClick={() => setIsEditing((v) => !v)}>
                <IconColorSwatch size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
        <Collapse in={isEditing}>
          <Stack>
            {themeManager.getColor(name)?.map((shade: string, index: number) => (
              <Group key={index}>
                <ColorInput
                  value={shade}
                  onChange={(color) => themeManager.updateColorShade(name, index, color)}
                  label={`Shade ${index}`}
                  style={{ flex: 1 }}
                />
              </Group>
            ))}
          </Stack>
        </Collapse>
      </Stack>
    </Card>
  );
};

export default DefaultColorItem;
