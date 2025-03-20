import {
    Anchor,
    Blockquote,
    Box,
    Card,
    Code,
    Group,
    Kbd,
    Mark,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    Title
} from "@mantine/core";

export interface TypographyInterface {
    theme: Record<string, any>;
}

export const Typography = ({theme}:TypographyInterface) =>{
    return (
    <Stack gap="xl">
        <Card p="lg">
        <Stack gap="md">
        <Title order={2}>Typography</Title>
    <Text>Font families, sizes, and styles defined in your theme</Text>

    <Paper  p="lg">
        <Stack>
            <Title order={1}>Heading 1</Title>
            <Title order={2}>Heading 2</Title>
            <Title order={3}>Heading 3</Title>
            <Title order={4}>Heading 4</Title>
            <Title order={5}>Heading 5</Title>
            <Title order={6}>Heading 6</Title>
        </Stack>
    </Paper>

    <Paper p="lg">
        <Stack>
            <Text size="xl">Text Extra Large</Text>
            <Text size="lg">Text Large</Text>
            <Text size="md">Text Medium (Default)</Text>
            <Text size="sm">Text Small</Text>
            <Text size="xs">Text Extra Small</Text>
        </Stack>
    </Paper>

    <Paper p="lg">
        <Stack>
            <Text fw={900}>Font Weight 900</Text>
            <Text fw={700}>Font Weight 700</Text>
            <Text fw={600}>Font Weight 600</Text>
            <Text fw={500}>Font Weight 500</Text>
            <Text fw={400}>Font Weight 400 (Default)</Text>
            <Text fw={300}>Font Weight 300</Text>
        </Stack>
    </Paper>

    <SimpleGrid cols={2}>
        <Box>
            <Text fw={500} mb="xs">Special Text Styles</Text>
            <Paper p="lg">
                <Stack>
                    <Blockquote cite="— Famous Designer">
                        Design is not just what it looks like and feels like. Design is how it works.
                    </Blockquote>
                    <Code>const theme = useMantineTheme();</Code>
                    <Kbd>Ctrl + K</Kbd>
                    <Text>Text with <Mark>highlighted</Mark> content</Text>
                    <Anchor href="#">Clickable link</Anchor>
                </Stack>
            </Paper>
        </Box>

        <Box>
            <Text fw={500} mb="xs">Font Family</Text>
            <Paper p="lg">
                <Stack>
                    <Group>
                        <Text fw={500}>Default:</Text>
                        <Code>{theme.fontFamily}</Code>
                    </Group>
                    <Group>
                        <Text fw={500}>Headings:</Text>
                        <Code>{theme.headings?.fontFamily || theme.fontFamily}</Code>
                    </Group>
                    <Group>
                        <Text fw={500}>Monospace:</Text>
                        <Code>{theme.fontFamilyMonospace}</Code>
                    </Group>
                </Stack>
            </Paper>
        </Box>
    </SimpleGrid>
</Stack>
</Card>
</Stack>)
}