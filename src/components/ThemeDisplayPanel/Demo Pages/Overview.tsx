import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Code,
  Divider,
  Grid,
  Group,
  MantineColorsTuple,
  Paper, ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';

export const Overview = () => {
  return (
    <Stack gap="xl">
      {/* VirtualColor System */}

      <Stack gap="md">
        <Title order={2}>Color System</Title>
        <ColorPalettes />
      </Stack>

      <Group gap="xl" align="start" justify="stretch">
      {/* Component Variants */}
      <Stack gap="md" flex={1}>
        <Title order={2}>Component Variants</Title>
        <Card p="lg">
          <Stack gap="lg">
            <Box>
              <Text fw={500} mb="xs">
                Buttons
              </Text>
              <Group>
                <Button variant="filled">Filled</Button>
                <Button variant="light">Light</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="subtle">Subtle</Button>
                <Button variant="default">Default</Button>
                <Button variant="gradient">Gradient</Button>
              </Group>
            </Box>

            <Box>
              <Text fw={500} mb="xs">
                Cards
              </Text>
              <SimpleGrid cols={3}>
                <Card withBorder>
                  <Text>Card with border</Text>
                </Card>
                <Card shadow="md">
                  <Text>Card with shadow</Text>
                </Card>
                <Card bg="indigo">
                  <Text>Card with color</Text>
                </Card>
              </SimpleGrid>
            </Box>

            <Box>
              <Text fw={500} mb="xs">
                Badges
              </Text>
              <Group>
                <Badge>Default</Badge>
                <Badge variant="filled">Filled</Badge>
                <Badge variant="light">Light</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="dot">Dot</Badge>
                <Badge variant="gradient">Gradient</Badge>
              </Group>
            </Box>
          </Stack>
        </Card>

      </Stack>

      {/* Spacing & Radius */}
      <Stack gap="md" flex={1}>
      <Title order={2}>Spacing & Radius</Title>
      <Card p="lg">
        <Stack gap="md">
          <Grid>
            <Grid.Col span={6}>
              <Text fw={500} mb="xs">
                Spacing
              </Text>
                <Stack>
                  {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
                    <Box key={size}>
                      <Group justify="space-between">
                        <Text size="sm">{size}</Text>
                        <Card p={0} w={`var(--mantine-spacing-${size})`} h="1rem" withBorder />
                      </Group>
                    </Box>
                  ))}
                </Stack>
            </Grid.Col>

            <Grid.Col span={6}>
              <Text fw={500} mb="xs">
                Border Radius
              </Text>

                <Stack>
                  {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
                    <Group key={size} justify="space-between" align="center">
                      <Paper
                          p="md"
                          withBorder
                        w="100%"
                        h="3rem"
                        style={{ borderRadius: `var(--mantine-radius-${size})` }}>
                        <Text size="sm">{size}</Text>
                      </Paper>
                    </Group>
                  ))}
                </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Card>
      </Stack>
      </Group>
    </Stack>
  );
};

interface ColorStripInterface {
  title: string;
  color: MantineColorsTuple;
  variableName: string;
  tooltip?: string;
}

const ColorStrip = ({ title, color, variableName, tooltip }: ColorStripInterface) => {
  return (
    <Stack flex = {1}>
      <Stack gap="xs">
        <Group justify="space-between">
          <Tooltip label={tooltip ?? ''}>
            <Text fw={500}>{title}</Text>
          </Tooltip>
          <Code>{variableName}</Code>
        </Group>
        <Divider />
      </Stack>
      <Group gap="xs" justify="space-between">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((shade) => (
            <Tooltip key={shade} label={`${title} ${shade}`}>
              <Card h="5rem" p="sm" flex="3 30%" key={shade} bg={color[shade]}>
                <span />
              </Card>
            </Tooltip>
        ))}
      </Group>
    </Stack>
  );
};

// Helper component for color palettes
const ColorPalettes = () => {
  const theme = useMantineTheme();
  const colorNames = Object.keys(theme.colors).filter(
    (color) => color !== 'dark' && color !== 'gray' && Array.isArray(theme.colors[color])
  );

  const colorData: ColorStripInterface[] = [
    { title: 'Primary', color: theme.colors[theme.primaryColor], variableName: 'theme.primary' },
    { title: 'Gray', color: theme.colors.gray, variableName: 'theme.colors.gray' },
    { title: 'Dark', color: theme.colors.dark, variableName: 'theme.colors.dark' },
  ];

  return (
    <Group gap="xl" align="start" justify="space-between">
      <Stack gap="xl" flex={8} miw={500}>
        <Group>
          <Card p="xl" bg="white" flex={1} withBorder>
            <Center>
              <Code>white</Code>
            </Center>
          </Card>
          <Card p="xl" bg="black" flex={1} withBorder>
            <Center>
              <Code>black</Code>
            </Center>
          </Card>
        </Group>
        <Group gap="xl" flex={1}>
        {colorData.map((data: ColorStripInterface) => (
          <ColorStrip
              key={data.title}
            title={data.title}
            color={data.color}
            variableName={data.variableName}
            tooltip={data.tooltip}
          />
        ))}
        </Group>
      </Stack>
      <Stack flex={4} miw={400}>
      <Text fw={500}>Color Palette</Text>
      <Paper p="md" >
        <Stack>
          <ScrollArea h="22rem" >
            {colorNames.map((colorName) => (
              <Group key={colorName} mb="sm">
                <Text size="sm" w="3rem">
                  {colorName}
                </Text>
                <Group gap="xs" flex={9}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((shade) => (
                    <Tooltip key={shade} label={`${colorName} ${shade}`}>
                      <Card p={0} h="2rem" flex={1} key={shade} bg={theme.colors[colorName][shade]}>
                        <span />
                      </Card>
                    </Tooltip>
                  ))}
                </Group>
              </Group>
            ))}
          </ScrollArea>
        </Stack>
      </Paper>
      </Stack>
    </Group>
  );
};
