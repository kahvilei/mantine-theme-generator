import { Card, Divider, Group, HoverCard, Kbd, Stack, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const shortcutsGuide: ThemeBlock = {
  id: 'shortcuts-guide',
  title: 'blocks.shortcutsGuide.title',
  category: 'General',
  tags: ['Keyboard', 'Kbd', 'HoverCard', 'Reference'],
  components: ['Card', 'Divider', 'Group', 'HoverCard', 'Kbd', 'Stack', 'Text', 'Title'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const data = t('shortcutsGuide.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Stack gap="sm">
          <Group justify="space-between" align="center">
            <Title order={5}>{data.heading}</Title>
            <Text size="xs" c="dimmed">{data.hoverHint}</Text>
          </Group>

          {data.sections.map((section: any, sIdx: number) => (
            <Stack key={section.label} gap="xs">
              {sIdx > 0 && <Divider />}
              <Text size="xs" c="dimmed" tt="uppercase" fw={600} lts={0.5}>
                {section.label}
              </Text>
              {section.shortcuts.map((shortcut: any) => (
                <Group key={shortcut.action} justify="space-between">
                  <HoverCard width={200} shadow="md" openDelay={100}>
                    <HoverCard.Target>
                      <Text size="sm" style={{ cursor: 'default' }}>
                        {shortcut.action}
                      </Text>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                      <Text size="xs">{shortcut.description}</Text>
                    </HoverCard.Dropdown>
                  </HoverCard>
                  <Group gap={4}>
                    {shortcut.keys.map((key: string, kIdx: number) => (
                      <Kbd key={kIdx} size="xs">{key}</Kbd>
                    ))}
                  </Group>
                </Group>
              ))}
            </Stack>
          ))}
        </Stack>
      </Card>
    );
  },
};

export default shortcutsGuide;
