import {MantineThemeOverride, Stack, Title} from '@mantine/core';
import premadeThemes from "@/components/ThemeControlPanel/Shared/Themes/premadeThemes.json";

import ThemeSelector from "@/components/ThemeControlPanel/Shared/Themes/ThemeSelector";
import ThemeColorSelector from "@/components/ThemeControlPanel/Shared/Colors/ThemeColorSelector";

const QuickSetUp = () => {
    return (
        <Stack gap="xl">
            <Title order={2}>Quick Setup</Title>
            <ThemeSelector themes={premadeThemes as unknown as Record<string, Partial<MantineThemeOverride>>} />
            <ThemeColorSelector label="Primary Color"/>
        </Stack>
    );
};

export default QuickSetUp;