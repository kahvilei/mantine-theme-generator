import { colors } from "@/data/Store";
import { ActionIcon, AspectRatio, Badge, Box, Button, Card, Group, Loader, Paper, Progress, Stack, Text, ThemeIcon, Timeline } from "@mantine/core";
import { IconBell, IconCheck, IconCreditCard, IconSettings, IconX} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const paymentMethod:ThemeBlock = {
    id: 'payment-card',
    title: 'blocks.paymentCard.title',
    tags: ['Payment', 'Finance', 'Card'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const payment = t('paymentCard.data', { returnObjects: true }) as any;
      return (
        <Card

          style={{
            background: `linear-gradient(135deg, var(--mantine-color-dark-9) 0%, var(--mantine-color-dark-7) 100%)`,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
            <AspectRatio ratio={5/1}>
                <Box 
                    style={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)'
                    }}
                />
          
                <Group justify="space-between" mb="xl">
                    <IconCreditCard size={32} color="white" />
                    <Badge variant="white" color="dark">
                    {payment.type}
                    </Badge>
                </Group>
          
                <Stack gap="lg">
                    <Text 
                    size="lg" 
                    fw={500} 
                    c="white" 
                    style={{ letterSpacing: 2, fontFamily: 'monospace' }}
                    >
                    •••• •••• •••• {payment.last4}
                    </Text>
                    
                    <Group justify="space-between">
                    <div>
                        <Text size="xs" c="white" opacity={0.7}>
                        Card Holder
                        </Text>
                        <Text size="sm" c="white" fw={600}>
                        {payment.holder}
                        </Text>
                    </div>
                    <div>
                        <Text size="xs" c="white" opacity={0.7}>
                        Expires
                        </Text>
                        <Text size="sm" c="white" fw={600}>
                        {payment.expiry}
                        </Text>
                    </div>
                    </Group>
                </Stack>
            </AspectRatio>
        </Card>
      );
    },
  }
export default paymentMethod;