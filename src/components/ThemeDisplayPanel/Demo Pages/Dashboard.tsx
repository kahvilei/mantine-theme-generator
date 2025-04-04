import {
    Button,
    Card, Center,
    Grid,
    Group, List,
    Paper,
    ScrollArea, SegmentedControl,
    Stack,
    Text,
    ThemeIcon,
    Title
} from "@mantine/core";
import {
    IconArrowRight, IconBrandSlack,
    IconChartBar, IconCheck, IconCircleCheck,
    IconDeviceDesktop, IconDeviceMobile, IconDeviceTablet,
    IconMessage, IconPlus,
    IconSettings,
    IconUpload,
    IconUser, IconUsersGroup
} from "@tabler/icons-react";
import React from "react";
import {AreaChart, BarChart, DonutChart} from "@mantine/charts";
import { useTranslation } from 'react-i18next';

export const Dashboard: React.FC = () => {
    // Use the dashboard namespace
    const { t } = useTranslation('dashboard');

    const activities = [
        { text: t('activities.items.statusUpdate'), time: t('activities.timeAgo.minutes', { count: 2 }), icon: IconCheck, color: 'green' },
        { text: t('activities.items.fileUpload'), time: t('activities.timeAgo.minutes', { count: 10 }), icon: IconUpload, color: 'var(--mantine-primary-color-filled)' },
        { text: t('activities.items.meeting'), time: t('activities.timeAgo.hours', { count: 1 }), icon: IconUsersGroup, color: 'violet' },
        { text: t('activities.items.comment'), time: t('activities.timeAgo.hours', { count: 2 }), icon: IconMessage, color: 'orange' },
        { text: t('activities.items.taskComplete'), time: t('activities.timeAgo.hours', { count: 3 }), icon: IconCircleCheck, color: 'green' },
        { text: t('activities.items.maintenance'), time: t('activities.timeAgo.hours', { count: 5 }), icon: IconSettings, color: 'gray' },
        { text: t('activities.items.feature'), time: t('activities.timeAgo.days', { count: 1 }), icon: IconPlus, color: 'var(--mantine-primary-color-filled)' }
    ];

    return (
        <Stack gap="xl" flex={1}>
            <Grid>
                <Grid.Col span={12}>
                    <Card p="lg">
                        <Group justify="space-between" mb="md">
                            <Stack gap={0}>
                                <Title order={3}>{t('analytics.title')}</Title>
                                <Text c="dimmed">{t('analytics.subtitle')}</Text>
                            </Stack>
                            <SegmentedControl
                                data={[
                                    { label: t('analytics.timeframes.day'), value: 'day' },
                                    { label: t('analytics.timeframes.week'), value: 'week' },
                                    { label: t('analytics.timeframes.month'), value: 'month' }
                                ]}
                                defaultValue="month"
                            />
                        </Group>
                        <AreaChart
                            h={300}
                            data={[
                                { date: 'Jan', Visitors: 4500, Conversions: 2300, Revenue: 8100 },
                                { date: 'Feb', Visitors: 5300, Conversions: 2800, Revenue: 9300 },
                                { date: 'Mar', Visitors: 6100, Conversions: 3300, Revenue: 10800 },
                                { date: 'Apr', Visitors: 5800, Conversions: 3100, Revenue: 10200 },
                                { date: 'May', Visitors: 6700, Conversions: 3700, Revenue: 11500 },
                                { date: 'Jun', Visitors: 7500, Conversions: 4200, Revenue: 12800 }
                            ]}
                            dataKey="date"
                            series={[
                                { name: t('analytics.charts.visitors'), color: 'var(--mantine-primary-color-filled)' },
                                { name: t('analytics.charts.conversions'), color: 'teal.6' },
                                { name: t('analytics.charts.revenue'), color: 'violet.6' }
                            ]}
                            curveType="monotone"
                        />
                    </Card>
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col span={3}>
                    <Card p="lg">
                        <Group>
                            <ThemeIcon variant="filled" size="xl">
                                <IconUser size={24} />
                            </ThemeIcon>
                            <Stack gap={0}>
                                <Text size="xs" c="dimmed">{t('metrics.users.title')}</Text>
                                <Text size="xl">24,532</Text>
                                <Text size="xs">{t('metrics.users.increase')} <IconArrowRight size={12} /></Text>
                            </Stack>
                        </Group>
                    </Card>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Card p="lg">
                        <Group>
                            <ThemeIcon size="xl" color="green">
                                <IconChartBar size={24} />
                            </ThemeIcon>
                            <Stack gap={0}>
                                <Text size="xs" c="dimmed">{t('metrics.revenue.title')}</Text>
                                <Text size="xl" >$48,271</Text>
                                <Text size="xs" c="green">{t('metrics.revenue.increase')} <IconArrowRight size={12} /></Text>
                            </Stack>
                        </Group>
                    </Card>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Card p="lg">
                        <Group>
                            <ThemeIcon size="xl" color="violet">
                                <IconDeviceDesktop size={24} />
                            </ThemeIcon>
                            <Stack gap={0}>
                                <Text size="xs" c="dimmed">{t('metrics.sessions.title')}</Text>
                                <Text size="xl" >98,347</Text>
                                <Text size="xs" c="green">{t('metrics.sessions.increase')} <IconArrowRight size={12} /></Text>
                            </Stack>
                        </Group>
                    </Card>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Card p="lg">
                        <Group>
                            <ThemeIcon size="xl" color="red">
                                <IconBrandSlack size={24} />
                            </ThemeIcon>
                            <Stack gap={0}>
                                <Text size="xs" c="dimmed">{t('metrics.engagement.title')}</Text>
                                <Text size="xl">64.8%</Text>
                                <Text size="xs" c="red">{t('metrics.engagement.decrease')} <IconArrowRight size={12} /></Text>
                            </Stack>
                        </Group>
                    </Card>
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col span={8}>
                    <Card p="lg">
                        <Stack>
                            <Group justify="space-between">
                                <Title order={3}>{t('activities.title')}</Title>
                                <Button leftSection={<IconPlus size={14} />}>{t('activities.addNew')}</Button>
                            </Group>
                            <ScrollArea h={650}>
                                <Stack>
                                    {activities.map((activity, index) => (
                                        <Paper key={index} p="md">
                                            <Group wrap='nowrap'>
                                                <ThemeIcon color={activity.color} size="lg" radius="xl">
                                                    <activity.icon size={16} />
                                                </ThemeIcon>
                                                <Stack gap={0}>
                                                    <Text size="sm">{activity.text}</Text>
                                                    <Text size="xs" c="dimmed">{activity.time}</Text>
                                                </Stack>
                                            </Group>
                                        </Paper>
                                    ))}
                                </Stack>
                            </ScrollArea>
                        </Stack>
                    </Card>
                </Grid.Col>

                <Grid.Col span={4}>
                    <Stack>
                        <Card p="lg">
                            <Stack gap="md">
                                <Title order={3}>{t('deviceUsage.title')}</Title>
                                <Center>
                                    <DonutChart
                                        data={[
                                            { name: t('deviceUsage.devices.desktop'), value: 45, color: 'var(--mantine-primary-color-filled)' },
                                            { name: t('deviceUsage.devices.mobile'), value: 38, color: 'orange' },
                                            { name: t('deviceUsage.devices.tablet'), value: 17, color: 'violet' }
                                        ]}
                                        size={180}
                                        thickness={20}
                                        withLabels
                                        withTooltip
                                    /></Center>
                                <List spacing="xs" size="sm" center>
                                    <List.Item icon={
                                        <ThemeIcon size={20} radius="xl">
                                            <IconDeviceDesktop size={12} />
                                        </ThemeIcon>
                                    }>
                                        {t('deviceUsage.devices.desktop')}: 45%
                                    </List.Item>
                                    <List.Item icon={
                                        <ThemeIcon color="orange" size={20} radius="xl">
                                            <IconDeviceMobile size={12} />
                                        </ThemeIcon>
                                    }>
                                        {t('deviceUsage.devices.mobile')}: 38%
                                    </List.Item>
                                    <List.Item icon={
                                        <ThemeIcon color="violet" size={20} radius="xl">
                                            <IconDeviceTablet size={12} />
                                        </ThemeIcon>
                                    }>
                                        {t('deviceUsage.devices.tablet')}: 17%
                                    </List.Item>
                                </List>
                            </Stack>
                        </Card>

                        <Card p="lg">
                            <Stack>
                                <Title order={3}>{t('teamPerformance.title')}</Title>
                                <BarChart
                                    h={180}
                                    data={[
                                        { name: t('teamPerformance.teams.design'), tasks: 42 },
                                        { name: t('teamPerformance.teams.frontend'), tasks: 58 },
                                        { name: t('teamPerformance.teams.backend'), tasks: 45 },
                                        { name: t('teamPerformance.teams.qa'), tasks: 37 }
                                    ]}
                                    dataKey="name"
                                    series={[
                                        { name: t('teamPerformance.tasks'), color: 'var(--mantine-primary-color-filled)' }
                                    ]}
                                    barProps={{ radius: 4 }}
                                />
                            </Stack>
                        </Card>
                    </Stack>
                </Grid.Col>
            </Grid>
        </Stack>);
}