import { Stack, Title, Box } from '@mantine/core';
import NumberUnitSelector from "@/components/ThemeControlPanel/Shared/Input/NumberUnitSelector";
import { sizes } from '@/data/Store';
import { observer } from "mobx-react-lite";
import { useTranslation } from 'react-i18next';

const SpacingControls = observer(() => {
    const { t } = useTranslation(['theme']);
    const spacingSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    return (
        <Box>
            <Title order={4}>{t('layout.spacing')}</Title>
            <Stack mt="md">
                {spacingSizes.map((size) => (
                    <NumberUnitSelector
                        key={size}
                        label={size}
                        value={sizes.getSpacingSize(size) ?? ""}
                        onChange={(value) => sizes.setSpacingSize(size, value)}
                        min={0}
                        max={100}
                    />
                ))}
            </Stack>
        </Box>
    );
});

export default SpacingControls;