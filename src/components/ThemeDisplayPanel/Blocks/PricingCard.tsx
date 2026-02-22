import { Badge, Button, Card, Divider, Group, List, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const pricingCard: ThemeBlock = {
  id: 'pricing-card',
  title: 'blocks.pricingCard.title',
  category: 'General',
  tags: ['Pricing', 'List', 'CTA'],
  components: ['Badge', 'Button', 'Card', 'Divider', 'Group', 'List', 'Stack', 'Text', 'ThemeIcon', 'Title'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const data = t('pricingCard.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Stack gap="sm">
          <Group justify="space-between" align="flex-start">
            <Title order={4}>{data.planName}</Title>
            <Badge size="sm">{data.badge}</Badge>
          </Group>

          <div>
            <Group align="baseline" gap={4}>
              <Text fw={800} size="2rem" lh={1}>{data.price}</Text>
              <Text size="sm" c="dimmed">{data.period}</Text>
            </Group>
            <Text size="sm" c="dimmed" mt={4}>{data.description}</Text>
          </div>

          <Divider />

          <List
            spacing="xs"
            size="sm"
            icon={
              <ThemeIcon size={18} radius="xl" color="green">
                <IconCheck size={11} />
              </ThemeIcon>
            }
          >
            {data.features.map((feature: string) => (
              <List.Item key={feature}>{feature}</List.Item>
            ))}
          </List>

          <Button fullWidth mt="xs">{data.cta}</Button>
          <Text size="xs" c="dimmed" ta="center">{data.footerNote}</Text>
        </Stack>
      </Card>
    );
  },
};

export default pricingCard;
