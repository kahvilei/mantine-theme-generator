import React from 'react';
import { observer } from 'mobx-react-lite';
import GroupedColorSelector from '@/components/ThemeControlPanel/Shared/Colors/GroupedColorSelector';
import { colors } from '@/data/Store';
import {Color} from "@/data/Models/Theme/Colors/Color Classes/Color";

interface ThemeColorSelectorProps {
  label?: string;
  onSelect?: (color: string) => void;
  mainColor?: string;
}

const ThemeColorSelector: React.FC<ThemeColorSelectorProps> = observer(
  ({ onSelect, mainColor }: ThemeColorSelectorProps) => {
    // Get custom and override colors from our Colors class
    const customColors = colors.getCustomColors();
    const overrideColors = colors.getOverrideColors();

    // Create maps for the grouped selector
    const customColorsMap = new Map<string, Color>();
    const mantineColorsMap = new Map<string, Color>();

    // Populate maps with name->color mappings
    customColors.forEach((color) => customColorsMap.set(color.name, color));
    overrideColors.forEach((color) => mantineColorsMap.set(color.name, color));

    const handlePrimaryColorChange = (colorName: string) => {
      colors.setPrimaryColor(colorName);
    };

    // Use provided mainColor or get the primaryColor from colors
    const selectedColor = mainColor || colors.getPrimaryColor() || '';

    return (
      <GroupedColorSelector
        colors={[
          { key: 'Custom Colors', value: new Set(customColorsMap.keys()) },
          { key: 'Mantine Colors', value: new Set(mantineColorsMap.keys()) },
        ]}
        onSelect={onSelect ?? handlePrimaryColorChange}
        mainColor={selectedColor}
      />
    );
  }
);

export default ThemeColorSelector;
