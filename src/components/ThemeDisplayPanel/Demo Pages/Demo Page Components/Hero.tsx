import { ActionIcon, Tooltip, Group, Stack, Title, Text, Card, Box } from "@mantine/core";
import { IconBrandGithub, IconBrandMantine } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

const MANTINE_VERSION = "8.3.1";

export const Hero = () => {
    const { t } = useTranslation("dashboard");
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Box p="lg">
        <Stack gap="sm" align="center" ta="center" pt={'10rem'}>
        <Title order={1}>{t("hero.title")}</Title>
        <Text c="dimmed" size="sm">
            {t("hero.subtitle")}
        </Text>

        <Group align="center" gap={isMobile ? "xs" : "md"} wrap="nowrap">
            <Tooltip label={t("hero.links.github")}>
            <ActionIcon
                size="lg"
                variant="filled"
                onClick={() => window.open("https://github.com/kahvilei/mantine-theme-generator", "_blank")}
            >
                <IconBrandGithub size="1.25rem" />
            </ActionIcon>
            </Tooltip>

            <Tooltip label={t("hero.links.docs")}>
            <ActionIcon
                size="lg"
                variant="filled"
                onClick={() => window.open("https://mantine.dev/", "_blank")}
            >
                <IconBrandMantine size="1.25rem" />
            </ActionIcon>
            </Tooltip>
        </Group>

        <Text size="xs" c="dimmed">
            {t("hero.version", { version: MANTINE_VERSION })}
        </Text>
        </Stack>
    </Box>
  );
}
