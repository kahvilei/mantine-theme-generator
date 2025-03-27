import React from 'react';
import { IconSelector } from '@tabler/icons-react';
import { Box, Card, Combobox, Group, InputBase, MantineColorsTuple, ScrollArea, Select, Text, Tooltip, useCombobox } from '@mantine/core';
import ColorSwatch from "@/components/ThemeControlPanel/Shared/Colors/ColorSwatch";
import { fontData } from "@/components/ThemeControlPanel/Shared/Fonts/fontData";
import classes from './GroupedColorSelector.module.css';


const GroupedColorSelector: React.FC<{
  colors?: { key: string; value: Set<string> }[];
  mainColor?: string;
  label?: string;
  onSelect: (color: string) => void;
}> = ({ colors = [], mainColor = 'blue', label, onSelect }) => {

  const colorData = colors.map((group) => {
    return { group: group.key, items: Array.from(group.value?.keys()) };
  });

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const options = colorData.map((group) => {
        const subOptions = group.items.map((item) => {
            return(
                <Combobox.Option key={item} value={item}>
                    <Tooltip label={item} position="right">
                        <ColorSwatch name={item} size="sm"/>
                    </Tooltip>
                </Combobox.Option>
            )
        })

        return (
            <Combobox.Group key={group.group} label={group.group}>
                {subOptions}
            </Combobox.Group>
        )
    })
  return (
    <Tooltip label={mainColor} position="right">
        <Combobox
            store={combobox}
            onOptionSubmit={(val) => {
                onSelect(val);
                combobox.closeDropdown();
            }
            }
            classNames={
                {
                    dropdown: classes.colorSelectorDropdown,
                    options: classes.options,
                    option: classes.option
                }
            }
            withinPortal={false}
        >
            <Combobox.Target>
                <Box
                    component="button"
                    onClick={() => combobox.toggleDropdown()}
                    aria-label={label??'select color'}
                    className={classes.colorSelectorInput}
                    p={0}
                >
                   <ColorSwatch name={mainColor} type='select' size="lg"/>
                </Box>
            </Combobox.Target>
            <Combobox.Dropdown>
                <Combobox.Options>
                    <ScrollArea.Autosize type="scroll" mah={300}>
                        {options}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    </Tooltip>
  );
};

export default GroupedColorSelector;
