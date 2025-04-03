import { Stack, Title, Box } from '@mantine/core';
import NumberUnitSelector from "@/components/ThemeControlPanel/Shared/Input/NumberUnitSelector";
import { observer } from "mobx-react-lite";
import { sizes } from '@/data/Store';
import { Size } from "@/data/Models/Theme/SizeAndSpacing/Sizes";
import { useTranslation } from 'react-i18next';

const BreakpointControls = observer(() => {
    const { t } = useTranslation(['theme']);

    return (
        <Box>
            <Title order={4}>{t('layout.breakpoints')}</Title>
            <Stack mt="md">
                {sizes.getBreakPoints().map(([size, value]) => (
                    <NumberUnitSelector
                        key={size}
                        label={size}
                        value={value || '0px'}
                        onChange={(value) => sizes.setBreakPoint(size as Size, value)}
                        min={0}
                        max={2000}
                    />
                ))}
            </Stack>
        </Box>
    );
});

export default BreakpointControls;