import React from 'react';
import {
  Button,
  Text,
  Card,
  Input,
  Checkbox,
  Switch,
  Select,
  Slider,
  ColorPicker,
  Stack,
  Group,
  Title,
  Container,
  TextInput,
  Textarea,
  NumberInput,
  Radio,
  Chip,
  Badge,
  Alert,
  Tooltip,
  Accordion,
  Tabs,
  Paper,
  Progress,
  Divider,
  ActionIcon,
  Menu,
  Loader,
  Box,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core';
import { IconAlertCircle, IconSettings, IconPhoto, IconMessageCircle, IconTrash } from '@tabler/icons-react';

export interface ThemeDisplayProps {
  mode: 'light' | 'dark';
  theme: Partial<MantineThemeOverride>
};

const ThemeDisplay: React.FC<ThemeDisplayProps> = ({mode, theme}) => {

  return (
    <MantineProvider
      forceColorScheme={mode}
      theme={theme}
      getRootElement={() => document.querySelector<HTMLElement>(`#display-panel-${mode}`) ?? undefined}
      cssVariablesSelector={`#display-panel-${mode}`}
    >
      <Box id={`display-panel-${mode}`} bg={"var(--mantine-color-body)"}>
        <Container id="display-panel" size="lg">
          <Stack gap="xl">
            <Card shadow="sm" padding="lg">
              <Title order={2}>Typography</Title>
              <Text size="xl" fw={700}>Extra large bold text</Text>
              <Text size="lg">Large text</Text>
              <Text>Default text</Text>
              <Text size="sm">Small text</Text>
              <Text size="xs" fs="italic">Extra small italic text</Text>
              <Divider my="sm" />
              <Title order={3}>Heading 3</Title>
              <Title order={4}>Heading 4</Title>
              <Title order={5}>Heading 5</Title>
              <Title order={6}>Heading 6</Title>
            </Card>

            <Card shadow="sm" padding="lg">
              <Title order={2}>Buttons</Title>
              <Group mt="md">
                <Button>Default Button</Button>
                <Button color="blue">Blue Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="light">Light Button</Button>
                <Button variant="subtle">Subtle Button</Button>
                <Button variant="gradient">Gradient</Button>
              </Group>
              <Group mt="md">
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </Group>
              <Group mt="md">
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
                <Button leftSection={<IconPhoto size={14} />}>With Icon</Button>
                <ActionIcon variant="filled" color="blue" size="lg">
                  <IconSettings size={20} />
                </ActionIcon>
              </Group>
            </Card>

            <Card shadow="sm" padding="lg">
              <Title order={2}>Form Elements</Title>
              <Stack mt="md">
                <TextInput label="Text Input" placeholder="Enter text" />
                <Textarea label="Textarea" placeholder="Enter multiple lines of text" />
                <NumberInput label="Number Input" placeholder="Enter a number" />
                <Input placeholder="Basic Input" />
                <Select
                  label="Select"
                  data={['React', 'Vue', 'Angular', 'Svelte']}
                  placeholder="Select a framework"
                />
                <Checkbox label="Checkbox" />
                <Radio.Group name="favoriteFramework" label="Favorite Framework">
                  <Group mt="xs">
                    <Radio value="react" label="React" />
                    <Radio value="vue" label="Vue" />
                    <Radio value="angular" label="Angular" />
                  </Group>
                </Radio.Group>
                <Switch label="Switch" />
                <Slider
                  marks={[
                    { value: 20, label: '20%' },
                    { value: 50, label: '50%' },
                    { value: 80, label: '80%' },
                  ]}
                />
                <ColorPicker format="rgba" />
              </Stack>
            </Card>

            <Card shadow="sm" padding="lg">
              <Title order={2}>Interactive Elements</Title>
              <Group mt="md">
                <Tooltip label="Tooltip content">
                  <Button>Hover me</Button>
                </Tooltip>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Button>Toggle menu</Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item leftSection={<IconPhoto size={14} />}>Gallery</Menu.Item>
                    <Menu.Item leftSection={<IconMessageCircle size={14} />}>Messages</Menu.Item>
                    <Menu.Item leftSection={<IconTrash size={14} />} color="red">Delete</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Card>

            <Card shadow="sm" padding="lg">
              <Title order={2}>Data Display</Title>
              <Group mt="md">
                <Badge>Default Badge</Badge>
                <Badge color="blue">Blue Badge</Badge>
                <Badge variant="dot">Dot Badge</Badge>
                <Chip defaultChecked>Chip</Chip>
              </Group>
              <Alert icon={<IconAlertCircle size={16} />} title="Bummer!" color="red" mt="md">
                Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
              </Alert>
              <Progress.Root size="xl">
                <Progress.Section value={35}>
                  <Progress.Label>Documents</Progress.Label>
                </Progress.Section>
              </Progress.Root>
            </Card>

            <Card shadow="sm" padding="lg">
              <Title order={2}>Navigation</Title>
              <Tabs defaultValue="gallery">
                <Tabs.List>
                  <Tabs.Tab value="gallery" leftSection={<IconPhoto size={14} />}>Gallery</Tabs.Tab>
                  <Tabs.Tab value="messages" leftSection={<IconMessageCircle size={14} />}>Messages</Tabs.Tab>
                  <Tabs.Tab value="settings" leftSection={<IconSettings size={14} />}>Settings</Tabs.Tab>
                </Tabs.List>
              </Tabs>
              <Accordion defaultValue="customization" mt="md">
                <Accordion.Item value="customization">
                  <Accordion.Control>Customization</Accordion.Control>
                  <Accordion.Panel>Colors, fonts, shadows and many other parts are customizable to fit your design needs</Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="flexibility">
                  <Accordion.Control>Flexibility</Accordion.Control>
                  <Accordion.Panel>Configure components appearance and behavior with vast amount of settings or overwrite any part of component styles</Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Card>

            <Card shadow="sm" padding="lg">
              <Title order={2}>Miscellaneous</Title>
              <Group mt="md">
                <Paper shadow="xs" p="md">
                  <Text>Paper component</Text>
                </Paper>
                <Loader />
                <Loader color="blue" size="xl" variant="dots" />
              </Group>
            </Card>
          </Stack>
        </Container>
      </Box>
    </MantineProvider>
  );
};

export default ThemeDisplay;