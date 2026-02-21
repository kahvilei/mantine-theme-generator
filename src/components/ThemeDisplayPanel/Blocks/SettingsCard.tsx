import { Button, Card, Divider, Group, Select, Stack, Switch, Text, Title } from "@mantine/core";
import { ThemeBlock } from "../Blocks";

const settingsCard: ThemeBlock = {
  id: 'settings-card',
  title: 'blocks.settingsCard.title',
  category: 'General',
  tags: ['Settings', 'Form', 'Switch', 'Select'],
  components: ['Button', 'Card', 'Divider', 'Group', 'Select', 'Stack', 'Switch', 'Text', 'Title'],
  render: () => {
    return (
      <Card>
        <Stack gap="sm">
          <Title order={5}>Preferences</Title>
          <Divider />

          <Stack gap="md">
            <Group justify="space-between" wrap="nowrap">
              <div>
                <Text size="sm">Email notifications</Text>
                <Text size="xs" c="dimmed">Receive updates about your account</Text>
              </div>
              <Switch defaultChecked />
            </Group>

            <Group justify="space-between" wrap="nowrap">
              <div>
                <Text size="sm">Marketing emails</Text>
                <Text size="xs" c="dimmed">Tips, news, and promotions</Text>
              </div>
              <Switch />
            </Group>

            <Group justify="space-between" wrap="nowrap">
              <div>
                <Text size="sm">Activity digest</Text>
                <Text size="xs" c="dimmed">Weekly summary of your activity</Text>
              </div>
              <Switch defaultChecked />
            </Group>
          </Stack>

          <Divider />

          <Select
            label="Language"
            defaultValue="en"
            size="sm"
            data={[
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Español' },
              { value: 'fr', label: 'Français' },
              { value: 'de', label: 'Deutsch' },
            ]}
          />

          <Group justify="flex-end" gap="xs">
            <Button size="xs" variant="default">Cancel</Button>
            <Button size="xs">Save changes</Button>
          </Group>
        </Stack>
      </Card>
    );
  },
};

export default settingsCard;
