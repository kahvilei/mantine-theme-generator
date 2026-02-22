import { Accordion, Badge, Card, Group, Stack, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const faqAccordion: ThemeBlock = {
  id: 'faq-accordion',
  title: 'blocks.faqAccordion.title',
  category: 'General',
  tags: ['FAQ', 'Accordion', 'Content'],
  components: ['Accordion', 'Badge', 'Card', 'Group', 'Stack', 'Text', 'Title'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const data = t('faqAccordion.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Stack gap="sm">
          <Group justify="space-between" align="center">
            <Title order={5}>{data.heading}</Title>
            <Badge size="sm">{data.badge}</Badge>
          </Group>

          <Accordion defaultValue={data.items[0]?.id}>
            {data.items.map((item: any) => (
              <Accordion.Item key={item.id} value={item.id}>
                <Accordion.Control>
                  <Text size="sm" fw={500}>{item.question}</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Text size="sm" c="dimmed">{item.answer}</Text>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Stack>
      </Card>
    );
  },
};

export default faqAccordion;
