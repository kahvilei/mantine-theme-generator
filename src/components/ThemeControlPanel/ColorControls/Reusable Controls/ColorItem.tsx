import React, { useContext, useState } from 'react';
import { IconColorPicker, IconColorSwatch, IconRestore, IconTrash } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
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
import QuestionMarkTooltip from '../../Reusable Controls/QuestionMarkTooltip';

import classes from './ColorItem.module.css';
import { updateColorShade } from '@/data/ThemeState/themeSlice';

interface ColorItemProps {
  name: string;
  description: string;
  shades: string[];
  color: string;
  type: 'mantine' | 'theme';
  onReset: () => void;
  onEditShade: (name: string, shades: string[]) => void;
  onEdit: (name: string, color: string) => void;
}

const ColorItem: React.FC<ColorItemProps> = ({
  name,
  description,
  color,
  shades,
  type,
  onReset,
  onEdit,
  onEditShade
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [colorName, setColorName] = useState(name);
  

  const defaultColor = type === 'mantine' ? DEFAULT_THEME.colors[name][5] : '';
  const isMantine = type === 'mantine';

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColorName(event.currentTarget.value);
  };

  const handleNameBlur = () => {
    if (colorName !== name) {
      onEditShade(colorName, shades);
      onReset();
    }
  };

  const updateColorShade = (index:number, color:string) => {
    const newShades = shades.map((shade, i) => (i === index ? color : shade));
    onEditShade(colorName, newShades);
  }

  return (
    <Card
      w={'100%'}
      bg={`linear-gradient(45deg, ${shades[5]}20, ${shades[5]}50)`}
      padding="5px 10px"
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
                descriptionProps={{ c: shades[8] }}
              />
            ) : (
              <Group wrap="nowrap" gap="4px">
                <Text fw={700} size={'sm'} c={shades[5]}>{name}</Text>
                {description && (
                  <QuestionMarkTooltip description={description} color={shades[5]} />
                )}
              </Group>
            )}
            <ColorInput
              c={shades[5]?.[9]}
              variant='variant'
              value={color}
              w={'100%'}
              onChange={(value) => {
                if (value !== color) {
                  onEdit(colorName, value);
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
          <Stack gap="sm" p={'sm'} className={classes.shadeContainer}>
            {shades.map((shade: string, index: number) => (
              <Group key={index} gap={0} className={classes.shadePicker}>
                <Box
                  w={'30%'}
                  bg={shade}
                  h={36}
                >
                </Box>
                <ColorInput
                  value={shade}
                  variant='none'
                  withEyeDropper={false}
                  leftSection={<IconColorPicker size={'15px'}/>}
                  onChange={(color) => updateColorShade(index, color)}
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
