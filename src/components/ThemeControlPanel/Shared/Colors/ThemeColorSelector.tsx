import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GroupedColorSelector from '@/components/ThemeControlPanel/Shared/Colors/GroupedColorSelector';
import {RootState, useAppDispatch} from '@/data/OldReduxJunk/store';
import {
  selectCustomColors,
  selectMantineColors,
  selectPrimaryColor,
} from '@/data/OldReduxJunk/themeSelectors';
import { setPrimaryColor } from '@/data/OldReduxJunk/themeSlice';

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

  const dispatch = useAppDispatch();

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
