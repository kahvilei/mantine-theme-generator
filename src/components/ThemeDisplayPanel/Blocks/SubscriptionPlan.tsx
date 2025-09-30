import { colors } from "@/data/Store";
import { Badge, Button, Card, Group, Stack, Text, ThemeIcon} from "@mantine/core";
import { IconCheck, IconX} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const subscriptionPlan:ThemeBlock =  {
    id: 'subscription-plan',
    title: 'blocks.subscriptionPlan.title',
    category: 'E-commerce',
    tags: ['Pricing', 'Features', 'CTA'],
    components: [ 'Badge', 'Button', 'Card', 'Group', 'Stack', 'Text', 'ThemeIcon' ],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const plan = t('subscriptionPlan.data', { returnObjects: true }) as any;
      return (
        <Card
          style={{
            borderWidth: 2,
            borderColor: plan.featured ? `var(--mantine-color-${colors.primaryColor}-5)` : undefined
          }}
        >
          {plan.featured && (
            <Card.Section p="xs" bg={`${colors.primaryColor}.5`}>
              <Text size="xs" fw={700} c="white" ta="center" tt="uppercase">
                Most Popular
              </Text>
            </Card.Section>
          )}
          
          <Stack pt={'sm'}>
            <div style={{ textAlign: 'center' }}>
              <Badge size="sm" variant="light" color={colors.primaryColor} mb="xs">
                {plan.type}
              </Badge>
              <Text size="xl" fw={800}>{plan.name}</Text>
              <Group gap={0} justify="center" align="baseline" mt="xs">
                <Text size="xs" c="dimmed">$</Text>
                <Text size="2rem" fw={900} lh={1}>{plan.price}</Text>
                <Text size="sm" c="dimmed">/month</Text>
              </Group>
            </div>
            
            <Stack gap="xs">
              {plan.features.map((feature: any) => (
                <Group key={feature.text} gap="xs">
                  <ThemeIcon 
                    size="xs" 
                    color={feature.included ? 'green' : 'gray'} 
                    variant="filled"
                  >
                    {feature.included ? <IconCheck size={10} /> : <IconX size={10} />}
                  </ThemeIcon>
                  <Text 
                    size="sm" 
                    c={feature.included ? undefined : 'dimmed'}
                    td={!feature.included ? 'line-through' : undefined}
                  >
                    {feature.text}
                  </Text>
                </Group>
              ))}
            </Stack>
            
            <Button 
              fullWidth 
              size="md" 
              color={colors.primaryColor}
              variant={plan.featured ? 'filled' : 'light'}
            >
              {plan.cta}
            </Button>
            
            <Text size="xs" c="dimmed" ta="center">
              {plan.trial} day free trial
            </Text>
          </Stack>
        </Card>
      );
    },
  }
export default subscriptionPlan;