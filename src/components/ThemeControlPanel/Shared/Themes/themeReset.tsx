import { theme } from "@/data/Store";
import { ActionIcon, Button, Group, Popover, Text, Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconRestore, IconTrash, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const ResetCurrentThemeButton = () => {
    const [opened, setOpened] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const { t } = useTranslation(['theme']);

    return(
    <Popover opened={opened} onClose={() => setOpened(false)} position="bottom" withArrow>
        <Popover.Target>
            <Tooltip label={t('panel.resetTheme', { ns: 'theme' })}>
                <ActionIcon
                    variant="light"
                    color="red"
                    onClick={() => setOpened(true)}
                    size={isMobile ? "sm" : "md"}
                >
                    <IconRestore size={isMobile ? "1rem" : "1.25rem"} />
                </ActionIcon>
            </Tooltip>
        </Popover.Target>
        <Popover.Dropdown>
            <Text size="sm">
                {t('panel.resetConfirmation', { ns: 'theme' })}
            </Text>
            <Group mt="md">
                <Button
                    variant="filled"
                    color="red"
                    leftSection={<IconTrash size="1.25rem" />}
                    onClick={() => {
                        theme.reset();
                        setOpened(false);
                    }}
                >
                    {t('panel.deleteChanges', { ns: 'theme' })}
                </Button>
                <Button
                    variant="filled"
                    leftSection={<IconX size="1.25rem" />}
                    onClick={() => {
                        setOpened(false);
                    }}
                >
                    {t('panel.cancelReset', { ns: 'theme' })}
                </Button>
            </Group>
        </Popover.Dropdown>
    </Popover>
    );
}