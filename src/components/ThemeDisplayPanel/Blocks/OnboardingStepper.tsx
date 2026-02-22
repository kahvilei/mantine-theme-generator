import { Badge, Button, Card, Group, Stack, Stepper, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const onboardingStepper: ThemeBlock = {
  id: 'onboarding-stepper',
  title: 'blocks.onboardingStepper.title',
  category: 'General',
  tags: ['Stepper', 'Onboarding', 'Wizard'],
  colSpan: 2,
  components: ['Badge', 'Button', 'Card', 'Group', 'Stack', 'Stepper', 'Text', 'Title'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const data = t('onboardingStepper.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Title order={5}>{data.heading}</Title>
            <Badge size="sm">{data.stepCounter}</Badge>
          </Group>

          <Stepper active={data.activeStep} size="sm">
            {data.steps.map((step: any) => (
              <Stepper.Step key={step.label} label={step.label} description={step.description} />
            ))}
          </Stepper>

          <Card withBorder p="md">
            <Stack gap="xs">
              <Title order={6}>{data.stepContent.heading}</Title>
              <Text size="sm" c="dimmed">{data.stepContent.body}</Text>
            </Stack>
          </Card>

          <Group justify="flex-end" gap="xs">
            <Button size="sm">{data.back}</Button>
            <Button size="sm">{data.continue}</Button>
          </Group>
        </Stack>
      </Card>
    );
  },
};

export default onboardingStepper;
