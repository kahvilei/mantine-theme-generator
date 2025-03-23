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


export const Dashboard: React.FC = () => {
    return (
        <Stack gap="xl">
            <Grid>
                <Grid.Col span={12}>
                    <Card p="lg">
                        <Group justify="space-between" mb="md">
                            <Stack gap={0}>
                                <Title order={3}>Analytics Overview</Title>
                                <Text c="dimmed">Monthly performance metrics</Text>
                            </Stack>
                            <SegmentedControl
                                data={[
                                    { label: 'Day', value: 'day' },
                                    { label: 'Week', value: 'week' },
                                    { label: 'Month', value: 'month' }
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
                                { name: 'Visitors', color: 'blue.6' },
                                { name: 'Conversions', color: 'teal.6' },
                                { name: 'Revenue', color: 'violet.6' }
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
                            <ThemeIcon size="xl" color="primary">
                                <IconUser size={24} />
                            </ThemeIcon>
                            <Stack gap={0}>
                                <Text size="xs" c="dimmed">Total Users</Text>
                                <Text size="xl" fw={700}>24,532</Text>
                                <Text size="xs" c="green">+12.3% <IconArrowRight size={12} /></Text>
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
                                <Text size="xs" c="dimmed">Revenue</Text>
                                <Text size="xl" fw={700}>$48,271</Text>
                                <Text size="xs" c="green">+8.7% <IconArrowRight size={12} /></Text>
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
                                <Text size="xs" c="dimmed">Sessions</Text>
                                <Text size="xl" fw={700}>98,347</Text>
                                <Text size="xs" c="green">+25.8% <IconArrowRight size={12} /></Text>
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
                                <Text size="xs" c="dimmed">Engagement</Text>
                                <Text size="xl" fw={700}>64.8%</Text>
                                <Text size="xs" c="red">-3.2% <IconArrowRight size={12} /></Text>
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
                                <Title order={3}>Recent Activities</Title>
                                <Button variant="light" leftSection={<IconPlus size={14} />}>Add New</Button>
                            </Group>
                            <ScrollArea h={650}>
                                <Stack>
                                    {[
                                        { text: 'John updated the project status to "Completed"', time: '2 minutes ago', icon: IconCheck, color: 'green' },
                                        { text: 'Sara uploaded a new file "design-mockup.fig"', time: '10 minutes ago', icon: IconUpload, color: 'blue' },
                                        { text: 'Team meeting scheduled for tomorrow at 10:00 AM', time: '1 hour ago', icon: IconUsersGroup, color: 'violet' },
                                        { text: 'New comment on task "Create user flow diagram"', time: '2 hours ago', icon: IconMessage, color: 'orange' },
                                        { text: 'David completed the task "Write API documentation"', time: '3 hours ago', icon: IconCircleCheck, color: 'green' },
                                        { text: 'System maintenance scheduled for Sunday', time: '5 hours ago', icon: IconSettings, color: 'gray' },
                                        { text: 'Emily submitted a new feature request', time: '1 day ago', icon: IconPlus, color: 'blue' }
                                    ].map((activity, index) => (
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
                                <Title order={3}>Device Usage</Title>
                                <Center>
                                <DonutChart
                                    data={[
                                        { name: 'Desktop', value: 45, color: 'blue' },
                                        { name: 'Mobile', value: 38, color: 'orange' },
                                        { name: 'Tablet', value: 17, color: 'violet' }
                                    ]}
                                    size={180}
                                    thickness={20}
                                    withLabels
                                    withTooltip
                                /></Center>
                                <List spacing="xs" size="sm" center>
                                    <List.Item icon={
                                        <ThemeIcon color="blue" size={20} radius="xl">
                                            <IconDeviceDesktop size={12} />
                                        </ThemeIcon>
                                    }>
                                        Desktop: 45%
                                    </List.Item>
                                    <List.Item icon={
                                        <ThemeIcon color="orange" size={20} radius="xl">
                                            <IconDeviceMobile size={12} />
                                        </ThemeIcon>
                                    }>
                                        Mobile: 38%
                                    </List.Item>
                                    <List.Item icon={
                                        <ThemeIcon color="violet" size={20} radius="xl">
                                            <IconDeviceTablet size={12} />
                                        </ThemeIcon>
                                    }>
                                        Tablet: 17%
                                    </List.Item>
                                </List>
                            </Stack>
                        </Card>

                        <Card p="lg">
                            <Stack>
                                <Title order={3}>Team Performance</Title>
                                <BarChart
                                    h={180}
                                    data={[
                                        { name: 'Design', tasks: 42 },
                                        { name: 'Frontend', tasks: 58 },
                                        { name: 'Backend', tasks: 45 },
                                        { name: 'QA', tasks: 37 }
                                    ]}
                                    dataKey="name"
                                    series={[
                                        { name: 'tasks', color: 'blue.6' }
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