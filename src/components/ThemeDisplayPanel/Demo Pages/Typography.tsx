import {
    Anchor,
    Blockquote,
    Card,
    Code,
    Grid,
    Group,
    Kbd,
    Mark,
    Paper,
    Stack,
    Text,
    Title
} from "@mantine/core";
import { useTranslation } from "react-i18next";

export interface TypographyInterface {
    theme: Record<string, any>;
}

export const Typography = ({ theme }: TypographyInterface) => {
    const { t } = useTranslation('typography');

    return (
        <Stack gap="xl" w="100%">

            <Group gap="md" align='flex-end' justify="space-between">
                <Title order={1}>{t('headings.h1')}</Title>
                <Title order={2}>{t('headings.h2')}</Title>
                <Title order={3}>{t('headings.h3')}</Title>
                <Title order={4}>{t('headings.h4')}</Title>
                <Title order={5}>{t('headings.h5')}</Title>
                <Title order={6}>{t('headings.h6')}</Title>
            </Group>

            <Group align="flex-start">
                <Stack flex="1 300px">
                    <Card p="lg">
                        <Stack gap="md">
                            <Title order={3}>{t('textSizes.title')}</Title>
                            <Paper p="md">
                                <Stack>
                                    <Text size="xl">{t('textSizes.xl')}</Text>
                                    <Text size="lg">{t('textSizes.lg')}</Text>
                                    <Text size="md">{t('textSizes.md')} <Text component="span" c="dimmed">{t('textSizes.default')}</Text></Text>
                                    <Text size="sm">{t('textSizes.sm')}</Text>
                                    <Text size="xs">{t('textSizes.xs')}</Text>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Card>
                </Stack>

                <Stack flex="1 300px">
                    <Card p="lg">
                        <Stack gap="md">
                            <Title order={3}>{t('fontFamily.title')}</Title>
                            <Paper p="md">
                                <Stack>
                                    <Group>
                                        <Text fw={500}>{t('fontFamily.default')}:</Text>
                                        <Code>{theme.fontFamily}</Code>
                                    </Group>
                                    <Group>
                                        <Text fw={500}>{t('fontFamily.headings')}:</Text>
                                        <Code>{theme.headings?.fontFamily || theme.fontFamily}</Code>
                                    </Group>
                                    <Group>
                                        <Text fw={500}>{t('fontFamily.monospace')}:</Text>
                                        <Code>{theme.fontFamilyMonospace}</Code>
                                    </Group>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Card>
                </Stack>
            </Group>

            <Grid>
                <Grid.Col span={12}>
                    <Card p="lg">
                        <Stack gap="md">
                            <Title order={3}>{t('specialStyles.title')}</Title>
                            <Paper p="md">
                                <Stack>
                                    <Blockquote cite={t('specialStyles.blockquoteCite')}>
                                        {t('specialStyles.blockquoteText')}
                                    </Blockquote>
                                </Stack>
                            </Paper>

                            <Paper p="md">
                                <Stack>
                                    <Text fw={500}>Code &amp; Keyboard</Text>
                                    <Code>{t('specialStyles.codeText')}</Code>
                                    <Kbd>{t('specialStyles.kbdText')}</Kbd>
                                </Stack>
                            </Paper>

                            <Paper p="md">
                                <Stack>
                                    <Text fw={500}>Text Formatting</Text>
                                    <Text>
                                        {t('specialStyles.markText')}
                                        <Mark>{t('specialStyles.markHighlight')}</Mark>
                                        {t('specialStyles.markEnd')}
                                    </Text>
                                    <Anchor href="#">{t('specialStyles.anchorText')}</Anchor>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Card>
                </Grid.Col>
            </Grid>
        </Stack>
    );
};