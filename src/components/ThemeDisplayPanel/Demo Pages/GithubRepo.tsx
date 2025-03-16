import React from 'react';
import {
  IconCode,
  IconDots,
  IconEye,
  IconFile,
  IconFileText,
  IconGitBranch,
  IconGitFork,
  IconHistory,
  IconPlaylist,
  IconStar,
  IconTag,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Group,
  Paper,
  Stack,
  Table,
  Tabs,
  Text,
} from '@mantine/core';

const GitHubRepoDemo: React.FC = () => {
  const RepoHeader = () => (
    <Box mb="md">
      <Group justify="space-between" align="flex-start">
        <Group align="flex-end">
          <IconFile size={24} />
          <Anchor size="lg" fw={700}>
            mantine / mantine
          </Anchor>
          <Badge variant="outline">Public</Badge>
        </Group>
        <Group>
          <Button variant="outline" leftSection={<IconEye size={14} />}>
            Watch
          </Button>
          <Button variant="outline" leftSection={<IconStar size={14} />}>
            Star
          </Button>
          <Button variant="outline" leftSection={<IconGitFork size={14} />}>
            Fork
          </Button>
        </Group>
      </Group>
    </Box>
  );

  const RepoNavigation = () => (
    <Tabs defaultValue="code">
      <Tabs.List>
        <Tabs.Tab value="code" leftSection={<IconCode size={14} />}>
          Code
        </Tabs.Tab>
        <Tabs.Tab value="issues" leftSection={<IconPlaylist size={14} />}>
          Issues
        </Tabs.Tab>
        <Tabs.Tab value="pull-requests" leftSection={<IconGitFork size={14} />}>
          Pull requests
        </Tabs.Tab>
        <Tabs.Tab value="actions" leftSection={<IconHistory size={14} />}>
          Actions
        </Tabs.Tab>
        <Tabs.Tab value="projects" leftSection={<IconFile size={14} />}>
          Projects
        </Tabs.Tab>
        <Tabs.Tab value="security" leftSection={<IconFileText size={14} />}>
          Security
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );

  const BranchSelector = () => (
    <Group>
      <Button variant="default" rightSection={<IconGitBranch size={14} />}>
        main
      </Button>
      <Button variant="default" rightSection={<IconTag size={14} />}>
        1 branch
      </Button>
      <Button variant="default" rightSection={<IconTag size={14} />}>
        30 tags
      </Button>
    </Group>
  );

  const FileExplorer = () => (
    <Paper p="xs">
      <Table>
        <Table.Tbody>
          {['src', 'docs', 'tests', 'README.md', 'package.json'].map((item) => (
            <Table.Tr key={item}>
              <Table.Td>
                <Group>
                  {item.includes('.') ? <IconFile size={14} /> : <IconFileText size={14} />}
                  <Text>{item}</Text>
                </Group>
              </Table.Td>
              <Table.Td>
                <Text size="sm" c="dimmed">
                  Update documentation
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm" c="dimmed">
                  2 days ago
                </Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );

  const ReadmeSection = () => (
    <Card>
      <Group justify="space-between" mb="md">
        <Group>
          <IconFileText size={20} />
          <Text fw={700}>README.md</Text>
        </Group>
        <Button variant="subtle" size="xs">
          Edit
        </Button>
      </Group>
      <Text>
        Mantine is a React components library focused on providing great user and developer
        experience. Mantine includes more than 100 customizable components and 50 hooks to cover you
        in any situation.
      </Text>
    </Card>
  );

  return (
    <Container size="lg">
      <Stack gap="xl">
        <RepoHeader />
        <RepoNavigation />
        <Flex gap="md">
          <Box style={{ flex: 7 }}>
            <Stack>
              <Group justify="space-between">
                <BranchSelector />
                <Group>
                  <Button variant="default" leftSection={<IconCode size={14} />}>
                    Code
                  </Button>
                  <ActionIcon variant="default">
                    <IconDots size={14} />
                  </ActionIcon>
                </Group>
              </Group>
              <FileExplorer />
              <ReadmeSection />
            </Stack>
          </Box>
          <Box style={{ flex: 3 }}>
            <Card>
              <Text size="sm">About</Text>
              <Text mt="xs">A fully featured React components library</Text>
              <Group mt="md">
                <IconStar size={14} />
                <Text size="sm">20.5k stars</Text>
              </Group>
              <Group mt="xs">
                <IconEye size={14} />
                <Text size="sm">230 watching</Text>
              </Group>
              <Group mt="xs">
                <IconGitFork size={14} />
                <Text size="sm">1.2k forks</Text>
              </Group>
            </Card>
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
};

export default GitHubRepoDemo;
