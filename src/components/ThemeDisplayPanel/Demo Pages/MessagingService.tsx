import React from 'react';
import {
  IconAt,
  IconHash,
  IconMicrophone,
  IconMoodHappy,
  IconPlus,
  IconSearch,
  IconSettings,
  IconVideo,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Input,
  NavLink,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';

const MOCK_MESSAGES = [
  {
    id: 1,
    user: 'Sarah Chen',
    avatar: 'SC',
    time: '12:03 PM',
    content: 'Has everyone reviewed the latest design updates?',
  },
  {
    id: 2,
    user: 'James Wilson',
    avatar: 'JW',
    time: '12:05 PM',
    content:
      'Yes, I left some comments on the Figma file. The new navigation looks much better! 👍',
  },
  {
    id: 3,
    user: 'Emma Davis',
    avatar: 'ED',
    time: '12:08 PM',
    content: 'I agree with James. The improved spacing really helps with readability.',
  },
];

const MOCK_CHANNELS = [
  { name: 'general', unread: true },
  { name: 'design-team', unread: false },
  { name: 'development', unread: true },
  { name: 'marketing', unread: false },
];

const MOCK_DIRECT_MESSAGES = [
  { name: 'Sarah Chen', online: true },
  { name: 'James Wilson', online: true },
  { name: 'Emma Davis', online: false },
  { name: 'Michael Brown', online: true },
];

const MessagingService: React.FC = () => {
  return (
    <Group align="stretch" h="calc(100vh - 160px)" wrap="nowrap" style={{ overflow: 'hidden' }}>
      {/* Server List */}
      <Paper w={70} h="100%">
        <Stack align="center" gap="xs" p="xs">
          <Tooltip label="Home" position="right">
            <UnstyledButton>
              <Avatar radius="md" size="md">
                H
              </Avatar>
            </UnstyledButton>
          </Tooltip>
          <Divider w="80%" />
          <Tooltip label="Design Team" position="right">
            <UnstyledButton>
              <Avatar radius="md" size="md">
                D
              </Avatar>
            </UnstyledButton>
          </Tooltip>
          <Tooltip label="Development" position="right">
            <UnstyledButton>
              <Avatar radius="md" size="md">
                C
              </Avatar>
            </UnstyledButton>
          </Tooltip>
          <Tooltip label="Add Server" position="right">
            <ActionIcon variant="light" size="lg">
              <IconPlus size="1.1rem" />
            </ActionIcon>
          </Tooltip>
        </Stack>
      </Paper>

      {/* Channel List */}
      <Card w={240} h="100%" withBorder>
        <Stack gap="xs" p="0">
          <Group justify="space-between" p="xs">
            <Title order={5}>Design Team</Title>
            <ActionIcon variant="subtle">
              <IconSettings size="1.1rem" />
            </ActionIcon>
          </Group>

          <TextInput placeholder="Search" leftSection={<IconSearch size="0.9rem" />} size="xs" />

          <ScrollArea h="calc(100vh - 180px)">
            <Stack gap={0}>
              <Text size="sm" fw={700} p="xs">
                Channels
              </Text>
              {MOCK_CHANNELS.map((channel) => (
                <NavLink
                  key={channel.name}
                  label={channel.name}
                  leftSection={<IconHash size="0.9rem" />}
                  active={channel.name === 'design-team'}
                />
              ))}

              <Text size="sm" fw={700} p="xs" mt="md">
                Direct Messages
              </Text>
              {MOCK_DIRECT_MESSAGES.map((dm) => (
                <NavLink
                  key={dm.name}
                  label={dm.name}
                  leftSection={
                    <Box pos="relative">
                      <Avatar size="sm">
                        {dm.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </Avatar>
                      {dm.online && (
                        <Box
                          pos="absolute"
                          bottom={0}
                          right={0}
                          w={8}
                          h={8}
                          bg="green"
                          style={{ borderRadius: '50%' }}
                        />
                      )}
                    </Box>
                  }
                />
              ))}
            </Stack>
          </ScrollArea>
        </Stack>
      </Card>

      {/* Main Chat Area */}
      <Stack style={{ flex: 1 }}>
        {/* Channel Header */}
        <Paper h={50} withBorder>
          <Group h="100%" px="md" justify="space-between">
            <Group>
              <IconHash size="1.2rem" />
              <Text fw={500}>design-team</Text>
            </Group>
            <Group>
              <ActionIcon variant="subtle">
                <IconVideo size="1.1rem" />
              </ActionIcon>
              <ActionIcon variant="subtle">
                <IconAt size="1.1rem" />
              </ActionIcon>
              <ActionIcon variant="subtle">
                <IconSearch size="1.1rem" />
              </ActionIcon>
            </Group>
          </Group>
        </Paper>

        {/* Messages Area */}
        <ScrollArea style={{ flex: 1 }} p="md">
          <Stack gap="lg">
            {MOCK_MESSAGES.map((message) => (
              <Group key={message.id} align="flex-start" gap="sm">
                <Avatar size="md">{message.avatar}</Avatar>
                <Stack gap={2}>
                  <Group gap="xs">
                    <Text fw={500}>{message.user}</Text>
                    <Text size="xs" c="dimmed">
                      {message.time}
                    </Text>
                  </Group>
                  <Text>{message.content}</Text>
                </Stack>
              </Group>
            ))}
          </Stack>
        </ScrollArea>

        {/* Message Input */}
        <Paper p="md" withBorder>
          <Group align="flex-end">
            <Input
              placeholder="Message #design-team"
              style={{ flex: 1 }}
              rightSectionWidth={100}
              rightSection={
                <Group>
                  <ActionIcon variant="subtle">
                    <IconMoodHappy size="1.1rem" />
                  </ActionIcon>
                </Group>
              }
            />
            <ActionIcon variant="subtle">
              <IconMicrophone size="1.1rem" />
            </ActionIcon>
          </Group>
        </Paper>
      </Stack>

      {/* Members List */}
      <Card p={'0'} w={240} h="100%" withBorder>
        <Stack gap="xs" p="xs">
          <Text size="sm" fw={700} p="xs">
            Online — 3
          </Text>
          {MOCK_DIRECT_MESSAGES.filter((dm) => dm.online).map((member) => (
            <NavLink
              key={member.name}
              label={member.name}
              leftSection={
                <Avatar size="sm">
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </Avatar>
              }
            />
          ))}

          <Text size="sm" fw={700} p="xs" mt="md">
            Offline — 1
          </Text>
          {MOCK_DIRECT_MESSAGES.filter((dm) => !dm.online).map((member) => (
            <NavLink
              key={member.name}
              label={member.name}
              leftSection={
                <Avatar size="sm">
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </Avatar>
              }
            />
          ))}
        </Stack>
      </Card>
    </Group>
  );
};

export default MessagingService;
