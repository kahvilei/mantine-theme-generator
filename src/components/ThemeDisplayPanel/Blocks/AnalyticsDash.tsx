import { colors } from "@/data/Store";
import { Card, Center, Group, Paper, RingProgress, SimpleGrid, Stack, Tabs, Text, ThemeIcon, Title } from "@mantine/core";
import { IconChartBar, IconChartPie,IconTrendingDown, IconTrendingUp} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";
import { BarChart, DonutChart } from "@mantine/charts";

const analyticsDashboard:ThemeBlock =  {
    id: 'analytics-card',
    title: 'blocks.analyticsCard.title',
    tags: ['Analytics', 'Charts', 'Stats'],
    components: ['Card', 'Center', 'Group', 'Paper', 'RingProgress', 'SimpleGrid', 'Stack', 'Tabs', 'Text', 'ThemeIcon', 'Title'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const analytics = t('analyticsCard.data', { returnObjects: true }) as any;
      return (
        <Card>
          <Tabs defaultValue="overview">
            <Tabs.List>
              <Tabs.Tab value="overview" leftSection={<IconChartBar size={14} />}>
                Overview
              </Tabs.Tab>
              <Tabs.Tab value="details" leftSection={<IconChartPie size={14} />}>
                Details
              </Tabs.Tab>
            </Tabs.List>
            
            <Tabs.Panel value="overview">
              <Stack pt={'sm'}>
                <Group justify="space-between">
                  <div>
                    <Text size="xs" c="dimmed">Total Revenue</Text>
                    <Title order={2}>${analytics.revenue}</Title>
                  </div>
                  <RingProgress
                    size={60}
                    roundCaps
                    thickness={6}
                    sections={[
                      { value: analytics.growth, color: 'green' },
                      { value: 100 - analytics.growth, color: 'gray.2' }
                    ]}
                    label={
                      <Text size="xs" ta="center">
                        +{analytics.growth}%
                      </Text>
                    }
                  />
                </Group>
                
                <SimpleGrid cols={2} spacing="xs">
                  {analytics.stats.map((stat: any) => (
                    <Paper key={stat.label} p="xs">
                      <Group justify="space-between">
                        <div>
                          <Text size="xs" c="dimmed">{stat.label}</Text>
                          <Text size="sm" fw={600}>{stat.value}</Text>
                        </div>
                        <ThemeIcon size="sm" color={stat.color} variant="light">
                          {stat.trend > 0 ? <IconTrendingUp size={14} /> : <IconTrendingDown size={14} />}
                        </ThemeIcon>
                      </Group>
                    </Paper>
                  ))}
                </SimpleGrid>
                
                <BarChart
                  h={120}
                  data={analytics.chart}
                  dataKey="month"
                  series={[{ name: 'sales', color: colors.primaryColor }]}
                  withYAxis={false}
                  gridAxis="none"
                />
              </Stack>
            </Tabs.Panel>
            
            <Tabs.Panel value="details" p="md">
                <Center>
                    <DonutChart
                        data={analytics.breakdown}
                        chartLabel="Revenue"
                        size={150}
                        thickness={20}
                    />
                </Center>
            </Tabs.Panel>
          </Tabs>
        </Card>
      );
    },
  }
export default analyticsDashboard;