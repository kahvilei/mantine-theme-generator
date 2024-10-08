import React from 'react';
import { MantineProvider, Title, Text, Container, Stack, Button, TextInput, Checkbox, Select, Slider, Switch, Card, Badge, Group, ActionIcon, Tooltip, Accordion, Tabs, Notification, Progress } from '@mantine/core';
import { IconBellRinging, IconCheck, IconX } from '@tabler/icons-react';

const ComponentsShowcase = () => {
  return (
    <MantineProvider>
      <Container size="lg" p="md">
        <Title order={1} ta="center" mb="xl">Mantine 7 Components Demo</Title>

        <Stack gap="xl">
          <Section title="Typography">
            <Text>Default text</Text>
            <Text fw={700}>Bold text</Text>
            <Text fs="italic">Italic text</Text>
            <Text td="underline">Underlined text</Text>
            <Text size="xl" c="blue">Extra large blue text</Text>
          </Section>

          <Section title="Buttons">
            <Group>
              <Button>Default</Button>
              <Button variant="filled" c="green">Filled</Button>
              <Button variant="outline" c="red">Outline</Button>
              <Button variant="light" c="yellow">Light</Button>
            </Group>
          </Section>

          <Section title="Inputs">
            <Stack>
              <TextInput placeholder="Type something..." label="Text Input" />
              <Checkbox label="Check me" />
              <Select
                label="Select an option"
                placeholder="Pick one"
                data={['React', 'Vue', 'Angular']}
              />
            </Stack>
          </Section>

          <Section title="Slider and Switch">
            <Slider
              marks={[
                { value: 20, label: '20%' },
                { value: 50, label: '50%' },
                { value: 80, label: '80%' },
              ]}
              mb="md"
            />
            <Switch label="Toggle me" />
          </Section>

          <Section title="Card and Badge">
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section>
                <img
                  src="/api/placeholder/600/160"
                  height={160}
                  alt="Sample image"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Card Title</Text>
                <Badge c="pink" variant="light">Badge</Badge>
              </Group>

              <Text size="sm" c="dimmed">
                This is a sample card component from Mantine 7.
              </Text>

              <Button variant="light" c="blue" fullWidth mt="md" radius="md">
                Card Button
              </Button>
            </Card>
          </Section>

          <Section title="Action Icons and Tooltips">
            <Group>
              <Tooltip label="Notification">
                <ActionIcon variant="outline" c="blue" size="lg">
                  <IconBellRinging size="1.1rem" />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Success">
                <ActionIcon variant="outline" c="green" size="lg">
                  <IconCheck size="1.1rem" />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Error">
                <ActionIcon variant="outline" c="red" size="lg">
                  <IconX size="1.1rem" />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Section>

          <Section title="Accordion">
            <Accordion>
              <Accordion.Item value="customization">
                <Accordion.Control>Customization</Accordion.Control>
                <Accordion.Panel>Colors, fonts, shadows and many other parts are customizable to fit your design needs</Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="flexibility">
                <Accordion.Control>Flexibility</Accordion.Control>
                <Accordion.Panel>Configure components appearance and behavior with vast amount of settings or overwrite any part of component styles</Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Section>

          <Section title="Tabs">
            <Tabs defaultValue="gallery">
              <Tabs.List>
                <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
                <Tabs.Tab value="messages">Messages</Tabs.Tab>
                <Tabs.Tab value="settings">Settings</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="gallery" pt="xs">
                Gallery tab content
              </Tabs.Panel>
              <Tabs.Panel value="messages" pt="xs">
                Messages tab content
              </Tabs.Panel>
              <Tabs.Panel value="settings" pt="xs">
                Settings tab content
              </Tabs.Panel>
            </Tabs>
          </Section>

          <Section title="Notification">
            <Notification title="We notify you that">
              You are now obligated to give a star to Mantine project on GitHub
            </Notification>
          </Section>

          <Section title="Progress">
            <Progress value={50} animated mb="md" />
            <Progress value={75} c="green" size="xl" radius="xl" />
          </Section>
        </Stack>
      </Container>
    </MantineProvider>
  );
};



interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <Stack>
    <Title order={2}>{title}</Title>
    {children}
  </Stack>
);

export default ComponentsShowcase;