import {
    Badge,
    Box,
    Button,
    Card, Code,
    ColorSwatch,
    Grid,
    Group,
    Paper,
    SimpleGrid, Space,
    Stack,
    Text,
    Title,
    Tooltip, useMantineTheme,
} from '@mantine/core';


export const Overview = () => {
    return ( <Stack gap="xl">
        {/* Color System */}
        <Card p="lg">
            <Stack gap="md">
                <Title order={2}>Color System</Title>
                <Text>Primary palette and shade variations that form the foundation of your theme</Text>
                <ColorPalettes />
            </Stack>
        </Card>

        {/* Component Variants */}
        <Card p="lg">
            <Stack gap="md">
                <Title order={2}>Component Variants</Title>
                <Text>Different styles for common components based on your theme configuration</Text>

                <Stack gap="lg">
                    <Box>
                        <Text fw={500} mb="xs">Buttons</Text>
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
                        <Text fw={500} mb="xs">Cards</Text>
                        <SimpleGrid cols={3}>
                            <Card p="md">
                                <Text>Card with border</Text>
                            </Card>
                            <Card shadow="sm" p="md">
                                <Text>Card with shadow</Text>
                            </Card>
                            <Card p="md" bg="primary" c="white">
                                <Text>Card with color</Text>
                            </Card>
                        </SimpleGrid>
                    </Box>

                    <Box>
                        <Text fw={500} mb="xs">Badges</Text>
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
            </Stack>
        </Card>

        {/* Spacing & Radius */}
        <Card p="lg">
            <Stack gap="md">
                <Title order={2}>Spacing & Radius</Title>
                <Text>Theme-defined spacing and border radius values for consistent UI</Text>

                <Grid>
                    <Grid.Col span={6}>
                        <Text fw={500} mb="xs">Spacing</Text>
                        <Paper p="md">
                            <Stack>
                                {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
                                    <Box key={size}>
                                        <Group justify="space-between">
                                            <Text size="sm">{size}</Text>
                                            <Box w={`var(--mantine-spacing-${size})`} h="1rem" bg="primary" />
                                        </Group>
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Text fw={500} mb="xs">Border Radius</Text>
                        <Paper p="md">
                            <Stack>
                                {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
                                    <Group key={size} justify="space-between" align="center">
                                        <Text size="sm">{size}</Text>
                                        <Box
                                            w="3rem"
                                            h="3rem"
                                            bg="primary"
                                            style={{ borderRadius: `var(--mantine-radius-${size})` }}
                                        />
                                    </Group>
                                ))}
                            </Stack>
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Stack>
        </Card>
    </Stack>);
}

// Helper component for color palettes
const ColorPalettes = () => {
    const theme = useMantineTheme();
    const colorNames = Object.keys(theme.colors).filter(color =>
        color !== 'dark' && color !== 'gray' && Array.isArray(theme.colors[color])
    );

    return (
        <Box>
            <SimpleGrid cols={2}>
                <Paper p="md">
                    <Stack>
                        <Group justify="space-between">
                            <Text fw={500}>Primary Color</Text>
                            <Badge>Theme.primaryColor: {theme.primaryColor}</Badge>
                        </Group>
                        <Group>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((shade) => (
                                <ColorSwatch
                                    key={shade}
                                    color={theme.colors[theme.primaryColor][shade]}
                                    size={40}
                                >
                                    <Tooltip label={`${theme.primaryColor} ${shade}`}>
                                        <Text size="xs" c="white" fw={700}>{shade}</Text>
                                    </Tooltip>
                                </ColorSwatch>
                            ))}
                        </Group>
                    </Stack>
                </Paper>

                <Paper  p="md">
                    <Stack>
                        <Group justify="space-between">
                            <Text fw={500}>Grayscale</Text>
                            <Code>theme.colors.gray</Code>
                        </Group>
                        <Group>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((shade) => (
                                <ColorSwatch
                                    key={shade}
                                    color={theme.colors.gray[shade]}
                                    size={40}
                                >
                                    <Tooltip label={`gray ${shade}`}>
                                        <Text size="xs" c={shade > 5 ? "white" : "black"} fw={700}>{shade}</Text>
                                    </Tooltip>
                                </ColorSwatch>
                            ))}
                        </Group>
                    </Stack>
                </Paper>
            </SimpleGrid>

            <Space h="md" />

            <Paper  p="md">
                <Stack>
                    <Text fw={500}>Color Palette</Text>
                    <Box>
                        {colorNames.map((colorName) => (
                            <Group key={colorName} mb="sm">
                                <Text size="sm" w={80}>{colorName}</Text>
                                <Group>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((shade) => (
                                        <ColorSwatch
                                            key={shade}
                                            color={theme.colors[colorName][shade]}
                                            size={28}
                                        >
                                            <Tooltip label={`${colorName} ${shade}`}>
                                                <span />
                                            </Tooltip>
                                        </ColorSwatch>
                                    ))}
                                </Group>
                            </Group>
                        ))}
                    </Box>
                </Stack>
            </Paper>
        </Box>
    );
};