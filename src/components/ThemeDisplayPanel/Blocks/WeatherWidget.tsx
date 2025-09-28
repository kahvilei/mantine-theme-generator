import { colors } from "@/data/Store";
import { Box, Card, Grid, Group, Paper, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconCloud, IconDroplet, IconMapPin, IconSun, IconWind } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const weatherWidget:ThemeBlock = {
    id: 'weather-widget',
    title: 'blocks.weatherWidget.title',
    tags: ['Weather', 'Gradient', 'Icons'],
    components: ['Card', 'Title', 'Text', 'Group', 'Paper', 'Stack'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const weather = t('weatherWidget.data', { returnObjects: true }) as any;
      return (
        <Card
          bg = {colors.gradient}
          c={'white'}
        >
            <Stack>
                <Group justify="space-between">
                    <div>
                    <Group gap={4}>
                        <IconMapPin size={16} />
                        <Text size="sm" fw={600}>{weather.location}</Text>
                    </Group>
                    <Text size="xs" opacity={0.8}>{weather.date}</Text>
                    </div>
                    <ThemeIcon size="xl" variant="transparent" color="white">
                    <IconSun size={40} />
                    </ThemeIcon>
                </Group>
                
                <Box>
                    <Title order={2}>
                        {weather.temp}°
                    </Title>
                    <Text size="sm" opacity={0.9}>
                        {weather.condition}
                    </Text>
                </Box>

                <Grid gutter="xs">
                    <Grid.Col span={4}>
                    <Stack gap={2} align="center">
                        <IconDroplet size={16} />
                        <Text size="xs">{weather.humidity}%</Text>
                    </Stack>
                    </Grid.Col>
                    <Grid.Col span={4}>
                    <Stack gap={2} align="center">
                        <IconWind size={16} />
                        <Text size="xs">{weather.wind} mph</Text>
                    </Stack>
                    </Grid.Col>
                    <Grid.Col span={4}>
                    <Stack gap={2} align="center">
                        <IconCloud size={16} />
                        <Text size="xs">{weather.clouds}%</Text>
                    </Stack>
                    </Grid.Col>
                </Grid>
                
                <Group gap="xs">
                    {weather.forecast.map((day: any) => (
                    <Paper key={day.day} p="xs" radius="sm" bg="rgba(255,255,255,0.2)" style={{ flex: 1 }}>
                        <Stack gap={2} align="center">
                        <Text size="xs" fw={600}>{day.day}</Text>
                        <IconSun size={16} />
                        <Text size="xs">{day.temp}°</Text>
                        </Stack>
                    </Paper>
                    ))}
                </Group>
            </Stack>
        </Card>
      );
    },
  }

export default weatherWidget;