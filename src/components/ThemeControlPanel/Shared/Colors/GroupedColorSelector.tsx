import React from 'react';
import {Card, MantineColorsTuple, Select, Tooltip} from '@mantine/core';
import classes from './GroupedColorSelector.module.css';

const GroupedColorSelector: React.FC<{
  colors?: { key: string; value: Map<string, MantineColorsTuple> }[];
  mainColor?: string;
  label?: string;
  onSelect: (color: string) => void;
}> = ({ colors = [], mainColor = 'blue', label, onSelect }) => {
  const mainColorFind = (color: string) => {
    for (const group of colors) {
      if (group.value?.has(color)) {
        // @ts-ignore
        return group.value.get(color)[5];
      }
    }
    return '#000';
  };

  const colorData = colors.map((group) => {
    return { group: group.key, items: Array.from(group.value?.keys()) };
  });
  return (
    <Tooltip label={mainColor} position="right">
      <Select
        classNames={{
          option: classes.option,
          options: classes.options,
          input: classes.colorSelectorInput,
          wrapper: classes.colorSelectorWrapper,
            root: classes.colorSelectorRoot,
        }}
        comboboxProps={{ width: 350, position: 'bottom-start' }}
        styles={{
          input: {
            backgroundColor: mainColorFind(mainColor),
            color: mainColorFind(mainColor),
          },
        }}
        label={label}
        data={colorData}
        value={mainColor}
        onChange={(value) => onSelect(value ? value : 'blue')}
        renderOption={({ option }) => (
          <Tooltip label={option.label} position="right">
              <Card bg={mainColorFind(option.value)} />
          </Tooltip>
        )}
        allowDeselect={false}
      />
    </Tooltip>
  );
};

export default GroupedColorSelector;
