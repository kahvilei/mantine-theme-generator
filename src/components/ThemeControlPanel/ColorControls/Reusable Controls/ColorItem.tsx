import React, { useContext, useState } from 'react';
import { IconColorSwatch, IconQuestionMark, IconRestore, IconTrash } from '@tabler/icons-react';
import {
  ActionIcon,
  Card,
  Collapse,
  ColorInput,
  DEFAULT_THEME,
  Group,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import ThemeContext from '../../ThemeContext/ThemeContext';

interface ColorItemProps {
  name: string;
  description: string;
  color: string;
  type: 'mantine' | 'theme';
  onReset: () => void;
  onEdit: (color: string) => void;
}

const ColorItem: React.FC<ColorItemProps> = ({
  name,
  description,
  color,
  type,
  onReset,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [colorName, setColorName] = useState(name);
  const theme = useContext(ThemeContext);

  const defaultColor = type === 'mantine' ? DEFAULT_THEME.colors[name][5] : '';
  const isMantine = type === 'mantine';

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColorName(event.currentTarget.value);
  };

  const handleNameBlur = () => {
    if (colorName !== name) {
      theme.updateColor(name, colorName);
    }
  };

  return (
    <Card
      w={'100%'}
      withBorder
      bd={`1px solid ${theme.getColor(name)?.[2]}`}
      bg={theme.getColor(name)?.[0]}
      padding="xs"
      radius="sm"
    >
      <Stack gap="m">
        <Group justify="space-between" align="start" wrap="nowrap">
          <Group w={'75%'} wrap="nowrap">
            {type === 'theme' ? (
              <TextInput
                value={colorName}
                onChange={(e) => {
                  handleNameChange(e);
                }}
                onBlur={handleNameBlur}
                w={'100%'}
                description={description}
                descriptionProps={{ c: theme.getColor(name)?.[8] }}
              />
            ) : (
              <Group wrap="nowrap" gap="4px">
                <Text>{name}</Text>
                {description && (
                  <Tooltip label={description}>
                    <ActionIcon
                      c={theme.getColor(name)?.[8]}
                      size={12}
                      radius={100}
                      bd={'1px solid'}
                      variant="outline"
                    >
                      <IconQuestionMark size={12} />
                    </ActionIcon>
                  </Tooltip>
                )}
              </Group>
            )}
            <ColorInput
              c={theme.getColor(name)?.[9]}
              value={color}
              w={'100%'}
              onChange={(value) => {
                if (value !== color) {
                  onEdit(value);
                }
              }}
            />
          </Group>
          <Group gap="xs" wrap="nowrap">
            {isMantine && color !== defaultColor && (
              <Tooltip label="Reset to default mantine color">
                <ActionIcon variant="outline" bg="white" color="red" onClick={onReset}>
                  <IconRestore size={16} />
                </ActionIcon>
              </Tooltip>
            )}
            {!isMantine && (
              <Tooltip label="Delete Color">
                <ActionIcon variant="outline" bg="white" color="red" onClick={onReset}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Tooltip>
            )}
            <Tooltip label="Fine-tune shades">
              <ActionIcon variant="outline" bg="white" onClick={() => setIsEditing((v) => !v)}>
                <IconColorSwatch size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
        <Collapse in={isEditing}>
          <Stack>
            {theme.getColor(name)?.map((shade: string, index: number) => (
              <Group key={index}>
                <ColorInput
                  value={shade}
                  onChange={(color) => theme.updateColorShade(name, index, color)}
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

export default ColorItem;
