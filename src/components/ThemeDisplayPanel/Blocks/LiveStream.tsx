import { ActionIcon, AspectRatio, Avatar, Badge, Box, Card, Center, Group, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconCheck, IconEye, IconHeart, IconShare, IconVideo} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const liveStream:ThemeBlock = {
    id: 'livestream-card',
    title: 'blocks.livestreamCard.title',
    tags: ['Media', 'Live', 'Video'],
    components: ['ActionIcon', 'AspectRatio', 'Avatar', 'Badge', 'Card', 'Center', 'Group', 'Stack', 'Text', 'ThemeIcon'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const stream = t('livestreamCard.data', { returnObjects: true }) as any;
      return (
        <Card p={'sm'}>
            <Card.Section>
                <AspectRatio ratio={16/9}>
                    <Box 
                    bg="dark.8"
                    style={{ position: 'relative' }}
                    >
                    <Badge
                        color="red"
                        variant="filled"
                        leftSection={<Box w={6} h={6} bg="white" style={{ borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />}
                        style={{ position: 'absolute', top: 'var(--mantine-spacing-sm)', left: 'var(--mantine-spacing-sm)', zIndex: 10 }}
                    >
                        LIVE
                    </Badge>
                    <Badge
                        variant="filled"
                        color="dark"
                        style={{ position: 'absolute', bottom: 'var(--mantine-spacing-sm)', right: 'var(--mantine-spacing-sm)', zIndex: 10 }}
                    >
                        {stream.duration}
                    </Badge>
                    <Center h="100%">
                        <IconVideo size={40} color="white" />
                    </Center>
                    </Box>
                 </AspectRatio>
            </Card.Section>
         
          
          <Stack gap="sm" p="md">
            <Group gap="sm">
              <Avatar src={stream.streamer.avatar} size="md" radius="xl" />
              <Stack gap={0} style={{ flex: 1 }}>
                <Text size="sm" fw={600} lineClamp={1}>{stream.title}</Text>
                <Group gap={'xs'}>
                  <Text size="xs" c="dimmed">{stream.streamer.name}</Text>
                  <ThemeIcon size="xs" radius="xl" variant="filled">
                    <IconCheck size={8} />
                  </ThemeIcon>
                  <Text size="xs" c="dimmed">{stream.game}</Text>
                </Group>
              </Stack>
            </Group>
            
            <Group justify="space-between">
              <Group gap="xs">
                <Badge size="sm" color="red" leftSection={<IconEye size={10} />}>
                  {stream.viewers} watching
                </Badge>
                <Badge size="sm" color="gray">
                  {stream.category}
                </Badge>
              </Group>
              <ActionIcon.Group>
                <ActionIcon size="sm">
                  <IconHeart size={14} />
                </ActionIcon>
                <ActionIcon size="sm">
                  <IconShare size={14} />
                </ActionIcon>
              </ActionIcon.Group>
            </Group>
          </Stack>
        </Card>
      );
    },
  }

export default liveStream;