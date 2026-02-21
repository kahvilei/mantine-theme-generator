import React from "react";
import { Alert, Badge, Card, Group, Stack, Text, Title } from "@mantine/core";
import { IconAlertTriangle, IconCheck, IconInfoCircle, IconX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const iconMap: Record<string, React.ReactNode> = {
  green: <IconCheck size={16} />,
  blue: <IconInfoCircle size={16} />,
  yellow: <IconAlertTriangle size={16} />,
  red: <IconX size={16} />,
};

const statusAlerts: ThemeBlock = {
  id: 'status-alerts',
  title: 'blocks.statusAlerts.title',
  category: 'General',
  tags: ['Alert', 'Status', 'Colors'],
  components: ['Alert', 'Badge', 'Card', 'Group', 'Stack', 'Text', 'Title'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const data = t('statusAlerts.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Stack gap="sm">
          <Group justify="space-between" align="center">
            <Title order={5}>{data.heading}</Title>
            <Badge color="green" variant="dot" size="sm">{data.uptime}</Badge>
          </Group>

          {data.alerts.map((alert: any) => (
            <Alert
              key={alert.title}
              color={alert.color}
              variant="light"
              title={alert.title}
              icon={iconMap[alert.color]}
              withCloseButton
            >
              <Stack gap={4}>
                <Text size="xs">{alert.body}</Text>
                <Text size="xs" c="dimmed">{alert.time}</Text>
              </Stack>
            </Alert>
          ))}
        </Stack>
      </Card>
    );
  },
};

export default statusAlerts;
