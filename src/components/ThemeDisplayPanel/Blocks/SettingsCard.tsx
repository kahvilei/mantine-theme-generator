import React from "react";
import { Button, Card, Divider, Group, Select, Stack, Switch, Text, ThemeIcon, Title } from "@mantine/core";
import { IconBell, IconCalendar, IconMail } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const settingIcons: React.ReactNode[] = [
  <IconBell size={14} />,
  <IconMail size={14} />,
  <IconCalendar size={14} />,
];

const settingsCard: ThemeBlock = {
  id: 'settings-card',
  title: 'blocks.settingsCard.title',
  category: 'General',
  tags: ['Settings', 'Form', 'Switch', 'Select'],
  components: ['Button', 'Card', 'Divider', 'Group', 'Select', 'Stack', 'Switch', 'Text', 'ThemeIcon', 'Title'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const data = t('settingsCard.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Stack gap="sm">
          <Title order={5}>{data.heading}</Title>
          <Divider />

          <Text size="xs" fw={600} c="dimmed" tt="uppercase" lts={0.5}>
            {data.notificationsSection}
          </Text>

          <Stack gap="md">
            {data.settings.map((setting: any, idx: number) => (
              <Group key={setting.label} justify="space-between" wrap="nowrap">
                <Group gap="sm" wrap="nowrap">
                  <ThemeIcon size="sm" variant="light" color="gray" radius="sm">
                    {settingIcons[idx]}
                  </ThemeIcon>
                  <div>
                    <Text size="sm">{setting.label}</Text>
                    <Text size="xs" c="dimmed">{setting.description}</Text>
                  </div>
                </Group>
                <Switch defaultChecked={setting.defaultChecked} />
              </Group>
            ))}
          </Stack>

          <Divider />

          <Select
            label={data.languageLabel}
            defaultValue="en"
            size="sm"
            data={data.languages}
          />

          <Group justify="flex-end" gap="xs">
            <Button size="xs" variant="default">{data.cancel}</Button>
            <Button size="xs">{data.save}</Button>
          </Group>
        </Stack>
      </Card>
    );
  },
};

export default settingsCard;
