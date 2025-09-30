import { colors } from "@/data/Store";
import { Badge, Card, Group, Paper, Stack, Text, Timeline, ThemeIcon } from "@mantine/core";
import { IconArrowUp, IconCheck, IconClock, IconCoins, IconShoppingCart } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";
import { AreaChart } from "@mantine/charts";

const inventoryItem: ThemeBlock = {
  id: 'inventory-item',
  title: 'blocks.inventoryItem.title',
  category: 'Gaming',
  tags: ['Gaming', 'Market', 'Trading'],
  components: ['Badge', 'Card', 'Group', 'Paper', 'Stack', 'Text', 'Timeline', 'ThemeIcon'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const item = t('inventoryItem.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Group justify="space-between" mb="md">
          <div>
            <Group gap="xs" mb={4}>
              <Text size="sm" fw={700}>{item.name}</Text>
              <Badge size="sm" color={item.rarity.color}>
                {item.rarity.label}
              </Badge>
            </Group>
            <Text size="xs" c="dimmed">{item.category}</Text>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Group gap={4} justify="flex-end">
              <IconCoins size={16} color="gold" />
              <Text size="lg" fw={700}>{item.currentPrice}</Text>
            </Group>
            <Group gap={4} justify="flex-end">
              <ThemeIcon size="xs" color={item.priceChange > 0 ? 'green' : 'red'} variant="transparent">
                <IconArrowUp size={10} style={{ transform: item.priceChange < 0 ? 'rotate(180deg)' : undefined }} />
              </ThemeIcon>
              <Text size="xs" c={item.priceChange > 0 ? 'green' : 'red'}>
                {item.priceChange > 0 ? '+' : ''}{item.priceChange}%
              </Text>
            </Group>
          </div>
        </Group>

        <Paper p="xs" mb="sm" bg="dark.6">
          <Group justify="space-around">
            <div style={{ textAlign: 'center' }}>
              <Text size="xs" c="dimmed">24h Volume</Text>
              <Text size="sm" fw={600}>{item.volume}</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text size="xs" c="dimmed">Listings</Text>
              <Text size="sm" fw={600}>{item.listings}</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text size="xs" c="dimmed">Median Price</Text>
              <Text size="sm" fw={600}>{item.median}</Text>
            </div>
          </Group>
        </Paper>

        <Text size="xs" fw={600} c="dimmed" mb="xs">Price History (7 days)</Text>
        <AreaChart
          h={100}
          data={item.priceHistory}
          dataKey="day"
          series={[{ name: 'price', color: colors.primaryColor??'blue' }]}
          withXAxis={false}
          withYAxis={false}
          withDots={false}
          gridAxis="none"
          curveType="monotone"
          mb="md"
        />

        <Text size="xs" fw={600} c="dimmed" mb="xs">Recent Sales</Text>
        <Timeline active={-1} bulletSize={16} lineWidth={2}>
          {item.recentSales.map((sale: any, idx: number) => (
            <Timeline.Item
              key={idx}
              bullet={
                <ThemeIcon size={16} radius="xl" color={sale.type === 'buy' ? 'green' : 'blue'} variant="filled">
                  {sale.type === 'buy' ? <IconShoppingCart size={8} /> : <IconCheck size={8} />}
                </ThemeIcon>
              }
            >
              <Group justify="space-between" mb={2}>
                <Text size="xs" fw={600}>{sale.price}</Text>
                <Text size="xs" c="dimmed">{sale.time}</Text>
              </Group>
              <Group gap={4}>
                <IconClock size={10} color="var(--mantine-color-dimmed)" />
                <Text size="xs" c="dimmed">{sale.buyer}</Text>
              </Group>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
    );
  },
}

export default inventoryItem;