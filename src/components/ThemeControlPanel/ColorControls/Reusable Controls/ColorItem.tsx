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
import QuestionMarkTooltip from '../../Reusable Controls/QuestionMarkTooltip';

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
      bd={`1px solid ${theme.getColor(name)?.[2]}30`}
      bg={`linear-gradient(45deg, ${theme.getColor(name)?.[5]}10, ${theme.getColor(name)?.[5]}40)`}
      padding="5px"
      radius="sm"
    >
      <Stack gap="m">
        <Group justify="space-between" gap={'0'} align="middle" wrap="nowrap">
          <Group w={'100%'} wrap="nowrap">
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
                <Text fw={700} size={'sm'} c={theme.getMainColorShade(name)}>{name}</Text>
                {description && (
                  <QuestionMarkTooltip description={description} color={theme.getMainColorShade(name)} />
                )}
              </Group>
            )}
            <ColorInput
              c={theme.getColor(name)?.[9]}
              variant='variant'
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
                <ActionIcon variant="outline" color="red" onClick={onReset}>
                  <IconRestore size={16} />
                </ActionIcon>
              </Tooltip>
            )}
            {!isMantine && (
              <Tooltip label="Delete Color">
                <ActionIcon variant="outline" color="red" onClick={onReset}>
                  <IconTrash size={16} />
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
