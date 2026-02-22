import { Button, Card, PinInput, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconShieldCheck } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const otpVerification: ThemeBlock = {
  id: 'otp-verification',
  title: 'blocks.otpVerification.title',
  category: 'General',
  tags: ['Auth', 'PinInput', '2FA', 'Verification'],
  components: ['Button', 'Card', 'PinInput', 'Stack', 'Text', 'ThemeIcon', 'Title'],
  render: () => {
    const { t } = useTranslation(['blocks']);
    const data = t('otpVerification.data', { returnObjects: true }) as any;
    return (
      <Card>
        <Stack gap="md" align="center">
          <ThemeIcon size="xl" radius="xl">
            <IconShieldCheck size={22} />
          </ThemeIcon>

          <Stack gap={4} align="center">
            <Title order={5}>{data.heading}</Title>
            <Text size="sm" c="dimmed" ta="center" maw={260}>
              {data.description}
            </Text>
          </Stack>

          <PinInput length={6} />

          <Button fullWidth>{data.verifyButton}</Button>

          <Text size="xs" c="dimmed">{data.resendPrompt}</Text>
        </Stack>
      </Card>
    );
  },
};

export default otpVerification;
