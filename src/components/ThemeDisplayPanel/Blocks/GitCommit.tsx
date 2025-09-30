import { colors } from "@/data/Store";
import { ActionIcon, Avatar, Badge, Card, Code, Group, Paper, Stack, Text, ThemeIcon, Tooltip } from "@mantine/core";
import { IconBrandGit, IconCheck, IconCopy, IconFileCode, IconGitBranch, IconGitCommit } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const gitCommit: ThemeBlock = {
  id: 'git-commit',
  title: 'blocks.gitCommit.title',
  category: 'Development',
  tags: ['Git', 'Version Control', 'Timeline'],
  components: ['ActionIcon', 'Avatar', 'Badge', 'Card', 'Code', 'Group', 'Paper', 'Stack', 'Text', 'ThemeIcon', 'Tooltip'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const commit = t('gitCommit.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Group justify="space-between" mb="sm">
          <Group gap="xs">
            <ThemeIcon size="md" color={colors.primaryColor}>
              <IconBrandGit size={18} />
            </ThemeIcon>
            <div>
              <Text size="sm" fw={600}>Latest Commit</Text>
              <Group gap={4}>
                <IconGitBranch size={12} color="var(--mantine-color-dimmed)" />
                <Text size="xs" c="dimmed">{commit.branch}</Text>
              </Group>
            </div>
          </Group>
          <Badge size="sm" color="green" leftSection={<IconCheck size={10} />}>
            Passed
          </Badge>
        </Group>

        <Paper p="xs" mb="sm">
          <Group justify="space-between" mb={4}>
            <Group gap="xs">
              <IconGitCommit size={14} color="var(--mantine-color-dimmed)" />
              <Code>{commit.hash}</Code>
            </Group>
            <Tooltip label="Copy hash">
              <ActionIcon size="xs" variant="subtle">
                <IconCopy size={12} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Text size="sm" fw={500} mb={4}>
            {commit.message}
          </Text>
          <Group gap="xs">
            <Avatar src={commit.author.avatar} size="xs" radius="xl" />
            <Text size="xs" c="dimmed">{commit.author.name}</Text>
            <Text size="xs" c="dimmed">·</Text>
            <Text size="xs" c="dimmed">{commit.time}</Text>
          </Group>
        </Paper>

        <Stack gap="xs">
          <Text size="xs" c="dimmed" fw={600}>Files Changed</Text>
          {commit.files.map((file: any) => (
            <Paper key={file.path} p="xs">
              <Group justify="space-between">
                <Group gap="xs">
                  <ThemeIcon size="xs" color="blue" variant="light">
                    <IconFileCode size={10} />
                  </ThemeIcon>
                  <Text size="xs" fw={500}>{file.path}</Text>
                </Group>
                <Group gap={4}>
                  <Text size="xs" c="green">+{file.additions}</Text>
                  <Text size="xs" c="red">-{file.deletions}</Text>
                </Group>
              </Group>
            </Paper>
          ))}
        </Stack>
      </Card>
    );
  },
}

export default gitCommit;