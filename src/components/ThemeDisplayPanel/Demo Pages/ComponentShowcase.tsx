import React, { useState } from 'react';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  Divider,
  Group,
  Image,
  MantineProvider,
  MantineThemeOverride,
  Modal,
  Notification,
  NumberInput,
  Pagination,
  Paper,
  Progress,
  Radio,
  Select,
  Stack,
  Table,
  Tabs,
  Text,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core';

const ComponentsShowcase: React.FC = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [notificationOpened, setNotificationOpened] = useState(false);
  const breadcrumbsItems = [
    { title: 'Home', href: '#' },
    { title: 'Components', href: '#' },
    { title: 'Showcase', href: '#' },
  ].map((item, index) => (
    <a href={item.href} key={index}>
      {item.title}
    </a>
  ));

  return (
    <Stack gap="xl">
      {/* Typography */}
      <Box>
        <Title order={1}>Mantine Components Showcase</Title>
        <Text c="dimmed">This page showcases various Mantine components for theme comparison.</Text>
        <Divider mt="sm" />
      </Box>

      {/* Buttons */}
      <Box>
        <Title order={3}>Buttons</Title>
        <Group mt="sm">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="light">Light</Button>
          <Button color="teal">Colored</Button>
          <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
            Gradient
          </Button>
          <Tooltip label="Tooltip">
            <Button variant="subtle">Tooltip Button</Button>
          </Tooltip>
        </Group>
      </Box>

      {/* Inputs */}
      <Box>
        <Title order={3}>Inputs</Title>
        <Group mt="sm" grow>
          <TextInput label="Text Input" placeholder="Enter text" />
          <NumberInput label="Number Input" placeholder="Enter number" />
          <Select
            label="Select Input"
            placeholder="Pick one"
            data={['Option 1', 'Option 2', 'Option 3']}
          />
        </Group>
        <Group mt="sm">
          <Checkbox label="Checkbox" />
          <Radio.Group name="radioGroup" label="Radio Group">
            <Radio value="option1" label="Option 1" />
            <Radio value="option2" label="Option 2" />
          </Radio.Group>
        </Group>
      </Box>

      {/* Data Display */}
      <Box>
        <Title order={3}>Data Display</Title>
        <Group mt="sm">
          <Badge color="pink" variant="light">
            Badge
          </Badge>
          <Avatar src="https://picsum.photos/100" alt="Avatar" radius="xl" />
          <Progress value={50} style={{ width: 200 }} />
        </Group>
        <Accordion mt="sm">
          <Accordion.Item value="item1">
            <Accordion.Control>Item 1</Accordion.Control>
            <Accordion.Panel>Content for item 1.</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item2">
            <Accordion.Control>Item 2</Accordion.Control>
            <Accordion.Panel>Content for item 2.</Accordion.Panel>
          </Accordion.Item>
        </Accordion>
        <Table mt="sm" highlightOnHover>
          <thead>
            <tr>
              <th>Element</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Row 1</td>
              <td>Details of row 1</td>
            </tr>
            <tr>
              <td>Row 2</td>
              <td>Details of row 2</td>
            </tr>
          </tbody>
        </Table>
      </Box>

      {/* Feedback */}
      <Box>
        <Title order={3}>Feedback</Title>
        <Alert icon={<IconAlertCircle size={16} />} title="Alert Title" color="red" mt="sm">
          This is an alert message.
        </Alert>
        <Button variant="outline" onClick={() => setNotificationOpened(true)} mt="sm">
          Show Notification
        </Button>
        {notificationOpened && (
          <Notification
            icon={<IconCheck size={18} />}
            color="teal"
            onClose={() => setNotificationOpened(false)}
            title="Notification Title"
            mt="sm"
          >
            This is a notification message.
          </Notification>
        )}
      </Box>

      {/* Overlays */}
      <Box>
        <Title order={3}>Overlays</Title>
        <Button onClick={() => setModalOpened(true)} mt="sm">
          Open Modal
        </Button>
        <Modal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          title="Modal Title"
          centered
        >
          <Text>This is modal content.</Text>
        </Modal>
      </Box>

      {/* Navigation */}
      <Box>
        <Title order={3}>Navigation</Title>
        <Breadcrumbs mt="sm">{breadcrumbsItems}</Breadcrumbs>
        <Tabs mt="sm" defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="tab1" pt="xs">
            Content for Tab 1
          </Tabs.Panel>

          <Tabs.Panel value="tab2" pt="xs">
            Content for Tab 2
          </Tabs.Panel>
        </Tabs>
        <Pagination total={5} mt="sm" />
      </Box>

      {/* Media */}
      <Box>
        <Title order={3}>Media</Title>
        <Image src="https://picsum.photos/600/300" alt="Random Image" radius="md" mt="sm" />
      </Box>
    </Stack>
  );
};

export default ComponentsShowcase;
