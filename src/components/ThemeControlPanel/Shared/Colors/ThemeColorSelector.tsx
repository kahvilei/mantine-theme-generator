import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GroupedColorSelector from '@/components/ThemeControlPanel/Shared/Colors/GroupedColorSelector';
import { RootState } from '@/data/store';
import {
  selectCustomColors,
  selectMantineColors,
  selectPrimaryColor,
} from '@/data/ThemeState/themeSelectors';
import { setPrimaryColor } from '@/data/ThemeState/themeSlice';

interface ThemeColorSelectorProps {
  label?: string;
  onSelect?: (color: string) => void;
  mainColorSelector?: (state: RootState) => string;
  mainColor?: string;
}

const ThemeColorSelector: React.FC<ThemeColorSelectorProps> = ({
  onSelect,
  mainColorSelector,
  mainColor,
}: ThemeColorSelectorProps) => {
  const customColors = useSelector(selectCustomColors);
  const mantineColors = useSelector(selectMantineColors);

  const dispatch = useDispatch();

  const handlePrimaryColorChange = (color: string) => {
    dispatch(setPrimaryColor(color));
  };

  const color = mainColorSelector ? useSelector(mainColorSelector) : mainColor ? mainColor : useSelector(selectPrimaryColor);

  return (
    <GroupedColorSelector
      colors={[
        { key: 'Custom Colors', value: new Set(customColors.keys()) },
        { key: 'Mantine Colors', value: new Set(mantineColors.keys()) },
      ]}
      onSelect={onSelect ?? handlePrimaryColorChange}
      mainColor={color}
    />
  );
};

export default ThemeColorSelector;
