import { colors } from "@/data/Store";
import { Button, Card, Group, Paper, RingProgress, Stack, Text, ThemeIcon} from "@mantine/core";
import { IconBike, IconPlus, IconRun, IconWalk } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const fitnessTracker:ThemeBlock =   {
    id: 'fitness-tracker',
    title: 'blocks.fitnessTracker.title',
    tags: ['Health', 'Progress', 'Stats'],
    components: ['Button', 'Card', 'Group', 'Paper', 'RingProgress', 'Stack', 'Text', 'ThemeIcon'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const fitness = t('fitnessTracker.data', { returnObjects: true }) as any;
      return (
        <Card>
          <Card.Section inheritPadding withBorder >
            <Group justify="space-between">
              <div>
                <Text size="xs" c="dimmed">Today's Goal</Text>
                <Text size="xl" fw={700}>{fitness.steps} steps</Text>
              </div>
              <RingProgress
                size={60}
                roundCaps
                thickness={8}
                sections={fitness.rings.map((ring: any) => ({
                  value: ring.value,
                  color: ring.color
                }))}
                label={
                  <Text size="xs" ta="center" fw={700}>
                    {fitness.percentage}%
                  </Text>
                }
              />
            </Group>
          </Card.Section>
          
          <Stack pt={'sm'}>
            {fitness.activities.map((activity: any) => (
              <Paper key={activity.name} p={'xs'}>
                <Group justify="space-between">
                  <Group gap="xs">
                    <ThemeIcon size="sm" color={activity.color} variant="light">
                      {activity.icon === 'run' ? <IconRun size={14} /> :
                       activity.icon === 'bike' ? <IconBike size={14} /> :
                       <IconWalk size={14} />}
                    </ThemeIcon>
                    <div>
                      <Text size="xs" fw={500}>{activity.name}</Text>
                      <Text size="xs" c="dimmed">{activity.duration}</Text>
                    </div>
                  </Group>
                  <div style={{ textAlign: 'right' }}>
                    <Text size="xs" fw={600}>{activity.calories}</Text>
                    <Text size="xs" c="dimmed">cal</Text>
                  </div>
                </Group>
              </Paper>
            ))}
            
            <Button 
              fullWidth 
              size="sm" 
              variant="light" 
              color={colors.primaryColor}
              leftSection={<IconPlus size={14} />}
            >
              Log Activity
            </Button>
          </Stack>
        </Card>
      );
    },
  }
export default fitnessTracker;