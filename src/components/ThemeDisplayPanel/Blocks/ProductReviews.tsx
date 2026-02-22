import { Avatar, Badge, Card, Group, Paper, Progress, Rating, Stack, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const productReviews: ThemeBlock = {
  id: 'product-reviews',
  title: 'blocks.productReviews.title',
  category: 'General',
  tags: ['Reviews', 'Rating', 'Social'],
  components: ['Avatar', 'Badge', 'Card', 'Group', 'Paper', 'Progress', 'Rating', 'Stack', 'Text', 'Title'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const data = t('productReviews.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Stack gap="sm">
          <Group justify="space-between" align="center">
            <Title order={5}>{data.heading}</Title>
            <Badge>{data.totalReviews}</Badge>
          </Group>

          <Group align="flex-start" gap="xl">
            <Stack align="center" gap={4}>
              <Text fw={800} size="2.5rem" lh={1}>{data.average}</Text>
              <Rating value={data.average} fractions={2} readOnly size="sm" />
              <Text size="xs" c="dimmed">{data.outOf}</Text>
            </Stack>

            <Stack gap={6} style={{ flex: 1 }}>
              {data.breakdown.map((row: any) => (
                <Group key={row.stars} gap="xs" align="center">
                  <Text size="xs" c="dimmed" w={8} ta="right">{row.stars}</Text>
                  <Progress value={row.percent} size="sm" style={{ flex: 1 }} />
                  <Text size="xs" c="dimmed" w={28} ta="right">{row.percent}%</Text>
                </Group>
              ))}
            </Stack>
          </Group>

          <Stack gap="xs">
            {data.reviews.map((review: any, idx: number) => (
              <Paper key={idx} p="sm">
                <Stack gap={4}>
                  <Group justify="space-between" align="center">
                    <Group gap="xs">
                      <Avatar src={review.avatar} size="sm" />
                      <Text size="sm" fw={500}>{review.name}</Text>
                    </Group>
                    <Rating value={review.rating} readOnly size="xs" />
                  </Group>
                  <Text size="xs" c="dimmed">{review.body}</Text>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Stack>
      </Card>
    );
  },
};

export default productReviews;
