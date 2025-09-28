import React from 'react';
import {
  Card,
  Text,
  Button,
  TextInput,
  Group,
  Avatar,
  Stack,
  Title,
  Badge,
  Progress,
  RingProgress,
  ThemeIcon,
  ActionIcon,
  Paper,
  Indicator,
  Timeline,
  Tabs,
  Switch,
  Slider,
  SegmentedControl,
  Rating,
  Stepper,
  Chip,
  HoverCard,
  Tooltip,
  NumberInput,
  Select,
  MultiSelect,
  ColorSwatch,
  BackgroundImage,
  Overlay,
  AspectRatio,
  Skeleton,
  Kbd,
  Code,
  Mark,
  Blockquote,
  Table,
  SimpleGrid,
  Grid,
  Container,
  Center,
  Box,
  Flex,
  Anchor,
  Breadcrumbs,
  Burger,
  CloseButton,
  CopyButton,
  FileButton,
  UnstyledButton,
  Affix,
  Alert,
  Loader,
  NavLink,
  Pagination,
  Spoiler,
  Accordion,
  Menu,
  Autocomplete,
  NumberFormatter,
  PillsInput,
  Pill,
  TagsInput,
  Textarea,
  JsonInput,
  PinInput,
  Radio,
  CheckboxGroup,
  Fieldset,
  FloatingIndicator,
  ScrollAreaAutosize,
  Transition,
  ScrollArea
} from '@mantine/core';
import { BarChart, LineChart, DonutChart, AreaChart, RadarChart } from '@mantine/charts';
import { useTranslation } from 'react-i18next';
import { colors, theme } from '@/data/Store';
import { 
  IconBell, 
  IconCheck, 
  IconX, 
  IconStar, 
  IconHeart, 
  IconShare,
  IconMessage,
  IconTrendingUp,
  IconTrendingDown,
  IconClock,
  IconCalendar,
  IconMapPin,
  IconUser,
  IconSettings,
  IconSearch,
  IconFilter,
  IconDownload,
  IconUpload,
  IconRefresh,
  IconDots,
  IconPlus,
  IconMinus,
  IconChevronRight,
  IconChevronDown,
  IconEye,
  IconEdit,
  IconTrash,
  IconArchive,
  IconSend,
  IconPhoto,
  IconVideo,
  IconMusic,
  IconFile,
  IconFolder,
  IconBolt,
  IconFlame,
  IconDroplet,
  IconWind,
  IconCloud,
  IconSun,
  IconMoon,
  IconActivity,
  IconShoppingCart,
  IconCreditCard,
  IconWallet,
  IconReceipt,
  IconCoin,
  IconPercentage,
  IconChartBar,
  IconChartLine,
  IconChartPie,
  IconBriefcase,
  IconCode,
  IconDatabase,
  IconServer,
  IconCpu,
  IconDeviceMobile,
  IconDeviceDesktop,
  IconWifi,
  IconBluetooth,
  IconVolume,
  IconMicrophone,
  IconHeadphones,
  IconCamera,
  IconPrinter,
  IconMail,
  IconInbox,
  IconSpeakerphone,
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandSpotify,
  IconBrandDiscord,
  IconBrandSlack,
  IconPackage,
  IconTruck,
  IconHome,
  IconBuilding,
  IconMap,
  IconCompass,
  IconAnchor,
  IconPlane,
  IconCar,
  IconBike,
  IconWalk,
  IconRun,
  IconSwimming,
  IconYoga,
  IconBarbell,
  IconApple,
  IconCoffee,
  IconPizza,
  IconCake,
  IconGlass,
  IconMug,
  IconBeer,
  IconLeaf,
  IconPlant,
  IconTree,
  IconFlower,
  IconMountain,
  IconBeach,
  IconSunrise,
  IconMoonStars,
  IconRainbow,
  IconUmbrella,
  IconSnowflake,
  IconThermometer,
  IconPalette,
  IconBrush,
  IconPencil,
  IconEraser,
  IconRuler,
  IconScissors,
  IconPaperclip,
  IconCopy,
  IconPlayerSkipBack,
  IconPlayerPlay,
  IconPlayerSkipForward
} from '@tabler/icons-react';

import ComponentsJson from "../../data/mantineProps.json";
import weatherWidget from './Blocks/WeatherWidget';
import liveStream from './Blocks/LiveStream';
import fileUpload from './Blocks/FileUpload';
import notificationCenter from './Blocks/NotificationCenter';
import cryptoCard from './Blocks/CryptoExchange';

