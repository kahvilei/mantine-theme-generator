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
}

const ThemeColorSelector: React.FC<ThemeColorSelectorProps> = ({
  onSelect,
  mainColorSelector,
}: ThemeColorSelectorProps) => {
  const customColors = useSelector(selectCustomColors);
  const mantineColors = useSelector(selectMantineColors);

  const dispatch = useDispatch();

  const handlePrimaryColorChange = (color: string) => {
    dispatch(setPrimaryColor(color));
  };

  const mainColor = useSelector(mainColorSelector ?? selectPrimaryColor);

  return (
      <GroupedColorSelector
        colors={[
          { key: 'Custom Colors', value: customColors },
          { key: 'Mantine Colors', value: mantineColors },
        ]}
        onSelect={onSelect ?? handlePrimaryColorChange}
        mainColor={mainColor}
      />
  );
};

export default ThemeColorSelector;
