import { colors } from "@/data/Store";
import {ActionIcon, AspectRatio, Badge, Box, Button, Card, Center, Group, Paper, Rating,  Stack, Text, Title} from "@mantine/core";
import { IconHeart, IconPackage, IconShoppingCart} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ThemeBlock } from "../Blocks";

const productCard:ThemeBlock =  {
    id: 'product-card',
    title: 'blocks.productCard.title',
    tags: ['E-commerce', 'Product', 'Rating'],
    render: () => {
      const { t } = useTranslation(['blocks']);
      const product = t('productCard.data', { returnObjects: true }) as any;
      return (
        <Card>
        <Card.Section>
        <AspectRatio ratio={4/3}>
            <Box
              bg= {colors.gradient}
              style={{ position: 'relative' }}
            >
              <Group 
                style={{ position: 'absolute', top: 'var(--mantine-spacing-sm)', right: 'var(--mantine-spacing-sm)', zIndex: 10 }}
                gap="xs"
              >
                <ActionIcon variant="white" color="dark" size="sm">
                  <IconHeart size={14} />
                </ActionIcon>
                {product.discount && (
                  <Badge color="red" variant="filled">
                    -{product.discount}%
                  </Badge>
                )}
              </Group>
              <Center h="100%">
                <IconPackage size={60} color="white" />
              </Center>
            </Box>
          </AspectRatio>
        </Card.Section>
          
          <Stack pt={'sm'}>
            <div>
              <Group justify="space-between" mb={4}>
                <Title order={5}>{product.name}</Title>
                <Badge size="xs" variant="dot" color={product.inStock ? 'green' : 'red'}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </Badge>
              </Group>
              <Text size="xs" c="dimmed" lineClamp={2}>{product.description}</Text>
            </div>
            
            <Group gap="xs" align="center">
              <Rating value={product.rating} size="xs" readOnly />
              <Text size="xs" c="dimmed">({product.reviews})</Text>
            </Group>
            
            <Group justify="space-between" align="flex-end">
              <div>
                <Text size="xs" c="dimmed" td="line-through">
                  ${product.originalPrice}
                </Text>
                <Text size="lg" fw={700} c={colors.primaryColor}>
                  ${product.price}
                </Text>
              </div>
              <Button 
                size="sm" 
                leftSection={<IconShoppingCart size={14} />}
                color={colors.primaryColor}
              >
                Add to Cart
              </Button>
            </Group>
          </Stack>
        </Card>
      );
    },
  }
export default productCard;