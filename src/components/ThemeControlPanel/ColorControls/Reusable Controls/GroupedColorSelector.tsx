import React from 'react';
import { MantineColorsTuple, 
    Select,
    ColorSwatch,
    Text,
    Group,
 } from '@mantine/core';

const GroupedColorSelector: React.FC<{
    colors: { [key: string]: Map<string, MantineColorsTuple> }[];
    mainColor: { [key: string]: string };
    onSelect: (color: string) => void;
  }> = ({ colors, onSelect, mainColor }) => {

    const mainColorFind = (color: string) => {
      let tuple = colors[0]["theme"].get(color);
        if (colors[0]["theme"].has(color)) {
            tuple = colors[0]["theme"].get(color);
            return tuple?tuple[5]:"#000";
        } else if (colors[1]["mantine"].has(color)) {
            tuple = colors[1]["mantine"].get(color);
            return tuple?tuple[5]:"#000";
        }
        return "#000";
    }
    return (
        <Select
        label="Primary Color"
        data={[
          { group: 'Custom Colors', items: Array.from(colors[0]["theme"].keys()) },
          { group: 'Mantine Colors', items: Array.from(colors[1]["mantine"].keys()) },
        ]}
        value={mainColor.name}
        onChange={(value) => onSelect(value?value:"")}
        renderOption={
            ({ option }) => (
                <Group>
                <ColorSwatch color={mainColorFind(option.value)} size={'20px'} />
                <Text fw={700}>{option.value}</Text>
                </Group>
            )
        }
        leftSection={
          <ColorSwatch
            color={mainColor.shade}
            size={20}
          />
        }
      />
    );
  };





export default GroupedColorSelector;