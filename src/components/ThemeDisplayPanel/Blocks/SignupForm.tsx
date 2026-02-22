import { Button, Card, Checkbox, Divider, PasswordInput, Radio, Select, Stack, Text, TextInput, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const signupForm: ThemeBlock = {
  id: 'signup-form',
  title: 'blocks.signupForm.title',
  category: 'General',
  tags: ['Form', 'Inputs', 'Auth'],
  components: ['Button', 'Card', 'Checkbox', 'Divider', 'PasswordInput', 'Radio', 'Select', 'Stack', 'Text', 'TextInput', 'Title'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const data = t('signupForm.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Stack gap="sm">
          <Title order={5}>{data.heading}</Title>

          <TextInput
            label={data.nameLabel}
            placeholder={data.namePlaceholder}
            size="sm"
          />

          <TextInput
            label={data.emailLabel}
            placeholder={data.emailPlaceholder}
            size="sm"
          />

          <PasswordInput
            label={data.passwordLabel}
            placeholder="••••••••"
            size="sm"
          />

          <Select
            label={data.roleLabel}
            data={data.roles}
            defaultValue="developer"
            size="sm"
          />

          <Radio.Group label={data.planLabel} defaultValue="free">
            <Stack gap="xs" mt="xs">
              {data.plans.map((plan: any) => (
                <Radio key={plan.value} value={plan.value} label={plan.label} size="sm" />
              ))}
            </Stack>
          </Radio.Group>

          <Checkbox label={data.termsLabel} size="sm" />

          <Divider label={data.dividerLabel} labelPosition="center" my="xs" />

          <Button fullWidth>{data.submitButton}</Button>

          <Text size="xs" c="dimmed" ta="center">{data.signInPrompt}</Text>
        </Stack>
      </Card>
    );
  },
};

export default signupForm;
