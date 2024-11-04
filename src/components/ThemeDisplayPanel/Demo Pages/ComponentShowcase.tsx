import React from 'react';
import {
  Card,
  Container,
  Grid,
  Group,
  Text,
  TextInput,
  Button,
  Stack,
  Avatar,
  Badge,
  List,
  ThemeIcon,
  Checkbox,
  Select,
  Textarea,
  Title,
  Tabs,
  Paper,
  ActionIcon,
  Input,
  Indicator,
  Menu,
  Progress,
  RingProgress,
  Switch,
  Tooltip,
  Pill,
  rem
} from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { IconSettings, IconBell, IconSearch, IconMenu2, IconUser, IconMail, IconLock, IconChevronRight, IconMessage, IconStar, IconHeart, IconCircleCheck, IconCircleDashed, IconBellMinus, IconUsersGroup} from '@tabler/icons-react';
import { preview } from 'vite';

const ComponentShowcase = () => {
  const [activeTab, setActiveTab] = React.useState('first');

  return (
    <Container size="lg">
      <Grid gutter="md">
        <Grid.Col span={4}>
          <Stack gap="md">
          <UserProfile />
          <TaskManager />
          <QuickActions />
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
        <Stack gap="md">
          <NotificationCenter />
          <MessageThreads />
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack gap="md">
          <MetricsCard />
          <ProgressMetrics />
          <UserPreferences />
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

const UserProfile = () => (
  <Card>
    <Stack align="center">
      <Indicator processing size={16} offset={7} position="bottom-end">
        <Avatar size="xl" radius="xl">JD</Avatar>
      </Indicator>
      <Stack gap="xs" align="center">
        <Text size="lg" fw={500}>John Doe</Text>
        <Group gap="xs">
          <Pill>Pro User</Pill>
          <Pill>Developer</Pill>
        </Group>
        <Text size="sm" c="dimmed">Full-stack developer passionate about UI/UX</Text>
      </Stack>
      <Progress value={75} size="sm" radius="xl" />
      <Text size="xs" c="dimmed">Profile Completion: 75%</Text>
    </Stack>
  </Card>
);

const NotificationCenter = () => (
  <Card>
    <Stack>
      <Group justify="space-between">
        <Title order={4}>Notifications</Title>
        <ActionIcon variant="subtle"><IconBell size={20} /></ActionIcon>
      </Group>
      <Paper p="xs">
        <Group>
          <ThemeIcon size="lg"><IconMail size={20} /></ThemeIcon>
          <Stack gap={0}>
            <Text size="sm">New message received</Text>
            <Text size="xs" c="dimmed">2 minutes ago</Text>
          </Stack>
        </Group>
      </Paper>
      <Paper p="xs">
        <Group>
          <ThemeIcon size="lg"><IconStar size={20} /></ThemeIcon>
          <Stack gap={0}>
            <Text size="sm">Project milestone achieved</Text>
            <Text size="xs" c="dimmed">1 hour ago</Text>
          </Stack>
        </Group>
      </Paper>
      <Paper p="xs">
        <Group>
          <ThemeIcon size="lg"><IconLock size={20} /></ThemeIcon>
          <Stack gap={0}>
            <Text size="sm">Account password updated</Text>
            <Text size="xs" c="dimmed">1 day ago</Text>
          </Stack>
        </Group>
      </Paper>
    </Stack>
  </Card>
);

const MetricsCard = () => (
  <Card>
    <Stack>
      <Title order={4}>Key Metrics</Title>
      <Group grow>
        <RingProgress
          sections={[{ value: 812, color: 'green' }, { value: 23, color: 'blue' }, { value: 12, color: 'red' }]}
        />
        <Stack gap={0} align="center">
          <Text size="xl" fw={500}>847</Text>
          <Text size="sm" c="dimmed">Total Tasks</Text>
        </Stack>
      </Group>
      <Group
        justify="space-between"
        align="center"
        gap="sm"
      >
        <Stack gap={0} align="center">
          <Text size="xl" fw={500}>23</Text>
          <Text size="sm" c="dimmed">Pending</Text>
        </Stack>
        <Stack gap={0} align="center">
          <Text size="xl" fw={500}>12</Text>
          <Text size="sm" c="dimmed">In Progress</Text>
        </Stack>
        <Stack gap={0} align="center">
          <Text size="xl" fw={500}>812</Text>
          <Text size="sm" c="dimmed">Completed</Text>
        </Stack>
      </Group>
    </Stack>
  </Card>
);

const TaskManager = () => (
  <Card>
    <Stack>
      <Group justify="space-between">
        <Title order={4}>Tasks</Title>
        <Menu>
          <Menu.Target>
            <ActionIcon variant="subtle"><IconMenu2 size={20} /></ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>All Tasks</Menu.Item>
            <Menu.Item>Completed</Menu.Item>
            <Menu.Item>Pending</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <List 
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="green" size={24} radius="xl">
            <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
          </ThemeIcon>
        }
        >
        {['Design system update', 'API integration'].map((task) => (
          <List.Item key={task}>
            <Group justify="space-between">
              {task}
              <Badge variant="light">Complete</Badge>
            </Group>
          </List.Item>
        ))}
        <List.Item
        icon={
          <ThemeIcon color="blue" size={24} radius="xl">
            <IconCircleDashed style={{ width: rem(16), height: rem(16) }} />
          </ThemeIcon>
        }
      >
        <Group justify="space-between">
        Documentation update
              <Badge variant="light">In Progress</Badge>
            </Group>
      </List.Item>
      {['Testing', 'Deployment'].map((task) => (
        <List.Item key={task}
          icon={
            <ThemeIcon color="grey" size={24} radius="xl">
              <IconLock size={16} />
            </ThemeIcon>
          }
          >
          <Group justify="space-between">
            {task}
            <Badge variant="light">Not Started</Badge>
          </Group>
        </List.Item>
      ))}
      </List>
    </Stack>
  </Card>
);

const MessageThreads = () => (
  <Card>
    <Stack>
      <Group justify="space-between">
        <Title order={4}>Messages</Title>
        <Input
          placeholder="Search messages"
          leftSection={<IconSearch size={16} />}
          variant="filled"
          size="xs"
        />
      </Group>
      {[
        {name:'Alice Smith', preview: 'Hey, how are you?', unread: 2},
        {name:'Bob Johnson', preview: 'Can you send me the latest...', unread: 1},
        {name:'Carol White', preview: 'I have a question about...', unread: 0},
        {name:'David Brown', preview: 'Thanks for the update!', unread: 0},
        {name:'Eve Green', preview: 'I need your help with...', unread: 0}
        ].map((message) => (
        <Paper key={message.name} p="xs">
          <Group justify="space-between">
            
              {message.unread > 0 && (<Group>
                <Indicator label={message.unread} size={20} >
                <Avatar 
                size="md" 
                radius="xl"
                >
                {message.name[0]}
                </Avatar>
                </Indicator>
              <Stack gap={0}>
                <Text size="sm"  fw={'700'}>{message.name}</Text>
                <Text size="xs" c="dimmed">{message.preview}</Text>
              </Stack></Group>
              )}

              {message.unread === 0 && (<Group>
                <Avatar 
                size="md" 
                radius="xl"
                >
                {message.name[0]}
                </Avatar>
              <Stack gap={0}>
                <Text size="sm">{message.name}</Text>
                <Text size="xs" c="dimmed">{message.preview}</Text>
              </Stack></Group>
              )}
            
            <IconChevronRight size={16} />
          </Group>
        </Paper>
      ))}
    </Stack>
  </Card>
);

const ProgressMetrics = () => (
  <Card>
    <Stack>
      <Title order={4}>Project Progress</Title>
      <Stack gap="xs">
        {[
          { label: 'Design', progress: 80 },
          { label: 'Development', progress: 60 },
          { label: 'Testing', progress: 40 }
        ].map((item) => (
          <Stack key={item.label} gap="xs">
            <Group justify="space-between">
              <Text size="sm">{item.label}</Text>
              <Text size="sm" c="dimmed">{item.progress}%</Text>
            </Group>
            <Progress value={item.progress} size="sm" radius="xl" />
          </Stack>
        ))}
      </Stack>
    </Stack>
  </Card>
);

const QuickActions = () => (
  <Card>
    <Stack>
      <Title order={4}>Quick Actions</Title>
      <Grid>
        <>
          {[
            { icon: IconMessage, label: 'Message', color: 'blue' },
            { icon: IconUser, label: 'Profile', color: 'cyan' },
            { icon: IconSettings, label: 'Settings', color: 'orange' },
            { icon: IconHeart, label: 'Favorites', color: 'red' },
            { icon: IconBellMinus, label: 'Notifications', color: 'green' },
            { icon: IconCircleCheck, label: 'Tasks', color: 'grape' },
            { icon: IconSearch, label: 'Search', color: 'teal' },
            { icon: IconUsersGroup, label: 'Team', color: 'pink' }
          ].map((action) => (
            <Grid.Col key={action.label} span={3}>
              <Tooltip label={action.label}>
                  <Stack align="center" gap="xs">
                    <ThemeIcon size="xl" color={action.color} >
                      <action.icon size={20} />
                    </ThemeIcon>
                    <Text size="xs">{action.label}</Text>
                  </Stack>
              </Tooltip>
            </Grid.Col>
          ))}
        </>
      </Grid>
    </Stack>
  </Card>
);

const UserPreferences = () => (
  <Card>
    <Stack>
      <Title order={4}>Preferences</Title>
      <Stack gap="md">
        <Switch label="Email notifications" />
        <Switch label="Push notifications" />
        <Switch label="Dark mode" />
        <Select
          label="Time zone"
          placeholder="Select timezone"
          data={['UTC', 'EST', 'PST', 'GMT']}
        />
      </Stack>
    </Stack>
  </Card>
);

export default ComponentShowcase;