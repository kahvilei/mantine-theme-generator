import { colors } from "@/data/Store";
import { Badge, Card, Divider, Grid, Group, Paper, Progress, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconClock, IconSword, IconTarget, IconUsers } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const matchLobby: ThemeBlock = {
  id: 'match-lobby',
  title: 'blocks.matchLobby.title',
  category: 'Gaming',
  tags: ['Gaming', 'Match', 'Statistics'],
  components: ['Badge', 'Card', 'Divider', 'Grid', 'Group', 'Paper', 'Progress', 'Stack', 'Text', 'ThemeIcon'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const match = t('matchLobby.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Group justify="space-between" mb="sm">
          <div>
            <Text size="sm" fw={600}>{match.matchType}</Text>
            <Text size="xs" c="dimmed">{match.map} • {match.mode}</Text>
          </div>
          <Badge size="lg" color={match.result === 'Victory' ? 'green' : 'red'}>
            {match.result}
          </Badge>
        </Group>

        <Paper p="sm" mb="sm" bg="dark.6">
          <Group justify="space-between">
            <Group gap="xs">
              <IconClock size={16} />
              <div>
                <Text size="xs" c="dimmed">Duration</Text>
                <Text size="sm" fw={600}>{match.duration}</Text>
              </div>
            </Group>
            <Group gap="xs">
              <IconUsers size={16} />
              <div>
                <Text size="xs" c="dimmed">Team Size</Text>
                <Text size="sm" fw={600}>{match.teamSize}v{match.teamSize}</Text>
              </div>
            </Group>
          </Group>
        </Paper>

        <Grid gutter="xs" mb="sm">
          <Grid.Col span={6}>
            <Paper p="xs">
              <Group gap="xs">
                <ThemeIcon size="sm" color="blue" variant="light">
                  <IconSword size={14} />
                </ThemeIcon>
                <div>
                  <Text size="xs" c="dimmed">Damage Dealt</Text>
                  <Text size="sm" fw={700}>{match.damageDealt.toLocaleString()}</Text>
                </div>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Paper p="xs">
              <Group gap="xs">
                <ThemeIcon size="sm" color="red" variant="light">
                  <IconTarget size={14} />
                </ThemeIcon>
                <div>
                  <Text size="xs" c="dimmed">Damage Taken</Text>
                  <Text size="sm" fw={700}>{match.damageTaken.toLocaleString()}</Text>
                </div>
              </Group>
            </Paper>
          </Grid.Col>
        </Grid>

        <Divider label="Team Performance" labelPosition="center" my="sm" />

        <Stack gap="xs">
          {match.teamStats.map((stat: any) => (
            <div key={stat.metric}>
              <Group justify="space-between" mb={4}>
                <Text size="xs">{stat.metric}</Text>
                <Text size="xs" fw={600}>{stat.yours} / {stat.team}</Text>
              </Group>
              <Progress.Root size="lg">
                <Progress.Section 
                  value={(stat.yours / stat.team) * 100} 
                  color={colors.primaryColor}
                >
                  <Progress.Label>You</Progress.Label>
                </Progress.Section>
                <Progress.Section 
                  value={((stat.team - stat.yours) / stat.team) * 100} 
                  color="gray"
                >
                  <Progress.Label>Team</Progress.Label>
                </Progress.Section>
              </Progress.Root>
            </div>
          ))}
        </Stack>
      </Card>
    );
  },
}

export default matchLobby;