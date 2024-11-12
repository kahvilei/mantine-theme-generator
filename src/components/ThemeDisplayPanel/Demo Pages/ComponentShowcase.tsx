import {
  Card,
  Container,
  Grid,
  Group,
  Text,
  Stack,
  Avatar,
  Badge,
  List,
  ThemeIcon,
  Select,
  Title,
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
  rem,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Divider,
  FileInput,
  HoverCard
} from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { IconSettings, IconBell, IconSearch, IconMenu2, IconUser, IconMail, IconLock, IconChevronRight, IconMessage, IconStar, IconHeart, IconCircleCheck, IconCircleDashed, IconBellMinus, IconUsersGroup, IconUpload, IconFile, IconTrash} from '@tabler/icons-react';
import { LineChart } from '@mantine/charts';

const ComponentShowcase = () => {

  return (
    <Container size="lg">
    <Grid>
      <Grid.Col span={4}>
        <Stack>
          <UserProfile />
          <LoginForm />
          <TaskManager />
          <QuickActions />
        </Stack>
      </Grid.Col>
      <Grid.Col span={4}>
        <Stack>
          <DocumentManager />
          <CalendarCard />
          <MessageThreads />
        </Stack>
      </Grid.Col>
      <Grid.Col span={4}>
        <Stack>
          <MetricsCard />
          <ProgressMetrics />
          <UserPreferences />
          <LineChartCard />
        </Stack>
      </Grid.Col>
    </Grid>
  </Container>
  );
};

const UserProfile = () => (
  <Card>
    <Stack align="center">
      <Indicator size={16} offset={7} position="bottom-end">
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
            <ThemeIcon color="gray" size={24} radius="xl">
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
                <Indicator label={message.unread} >
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
      <Stack>
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

const CalendarCard = () => (
  <Card>
    <Stack>
      <Title order={4}>Calendar</Title>
      <Calendar w={'100%'} />
    </Stack>
  </Card>
);

export const data = [
  {
    date: 'Mar 22',
    Apples: 2890,
    Oranges: 2338,
    Tomatoes: 2452,
  },
  {
    date: 'Mar 23',
    Apples: 2756,
    Oranges: 2103,
    Tomatoes: 2402,
  },
  {
    date: 'Mar 24',
    Apples: 3322,
    Oranges: 986,
    Tomatoes: 1821,
  },
  {
    date: 'Mar 25',
    Apples: 3470,
    Oranges: 2108,
    Tomatoes: 2809,
  },
  {
    date: 'Mar 26',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
];

const LineChartCard = () => (
  <Card>
    <LineChart
      h={300}
      w={'100%'}
      data={data}
      dataKey="date"
      series={[
        { name: 'Apples', color: 'blue.6' },
        { name: 'Oranges', color: 'red.6' },
        { name: 'Tomatoes', color: 'green.6' },
      ]}
      curveType="linear"
    />
  </Card>
);

const LoginForm = () => (
  <Card>
    <Stack>
      <Title order={4}>Sign In</Title>
      <TextInput
        label="Email"
        placeholder="your@email.com"
        leftSection={<IconMail size={16} />}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        leftSection={<IconLock size={16} />}
      />
      <Group justify="space-between" mt="xs">
        <Checkbox label="Remember me" size="xs" />
        <Text size="xs" c="blue" style={{ cursor: 'pointer' }}>
          Forgot password?
        </Text>
      </Group>
      <Button fullWidth>Sign In</Button>
      <Divider label="or continue with" labelPosition="center" />
      <Group grow>
        <Button variant="light">Google</Button>
        <Button variant="light">GitHub</Button>
      </Group>
    </Stack>
  </Card>
);

const DocumentManager = () => (
  <Card>
    <Stack>
      <Title order={4}>Document Manager</Title>
      <FileInput
        label="Upload file"
        placeholder="Click to upload"
        leftSection={<IconUpload size={16} />}
        accept="image/*, .pdf, .doc, .docx"
      />
      <Select
        label="Sort by"
        defaultValue="date"
        data={[
          { value: 'date', label: 'Date' },
          { value: 'name', label: 'Name' },
          { value: 'size', label: 'Size' },
        ]}
      />
      {[
        { name: 'Project Brief.pdf', size: '2.4MB', date: 'Today' },
        { name: 'Design Assets.zip', size: '15MB', date: 'Yesterday' },
        { name: 'Meeting Notes.docx', size: '512KB', date: '3 days ago' },
      ].map((file) => (
        <HoverCard key={file.name} width={280} shadow="md">
          <HoverCard.Target>
            <Paper p="xs">
              <Group>
                <ThemeIcon>
                  <IconFile size={16} />
                </ThemeIcon>
                <Stack gap={0} style={{ flex: 1 }}>
                  <Text size="sm">{file.name}</Text>
                  <Text size="xs" c="dimmed">{file.size}</Text>
                </Stack>
                <ActionIcon color="red" variant="subtle">
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            </Paper>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Stack gap="xs">
              <Text size="sm" fw={500}>File Details</Text>
              <Text size="xs">Uploaded: {file.date}</Text>
              <Text size="xs">Size: {file.size}</Text>
              <Group>
                <Button size="xs" variant="light">Download</Button>
                <Button size="xs" variant="light" color="red">Delete</Button>
              </Group>
            </Stack>
          </HoverCard.Dropdown>
        </HoverCard>
      ))}
    </Stack>
  </Card>
);


export default ComponentShowcase;