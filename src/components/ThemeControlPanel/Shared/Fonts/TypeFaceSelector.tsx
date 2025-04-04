import {
    Combobox,
    InputBase,
    Text,
    useCombobox,
    ScrollArea,
    Group
} from '@mantine/core';
import { getFontData } from "@/components/ThemeControlPanel/Shared/Fonts/fontData";
import classes from './TypeFaceSelector.module.css';
import { IconSelector } from "@tabler/icons-react";
import { useTranslation } from 'react-i18next';

interface TypeFaceSelectorProps {
    value: string;
    onSelect: (value: string) => void;
    label?: string;
    w?: number | string;
    h?: number | string;
}

export const TypeFaceSelector = ({value, onSelect, label, w, h}: TypeFaceSelectorProps) => {
    const { t } = useTranslation(['theme']);
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const fontData = getFontData();

    const size = w ?? '7rem';

    const options = fontData.map((group) => {
        const subOptions = group.items.map((item) => {
            return(
                <Combobox.Option key={item} value={item}><FontOption value={item} label={item}/></Combobox.Option>
            )
        })

        return (
            <Combobox.Group key={group.group} label={group.group}>
                {subOptions}
            </Combobox.Group>
        )
    })

    return (
        <Combobox
            store={combobox}
            withArrow
            onOptionSubmit={(val) => {
                onSelect(val);
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase
                    component="button"
                    type="button"
                    pointer
                    onClick={() => combobox.toggleDropdown()}
                    className={classes.typeFaceSelector}
                    tabIndex={0}
                    aria-label={label ?? t('typography.fonts.selectFont')}
                    style={{
                        fontSize: w ?? size,
                    }}
                    styles={{
                        input: {
                            height: h ?? '100%',
                            width: w ?? size
                        }
                    }}
                >
                    <Group className={classes.typeFaceLabel}>
                        {label && label}
                        <IconSelector size={15}/>
                    </Group>
                    <Group gap={0} justify="center">
                        <Text ff={value} className={classes.typeFacePreview}>{t('typography.fonts.typeFacePreview', { defaultValue: 'Aa' })}</Text>
                        <Text c="dimmed" className={classes.typeFaceName}>{value}</Text>
                    </Group>
                </InputBase>
            </Combobox.Target>
            <Combobox.Dropdown className={classes.typeFaceDropDown}>
                <Combobox.Options>
                    <ScrollArea.Autosize type="scroll" mah={300}>
                        {options}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    )
}

// Font preview option component
interface FontOptionProps {
    value: string;
    label: string;
    isMonospace?: boolean;
}

const FontOption = ({ value }: FontOptionProps) => {
    return (
        <Text ff={value} size="sm">{value}</Text>
    );
};