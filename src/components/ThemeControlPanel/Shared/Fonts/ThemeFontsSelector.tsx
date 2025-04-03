import { observer } from 'mobx-react-lite';
import { Group } from '@mantine/core';
import { TypeFaceSelector } from "@/components/ThemeControlPanel/Shared/Fonts/TypeFaceSelector";
import { Typography } from '@/data/Models/Theme/Typography/Typography';
import { typography as manager } from "@/data/Store";
import { useTranslation } from 'react-i18next';

interface ThemeFontsSelectorProps {
    typography?: Typography;
}

const ThemeFontsSelector = observer(({ typography = manager }: ThemeFontsSelectorProps) => {
    const { t } = useTranslation(['theme']);

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
                label={t('typography.fonts.body')}
                value={typography.getFontFamily()}
                onSelect={handleBodyFontFamilyChange}
            />
            <TypeFaceSelector
                label={t('typography.fonts.headings')}
                value={typography.getHeadingFontFamily()}
                onSelect={handleHeadingFontFamilyChange}
            />
            <TypeFaceSelector
                label={t('typography.fonts.monospace')}
                value={typography.getMonoFontFamily()}
                onSelect={handleMonospaceFontFamilyChange}
            />
        </Group>
    );
});

export default ThemeFontsSelector;