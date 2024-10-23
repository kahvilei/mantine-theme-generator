import React from 'react';
import { useContext } from 'react';
import { ActionIcon, Button, ColorInput, ColorPicker, Group, Popover, Stack, Text, TextInput, Modal, ColorSwatch } from '@mantine/core';
import { IconColorSwatch, IconTrash } from '@tabler/icons-react';
import ThemeContext from '../../ThemeContext/ThemeContext';

interface ColorEditorPopupProps {
  colorName: string;
  colorValue: string;
  onColorNameChange: (name: string) => void;
  onColorValueChange: (value: string) => void;
  onSave: () => void;
  onDelete?: () => void;
  isEditing?: boolean;
}

const ColorEditorPopup: React.FC<ColorEditorPopupProps> = ({
  colorName,
  colorValue,
  onColorNameChange,
  onColorValueChange,
  onSave,
  onDelete,
  isEditing = false,
}) => {

    const [isShadeModalOpen, setIsShadeModalOpen] = React.useState(false);
    const [currentEditingColor, setCurrentEditingColor] = React.useState(colorName);
    const themeManager = useContext(ThemeContext);

    const updateColorShade = (index: number, newShade: string) => {
        themeManager.updateColorShade(currentEditingColor, index, newShade);
      };
    
  return (
    <>
    <Popover.Dropdown>
      <Stack>
     
        <Group justify="space-between">
            <Text size="sm" color="gray">
            {isEditing ? 'Update' : 'Add'} color
            </Text>
            
            {isEditing && onDelete && (
            <Group>
            <ActionIcon onClick={() => setIsShadeModalOpen(true)}>
              <IconColorSwatch />
            </ActionIcon>
            <ActionIcon color="red" onClick={onDelete}>
              <IconTrash />
            </ActionIcon>
            </Group>
            )}
            
        </Group>
         
          <TextInput
            label="Color Name"
            value={colorName}
            required
            onChange={(event) => onColorNameChange(event.currentTarget.value)}
          />

        <ColorInput
          label="Color Value"
          value={colorValue}
          required
          onChange={onColorValueChange}
        />
        <ColorPicker
          value={colorValue}
          onChange={onColorValueChange}
        />
        <Group justify='left'>
        <Button onClick={onSave}>{isEditing ? 'Update' : 'Add'} Color</Button></Group>
      </Stack>
    </Popover.Dropdown>

    <Modal
    opened={isShadeModalOpen}
    onClose={() => setIsShadeModalOpen(false)}
    title={`Fine-tune Shades for ${currentEditingColor}`}
    >
    <Stack>
    {themeManager.getColor(currentEditingColor)?.map((shade: string, index: number) => (
        <Group key={index}>
        <ColorInput
            value={shade}
            onChange={(color) => updateColorShade(index, color)}
            label={`Shade ${index}`}
            style={{ flex: 1 }}
        />
        <ColorSwatch color={shade} size={30} />
        </Group>
    ))}
    </Stack>
    </Modal>
    </>
  );
};

export default ColorEditorPopup;