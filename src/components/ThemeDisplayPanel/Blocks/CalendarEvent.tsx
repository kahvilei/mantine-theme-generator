import { colors } from "@/data/Store";
import {Avatar, Button, Card, Group, Paper, Stack, Text, ThemeIcon, Tooltip } from "@mantine/core";
import { IconCalendar, IconClock, IconMapPin} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const calendarEvent:ThemeBlock = {
    id: 'calendar-event',
    title: 'blocks.calendarEvent.title',
    tags: ['Calendar', 'Schedule', 'Time'],
    components: ['Avatar', 'Button', 'Card', 'Group', 'Paper', 'Stack', 'Text', 'ThemeIcon', 'Tooltip'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const event = t('calendarEvent.data', { returnObjects: true }) as any;
      return (
        <Card>
          <Card.Section inheritPadding withBorder py="md">
            <Group justify="space-between">
              <div>
                <Text size="xs" tt="uppercase" fw={700}>
                  {event.month}
                </Text>
                <Text size="xl" fw={900} lh={1} c={colors.primaryColor}>
                  {event.day}
                </Text>
              </div>
              <ThemeIcon size="xl" radius="md" color={colors.primaryColor} variant="light">
                <IconCalendar size={24} />
              </ThemeIcon>
            </Group>
          </Card.Section>
  
                 <Stack pt="md">
            <div>
              <Text fw={600} size="sm">{event.title}</Text>
              <Group gap={4} mt={2}>
                <IconClock size={14} color="var(--mantine-color-dimmed)" />
                <Text size="xs" c="dimmed">{event.time}</Text>
              </Group>
            </div>
            
            <Paper p="xs" radius="sm">
              <Group gap="xs">
                <IconMapPin size={14} color="var(--mantine-color-dimmed)" />
                <Text size="xs">{event.location}</Text>
              </Group>
            </Paper>
            
            <Avatar.Group spacing="xs">
              {event.attendees.map((person: any) => (
                <Tooltip key={person.name} label={person.name}>
                  <Avatar src={person.avatar} size="sm" radius="xl" />
                </Tooltip>
              ))}
              <Avatar size="sm" radius="xl">+{event.moreCount}</Avatar>
            </Avatar.Group>
            
            <Group gap="xs">
              <Button size="xs" color={colors.primaryColor}>
                Join Meeting
              </Button>
              <Button size="xs" variant="subtle">
                Reschedule
              </Button>
            </Group>
          </Stack>
        </Card>
      );
    },
  }
export default calendarEvent;