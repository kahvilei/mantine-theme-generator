import { ActionIcon, Badge, Box, Card, Code, Group, ScrollArea, Stack, Text, TextInput } from "@mantine/core";
import { IconChevronRight, IconMaximize, IconMinus, IconTerminal, IconX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const terminal: ThemeBlock = {
  id: 'terminal',
  title: 'blocks.terminal.title',
  category: 'Development',
  tags: ['Terminal', 'CLI', 'Console'],
  components: ['ActionIcon', 'Badge', 'Card', 'Code', 'Group', 'ScrollArea', 'Stack', 'Text', 'TextInput'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const term = t('terminal.data', { returnObjects: true }) as any;
    return (
      <Card bg="dark.9" p={0}>
        <Group justify="space-between" p="xs" style={{ borderBottom: '1px solid var(--mantine-color-dark-7)' }}>
          <Group gap="xs">
            <Box w={12} h={12} bg="red.6" style={{ borderRadius: '50%', cursor: 'pointer' }} />
            <Box w={12} h={12} bg="yellow.6" style={{ borderRadius: '50%', cursor: 'pointer' }} />
            <Box w={12} h={12} bg="green.6" style={{ borderRadius: '50%', cursor: 'pointer' }} />
            <IconTerminal size={14} color="white" style={{ marginLeft: 8 }} />
            <Text size="xs" c="white">{term.title}</Text>
          </Group>
          <Group gap={4}>
            <ActionIcon size="xs" variant="subtle" color="gray">
              <IconMinus size={12} />
            </ActionIcon>
            <ActionIcon size="xs" variant="subtle" color="gray">
              <IconMaximize size={12} />
            </ActionIcon>
            <ActionIcon size="xs" variant="subtle" color="gray">
              <IconX size={12} />
            </ActionIcon>
          </Group>
        </Group>

        <ScrollArea h={200} p="md">
          <Stack gap={4}>
            {term.lines.map((line: any, idx: number) => (
              <Group key={idx} gap={4} wrap="nowrap" align="flex-start">
                {line.type === 'command' && (
                  <>
                    <Text size="xs" c="green.4" style={{ fontFamily: 'monospace' }}>
                      {term.prompt}
                    </Text>
                    <Text size="xs" c="white" style={{ fontFamily: 'monospace' }}>
                      {line.content}
                    </Text>
                  </>
                )}
                {line.type === 'output' && (
                  <Text size="xs" c="gray.5" style={{ fontFamily: 'monospace', paddingLeft: 4 }}>
                    {line.content}
                  </Text>
                )}
                {line.type === 'error' && (
                  <Text size="xs" c="red.4" style={{ fontFamily: 'monospace', paddingLeft: 4 }}>
                    {line.content}
                  </Text>
                )}
                {line.type === 'success' && (
                  <Group gap={4}>
                    <Badge size="xs" color="green" variant="light">✓</Badge>
                    <Text size="xs" c="green.4" style={{ fontFamily: 'monospace' }}>
                      {line.content}
                    </Text>
                  </Group>
                )}
              </Group>
            ))}
            <Group gap={4} wrap="nowrap">
              <Text size="xs" c="green.4" style={{ fontFamily: 'monospace' }}>
                {term.prompt}
              </Text>
              <Box
                w={8}
                h={14}
                bg="white"
                style={{ animation: 'blink 1s infinite' }}
              />
            </Group>
          </Stack>
        </ScrollArea>
      </Card>
    );
  },
}

export default terminal;