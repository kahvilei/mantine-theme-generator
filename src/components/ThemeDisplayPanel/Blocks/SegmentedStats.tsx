import { Box, Card, Group, SegmentedControl, Stack, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const segmentedStats: ThemeBlock = {
  id: 'segmented-stats',
  title: 'blocks.segmentedStats.title',
  category: 'General',
  tags: ['Stats', 'SegmentedControl', 'Dashboard'],
  components: ['Card', 'Group', 'SegmentedControl', 'Stack', 'Text', 'Title'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const data = t('segmentedStats.data', { returnObjects: true }) as any;
    const maxBar = Math.max(...data.metric.bars);
    return (
      <Card>
        <Stack gap="sm">
          <Title order={5}>{data.heading}</Title>

          <SegmentedControl
            data={data.segments}
            defaultValue={data.segments[0].value}
            size="xs"
          />

          <Group gap="xs" align="baseline">
            <Text fw={800} size="2rem" lh={1}>{data.metric.value}</Text>
            <Text
              size="xs"
              fw={600}
              c={data.metric.trend === 'up' ? 'green' : 'red'}
            >
              {data.metric.change}
            </Text>
          </Group>
          <Text size="xs" c="dimmed" mt={-4}>{data.metric.period}</Text>

          <Group gap={4} align="flex-end" h={52}>
            {data.metric.bars.map((val: number, idx: number) => (
              <Box
                key={idx}
                style={{
                  flex: 1,
                  height: `${(val / maxBar) * 100}%`,
                  borderRadius: 'var(--mantine-radius-xs) var(--mantine-radius-xs) 0 0',
                  background: 'var(--mantine-primary-color-filled)',
                  opacity: idx === data.metric.bars.length - 1 ? 1 : 0.35,
                }}
              />
            ))}
          </Group>
        </Stack>
      </Card>
    );
  },
};

export default segmentedStats;
