import { observer } from 'mobx-react-lite';
import { Group } from '@mantine/core';
import { TypeFaceSelector } from "@/components/ThemeControlPanel/Shared/Fonts/TypeFaceSelector";
import { Typography } from '@/data/Models/Theme/Typography/Typography';
import { typography as manager } from "@/data/Store";


interface ThemeFontsSelectorProps {
    typography?: Typography;
}

const ThemeFontsSelector = observer(({ typography = manager }: ThemeFontsSelectorProps) => {
    // Action handlers
    const handleBodyFontFamilyChange = (value: string) => {
        typography.setFontFamily(value);
    };

    const handleHeadingFontFamilyChange = (value: string) => {
        typography.setHeadingFontFamily(value);
    };

    const handleMonospaceFontFamilyChange = (value: string) => {
        typography.setMonoFontFamily(value);
    };

    return (
        <Group gap={7}>
            <TypeFaceSelector
                label="Body"
                value={typography.getFontFamily()}
                onSelect={handleBodyFontFamilyChange}
            />
            <TypeFaceSelector
                label="Headings"
                value={typography.getHeadingFontFamily()}
                onSelect={handleHeadingFontFamilyChange}
            />
            <TypeFaceSelector
                label="Monospace"
                value={typography.getMonoFontFamily()}
                onSelect={handleMonospaceFontFamilyChange}
            />
        </Group>
    );
});

export default ThemeFontsSelector;