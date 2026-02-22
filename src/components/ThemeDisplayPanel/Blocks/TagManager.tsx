import { Button, Card, Group, Notification, Stack, TagsInput, Text, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const tagManager: ThemeBlock = {
  id: 'tag-manager',
  title: 'blocks.tagManager.title',
  category: 'General',
  tags: ['Tags', 'TagsInput', 'Notification'],
  components: ['Button', 'Card', 'Group', 'Notification', 'Stack', 'TagsInput', 'Text', 'Title'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const data = t('tagManager.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Stack gap="sm">
          <Title order={5}>{data.heading}</Title>
          <Text size="sm" c="dimmed">{data.description}</Text>

          <TagsInput
            label={data.tagsLabel}
            placeholder={data.placeholder}
            defaultValue={data.defaultTags}
          />

          <Notification
            title={data.notification.title}
            color="green"
            icon={<IconCheck size={16} />}
            withCloseButton={false}
          >
            {data.notification.body}
          </Notification>

          <Group justify="flex-end">
            <Button size="sm">{data.saveButton}</Button>
          </Group>
        </Stack>
      </Card>
    );
  },
};

export default tagManager;
