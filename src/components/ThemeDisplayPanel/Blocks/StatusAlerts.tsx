import { Alert, Card, Stack, Title } from "@mantine/core";
import { IconAlertTriangle, IconCheck, IconInfoCircle, IconX } from "@tabler/icons-react";
import { ThemeBlock } from "../Blocks";

const statusAlerts: ThemeBlock = {
  id: 'status-alerts',
  title: 'blocks.statusAlerts.title',
  category: 'General',
  tags: ['Alert', 'Status', 'Colors'],
  components: ['Alert', 'Card', 'Stack', 'Title'],
  render: () => {
    return (
      <Card>
        <Stack gap="sm">
          <Title order={5}>System Status</Title>

          <Alert
            color="green"
            variant="light"
            title="Deployment successful"
            icon={<IconCheck size={16} />}
          >
            All services are running normally. Last deployed 3 minutes ago.
          </Alert>

          <Alert
            color="blue"
            variant="light"
            title="Maintenance window"
            icon={<IconInfoCircle size={16} />}
          >
            Scheduled downtime on Saturday from 02:00–04:00 UTC.
          </Alert>

          <Alert
            color="yellow"
            variant="light"
            title="High memory usage"
            icon={<IconAlertTriangle size={16} />}
          >
            Instance memory is at 87%. Consider scaling up.
          </Alert>

          <Alert
            color="red"
            variant="light"
            title="Connection failed"
            icon={<IconX size={16} />}
          >
            Could not reach database replica. Failover in progress.
          </Alert>
        </Stack>
      </Card>
    );
  },
};

export default statusAlerts;
