import { Slider, Stack, Text } from '@mantine/core';
import { sizes } from '@/data/Store';
import { observer } from "mobx-react-lite";
import { useTranslation } from 'react-i18next';

const Scale = observer(() => {
    const { t } = useTranslation(['theme']);

    return (
        <Stack>
            <Text size="sm">{t('layout.scale')}</Text>
            <Slider
                min={0.1}
                max={2}
                step={0.1}
                value={sizes.getScale()}
                onChange={(value) => sizes.setScale(value)}
                marks={[
                    { value: 0.5, label: t('layout.scaleValue', { value: 0.5 }) },
                    { value: 1, label: t('layout.scaleValue', { value: 1 }) },
                    { value: 1.5, label: t('layout.scaleValue', { value: 1.5 }) },
                    { value: 2, label: t('layout.scaleValue', { value: 2 }) },
                ]}
                label={(value) => t('layout.scaleValue', { value })}
            />
        </Stack>
    );
});

export default Scale;