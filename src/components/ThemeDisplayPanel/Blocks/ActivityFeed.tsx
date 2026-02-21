import { Card, Stack, Text, Timeline, Title } from "@mantine/core";
import { IconCode, IconGitCommit, IconMessageDots, IconStar } from "@tabler/icons-react";
import { ThemeBlock } from "../Blocks";

const activityFeed: ThemeBlock = {
  id: 'activity-feed',
  title: 'blocks.activityFeed.title',
  category: 'General',
  tags: ['Timeline', 'Activity', 'Feed'],
  components: ['Card', 'Stack', 'Text', 'Timeline', 'Title'],
  render: () => {
    return (
      <Card>
        <Stack gap="sm">
          <Title order={5}>Recent Activity</Title>

          <Timeline active={3} bulletSize={22} lineWidth={2}>
            <Timeline.Item bullet={<IconGitCommit size={12} />} title="Merged pull request">
              <Text size="xs" c="dimmed">feat: add dark mode toggle</Text>
              <Text size="xs" c="dimmed" mt={2}>2 hours ago</Text>
            </Timeline.Item>

            <Timeline.Item bullet={<IconCode size={12} />} title="Pushed 3 commits" color="blue">
              <Text size="xs" c="dimmed">to main branch</Text>
              <Text size="xs" c="dimmed" mt={2}>4 hours ago</Text>
            </Timeline.Item>

            <Timeline.Item bullet={<IconMessageDots size={12} />} title="Left a comment" color="violet">
              <Text size="xs" c="dimmed">Looks good to me!</Text>
              <Text size="xs" c="dimmed" mt={2}>Yesterday</Text>
            </Timeline.Item>

            <Timeline.Item bullet={<IconStar size={12} />} title="Starred repository" color="yellow">
              <Text size="xs" c="dimmed">mantine/mantine</Text>
              <Text size="xs" c="dimmed" mt={2}>2 days ago</Text>
            </Timeline.Item>
          </Timeline>
        </Stack>
      </Card>
    );
  },
};

export default activityFeed;
