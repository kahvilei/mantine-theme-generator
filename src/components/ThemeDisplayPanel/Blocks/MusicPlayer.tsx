import { colors } from "@/data/Store";
import { ActionIcon, AspectRatio, Card, Group, Paper, Progress, Stack, Text, Title } from "@mantine/core";
import { IconDots, IconHeart, IconMusic, IconPlayerPlay, IconPlayerSkipBack, IconPlayerSkipForward, IconShare} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const musicPlayer:ThemeBlock =  {
    id: 'music-player',
    title: 'blocks.musicPlayer.title',
    tags: ['Media', 'Controls', 'Progress'],
    components: ['ActionIcon', 'AspectRatio', 'Card', 'Group', 'Paper', 'Progress', 'Stack', 'Text', 'Title'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const track = t('musicPlayer.track', { returnObjects: true }) as any;
      return (
        <Card>
          <AspectRatio ratio={1} mb="md">
            <Paper 
              radius="md" 
              style={{
                background: colors.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <IconMusic size={60} color="white" />
            </Paper>
          </AspectRatio>
          
          <Stack gap="xs">
            <div>
              <Title order={3} c="white" size="lg">{track.title}</Title>
              <Text size="sm" c="dimmed">{track.artist}</Text>
            </div>
            
            <Progress value={65} size="xs" radius="xl" color={colors.primaryColor} />
            <Group justify="space-between">
              <Text size="xs" c="dimmed">2:14</Text>
              <Text size="xs" c="dimmed">3:27</Text>
            </Group>
            
            <Group justify="center" gap="md">
              <ActionIcon variant="subtle" color="gray" size="lg">
                <IconPlayerSkipBack size={20} />
              </ActionIcon>
              <ActionIcon variant="filled" color={colors.primaryColor} size="xl" radius="xl">
                <IconPlayerPlay size={24} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray" size="lg">
                <IconPlayerSkipForward size={20} />
              </ActionIcon>
            </Group>
            
            <Group justify="center" gap="xs">
              <ActionIcon variant="subtle" color="gray" size="sm">
                <IconHeart size={16} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray" size="sm">
                <IconShare size={16} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray" size="sm">
                <IconDots size={16} />
              </ActionIcon>
            </Group>
          </Stack>
        </Card>
      );
    },
  }
export default musicPlayer;