import React from 'react';
import {
  Card,
  Text,
  Button,
  TextInput,
  PasswordInput,
  Checkbox,
  Group,
  Avatar,
  ScrollArea,
  Stack,
  Title,
  Badge,
  Divider,
  Progress,
  RingProgress,
  ThemeIcon,
} from '@mantine/core';
import { BarChart, LineChart, PieChart } from '@mantine/charts';
import { useTranslation } from 'react-i18next';
import { colors, theme } from '@/data/Store';

export interface ThemeBlock {
  id: string;
  title: string;
  tags: string[];
  render: () => React.ReactNode;
}

export const themeBlocks: ThemeBlock[] = [
  {
    id: 'line-chart',
    title: 'blocks.lineChart.title',
    tags: ['Chart', 'Data'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      return (
        <Card withBorder radius="md" p="md">
          <Title order={4}>{t('lineChart.title')}</Title>
          <Text size="sm" c="dimmed" mb="sm">
            {t('lineChart.subtitle')}
          </Text>
          <LineChart
            h={200}
            data={[
              { day: 'Mon', value: 30 },
              { day: 'Tue', value: 50 },
              { day: 'Wed', value: 45 },
              { day: 'Thu', value: 60 },
              { day: 'Fri', value: 40 },
            ]}
            dataKey="day"
            series={[{ name: 'value', color: colors.primaryColor }]}
          />
        </Card>
      );
    },
  },

  {
    id: 'article-snippet',
    title: 'blocks.article.title',
    tags: ['Card', 'Text'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const tags = t('article.tags', { returnObjects: true }) as string[] || [];
      return (
        <Card>
          <Title order={4}>{t('article.title')}</Title>
          <Text size="sm" c="dimmed" mb="xs">
            {t('article.subtitle')}
          </Text>
          <Divider mb="sm" />
          <Text mb="sm">{t('article.excerpt')}</Text>
          <Group>
            {tags.map((tag) => (
              <Badge key={tag} color="gray" variant="light">
                {tag}
              </Badge>
            ))}
          </Group>
        </Card>
      );
    },
  },

  {
    id: 'login-form',
    title: 'blocks.login.title',
    tags: ['Form', 'Input'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      return (
        <Card>
          <Title order={4}>{t('login.title')}</Title>
          <Stack>
            <TextInput label={t('login.email')} placeholder={t('login.emailPlaceholder')} />
            <PasswordInput label={t('login.password')} placeholder={t('login.passwordPlaceholder')} />
            <Group justify="space-between">
              <Checkbox label={t('login.remember')} />
              <Button variant="subtle">{t('login.forgot')}</Button>
            </Group>
            <Button fullWidth>{t('login.submit')}</Button>
          </Stack>
        </Card>
      );
    },
  },

  {
    id: 'chat-log',
    title: 'blocks.chat.title',
    tags: ['Chat', 'Scroll'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const messages = t('chat.messages', { returnObjects: true }) as { sender: string; text: string }[];
      return (
        <Card>
          <Title order={4}>{t('chat.title')}</Title>
          <ScrollArea h={200} my="sm">
            <Stack>
              {messages.map((m, i) => (
                <Group key={i} justify={m.sender === 'me' ? 'flex-end' : 'flex-start'}>
                  <Card
                    radius="md"
                    p="xs"
                    style={{
                      maxWidth: '70%',
                      backgroundColor: m.sender === 'me' ? 'var(--mantine-color-blue-light)' : undefined,
                    }}
                  >
                    <Text size="sm">{m.text}</Text>
                  </Card>
                </Group>
              ))}
            </Stack>
          </ScrollArea>
          <Text size="xs" c="dimmed">
            {t('chat.footer')}
          </Text>
        </Card>
      );
    },
  },

  {
    id: 'team-list',
    title: 'blocks.team.title',
    tags: ['Avatar', 'List'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const members = t('team.members', { returnObjects: true }) as { name: string; role: string; avatar?: string }[];
      console.log(members)
      return (
        <Card>
          <Title order={4}>{t('team.title')}</Title>
          <Stack>
            {members.map((m, i) => (
              <Group key={i} justify="space-between">
                <Group>
                  <Avatar radius="xl" src={m.avatar} alt={m.name} />
                  <div>
                    <Text size="sm" fw={500}>
                      {m.name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {m.role}
                    </Text>
                  </div>
                </Group>
                <Button size="xs" variant="light">
                  {t('team.action')}
                </Button>
              </Group>
            ))}
          </Stack>
        </Card>
      );
    },
  },
  {
    id: 'expense-dashboard',
    title: 'blocks.expenseDashboard.title',
    tags: ['Card', 'Chart', 'List'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const data = t('expenseDashboard.data', { returnObjects: true }) as { category: string; amount: number }[];
      return (
        <Card withBorder radius="md" p="md">
          <Title order={4}>{t('expenseDashboard.title')}</Title>
          <Text size="sm" c="dimmed">{t('expenseDashboard.subtitle')}</Text>
          <LineChart
            h={180}
            data={data}
            dataKey="category"
            series={[{ name: 'amount', color: colors.primaryColor }]}
          />
          <Divider my="sm" />
          <Stack gap="xs">
            {data.map((d) => (
              <Group key={d.category} justify="apart">
                <Text size="sm">{d.category}</Text>
                <Text size="sm" fw={500}>{d.amount}</Text>
              </Group>
            ))}
          </Stack>
        </Card>
      );
    },
  },
  {
    id: 'user-profile',
    title: 'blocks.userProfile.title',
    tags: ['Card', 'Avatar', 'Profile'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const user = t('userProfile.user', { returnObjects: true }) as { name: string; role: string; avatar: string };
      return (
        <Card radius="md" withBorder p="md">
          <Group>
            <Avatar size="lg" src={user.avatar} radius="xl" />
            <div>
              <Text fw={600}>{user.name}</Text>
              <Text c="dimmed">{user.role}</Text>
            </div>
          </Group>
          <Button mt="md" fullWidth color={colors.primaryColor}>{t('userProfile.follow')}</Button>
        </Card>
      );
    },
  },
  {
    id: 'pricing-cards',
    title: 'blocks.pricing.title',
    tags: ['Card', 'Stack', 'Badge', 'Button'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const plans = t('pricing.plans', { returnObjects: true }) as { name: string; price: string; features: string[] }[];
      return (
        <Stack gap="md">
          {plans.map((plan) => (
            <Card key={plan.name} shadow="sm" radius="md" withBorder p="md">
              <Group justify="apart" mb="xs">
                <Title order={5}>{plan.name}</Title>
                <Badge color={colors.primaryColor}>{plan.price}</Badge>
              </Group>
              <Stack gap="xs">
                {plan.features.map((f) => <Text key={f} size="sm">{f}</Text>)}
              </Stack>
              <Button mt="sm" fullWidth color={colors.primaryColor}>{t('pricing.select')}</Button>
            </Card>
          ))}
        </Stack>
      );
    },
  },
  {
    id: 'notification-list',
    title: 'blocks.notifications.title',
    tags: ['Card', 'Scroll', 'Badge'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const notifications = t('notifications.items', { returnObjects: true }) as { title: string; type: string }[];
      return (
        <Card radius="md" withBorder p="md">
          <Title order={4}>{t('notifications.title')}</Title>
          <ScrollArea h={180} mt="sm">
            <Stack gap="xs">
              {notifications.map((n, i) => (
                <Group key={i} justify="apart">
                  <Text size="sm">{n.title}</Text>
                  <Badge color={n.type === 'error' ? 'red' : colors.primaryColor} variant="light">{n.type}</Badge>
                </Group>
              ))}
            </Stack>
          </ScrollArea>
        </Card>
      );
    },
  },
  {
    id: 'calendar-events',
    title: 'blocks.calendar.title',
    tags: ['Card', 'Stack', 'Text'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const events = t('calendar.events', { returnObjects: true }) as { title: string; time: string; color: string }[];
      return (
        <Card radius="md" withBorder p="md">
          <Title order={4}>{t('calendar.title')}</Title>
          <Stack gap="xs" mt="sm">
            {events.map((e, i) => (
              <Group key={i} justify="apart">
                <Text size="sm">{e.title}</Text>
                <Badge color={e.color ?? colors.primaryColor}>{e.time}</Badge>
              </Group>
            ))}
          </Stack>
        </Card>
      );
    },
  },
  {
    id: 'weekly-activity',
    title: 'blocks.weeklyActivity.title',
    tags: ['Chart', 'Progress', 'Data'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const data = t('weeklyActivity.data', { returnObjects: true }) as { day: string; activity: number }[];
      return (
        <Card radius="md" p="md">
          <Title order={4}>{t('weeklyActivity.title')}</Title>
          <Text size="sm" c="dimmed" mb="sm">{t('weeklyActivity.subtitle')}</Text>
          <Stack gap="xs">
            {data.map((d) => (
              <div key={d.day}>
                <Text size="sm" mb="xs">{d.day}</Text>
                <Progress value={d.activity} color={colors.primaryColor} size="lg" />
              </div>
            ))}
          </Stack>
        </Card>
      );
    },
  },
  {
    id: 'project-pie',
    title: 'blocks.projectPie.title',
    tags: ['Chart', 'Pie', 'Data'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const projects = t('projectPie.projects', { returnObjects: true }) as { name: string; percent: number; color: string }[];
      return (
        <Card radius="md" p="md">
          <Title order={4}>{t('projectPie.title')}</Title>
          <PieChart
            h={180}
            data={projects}
            label={({ dataEntry }) => `${dataEntry.name}: ${dataEntry.percent}%`}
            colors={projects.map(p => p.color)}
          />
          <Stack mt="sm" gap="xs">
            {projects.map(p => (
              <Group key={p.name} justify="apart">
                <Text size="sm">{p.name}</Text>
                <Text size="sm" fw={500}>{p.percent}%</Text>
              </Group>
            ))}
          </Stack>
        </Card>
      );
    },
  },
  {
    id: 'task-list',
    title: 'blocks.taskList.title',
    tags: ['List', 'Checkbox', 'Scroll'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const tasks = t('taskList.items', { returnObjects: true }) as { task: string; completed: boolean }[];
      return (
        <Card radius="md" p="md">
          <Title order={4}>{t('taskList.title')}</Title>
          <ScrollArea h={220} mt="sm">
            <Stack gap="xs">
              {tasks.map((task, i) => (
                <Group key={i} justify="apart">
                  <Checkbox label={task.task} checked={task.completed} />
                  <Badge color={task.completed ? 'green' : 'gray'} variant="light">{task.completed ? t('taskList.done') : t('taskList.pending')}</Badge>
                </Group>
              ))}
            </Stack>
          </ScrollArea>
        </Card>
      );
    },
  },
  {
    id: 'profile-summary',
    title: 'blocks.profileSummary.title',
    tags: ['Avatar', 'Card', 'Stack'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const user = t('profileSummary.user', { returnObjects: true }) as { name: string; role: string; avatar: string; progress: number };
      return (
        <Card radius="md" p="md">
          <Group gap="md">
            <Avatar src={user.avatar} size={60} radius="xl" />
            <Stack gap="xs" style={{ flex: 1 }}>
              <Text fw={600}>{user.name}</Text>
              <Text c="dimmed" size="sm">{user.role}</Text>
              <RingProgress
                size={60}
                roundCaps
                thickness={6}
                sections={[{ value: user.progress, color: colors.primaryColor }]}
                label={<Text size="xs">{user.progress}%</Text>}
              />
            </Stack>
          </Group>
        </Card>
      );
    },
  },
  {
    id: 'bar-performance',
    title: 'blocks.barPerformance.title',
    tags: ['Chart', 'Bar', 'Data'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const data = t('barPerformance.data', { returnObjects: true }) as { metric: string; value: number; color: string }[];
      return (
        <Card radius="md" p="md">
          <Title order={4}>{t('barPerformance.title')}</Title>
          <BarChart
            h={180}
            data={data}
            dataKey="metric"
            series={[{ name: 'value', color: colors.primaryColor }]}
          />
          <Stack mt="sm" gap="xs">
            {data.map(d => (
              <Group key={d.metric} justify="apart">
                <Text size="sm">{d.metric}</Text>
                <Text size="sm" fw={500}>{d.value}</Text>
              </Group>
            ))}
          </Stack>
        </Card>
      );
    },
  },
];