import React from 'react';
import {
  Box,
  Combobox,
  ScrollArea,
  Tooltip,
  useCombobox,
} from '@mantine/core';
import ColorSwatch from '@/components/ThemeControlPanel/Shared/Colors/ColorSwatch';
import classes from './GroupedColorSelector.module.css';
import { useTranslation } from 'react-i18next';

interface ColorGroup {
  key: string;
  value: Set<string>;
}

interface GroupedColorSelectorProps {
  colors: ColorGroup[];
  onSelect: (color: string) => void;
  mainColor?: string;
}

const GroupedColorSelector: React.FC<GroupedColorSelectorProps> = ({
                                                                     colors,
                                                                     onSelect,
                                                                     mainColor,
                                                                   }) => {
  const { t } = useTranslation(['theme']);

  const colorData = colors.map((group) => {
    // Translate group key if it's a standard color category
    const translatedKey = group.key === 'Custom Colors'
        ? t('colors.categories.customColors')
        : group.key === 'Mantine Colors'
            ? t('colors.categories.mantineColors')
            : group.key;

    return { group: translatedKey, items: Array.from(group.value?.keys()) };
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = colorData.map((group) => {
    const subOptions = group.items.map((item) => {
      return (
          <Combobox.Option key={item} value={item}>
            <Tooltip label={item} position="right">
              <ColorSwatch name={item} size="sm" />
            </Tooltip>
          </Combobox.Option>
      );
    });

    return (
        <Combobox.Group key={group.group} label={group.group}>
          {subOptions}
        </Combobox.Group>
    );
  });

  return (
      <Tooltip label={mainColor} position="right">
        <Combobox
            store={combobox}
            onOptionSubmit={(val) => {
              onSelect(val);
              combobox.closeDropdown();
            }}
            classNames={{
              dropdown: classes.colorSelectorDropdown,
              options: classes.options,
              option: classes.option
            }}
            withinPortal={false}
        >
          <Combobox.Target>
            <Box
                component="button"
                onClick={() => combobox.toggleDropdown()}
                aria-label={t('colors.editor.selectColor', { defaultValue: 'select color' })}
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