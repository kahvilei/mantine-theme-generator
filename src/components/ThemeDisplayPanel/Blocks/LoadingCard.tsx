import { Card, Group, Loader, Skeleton, Stack, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const loadingCard: ThemeBlock = {
  id: 'loading-card',
  title: 'blocks.loadingCard.title',
  category: 'General',
  tags: ['Loading', 'Skeleton', 'Loader'],
  components: ['Card', 'Group', 'Loader', 'Skeleton', 'Stack', 'Text', 'Title'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const data = t('loadingCard.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Title order={5}>{data.heading}</Title>
            <Loader size="sm" />
          </Group>

          <Group gap="sm" align="flex-start">
            <Skeleton height={40} width={40} circle />
            <Stack gap={6} style={{ flex: 1 }}>
              <Skeleton height={10} />
              <Skeleton height={10} width="75%" />
              <Skeleton height={8} width="45%" />
            </Stack>
          </Group>

          <Group gap="sm" align="flex-start">
            <Skeleton height={40} width={40} circle />
            <Stack gap={6} style={{ flex: 1 }}>
              <Skeleton height={10} />
              <Skeleton height={10} width="60%" />
              <Skeleton height={8} width="35%" />
            </Stack>
          </Group>

          <Stack gap={6}>
            <Skeleton height={8} />
            <Skeleton height={8} />
            <Skeleton height={8} width="55%" />
          </Stack>

          <Text size="xs" c="dimmed" ta="center">{data.loadingText}</Text>
        </Stack>
      </Card>
    );
  },
};

export default loadingCard;
