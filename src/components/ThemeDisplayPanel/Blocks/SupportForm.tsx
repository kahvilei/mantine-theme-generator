import { Button, Card, Fieldset, Group, Select, Spoiler, Stack, Text, TextInput, Textarea, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const supportForm: ThemeBlock = {
  id: 'support-form',
  title: 'blocks.supportForm.title',
  category: 'General',
  tags: ['Form', 'Fieldset', 'Textarea', 'Spoiler'],
  components: ['Button', 'Card', 'Fieldset', 'Group', 'Select', 'Spoiler', 'Stack', 'Text', 'TextInput', 'Textarea', 'Title'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const data = t('supportForm.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Stack gap="sm">
          <Title order={5}>{data.heading}</Title>

          <Fieldset legend={data.contactLegend}>
            <Stack gap="xs">
              <TextInput
                label={data.nameLabel}
                placeholder={data.namePlaceholder}
                size="sm"
              />
              <Textarea
                label={data.messageLabel}
                placeholder={data.messagePlaceholder}
                autosize
                minRows={3}
                size="sm"
              />
            </Stack>
          </Fieldset>

          <Fieldset legend={data.detailsLegend}>
            <Stack gap="xs">
              <Select
                label={data.topicLabel}
                data={data.topics}
                defaultValue="technical"
                size="sm"
              />
              <Spoiler maxHeight={30} showLabel={data.showMore} hideLabel={data.showLess}>
                <Text size="xs" c="dimmed">{data.policyText}</Text>
              </Spoiler>
            </Stack>
          </Fieldset>

          <Group justify="flex-end">
            <Button size="sm">{data.submitButton}</Button>
          </Group>
        </Stack>
      </Card>
    );
  },
};

export default supportForm;
