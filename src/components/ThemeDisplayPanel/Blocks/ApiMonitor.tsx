import { colors } from "@/data/Store";
import { ActionIcon, Badge, Card, Code, Group, Paper, Progress, ScrollArea, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconActivity, IconAlertCircle, IconCheck, IconClock, IconRefresh } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const apiMonitor: ThemeBlock = {
  id: 'api-monitor',
  title: 'blocks.apiMonitor.title',
  category: 'Development',
  tags: ['API', 'Monitoring', 'Status'],
  components: ['ActionIcon', 'Badge', 'Card', 'Code', 'Group', 'Paper', 'Progress', 'ScrollArea', 'Stack', 'Text', 'ThemeIcon'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const api = t('apiMonitor.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Group justify="space-between" mb="md">
          <Group gap="xs">
            <ThemeIcon size="md" color={colors.primaryColor}>
              <IconActivity size={18} />
            </ThemeIcon>
            <div>
              <Text size="sm" fw={600}>API Health Monitor</Text>
              <Text size="xs" c="dimmed">Last updated: {api.lastUpdate}</Text>
            </div>
          </Group>
          <ActionIcon variant="light" color={colors.primaryColor}>
            <IconRefresh size={16} />
          </ActionIcon>
        </Group>

        <Stack gap="xs">
          <Group justify="space-between">
            <Text size="xs" c="dimmed">Uptime</Text>
            <Text size="xs" fw={600}>{api.uptime}%</Text>
          </Group>
          <Progress value={api.uptime} size="sm" color="green" />
        </Stack>

        <ScrollArea h={180} mt="md">
          <Stack gap="xs">
            {api.endpoints.map((endpoint: any) => (
              <Paper key={endpoint.path} p="xs">
                <Group justify="space-between" mb={4}>
                  <Group gap="xs">
                    <ThemeIcon 
                      size="xs" 
                      color={endpoint.status === 'success' ? 'green' : endpoint.status === 'warning' ? 'yellow' : 'red'}
                      variant="filled"
                    >
                      {endpoint.status === 'success' ? <IconCheck size={10} /> : <IconAlertCircle size={10} />}
                    </ThemeIcon>
                    <Code>{endpoint.method}</Code>
                    <Text size="xs" fw={500}>{endpoint.path}</Text>
                  </Group>
                  <Badge size="xs" color={endpoint.status === 'success' ? 'green' : endpoint.status === 'warning' ? 'yellow' : 'red'}>
                    {endpoint.responseTime}ms
                  </Badge>
                </Group>
                <Group gap="xs">
                  <IconClock size={12} color="var(--mantine-color-dimmed)" />
                  <Text size="xs" c="dimmed">{endpoint.requests} req/min</Text>
                </Group>
              </Paper>
            ))}
          </Stack>
        </ScrollArea>
      </Card>
    );
  },
}

export default apiMonitor;