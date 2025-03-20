import {
    Button,
    Card, Checkbox, Chip,
    FileInput,
    Grid,
    Group,
    NumberInput,
    Paper,
    PasswordInput, Radio, Select, SimpleGrid, Slider,
    Stack, Switch,
    Text,
    TextInput,
    Title
} from "@mantine/core";
import {IconChartBar, IconLock, IconMail, IconSearch, IconUpload} from "@tabler/icons-react";
import React from "react";


export const Forms: React.FC = () => {
    return (<Stack gap="xl">
        <Grid>
            <Grid.Col span={6}>
                <Card p="lg">
                    <Stack gap="md">
                        <Title order={3}>Basic Form Controls</Title>
                        <Paper p="md">
                            <Stack>
                                <Text fw={500}>Text Inputs</Text>
                                <TextInput
                                    label="Default Input"
                                    placeholder="Enter some text"
                                />
                                <TextInput
                                    label="With description"
                                    placeholder="Enter some text"
                                    description="This is a description for the input"
                                />
                                <TextInput
                                    label="With error"
                                    placeholder="Enter some text"
                                    error="This field is required"
                                />
                                <TextInput
                                    label="With icon"
                                    placeholder="Search..."
                                    leftSection={<IconSearch size={16} />}
                                />
                                <TextInput
                                    label="Disabled input"
                                    placeholder="This is disabled"
                                    disabled
                                />
                            </Stack>
                        </Paper>

                        <Paper p="md">
                            <Stack>
                                <Text fw={500}>Variants & Sizes</Text>
                                <Group align="flex-end">
                                    <TextInput
                                        label="Default"
                                        placeholder="Default variant"
                                        variant="default"
                                        size="sm"
                                    />
                                    <TextInput
                                        label="Filled"
                                        placeholder="Filled variant"
                                        variant="filled"
                                        size="sm"
                                    />
                                    <TextInput
                                        label="Unstyled"
                                        placeholder="Unstyled variant"
                                        variant="unstyled"
                                        size="sm"
                                    />
                                </Group>
                                <Group>
                                    <TextInput
                                        placeholder="XS size"
                                        size="xs"
                                    />
                                    <TextInput
                                        placeholder="SM size"
                                        size="sm"
                                    />
                                    <TextInput
                                        placeholder="MD size"
                                        size="md"
                                    />
                                    <TextInput
                                        placeholder="LG size"
                                        size="lg"
                                    />
                                    <TextInput
                                        placeholder="XL size"
                                        size="xl"
                                    />
                                </Group>
                            </Stack>
                        </Paper>
                    </Stack>
                </Card>
            </Grid.Col>

            <Grid.Col span={6}>
                <Card p="lg">
                    <Stack gap="md">
                        <Title order={3}>Specialized Inputs</Title>
                        <Paper p="md">
                            <Stack>
                                <Text fw={500}>Input Types</Text>
                                <PasswordInput
                                    label="Password"
                                    placeholder="Enter your password"
                                    leftSection={<IconLock size={16} />}
                                />
                                <NumberInput
                                    label="Number"
                                    placeholder="Enter a number"
                                    leftSection={<IconChartBar size={16} />}
                                />
                                <FileInput
                                    label="Upload file"
                                    placeholder="Click to upload"
                                    leftSection={<IconUpload size={16} />}
                                />
                                <Select
                                    label="Select option"
                                    placeholder="Choose one"
                                    data={[
                                        { value: "option1", label: "Option 1" },
                                        { value: "option2", label: "Option 2" },
                                        { value: "option3", label: "Option 3" }
                                    ]}
                                />
                            </Stack>
                        </Paper>

                        <Paper p="md">
                            <Stack>
                                <Text fw={500}>Toggle Controls</Text>
                                <Group>
                                    <Checkbox label="Checkbox" />
                                    <Checkbox label="Indeterminate" indeterminate />
                                    <Checkbox label="Checked" checked />
                                    <Checkbox label="Disabled" disabled />
                                </Group>
                                <Group>
                                    <Switch label="Switch" />
                                    <Switch label="Checked" checked />
                                    <Switch label="Disabled" disabled />
                                </Group>
                                <Radio.Group
                                    name="radioGroup"
                                    label="Radio Group"
                                    description="Select one option"
                                    defaultValue="option1"
                                >
                                    <Group mt="xs">
                                        <Radio value="option1" label="Option 1" />
                                        <Radio value="option2" label="Option 2" />
                                        <Radio value="option3" label="Option 3" />
                                    </Group>
                                </Radio.Group>
                                <Chip.Group multiple>
                                    <Group>
                                        <Chip value="react">React</Chip>
                                        <Chip value="vue">Vue</Chip>
                                        <Chip value="angular">Angular</Chip>
                                    </Group>
                                </Chip.Group>
                                <Slider
                                    marks={[
                                        { value: 20, label: '20%' },
                                        { value: 50, label: '50%' },
                                        { value: 80, label: '80%' }
                                    ]}
                                    defaultValue={40}
                                />
                            </Stack>
                        </Paper>
                    </Stack>
                </Card>
            </Grid.Col>
        </Grid>

        <Card p="lg">
            <Stack gap="md">
                <Title order={3}>Complete Form Example</Title>
                <Paper p="lg">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Stack gap="md">
                            <Title order={4}>Create Account</Title>
                            <SimpleGrid cols={2}>
                                <TextInput
                                    label="First Name"
                                    placeholder="John"
                                    required
                                />
                                <TextInput
                                    label="Last Name"
                                    placeholder="Doe"
                                    required
                                />
                            </SimpleGrid>

                            <TextInput
                                label="Email"
                                placeholder="your@email.com"
                                leftSection={<IconMail size={16} />}
                                required
                            />

                            <PasswordInput
                                label="Password"
                                placeholder="Create a strong password"
                                leftSection={<IconLock size={16} />}
                                required
                            />

                            <Select
                                label="Role"
                                placeholder="Select your role"
                                data={[
                                    { value: "developer", label: "Developer" },
                                    { value: "designer", label: "Designer" },
                                    { value: "manager", label: "Manager" },
                                    { value: "other", label: "Other" }
                                ]}
                            />

                            <Checkbox
                                label="I agree to the terms and conditions"
                                required
                            />

                            <Group justify="space-between">
                                <Button variant="subtle">Cancel</Button>
                                <Button type="submit">Create Account</Button>
                            </Group>
                        </Stack>
                    </form>
                </Paper>
            </Stack>
        </Card>
    </Stack>);
}