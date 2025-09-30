import { colors } from "@/data/Store";
import {Badge, Button, Card, Group, Paper, Text, Title } from "@mantine/core";
import { IconChartLine, IconCoin, IconShoppingCart, IconTrendingDown, IconTrendingUp} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";
import { AreaChart } from "@mantine/charts";

const cryptoCard:ThemeBlock = {
    id: 'crypto-card',
    title: 'blocks.cryptoCard.title',
    category: 'Finance',
    tags: ['Finance', 'Card', 'Chart', 'Gradient'],
    components: ['Badge', 'Button', 'Card', 'Group', 'Paper', 'Text', 'Title'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const data = t('cryptoCard.data', { returnObjects: true }) as any;
      return (
        <Card style={{
          background: colors.gradient
        }}>
          <Group justify="space-between" align="start" mb="md">
            <div>
              <Group gap="xs">
                <IconCoin size={20} color="white" />
                <Title order={3} c="white">{data.symbol}</Title>
              </Group>
              <Text size="xs" c="white" opacity={0.8}>{data.name}</Text>
            </div>
            <Badge 
              size="lg" 
              variant="white" 
              color={data.change > 0 ? 'green' : 'red'}
              leftSection={data.change > 0 ? <IconTrendingUp size={14} /> : <IconTrendingDown size={14} />}
            >
              {data.change}%
            </Badge>
          </Group>
          
          <Title order={2} c="white">
            ${data.price}
          </Title>
          
          <AreaChart
            h={100}
            data={data.chart}
            dataKey="time"
            series={[{ name: 'price', color: 'white' }]}
            withXAxis={false}
            withYAxis={false}
            withDots={false}
            gridAxis="none"
            curveType="natural"
          />
          
          <Group mt="md" gap="xs">
            <Button variant="white" color="dark" size="xs" leftSection={<IconShoppingCart size={14} />}>
              Buy
            </Button>
            <Button variant="subtle" c="white" size="xs" leftSection={<IconChartLine size={14} />}>
              Chart
            </Button>
          </Group>
        </Card>
      );
    },
  }

export default cryptoCard;