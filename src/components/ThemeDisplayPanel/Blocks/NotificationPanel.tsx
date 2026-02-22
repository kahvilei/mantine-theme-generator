import { ActionIcon, Badge, Box, Card, Group, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { IconChecks } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const notificationPanel: ThemeBlock = {
  id: 'notification-panel',
  title: 'blocks.notificationPanel.title',
  category: 'General',
  tags: ['Notifications', 'ScrollArea', 'Feed'],
  components: ['ActionIcon', 'Badge', 'Card', 'Group', 'ScrollArea', 'Stack', 'Text', 'Title'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const data = t('notificationPanel.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Stack gap="sm">
          <Group justify="space-between" align="center">
            <Group gap="xs">
              <Title order={5}>{data.heading}</Title>
              <Badge size="sm" circle>{data.unreadCount}</Badge>
            </Group>
            <ActionIcon size="sm" title={data.markAllRead}>
              <IconChecks size={14} />
            </ActionIcon>
          </Group>

          <ScrollArea h={260} type="hover">
            <Stack gap={4}>
              {data.items.map((item: any, idx: number) => (
                <Group
                  key={idx}
                  gap="sm"
                  align="flex-start"
                  p="xs"
                  style={{
                    borderRadius: 'var(--mantine-radius-md)',
                    background: item.unread ? 'var(--mantine-color-default-hover)' : 'transparent',
                  }}
                >
                  <Box
                    mt={6}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      flexShrink: 0,
                      background: item.unread
                        ? `var(--mantine-color-${item.color}-5)`
                        : 'transparent',
                      border: item.unread
                        ? 'none'
                        : '1.5px solid var(--mantine-color-dimmed)',
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Group justify="space-between" gap="xs" wrap="nowrap">
                      <Text size="sm" fw={item.unread ? 600 : 400} truncate>
                        {item.title}
                      </Text>
                      <Text size="xs" c="dimmed" style={{ flexShrink: 0 }}>
                        {item.time}
                      </Text>
                    </Group>
                    <Text size="xs" c="dimmed" lineClamp={1}>{item.body}</Text>
                  </div>
                </Group>
              ))}
            </Stack>
          </ScrollArea>
        </Stack>
      </Card>
    );
  },
};

export default notificationPanel;
