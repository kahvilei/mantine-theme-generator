import { colors } from "@/data/Store";
import { Card, Group, Paper, Rating, RingProgress, SimpleGrid, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconFlame, IconTrendingDown, IconTrendingUp, IconTrophy } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";
import { BarChart } from "@mantine/charts";

const playerStats: ThemeBlock = {
  id: 'player-stats',
  title: 'blocks.playerStats.title',
  category: 'Gaming',
  tags: ['Gaming', 'Stats', 'Analytics'],
  components: ['Card', 'Group', 'Paper', 'Rating', 'RingProgress', 'SimpleGrid', 'Stack', 'Text', 'ThemeIcon', 'Title'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const stats = t('playerStats.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Group justify="space-between" mb="md">
          <div>
            <Title order={3}>{stats.champion}</Title>
            <Text size="xs" c="dimmed">{stats.role} • {stats.totalGames} games</Text>
          </div>
          <RingProgress
            size={80}
            thickness={8}
            sections={[
              { value: stats.winRate, color: 'green' },
              { value: 100 - stats.winRate, color: 'red' }
            ]}
            label={
              <div style={{ textAlign: 'center' }}>
                <Text size="lg" fw={700} lh={1}>
                  {stats.winRate}%
                </Text>
                <Text size="xs" c="dimmed">WR</Text>
              </div>
            }
          />
        </Group>

        <SimpleGrid cols={2} spacing="xs" mb="md">
          <Paper p="sm">
            <Group gap="xs" mb={4}>
              <ThemeIcon size="sm" color="blue" variant="light">
                <IconTrophy size={14} />
              </ThemeIcon>
              <Text size="xs" c="dimmed">KDA</Text>
            </Group>
            <Text size="xl" fw={700}>{stats.kda}</Text>
            <Group gap={4}>
              <Text size="xs" c="dimmed">{stats.kills} / {stats.deaths} / {stats.assists}</Text>
            </Group>
          </Paper>

          <Paper p="sm">
            <Group gap="xs" mb={4}>
              <ThemeIcon size="sm" color="orange" variant="light">
                <IconFlame size={14} />
              </ThemeIcon>
              <Text size="xs" c="dimmed">CS/Min</Text>
            </Group>
            <Text size="xl" fw={700}>{stats.csPerMin}</Text>
            <Group gap={4}>
              <ThemeIcon size="xs" color={stats.csTrend > 0 ? 'green' : 'red'} variant="transparent">
                {stats.csTrend > 0 ? <IconTrendingUp size={10} /> : <IconTrendingDown size={10} />}
              </ThemeIcon>
              <Text size="xs" c={stats.csTrend > 0 ? 'green' : 'red'}>
                {stats.csTrend > 0 ? '+' : ''}{stats.csTrend}%
              </Text>
            </Group>
          </Paper>
        </SimpleGrid>

        <Stack gap="xs" mb="sm">
          <Text size="xs" fw={600} c="dimmed">Performance Ratings</Text>
          {stats.ratings.map((rating: any) => (
            <Group key={rating.stat} justify="space-between">
              <Text size="xs">{rating.stat}</Text>
              <Group gap="xs">
                <Rating value={rating.value} count={5} size="xs" readOnly />
                <Text size="xs" fw={600}>{rating.score}</Text>
              </Group>
            </Group>
          ))}
        </Stack>

        <Text size="xs" fw={600} c="dimmed" mb="xs">Recent Form</Text>
        <BarChart
          h={100}
          data={stats.recentGames}
          dataKey="game"
          series={[{ name: 'performance', color: colors.primaryColor }]}
          withYAxis={false}
          gridAxis="none"
        />
      </Card>
    );
  },
}

export default playerStats;