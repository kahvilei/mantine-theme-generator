import { colors } from "@/data/Store";
import { ActionIcon, Badge, Box, Button, Card, Group, Loader, Paper, Progress, Stack, Text, ThemeIcon, Timeline } from "@mantine/core";
import { IconBell, IconCheck, IconSettings, IconX} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const notificationCenter:ThemeBlock ={
    id: 'notification-center',
    title: 'blocks.notificationCenter.title',
    tags: ['Pipeline', 'Timeline', 'Actions'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const notifications = t('notificationCenter.items', { returnObjects: true }) as any[];
      return (
        <Card>
          <Group justify="space-between" pb="sm">
            <Group gap="xs">
              <Text fw={600}>Notifications</Text>
              <Badge size="sm" circle color="red">{notifications.length}</Badge>
            </Group>
            <ActionIcon size="sm">
              <IconSettings size={14} />
            </ActionIcon>
          </Group>
          
          <Timeline
            active={1} 
            bulletSize={24} 
            lineWidth={2}
          >
            {notifications.map((notif, idx) => (
              <Timeline.Item
                key={idx}
                bullet={
                  <ThemeIcon 
                    size={24} 
                    radius="xl" 
                    color={notif.color} 
                    variant={idx <= 1 ? 'filled' : 'light'}
                  >
                    {notif.type === 'success' ? <IconCheck size={12} /> : 
                     notif.type === 'warning' ? <IconBell size={12} /> : 
                     <IconX size={12} />}
                  </ThemeIcon>
                }
              >
                <Group justify="space-between" mb={4}>
                  <Text size="sm" fw={500}>{notif.title}</Text>
                  <Text size="xs" c="dimmed">{notif.time}</Text>
                </Group>
                <Text size="xs" c="dimmed">{notif.description}</Text>
                {idx === 0 && (
                  <Group gap="xs" mt="xs">
                    <Button size="xs" color={notif.color}>
                      View
                    </Button>
                    <Button size="xs" variant="subtle">
                      Dismiss
                    </Button>
                  </Group>
                )}
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>
      );
    },
  }
export default notificationCenter;