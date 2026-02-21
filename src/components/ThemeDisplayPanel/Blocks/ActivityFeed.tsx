import { Avatar, Button, Card, Group, Stack, Text, Timeline, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const activityFeed: ThemeBlock = {
  id: 'activity-feed',
  title: 'blocks.activityFeed.title',
  category: 'General',
  tags: ['Timeline', 'Activity', 'Feed'],
  components: ['Avatar', 'Button', 'Card', 'Group', 'Stack', 'Text', 'Timeline', 'Title'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const data = t('activityFeed.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Stack gap="sm">
          <Title order={5}>{data.heading}</Title>

          <Timeline active={data.items.length - 1} bulletSize={26} lineWidth={2}>
            {data.items.map((item: any, idx: number) => (
              <Timeline.Item
                key={idx}
                bullet={<Avatar src={item.avatar} size={20} radius="xl" />}
                title={item.title}
                color={item.color || undefined}
              >
                <Text size="xs" c="dimmed">{item.description}</Text>
                <Text size="xs" c="dimmed" mt={2}>{item.time}</Text>
              </Timeline.Item>
            ))}
          </Timeline>

          <Group justify="flex-end">
            <Button
              variant="subtle"
              size="xs"
              rightSection={<IconChevronRight size={12} />}
            >
              {data.viewAll}
            </Button>
          </Group>
        </Stack>
      </Card>
    );
  },
};

export default activityFeed;
