import React from 'react';
import { ColorSwatch, Group, MantineColorsTuple, Select, Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import { selectCustomColors, selectMantineColors } from '@/data/ThemeState/themeSelectors';

const GroupedColorSelector: React.FC<{
  colors?: { [key: string]: Map<string, MantineColorsTuple> }[];
  mainColor?: { [key: string]: string };
  label?: string;
  onSelect: (color: string) => void;
}> = ({ colors =  {}, mainColor= {name:'blue'}, label, onSelect }) => {
  const customColors = useSelector(selectCustomColors);
  const mantineColors = useSelector(selectMantineColors);
  
  const mainColorFind = (color: string) => {
    let tuple = customColors.get(color);
    if (customColors.has(color)) {
      tuple = customColors.get(color);
      return tuple ? tuple[5] : '#000';
    } else if (mantineColors.has(color)) {
      tuple = mantineColors.get(color);
      return tuple ? tuple[5] : '#000';
    }
    return '#000';
  };
  return (
    <Select
      label={label}
      data={[
        { group: 'Custom Colors', items: Array.from(customColors.keys()) },
        { group: 'Mantine Colors', items: Array.from(mantineColors.keys()) },
      ]}
      value={mainColor.name}
      onChange={(value) => onSelect(value ? value : 'blue')}
      renderOption={({ option }) => (
        <Group>
          <ColorSwatch color={mainColorFind(option.value)} size={'20px'} />
          <Text>{option.label}</Text>
        </Group>
      )}
      allowDeselect = {false}
      leftSection={<ColorSwatch color={mainColorFind(mainColor.name)} size={20} />}
    />
  );
};

export default GroupedColorSelector;
