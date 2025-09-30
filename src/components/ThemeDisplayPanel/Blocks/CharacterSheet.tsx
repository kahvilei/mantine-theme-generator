import { colors } from "@/data/Store";
import { Badge, Card, Divider, Grid, Group, Paper, Progress, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconFlame, IconHeart, IconShield, IconSparkles, IconSword, IconWand } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const characterSheet: ThemeBlock = {
  id: 'character-sheet',
  title: 'blocks.characterSheet.title',
  category: 'Gaming',
  tags: ['D&D', 'RPG', 'Character'],
  components: ['Badge', 'Card', 'Divider', 'Grid', 'Group', 'Paper', 'Progress', 'Stack', 'Text', 'ThemeIcon'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const character = t('characterSheet.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Group justify="space-between" mb="md">
          <div>
            <Group gap="xs" mb={4}>
              <Text size="sm" fw={700}>{character.name}</Text>
              <Badge size="sm" color={colors.primaryColor}>
                Level {character.level}
              </Badge>
            </Group>
            <Text size="xs" c="dimmed">
              {character.race} {character.class}
            </Text>
          </div>
          <ThemeIcon size="xl" color={character.classColor} variant="light">
            {character.class === 'Wizard' ? <IconWand size={24} /> : <IconSword size={24} />}
          </ThemeIcon>
        </Group>

        <Paper p="xs" mb="sm" bg="dark.6">
          <Grid gutter="xs">
            <Grid.Col span={4}>
              <Stack gap={2} align="center">
                <IconHeart size={16} color="var(--mantine-color-red-5)" />
                <Text size="xs" c="dimmed">HP</Text>
                <Text size="sm" fw={700}>{character.hp.current}/{character.hp.max}</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={4}>
              <Stack gap={2} align="center">
                <IconShield size={16} color="var(--mantine-color-blue-5)" />
                <Text size="xs" c="dimmed">AC</Text>
                <Text size="sm" fw={700}>{character.ac}</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={4}>
              <Stack gap={2} align="center">
                <IconFlame size={16} color="var(--mantine-color-orange-5)" />
                <Text size="xs" c="dimmed">Initiative</Text>
                <Text size="sm" fw={700}>+{character.initiative}</Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Paper>

        <Progress.Root size="lg" mb="sm">
          <Progress.Section 
            value={(character.hp.current / character.hp.max) * 100} 
            color={
              character.hp.current / character.hp.max > 0.5 ? 'green' : 
              character.hp.current / character.hp.max > 0.25 ? 'yellow' : 
              'red'
            }
          >
            <Progress.Label>Health</Progress.Label>
          </Progress.Section>
        </Progress.Root>

        <Divider label="Ability Scores" labelPosition="center" my="sm" />

        <Grid gutter="xs" mb="sm">
          {character.abilities.map((ability: any) => (
            <Grid.Col key={ability.name} span={4}>
              <Paper p="xs" style={{ textAlign: 'center' }}>
                <Text size="xs" c="dimmed" tt="uppercase">{ability.name}</Text>
                <Text size="xl" fw={700} lh={1} my={4}>{ability.score}</Text>
                <Badge size="xs" color="gray" variant="light">
                  {ability.modifier > 0 ? '+' : ''}{ability.modifier}
                </Badge>
              </Paper>
            </Grid.Col>
          ))}
        </Grid>

        <Divider label="Proficiencies" labelPosition="center" my="sm" />

        <Stack gap="xs">
          {character.proficiencies.map((prof: any) => (
            <Group key={prof.name} justify="space-between">
              <Group gap="xs">
                <ThemeIcon size="xs" color={prof.proficient ? 'green' : 'gray'} variant="light">
                  {prof.proficient && <IconSparkles size={10} />}
                </ThemeIcon>
                <Text size="xs">{prof.name}</Text>
              </Group>
              <Badge size="xs" variant="light" color={prof.proficient ? colors.primaryColor : 'gray'}>
                {prof.bonus > 0 ? '+' : ''}{prof.bonus}
              </Badge>
            </Group>
          ))}
        </Stack>

        <Divider label="Spell Slots" labelPosition="center" my="sm" />

        <Stack gap={4}>
          {character.spellSlots.map((slot: any) => (
            <div key={slot.level}>
              <Group justify="space-between" mb={4}>
                <Text size="xs">Level {slot.level}</Text>
                <Text size="xs" c="dimmed">{slot.used}/{slot.total}</Text>
              </Group>
              <Progress 
                value={((slot.total - slot.used) / slot.total) * 100} 
                size="sm"
                color="violet"
              />
            </div>
          ))}
        </Stack>
      </Card>
    );
  },
}

export default characterSheet;