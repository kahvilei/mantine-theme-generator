import { Badge, Card, Group, Image, Pagination, SimpleGrid, Stack, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const mediaGrid: ThemeBlock = {
  id: 'media-grid',
  title: 'blocks.mediaGrid.title',
  category: 'General',
  tags: ['Gallery', 'SimpleGrid', 'Pagination', 'Image'],
  colSpan: 2,
  components: ['Badge', 'Card', 'Group', 'Image', 'Pagination', 'SimpleGrid', 'Stack', 'Title'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const data = t('mediaGrid.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Stack gap="sm">
          <Group justify="space-between" align="center">
            <Title order={5}>{data.heading}</Title>
            <Badge>{data.totalItems}</Badge>
          </Group>

          <SimpleGrid cols={4} spacing="xs">
            {data.items.map((item: any) => (
              <Image
                key={item.id}
                src={item.src}
                radius="md"
                style={{ aspectRatio: '1', objectFit: 'cover' }}
              />
            ))}
          </SimpleGrid>

          <Group justify="center">
            <Pagination total={data.totalPages} defaultValue={data.currentPage} size="sm" />
          </Group>
        </Stack>
      </Card>
    );
  },
};

export default mediaGrid;
