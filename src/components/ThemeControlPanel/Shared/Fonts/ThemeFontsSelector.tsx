import { Group } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { TypeFaceSelector } from "@/components/ThemeControlPanel/Shared/Fonts/TypeFaceSelector";
import {typography as TypeManager} from "@/data/Store";
import {Typography} from "@/data/Models/Theme/Typography/Typography";

interface ThemeFontsSelectorProps {
    typography?: Typography;
}

const ThemeFontsSelector = observer(({ typography = TypeManager }: ThemeFontsSelectorProps) => {
    // Action handlers
    const handleBodyFontFamilyChange = (value: string) => {
        typography.setFontFamily(value);
    };

    const handleHeadingFontFamilyChange = (value: string) => {
        if (!typography.headings) {
            typography.headings = {};
        }
        typography.headings.fontFamily = value;
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