import { ActionIcon, Avatar, Card, Group, Indicator, Menu, Paper, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconBolt, IconCheck, IconDots, IconEdit, IconHeart, IconMessage, IconShare, IconTrash} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const socialPost:ThemeBlock =   {
    id: 'social-post',
    title: 'blocks.socialPost.title',
    category: 'Social',
    tags: ['Social', 'Avatar', 'Interactive'],
    components: ['ActionIcon', 'Avatar', 'Card', 'Group', 'Indicator', 'Menu', 'Paper', 'Stack', 'Text', 'ThemeIcon', 'Title'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const post = t('socialPost.data', { returnObjects: true }) as any;
      return (
        <Card>
          <Stack>
            <Group justify="space-between">
              <Group>
                <Indicator processing color="green" offset={4} size={8}>
                  <Avatar src={post.avatar} radius="xl" />
                </Indicator>
                <div>
                  <Group gap={4}>
                    <Title order={5}>{post.author}</Title>
                    <ThemeIcon size="xs" radius="xl" color="blue" variant="filled">
                      <IconCheck size={10} />
                    </ThemeIcon>
                  </Group>
                  <Text size="xs" c="dimmed">@{post.handle} · {post.time}</Text>
                </div>
              </Group>
              <Menu>
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <IconDots size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item leftSection={<IconEdit size={14} />}>Edit</Menu.Item>
                  <Menu.Item leftSection={<IconTrash size={14} />} color="red">Delete</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
            
            <Text size="sm">{post.content}</Text>
            
            <Paper p="xs">
              <Group gap="xs">
                <ThemeIcon size="md" color="violet" variant="light">
                  <IconBolt size={16} />
                </ThemeIcon>
                <Text size="xs" c="dimmed">{post.highlight}</Text>
              </Group>
            </Paper>
            
            <Group justify="space-between">
              <Group gap={6}>
                <ActionIcon.Group>
                  <ActionIcon color="pink">
                    <IconHeart size={16} />
                  </ActionIcon>
                  <ActionIcon color="blue">
                    <IconMessage size={16} />
                  </ActionIcon>
                  <ActionIcon color="green">
                    <IconShare size={16} />
                  </ActionIcon>
                </ActionIcon.Group>
              </Group>
              <Group gap="xs">
                <Text size="xs" c="dimmed">{post.likes} likes</Text>
                <Text size="xs" c="dimmed">·</Text>
                <Text size="xs" c="dimmed">{post.comments} comments</Text>
              </Group>
            </Group>
          </Stack>
        </Card>
      );
    },
  }
export default socialPost;