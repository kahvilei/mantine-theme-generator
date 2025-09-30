import { colors } from "@/data/Store";
import { ActionIcon, Badge, Button, Card, Code, Group, Paper, ScrollArea, Stack, Text, TextInput, ThemeIcon } from "@mantine/core";
import { IconBox, IconDownload, IconSearch, IconTrash, IconTrendingUp } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const packageManager: ThemeBlock = {
  id: 'package-manager',
  title: 'blocks.packageManager.title',
  category: 'Development',
  tags: ['NPM', 'Dependencies', 'Packages'],
  components: ['ActionIcon', 'Badge', 'Button', 'Card', 'Code', 'Group', 'Paper', 'ScrollArea', 'Stack', 'Text', 'TextInput', 'ThemeIcon'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const packages = t('packageManager.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Group justify="space-between" mb="sm">
          <Group gap="xs">
            <ThemeIcon size="md" color={colors.primaryColor}>
              <IconBox size={18} />
            </ThemeIcon>
            <div>
              <Text size="sm" fw={600}>Package Manager</Text>
              <Text size="xs" c="dimmed">{packages.totalPackages} packages installed</Text>
            </div>
          </Group>
          <Button size="xs" color={colors.primaryColor} leftSection={<IconTrendingUp size={14} />}>
            Update All
          </Button>
        </Group>

        <TextInput
          placeholder="Search packages..."
          leftSection={<IconSearch size={14} />}
          size="xs"
          mb="sm"
        />

        <ScrollArea h={220}>
          <Stack gap="xs">
            {packages.packages.map((pkg: any) => (
              <Paper key={pkg.name} p="xs">
                <Group justify="space-between" align="start">
                  <div style={{ flex: 1 }}>
                    <Group gap="xs" mb={4}>
                      <Code fw={600}>{pkg.name}</Code>
                      <Badge size="xs" variant="light" color={pkg.updateAvailable ? 'yellow' : 'gray'}>
                        v{pkg.version}
                      </Badge>
                      {pkg.updateAvailable && (
                        <Badge size="xs" color="green" variant="dot">
                          v{pkg.latestVersion}
                        </Badge>
                      )}
                    </Group>
                    <Text size="xs" c="dimmed" lineClamp={1}>
                      {pkg.description}
                    </Text>
                    <Group gap="xs" mt={4}>
                      <Group gap={4}>
                        <IconDownload size={10} color="var(--mantine-color-dimmed)" />
                        <Text size="xs" c="dimmed">{pkg.downloads}</Text>
                      </Group>
                      <Badge size="xs" variant="outline" color={pkg.dev ? 'blue' : 'green'}>
                        {pkg.dev ? 'dev' : 'prod'}
                      </Badge>
                    </Group>
                  </div>
                  <ActionIcon.Group>
                    {pkg.updateAvailable && (
                      <ActionIcon size="sm" variant="light" color="green">
                        <IconTrendingUp size={12} />
                      </ActionIcon>
                    )}
                    <ActionIcon size="sm" variant="subtle" color="red">
                      <IconTrash size={12} />
                    </ActionIcon>
                  </ActionIcon.Group>
                </Group>
              </Paper>
            ))}
          </Stack>
        </ScrollArea>
      </Card>
    );
  },
}

export default packageManager;