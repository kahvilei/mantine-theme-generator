import {ActionIcon, Badge, Box, Card, Code, Group, ScrollArea, Select, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";
import { IconCheck, IconCopy, IconDownload } from "@tabler/icons-react";

const codeEditor:ThemeBlock = {
    id: 'code-editor',
    title: 'blocks.codeEditor.title',
    tags: ['Code', 'Developer', 'Syntax'],
    components: ['ActionIcon', 'Badge', 'Card', 'Code', 'Group', 'ScrollArea', 'Select', 'Stack', 'Text'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const code = t('codeEditor.code', { returnObjects: true }) as any;
      return (
        <Card bg="dark.8">
          <Group justify="space-between" align="start" mb="sm">
            <Group gap="xs">
              <Box w={12} h={12} bg="red.6" style={{ borderRadius: '50%' }} />
              <Box w={12} h={12} bg="yellow.6" style={{ borderRadius: '50%' }} />
              <Box w={12} h={12} bg="green.6" style={{ borderRadius: '50%' }} />
            </Group>
            <Select
              size="xs"
              variant="filled"
              data={['JavaScript', 'TypeScript', 'Python', 'Go']}
              defaultValue="TypeScript"
              w={100}
            />
          </Group>
          
          <ScrollArea h={200} type="never">
            <Stack gap={4}>
              {code.lines.map((line: any, idx: number) => (
                <Group key={idx} gap="xs" wrap="nowrap">
                  <Text size="xs" c="dimmed" ta="right" w={20}>
                    {idx + 1}
                  </Text>
                  <Code color={line.color || 'blue'} bg="transparent" c="white" style={{ flex: 1 }}>
                    {line.content}
                  </Code>
                </Group>
              ))}
            </Stack>
          </ScrollArea>
          
          <Group justify="space-between" mt="sm">
            <Group gap="xs">
              <Badge size="sm" variant="light" color="green" leftSection={<IconCheck size={10} />}>
                No errors
              </Badge>
              <Badge size="sm" variant="light" color="blue">
                TypeScript
              </Badge>
            </Group>
            <ActionIcon.Group>
              <ActionIcon variant="subtle" color="gray" size="sm">
                <IconCopy size={14} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray" size="sm">
                <IconDownload size={14} />
              </ActionIcon>
            </ActionIcon.Group>
          </Group>
        </Card>
      );
    },
  }
export default codeEditor;