import { Avatar, Badge, Button, Card, Group, Progress, RingProgress, Stack, Tabs, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const userProfileCard: ThemeBlock = {
  id: 'user-profile-card',
  title: 'blocks.userProfileCard.title',
  category: 'General',
  tags: ['Profile', 'Tabs', 'RingProgress'],
  components: ['Avatar', 'Badge', 'Button', 'Card', 'Group', 'Progress', 'RingProgress', 'Stack', 'Tabs', 'Text', 'Title'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const data = t('userProfileCard.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Stack gap="sm">
          <Group>
            <Avatar src={data.avatar} size="lg" radius="xl" />
            <div>
              <Group gap="xs" align="center">
                <Title order={5}>{data.name}</Title>
                <Badge size="sm">{data.role}</Badge>
              </Group>
              <Text size="xs" c="dimmed" mt={2}>{data.bio}</Text>
            </div>
          </Group>

          <Tabs defaultValue="overview">
            <Tabs.List>
              {data.tabs.map((tab: string) => (
                <Tabs.Tab key={tab} value={tab.toLowerCase()}>{tab}</Tabs.Tab>
              ))}
            </Tabs.List>

            <Tabs.Panel value="overview" pt="sm">
              <Group align="flex-start" gap="lg">
                <RingProgress
                  size={80}
                  thickness={7}
                  sections={[{ value: data.completion, color: 'var(--mantine-primary-color-filled)' }]}
                  label={<Text size="xs" ta="center" fw={700}>{data.completion}%</Text>}
                />
                <Stack gap={4} style={{ flex: 1 }}>
                  <Text size="xs" fw={600} c="dimmed" tt="uppercase" lts={0.5}>{data.completionLabel}</Text>
                  {data.stats.map((stat: any) => (
                    <Group key={stat.label} justify="space-between">
                      <Text size="xs" c="dimmed">{stat.label}</Text>
                      <Text size="xs" fw={600}>{stat.value}</Text>
                    </Group>
                  ))}
                </Stack>
              </Group>
            </Tabs.Panel>

            <Tabs.Panel value="skills" pt="sm">
              <Stack gap="xs">
                {data.skills.map((skill: any) => (
                  <div key={skill.label}>
                    <Group justify="space-between" mb={2}>
                      <Text size="xs">{skill.label}</Text>
                      <Text size="xs" c="dimmed">{skill.value}%</Text>
                    </Group>
                    <Progress value={skill.value} size="sm" />
                  </div>
                ))}
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="stats" pt="sm">
              <Group grow>
                {data.stats.map((stat: any) => (
                  <Stack key={stat.label} align="center" gap={2}>
                    <Text fw={700} size="xl">{stat.value}</Text>
                    <Text size="xs" c="dimmed">{stat.label}</Text>
                  </Stack>
                ))}
              </Group>
            </Tabs.Panel>
          </Tabs>

          <Group gap="xs">
            <Button size="xs" style={{ flex: 1 }}>{data.followButton}</Button>
            <Button size="xs" style={{ flex: 1 }}>{data.messageButton}</Button>
          </Group>
        </Stack>
      </Card>
    );
  },
};

export default userProfileCard;
