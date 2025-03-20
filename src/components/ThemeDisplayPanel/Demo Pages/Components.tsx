import {
    Accordion,
    ActionIcon, Alert, Avatar, Badge,
    Box,
    Button,
    Card, Center,
    Grid,
    Group, HoverCard, Indicator,
    Menu,
    NavLink,
    Paper, Progress, RingProgress,
    Stack, Stepper, Table,
    Tabs,
    Text,
    Title
} from "@mantine/core";
import {
    IconAdjustments, IconAlertCircle, IconCheck,
    IconDashboard,
    IconInfoCircle,
    IconMessage,
    IconPhoto,
    IconPlus,
    IconSearch,
    IconSettings
} from "@tabler/icons-react";
import React from "react";

export const Components: React.FC = () => {
    const [stepper, setStepper] = React.useState<number>(1);
    return (
        <Stack gap="xl">
            <Grid>
                <Grid.Col span={6}>
                    <Card p="lg">
                        <Stack gap="md">
                            <Title order={3}>Action Components</Title>
                            <Paper p="md">
                                <Stack>
                                    <Text fw={500}>Button Sizes</Text>
                                    <Group>
                                        <Button size="xs">XS</Button>
                                        <Button size="sm">SM</Button>
                                        <Button size="md">MD</Button>
                                        <Button size="lg">LG</Button>
                                        <Button size="xl">XL</Button>
                                    </Group>
                                </Stack>
                            </Paper>

                            <Paper  p="md">
                                <Stack>
                                    <Text fw={500}>ActionIcon Variants</Text>
                                    <Group>
                                        <ActionIcon variant="filled" color="primary"><IconPlus size={16} /></ActionIcon>
                                        <ActionIcon variant="light" color="primary"><IconPlus size={16} /></ActionIcon>
                                        <ActionIcon variant="outline" color="primary"><IconPlus size={16} /></ActionIcon>
                                        <ActionIcon variant="subtle" color="primary"><IconPlus size={16} /></ActionIcon>
                                        <ActionIcon variant="transparent" color="primary"><IconPlus size={16} /></ActionIcon>
                                    </Group>
                                </Stack>
                            </Paper>

                            <Paper  p="md">
                                <Stack>
                                    <Text fw={500}>Menu Component</Text>
                                    <Menu shadow="md" width={200}>
                                        <Menu.Target>
                                            <Button variant="outline">Open Menu</Button>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Label>Application</Menu.Label>
                                            <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
                                            <Menu.Item leftSection={<IconMessage size={14} />}>Messages</Menu.Item>
                                            <Menu.Divider />
                                            <Menu.Item leftSection={<IconPhoto size={14} />}>Gallery</Menu.Item>
                                            <Menu.Item leftSection={<IconSearch size={14} />}>Search</Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Card>
                </Grid.Col>

                <Grid.Col span={6}>
                    <Card  p="lg">
                        <Stack gap="md">
                            <Title order={3}>Navigation & Indicators</Title>
                            <Paper  p="md">
                                <Stack>
                                    <Text fw={500}>Tabs Variants</Text>
                                    <Tabs defaultValue="gallery">
                                        <Tabs.List>
                                            <Tabs.Tab value="gallery" leftSection={<IconPhoto size={16} />}>Gallery</Tabs.Tab>
                                            <Tabs.Tab value="messages" leftSection={<IconMessage size={16} />}>Messages</Tabs.Tab>
                                            <Tabs.Tab value="settings" leftSection={<IconSettings size={16} />}>Settings</Tabs.Tab>
                                        </Tabs.List>
                                    </Tabs>
                                </Stack>
                            </Paper>

                            <Paper  p="md">
                                <Stack>
                                    <Text fw={500}>NavLink</Text>
                                    <Box>
                                        <NavLink
                                            label="Dashboard"
                                            leftSection={<IconDashboard size={16} />}
                                            active
                                        />
                                        <NavLink
                                            label="Settings"
                                            leftSection={<IconSettings size={16} />}
                                        />
                                        <NavLink
                                            label="Messages"
                                            leftSection={<IconMessage size={16} />}
                                            rightSection={<Badge size="sm">3</Badge>}
                                        />
                                    </Box>
                                </Stack>
                            </Paper>

                            <Paper  p="md">
                                <Stack>
                                    <Text fw={500}>Stepper</Text>
                                    <Stepper active={stepper} onStepClick={setStepper}>
                                        <Stepper.Step label="Step 1" description="Create account" />
                                        <Stepper.Step label="Step 2" description="Verify email" />
                                        <Stepper.Step label="Step 3" description="Complete profile" />
                                    </Stepper>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Card>
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col span={6}>
                    <Card  p="lg">
                        <Stack gap="md">
                            <Title order={3}>Data Display</Title>
                            <Paper  p="md">
                                <Stack>
                                    <Text fw={500}>Avatar & Indicator</Text>
                                    <Group>
                                        <Avatar size="xs">XS</Avatar>
                                        <Avatar size="sm">SM</Avatar>
                                        <Avatar size="md">MD</Avatar>
                                        <Avatar size="lg">LG</Avatar>
                                        <Avatar size="xl">XL</Avatar>
                                        <Indicator processing size={12}>
                                            <Avatar size="md" src="https://i.pravatar.cc/300" />
                                        </Indicator>
                                    </Group>
                                </Stack>
                            </Paper>

                            <Paper  p="md">
                                <Stack>
                                    <Text fw={500}>Progress & RingProgress</Text>
                                    <Progress value={65} />
                                    <Progress value={65} size="xl" radius="xs" />
                                    <Group>
                                        <RingProgress
                                            size={80}
                                            thickness={8}
                                            sections={[
                                                { value: 40, color: 'primary' },
                                                { value: 25, color: 'green' },
                                                { value: 15, color: 'orange' }
                                            ]}
                                        />
                                        <RingProgress
                                            size={80}
                                            thickness={8}
                                            sections={[
                                                { value: 65, color: 'primary' }
                                            ]}
                                            label={<Center><Text size="xs" fw={700}>65%</Text></Center>}
                                        />
                                    </Group>
                                </Stack>
                            </Paper>

                            <Paper  p="md">
                                <Stack>
                                    <Text fw={500}>Table</Text>
                                    <Table>
                                        <Table.Thead>
                                            <Table.Tr>
                                                <Table.Th>Item</Table.Th>
                                                <Table.Th>Price</Table.Th>
                                                <Table.Th>Status</Table.Th>
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>
                                            <Table.Tr>
                                                <Table.Td>Laptop</Table.Td>
                                                <Table.Td>$1299</Table.Td>
                                                <Table.Td><Badge color="green">In Stock</Badge></Table.Td>
                                            </Table.Tr>
                                            <Table.Tr>
                                                <Table.Td>Phone</Table.Td>
                                                <Table.Td>$699</Table.Td>
                                                <Table.Td><Badge color="green">In Stock</Badge></Table.Td>
                                            </Table.Tr>
                                            <Table.Tr>
                                                <Table.Td>Headphones</Table.Td>
                                                <Table.Td>$199</Table.Td>
                                                <Table.Td><Badge color="red">Out of Stock</Badge></Table.Td>
                                            </Table.Tr>
                                        </Table.Tbody>
                                    </Table>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Card>
                </Grid.Col>

                <Grid.Col span={6}>
                    <Card p="lg">
                        <Stack gap="md">
                            <Title order={3}>Containers & Layout</Title>
                            <Paper p="md">
                                <Stack>
                                    <Text fw={500}>Accordion</Text>
                                    <Accordion>
                                        <Accordion.Item value="item-1">
                                            <Accordion.Control icon={<IconInfoCircle size={16} />}>What is Mantine?</Accordion.Control>
                                            <Accordion.Panel>Mantine is a React component library with a focus on usability, accessibility and developer experience.</Accordion.Panel>
                                        </Accordion.Item>
                                        <Accordion.Item value="item-2">
                                            <Accordion.Control icon={<IconAdjustments size={16} />}>Customization</Accordion.Control>
                                            <Accordion.Panel>Mantine components can be customized with global theme and inline styles.</Accordion.Panel>
                                        </Accordion.Item>
                                    </Accordion>
                                </Stack>
                            </Paper>

                            <Paper p="md">
                                <Stack>
                                    <Text fw={500}>Alert Variants</Text>
                                    <Alert title="Information" color="blue" icon={<IconInfoCircle />}>
                                        This is an informational alert with the default style
                                    </Alert>
                                    <Alert title="Success" color="green" variant="filled" icon={<IconCheck />}>
                                        This is a success alert with filled style
                                    </Alert>
                                    <Alert title="Warning" color="yellow" variant="outline" icon={<IconAlertCircle />}>
                                        This is a warning alert with outline style
                                    </Alert>
                                </Stack>
                            </Paper>

                            <Paper p="md">
                                <Stack>
                                    <Text fw={500}>HoverCard</Text>
                                    <Group align="center">
                                        <HoverCard width={280} shadow="md">
                                            <HoverCard.Target>
                                                <Button>Hover me</Button>
                                            </HoverCard.Target>
                                            <HoverCard.Dropdown>
                                                <Text size="sm">
                                                    This is a HoverCard dropdown with information that appears on hover.
                                                </Text>
                                            </HoverCard.Dropdown>
                                        </HoverCard>
                                    </Group>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Card>
                </Grid.Col>
            </Grid>
        </Stack>
    );
}