type Components = typeof ComponentsJson;

type Component = keyof Components;

export interface ThemeBlock {
  id: string;
  title: string;
  tags?: string[];
  components?: Component[];
  render: () => React.ReactNode;
}

export const themeBlocks: ThemeBlock[] = [
  cryptoCard,

  {
    id: 'music-player',
    title: 'blocks.musicPlayer.title',
    tags: ['Media', 'Controls', 'Progress'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const track = t('musicPlayer.track', { returnObjects: true }) as any;
      return (
        <Paper 
          radius="xl" 
          p="md"
          style={{
            background: `linear-gradient(180deg, var(--mantine-color-dark-8) 0%, var(--mantine-color-dark-9) 100%)`
          }}
        >
          <AspectRatio ratio={1} mb="md">
            <Paper 
              radius="md" 
              style={{
                background: `linear-gradient(45deg, var(--mantine-color-${colors.primaryColor}-6), var(--mantine-color-pink-6))`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <IconMusic size={60} color="white" />
            </Paper>
          </AspectRatio>
          
          <Stack gap="xs">
            <div>
              <Text fw={600} c="white" size="lg">{track.title}</Text>
              <Text size="sm" c="dimmed">{track.artist}</Text>
            </div>
            
            <Progress value={65} size="xs" radius="xl" color={colors.primaryColor} />
            <Group justify="space-between">
              <Text size="xs" c="dimmed">2:14</Text>
              <Text size="xs" c="dimmed">3:27</Text>
            </Group>
            
            <Group justify="center" gap="md">
              <ActionIcon variant="subtle" color="gray" size="lg">
                <IconPlayerSkipBack size={20} />
              </ActionIcon>
              <ActionIcon variant="filled" color={colors.primaryColor} size="xl" radius="xl">
                <IconPlayerPlay size={24} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray" size="lg">
                <IconPlayerSkipForward size={20} />
              </ActionIcon>
            </Group>
            
            <Group justify="center" gap="xs">
              <ActionIcon variant="subtle" color="gray" size="sm">
                <IconHeart size={16} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray" size="sm">
                <IconShare size={16} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray" size="sm">
                <IconDots size={16} />
              </ActionIcon>
            </Group>
          </Stack>
        </Paper>
      );
    },
  },

  // Social Post
  {
    id: 'social-post',
    title: 'blocks.socialPost.title',
    tags: ['Social', 'Avatar', 'Interactive'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const post = t('socialPost.data', { returnObjects: true }) as any;
      return (
        <Paper radius="md" withBorder>
          <Stack gap="md" p="md">
            <Group justify="space-between">
              <Group>
                <Indicator processing color="green" offset={4} size={8}>
                  <Avatar src={post.avatar} radius="xl" />
                </Indicator>
                <div>
                  <Group gap={4}>
                    <Text size="sm" fw={600}>{post.author}</Text>
                    <ThemeIcon size="xs" radius="xl" color="blue" variant="filled">
                      <IconCheck size={10} />
                    </ThemeIcon>
                  </Group>
                  <Text size="xs" c="dimmed">@{post.handle} · {post.time}</Text>
                </div>
              </Group>
              <Menu>
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <IconDots size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item leftSection={<IconEdit size={14} />}>Edit</Menu.Item>
                  <Menu.Item leftSection={<IconTrash size={14} />} color="red">Delete</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
            
            <Text size="sm">{post.content}</Text>
            
            <Paper radius="md" bg="gray.1" p="xs">
              <Group gap="xs">
                <ThemeIcon size="md" color="violet" variant="light">
                  <IconBolt size={16} />
                </ThemeIcon>
                <Text size="xs" c="dimmed">{post.highlight}</Text>
              </Group>
            </Paper>
            
            <Group justify="space-between">
              <Group gap={6}>
                <ActionIcon.Group>
                  <ActionIcon variant="light" color="pink">
                    <IconHeart size={16} />
                  </ActionIcon>
                  <ActionIcon variant="light" color="blue">
                    <IconMessage size={16} />
                  </ActionIcon>
                  <ActionIcon variant="light" color="green">
                    <IconShare size={16} />
                  </ActionIcon>
                </ActionIcon.Group>
              </Group>
              <Group gap="xs">
                <Text size="xs" c="dimmed">{post.likes} likes</Text>
                <Text size="xs" c="dimmed">·</Text>
                <Text size="xs" c="dimmed">{post.comments} comments</Text>
              </Group>
            </Group>
          </Stack>
        </Paper>
      );
    },
  },

  // Weather Widget
  weatherWidget,

  // Task Kanban Card
  {
    id: 'task-card',
    title: 'blocks.taskCard.title', 
    tags: ['Project', 'Timeline', 'Progress'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const task = t('taskCard.data', { returnObjects: true }) as any;
      return (
        <Paper withBorder radius="md" p="md">
          <Group justify="space-between" mb="xs">
            <Badge color={task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'yellow' : 'green'} variant="light">
              {task.priority}
            </Badge>
            <Menu>
              <Menu.Target>
                <ActionIcon variant="subtle" size="xs">
                  <IconDots size={14} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<IconEdit size={14} />}>Edit</Menu.Item>
                <Menu.Item leftSection={<IconArchive size={14} />}>Archive</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          
          <Text fw={600} size="sm" mb="xs">{task.title}</Text>
          <Text size="xs" c="dimmed" mb="sm" lineClamp={2}>
            {task.description}
          </Text>
          
          <Stack gap="xs" mb="sm">
            <Group justify="space-between">
              <Text size="xs" c="dimmed">Progress</Text>
              <Text size="xs" fw={600}>{task.progress}%</Text>
            </Group>
            <Progress value={task.progress} size="xs" color={colors.primaryColor} />
          </Stack>
          
          <Group gap="xs" mb="sm">
            <Chip.Group multiple>
              {task.tags.map((tag: string) => (
                <Chip key={tag} size="xs" variant="light" color={colors.primaryColor}>
                  {tag}
                </Chip>
              ))}
            </Chip.Group>
          </Group>
          
          <Group justify="space-between">
            <Avatar.Group spacing="xs">
              {task.assignees.map((user: any) => (
                <Tooltip key={user.name} label={user.name}>
                  <Avatar src={user.avatar} size="sm" radius="xl" />
                </Tooltip>
              ))}
            </Avatar.Group>
            <Group gap={4}>
              <IconClock size={14} color="var(--mantine-color-dimmed)" />
              <Text size="xs" c="dimmed">{task.due}</Text>
            </Group>
          </Group>
        </Paper>
      );
    },
  },

  // Notification Center
  notificationCenter,

  // Analytics Dashboard
  {
    id: 'analytics-card',
    title: 'blocks.analyticsCard.title',
    tags: ['Analytics', 'Charts', 'Stats'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const analytics = t('analyticsCard.data', { returnObjects: true }) as any;
      return (
        <Paper radius="lg" withBorder>
          <Tabs defaultValue="overview" variant="pills">
            <Tabs.List px="md" pt="md">
              <Tabs.Tab value="overview" leftSection={<IconChartBar size={14} />}>
                Overview
              </Tabs.Tab>
              <Tabs.Tab value="details" leftSection={<IconChartPie size={14} />}>
                Details
              </Tabs.Tab>
            </Tabs.List>
            
            <Tabs.Panel value="overview" p="md">
              <Stack gap="md">
                <Group justify="space-between">
                  <div>
                    <Text size="xs" c="dimmed">Total Revenue</Text>
                    <Text size="xl" fw={700}>${analytics.revenue}</Text>
                  </div>
                  <RingProgress
                    size={60}
                    roundCaps
                    thickness={6}
                    sections={[
                      { value: analytics.growth, color: 'green' },
                      { value: 100 - analytics.growth, color: 'gray.2' }
                    ]}
                    label={
                      <Text size="xs" ta="center">
                        +{analytics.growth}%
                      </Text>
                    }
                  />
                </Group>
                
                <SimpleGrid cols={2} spacing="xs">
                  {analytics.stats.map((stat: any) => (
                    <Paper key={stat.label} p="xs" radius="sm" bg="gray.0">
                      <Group justify="space-between">
                        <div>
                          <Text size="xs" c="dimmed">{stat.label}</Text>
                          <Text size="sm" fw={600}>{stat.value}</Text>
                        </div>
                        <ThemeIcon size="sm" color={stat.color} variant="light">
                          {stat.trend > 0 ? <IconTrendingUp size={14} /> : <IconTrendingDown size={14} />}
                        </ThemeIcon>
                      </Group>
                    </Paper>
                  ))}
                </SimpleGrid>
                
                <BarChart
                  h={120}
                  data={analytics.chart}
                  dataKey="month"
                  series={[{ name: 'sales', color: colors.primaryColor }]}
                  withYAxis={false}
                  gridAxis="none"
                />
              </Stack>
            </Tabs.Panel>
            
            <Tabs.Panel value="details" p="md">
              <DonutChart
                data={analytics.breakdown}
                chartLabel="Revenue"
                size={150}
                thickness={20}
              />
            </Tabs.Panel>
          </Tabs>
        </Paper>
      );
    },
  },

  // Product Card
  {
    id: 'product-card',
    title: 'blocks.productCard.title',
    tags: ['E-commerce', 'Product', 'Rating'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const product = t('productCard.data', { returnObjects: true }) as any;
      return (
        <Paper radius="md" withBorder>
          <AspectRatio ratio={4/3}>
            <Box 
              bg={`linear-gradient(135deg, var(--mantine-color-${colors.primaryColor}-5), var(--mantine-color-${colors.primaryColor}-7))`}
              style={{ position: 'relative' }}
            >
              <Group 
                style={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}
                gap="xs"
              >
                <ActionIcon variant="white" color="dark" size="sm">
                  <IconHeart size={14} />
                </ActionIcon>
                {product.discount && (
                  <Badge color="red" variant="filled">
                    -{product.discount}%
                  </Badge>
                )}
              </Group>
              <Center h="100%">
                <IconPackage size={60} color="white" />
              </Center>
            </Box>
          </AspectRatio>
          
          <Stack gap="xs" p="md">
            <div>
              <Group justify="space-between" mb={4}>
                <Text size="sm" fw={600}>{product.name}</Text>
                <Badge size="xs" variant="dot" color={product.inStock ? 'green' : 'red'}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </Badge>
              </Group>
              <Text size="xs" c="dimmed" lineClamp={2}>{product.description}</Text>
            </div>
            
            <Group gap="xs" align="center">
              <Rating value={product.rating} size="xs" readOnly />
              <Text size="xs" c="dimmed">({product.reviews})</Text>
            </Group>
            
            <Group justify="space-between" align="flex-end">
              <div>
                <Text size="xs" c="dimmed" td="line-through">
                  ${product.originalPrice}
                </Text>
                <Text size="lg" fw={700} c={colors.primaryColor}>
                  ${product.price}
                </Text>
              </div>
              <Button 
                size="sm" 
                leftSection={<IconShoppingCart size={14} />}
                color={colors.primaryColor}
              >
                Add to Cart
              </Button>
            </Group>
          </Stack>
        </Paper>
      );
    },
  },

  // Code Editor Preview
  {
    id: 'code-editor',
    title: 'blocks.codeEditor.title',
    tags: ['Code', 'Developer', 'Syntax'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const code = t('codeEditor.code', { returnObjects: true }) as any;
      return (
        <Paper radius="md" bg="dark.8" p="md">
          <Group justify="space-between" mb="sm">
            <Group gap="xs">
              <Box w={12} h={12} bg="red.6" style={{ borderRadius: '50%' }} />
              <Box w={12} h={12} bg="yellow.6" style={{ borderRadius: '50%' }} />
              <Box w={12} h={12} bg="green.6" style={{ borderRadius: '50%' }} />
            </Group>
            <Select
              size="xs"
              variant="filled"
              data={['JavaScript', 'TypeScript', 'Python', 'Go']}
              defaultValue="TypeScript"
              w={100}
            />
          </Group>
          
          <ScrollArea h={200} type="never">
            <Stack gap={4}>
              {code.lines.map((line: any, idx: number) => (
                <Group key={idx} gap="xs" wrap="nowrap">
                  <Text size="xs" c="dimmed" ta="right" w={20}>
                    {idx + 1}
                  </Text>
                  <Code color={line.color || 'blue'} bg="transparent" c="white" style={{ flex: 1 }}>
                    {line.content}
                  </Code>
                </Group>
              ))}
            </Stack>
          </ScrollArea>
          
          <Group justify="space-between" mt="sm">
            <Group gap="xs">
              <Badge size="sm" variant="light" color="green" leftSection={<IconCheck size={10} />}>
                No errors
              </Badge>
              <Badge size="sm" variant="light" color="blue">
                TypeScript
              </Badge>
            </Group>
            <ActionIcon.Group>
              <ActionIcon variant="subtle" color="gray" size="sm">
                <IconCopy size={14} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray" size="sm">
                <IconDownload size={14} />
              </ActionIcon>
            </ActionIcon.Group>
          </Group>
        </Paper>
      );
    },
  },

  // Calendar Event
  {
    id: 'calendar-event',
    title: 'blocks.calendarEvent.title',
    tags: ['Calendar', 'Schedule', 'Time'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const event = t('calendarEvent.data', { returnObjects: true }) as any;
      return (
        <Paper radius="md" withBorder>
          <Box p="md" bg={`${colors.primaryColor}.0`}>
            <Group justify="space-between">
              <div>
                <Text size="xs" tt="uppercase" fw={700} c={`${colors.primaryColor}.7`}>
                  {event.month}
                </Text>
                <Text size="2rem" fw={900} lh={1} c={colors.primaryColor}>
                  {event.day}
                </Text>
              </div>
              <ThemeIcon size="xl" radius="md" color={colors.primaryColor} variant="light">
                <IconCalendar size={24} />
              </ThemeIcon>
            </Group>
          </Box>
          
          <Stack gap="sm" p="md">
            <div>
              <Text fw={600} size="sm">{event.title}</Text>
              <Group gap={4} mt={2}>
                <IconClock size={14} color="var(--mantine-color-dimmed)" />
                <Text size="xs" c="dimmed">{event.time}</Text>
              </Group>
            </div>
            
            <Paper p="xs" radius="sm" bg="gray.0">
              <Group gap="xs">
                <IconMapPin size={14} color="var(--mantine-color-dimmed)" />
                <Text size="xs">{event.location}</Text>
              </Group>
            </Paper>
            
            <Avatar.Group spacing="xs">
              {event.attendees.map((person: any) => (
                <Tooltip key={person.name} label={person.name}>
                  <Avatar src={person.avatar} size="sm" radius="xl" />
                </Tooltip>
              ))}
              <Avatar size="sm" radius="xl">+{event.moreCount}</Avatar>
            </Avatar.Group>
            
            <Group gap="xs">
              <Button size="xs" color={colors.primaryColor}>
                Join Meeting
              </Button>
              <Button size="xs" variant="subtle">
                Reschedule
              </Button>
            </Group>
          </Stack>
        </Paper>
      );
    },
  },

  // Payment Method Card
  {
    id: 'payment-card',
    title: 'blocks.paymentCard.title',
    tags: ['Payment', 'Finance', 'Card'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const payment = t('paymentCard.data', { returnObjects: true }) as any;
      return (
        <Paper 
          p="lg" 
          radius="lg"
          style={{
            background: `linear-gradient(135deg, var(--mantine-color-dark-9) 0%, var(--mantine-color-dark-7) 100%)`,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box 
            style={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: 150,
              height: 150,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)'
            }}
          />
          
          <Group justify="space-between" mb="xl">
            <IconCreditCard size={32} color="white" />
            <Badge variant="white" color="dark">
              {payment.type}
            </Badge>
          </Group>
          
          <Stack gap="lg">
            <Text 
              size="lg" 
              fw={500} 
              c="white" 
              style={{ letterSpacing: 2, fontFamily: 'monospace' }}
            >
              •••• •••• •••• {payment.last4}
            </Text>
            
            <Group justify="space-between">
              <div>
                <Text size="xs" c="white" opacity={0.7}>
                  Card Holder
                </Text>
                <Text size="sm" c="white" fw={600}>
                  {payment.holder}
                </Text>
              </div>
              <div>
                <Text size="xs" c="white" opacity={0.7}>
                  Expires
                </Text>
                <Text size="sm" c="white" fw={600}>
                  {payment.expiry}
                </Text>
              </div>
            </Group>
          </Stack>
        </Paper>
      );
    },
  },

  // Fitness Tracker
  {
    id: 'fitness-tracker',
    title: 'blocks.fitnessTracker.title',
    tags: ['Health', 'Progress', 'Stats'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const fitness = t('fitnessTracker.data', { returnObjects: true }) as any;
      return (
        <Paper radius="md" withBorder>
          <Box p="md" bg={`${colors.primaryColor}.0`}>
            <Group justify="space-between">
              <div>
                <Text size="xs" c="dimmed">Today's Goal</Text>
                <Text size="xl" fw={700}>{fitness.steps} steps</Text>
              </div>
              <RingProgress
                size={60}
                roundCaps
                thickness={8}
                sections={fitness.rings.map((ring: any) => ({
                  value: ring.value,
                  color: ring.color
                }))}
                label={
                  <Text size="xs" ta="center" fw={700}>
                    {fitness.percentage}%
                  </Text>
                }
              />
            </Group>
          </Box>
          
          <Stack gap="xs" p="md">
            {fitness.activities.map((activity: any) => (
              <Paper key={activity.name} p="xs" radius="sm" withBorder>
                <Group justify="space-between">
                  <Group gap="xs">
                    <ThemeIcon size="sm" color={activity.color} variant="light">
                      {activity.icon === 'run' ? <IconRun size={14} /> :
                       activity.icon === 'bike' ? <IconBike size={14} /> :
                       <IconWalk size={14} />}
                    </ThemeIcon>
                    <div>
                      <Text size="xs" fw={500}>{activity.name}</Text>
                      <Text size="xs" c="dimmed">{activity.duration}</Text>
                    </div>
                  </Group>
                  <div style={{ textAlign: 'right' }}>
                    <Text size="xs" fw={600}>{activity.calories}</Text>
                    <Text size="xs" c="dimmed">cal</Text>
                  </div>
                </Group>
              </Paper>
            ))}
            
            <Button 
              fullWidth 
              size="sm" 
              variant="light" 
              color={colors.primaryColor}
              leftSection={<IconPlus size={14} />}
            >
              Log Activity
            </Button>
          </Stack>
        </Paper>
      );
    },
  },

  // File Upload Zone
  fileUpload,

  // Subscription Plan
  {
    id: 'subscription-plan',
    title: 'blocks.subscriptionPlan.title',
    tags: ['Pricing', 'Features', 'CTA'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const plan = t('subscriptionPlan.data', { returnObjects: true }) as any;
      return (
        <Paper 
          radius="lg" 
          withBorder
          style={{
            borderWidth: 2,
            borderColor: plan.featured ? `var(--mantine-color-${colors.primaryColor}-5)` : undefined
          }}
        >
          {plan.featured && (
            <Box p="xs" bg={`${colors.primaryColor}.5`}>
              <Text size="xs" fw={700} c="white" ta="center" tt="uppercase">
                Most Popular
              </Text>
            </Box>
          )}
          
          <Stack gap="md" p="lg">
            <div style={{ textAlign: 'center' }}>
              <Badge size="sm" variant="light" color={colors.primaryColor} mb="xs">
                {plan.type}
              </Badge>
              <Text size="xl" fw={800}>{plan.name}</Text>
              <Group gap={0} justify="center" align="baseline" mt="xs">
                <Text size="xs" c="dimmed">$</Text>
                <Text size="2rem" fw={900} lh={1}>{plan.price}</Text>
                <Text size="sm" c="dimmed">/month</Text>
              </Group>
            </div>
            
            <Stack gap="xs">
              {plan.features.map((feature: any) => (
                <Group key={feature.text} gap="xs">
                  <ThemeIcon 
                    size="xs" 
                    color={feature.included ? 'green' : 'gray'} 
                    variant="filled"
                  >
                    {feature.included ? <IconCheck size={10} /> : <IconX size={10} />}
                  </ThemeIcon>
                  <Text 
                    size="sm" 
                    c={feature.included ? undefined : 'dimmed'}
                    td={!feature.included ? 'line-through' : undefined}
                  >
                    {feature.text}
                  </Text>
                </Group>
              ))}
            </Stack>
            
            <Button 
              fullWidth 
              size="md" 
              color={colors.primaryColor}
              variant={plan.featured ? 'filled' : 'light'}
            >
              {plan.cta}
            </Button>
            
            <Text size="xs" c="dimmed" ta="center">
              {plan.trial} day free trial
            </Text>
          </Stack>
        </Paper>
      );
    },
  },

  // Live Stream Card
  liveStream
];

// Icons need to be imported from tabler-icons-react
// const IconPlayerPlay = IconCaretRight;
// const IconPlayerSkipBack = IconPlayerTrackPrev;
// const IconPlayerSkipForward = IconPlayerTrackNext;
// const IconCaretRight = IconChevronRight;
// const IconPlayerTrackPrev = IconChevronLeft;
// const IconPlayerTrackNext = IconChevronRight;
// const IconCopy = IconCopy;
// const IconChevronLeft = IconChevronLeft;