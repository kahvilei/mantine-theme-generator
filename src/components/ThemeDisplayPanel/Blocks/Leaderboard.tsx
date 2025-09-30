import { colors } from "@/data/Store";
import { Badge, Card, Divider, Group, Paper, Progress, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconFlame, IconMedal, IconStar, IconTrophy } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const leaderboard: ThemeBlock = {
  id: 'leaderboard',
  title: 'blocks.leaderboard.title',
  category: 'Gaming',
  tags: ['Gaming', 'Rankings', 'Tier List'],
  components: ['Badge', 'Card', 'Divider', 'Group', 'Paper', 'Progress', 'Stack', 'Text', 'ThemeIcon'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const data = t('leaderboard.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Group justify="space-between" mb="md">
          <div>
            <Text size="sm" fw={700}>Meta Tier List</Text>
            <Text size="xs" c="dimmed">Patch {data.patch} • Updated {data.lastUpdate}</Text>
          </div>
          <Badge size="sm" color={colors.primaryColor} leftSection={<IconFlame size={10} />}>
            {data.region}
          </Badge>
        </Group>

        <Stack gap="xs">
          {data.tiers.map((tier: any) => (
            <div key={tier.tier}>
              <Group gap="xs" mb="xs">
                <Badge 
                  size="lg" 
                  color={tier.color}
                  leftSection={
                    <ThemeIcon size="xs" color={tier.color} variant="transparent">
                      {tier.tier === 'S' ? <IconTrophy size={10} /> : 
                       tier.tier === 'A' ? <IconMedal size={10} /> : 
                       <IconStar size={10} />}
                    </ThemeIcon>
                  }
                >
                  {tier.tier} Tier
                </Badge>
                <Text size="xs" c="dimmed">{tier.champions.length} champions</Text>
              </Group>
              
              <Stack gap={4}>
                {tier.champions.map((champ: any) => (
                  <Paper key={champ.name} p="xs">
                    <Group justify="space-between">
                      <Group gap="xs">
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 4,
                            background: colors.gradient,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Text size="xs" fw={700} c="white">
                            {champ.name.substring(0, 2)}
                          </Text>
                        </div>
                        <div>
                          <Text size="xs" fw={600}>{champ.name}</Text>
                          <Group gap={4}>
                            {champ.roles.map((role: string) => (
                              <Badge key={role} size="xs" variant="light">
                                {role}
                              </Badge>
                            ))}
                          </Group>
                        </div>
                      </Group>
                      <div style={{ width: 100 }}>
                        <Group justify="space-between" mb={2}>
                          <Text size="xs" c="dimmed">WR</Text>
                          <Text size="xs" fw={600}>{champ.winRate}%</Text>
                        </Group>
                        <Progress 
                          value={champ.winRate} 
                          size="xs" 
                          color={champ.winRate >= 52 ? 'green' : champ.winRate >= 48 ? colors.primaryColor : 'red'}
                        />
                      </div>
                    </Group>
                  </Paper>
                ))}
              </Stack>
              
              {tier.tier !== 'C' && <Divider my="sm" />}
            </div>
          ))}
        </Stack>
      </Card>
    );
  },
}

export default leaderboard;