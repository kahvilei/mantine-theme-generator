import { colors } from "@/data/Store";
import { ActionIcon, AspectRatio, Avatar, Badge, Card, Chip, Group, Indicator, Menu, Paper, Progress, Stack, Text, ThemeIcon, Title, TooltipFloating } from "@mantine/core";
import { IconArchive, IconBolt, IconCheck, IconClock, IconDots, IconEdit, IconHeart, IconMessage, IconMusic, IconPlayerPlay, IconPlayerSkipBack, IconPlayerSkipForward, IconShare, IconTrash} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";
import { Tooltip } from "recharts";

const taskCard:ThemeBlock =  {
    id: 'task-card',
    title: 'blocks.taskCard.title', 
    tags: ['Project', 'Timeline', 'Progress'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const task = t('taskCard.data', { returnObjects: true }) as any;
      return (
        <Card>
            <Stack gap={'xs'}>
            <Group justify="space-between">
                <Badge color={task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'yellow' : 'green'}>
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
            
            <Title order={5}>{task.title}</Title>
            <Text size="xs" c="dimmed" lineClamp={2}>
                {task.description}
            </Text>
      
            <Stack gap="xs">
                <Group justify="space-between">
                <Text size="xs" c="dimmed">Progress</Text>
                <Text size="xs" fw={600}>{task.progress}%</Text>
                </Group>
                <Progress value={task.progress} size="xs" color={colors.primaryColor} />
            </Stack>
            
            <Group gap="xs">
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
                    <TooltipFloating key={user.name} label={user.name}>
                    <Avatar src={user.avatar} size="sm" radius="xl" />
                    </TooltipFloating>
                ))}
                </Avatar.Group>
                <Group gap={4}>
                <IconClock size={14} color="var(--mantine-color-dimmed)" />
                <Text size="xs" c="dimmed">{task.due}</Text>
                </Group>
            </Group>
            </Stack>
        </Card>
      );
    },
  }
export default taskCard;