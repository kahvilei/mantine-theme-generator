import React from 'react';
import {
  Text,
  Title,
  Container,
  Stack,
  Group,
  Avatar,
  Paper,
  Image,
  Divider,
  Button,
  ActionIcon,
  Badge,
  Card,
  Blockquote,
  List,
  ThemeIcon,
  Anchor,
  Space,
  ScrollArea,
  Tooltip
} from '@mantine/core';
import {
  IconShare,
  IconBookmark,
  IconHeart,
  IconMessageCircle,
  IconDots,
  IconClock,
  IconEye,
  IconCheck,
  IconLink
} from '@tabler/icons-react';

const ArticleDemo = () => {
  return (
    <Container size="md">
      <Stack>
        {/* Article Header */}
        <Badge size="lg" radius="xl">Technology</Badge>
        
        <Title order={1}>The Future of Web Development: A Deep Dive into Modern Frameworks</Title>
        
        <Group justify="space-between">
          <Group>
            <Avatar size="md" radius="xl" src="https://picsum.photos/200">JD</Avatar>
            <Stack gap={0}>
              <Text size="sm" fw={500}>John Doe</Text>
              <Group gap="xs">
                <IconClock size={14} />
                <Text size="xs" c="dimmed">Published 2 days ago</Text>
                <Text size="xs" c="dimmed">·</Text>
                <Text size="xs" c="dimmed">8 min read</Text>
              </Group>
            </Stack>
          </Group>
          
          <Group>
            <Tooltip label="Share">
              <ActionIcon ><IconShare size={'md'} /></ActionIcon>
            </Tooltip>
            <Tooltip label="Bookmark">
              <ActionIcon><IconBookmark size={'md'} /></ActionIcon>
            </Tooltip>
            <ActionIcon ><IconDots size={'md'} /></ActionIcon>
          </Group>
        </Group>

        {/* Hero Image */}
        <Paper radius="md">
          <Image
            h={400}
            src="https://picsum.photos/800/400"
            alt="Article hero image"
          />
        </Paper>

        {/* Table of Contents */}
        <Card>
          <Stack>
            <Text>Table of Contents</Text>
            <List spacing="xs" size="sm">
              <List.Item>Introduction to Modern Frameworks</List.Item>
              <List.Item>The Evolution of Frontend Development</List.Item>
              <List.Item>Key Features and Considerations</List.Item>
              <List.Item>Performance Implications</List.Item>
              <List.Item>Future Predictions</List.Item>
            </List>
          </Stack>
        </Card>

        {/* Article Content */}
        <Stack>
          <Title order={2}>Introduction to Modern Frameworks</Title>
          <Text>
            The landscape of web development has evolved dramatically over the past decade. 
            Modern frameworks have revolutionized how we build and maintain web applications, 
            introducing new paradigms and methodologies that enhance both developer experience 
            and application performance.
          </Text>

          <Blockquote cite="- Sarah Johnson, Tech Lead at WebDev Inc">
            The most significant shift in modern web development has been the move towards 
            component-based architecture and declarative UI patterns.
          </Blockquote>

          <Title order={2}>Key Features and Considerations</Title>
          <List>
            <List.Item icon={
              <ThemeIcon size={'md'} radius="xl" >
                <IconCheck size={'sm'} />
              </ThemeIcon>
            }>
              Component-based architecture for better code organization
            </List.Item>
            <List.Item icon={
              <ThemeIcon size={'md'} radius="xl" >
                <IconCheck size={'sm'} />
              </ThemeIcon>
            }>
              Virtual DOM for improved performance
            </List.Item>
            <List.Item icon={
              <ThemeIcon size={'md'} radius="xl" >
                <IconCheck size={'sm'} />
              </ThemeIcon>
            }>
              Built-in state management solutions
            </List.Item>
          </List>

          <Card >
            <Text size="sm">Pro Tip</Text>
            <Text size="sm">
              When choosing a framework, consider your team's expertise, project requirements,
              and long-term maintenance needs.
            </Text>
          </Card>

          {/* Code Example */}
          <Paper>
            <Text ff="monospace" size="sm">
              {`const MyComponent = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`}
            </Text>
          </Paper>
        </Stack>

        {/* Article Footer */}
        <Divider />
        
        <Group>
          <Group>
            <Button variant="subtle" leftSection={<IconHeart size={20} />}>
              124 Likes
            </Button>
            <Button variant="subtle" leftSection={<IconMessageCircle size={20} />}>
              23 Comments
            </Button>
          </Group>
          <Group ml="auto">
            <IconEye size={20} />
            <Text size="sm">1.2k Views</Text>
          </Group>
        </Group>

        {/* Author Bio */}
        <Card>
          <Group>
            <Avatar size="xl" radius="xl" src="https://picsum.photos/200">JD</Avatar>
            <Stack gap="xs">
              <Group>
                <Text fw={500}>John Doe</Text>
                <Badge >Author</Badge>
              </Group>
              <Text size="sm">
                Senior Software Engineer with 10+ years of experience in web development.
                Passionate about modern frameworks and building scalable applications.
              </Text>
              <Group>
                <Button variant="light" size="xs">Follow</Button>
                <Button variant="subtle" size="xs">View Profile</Button>
              </Group>
            </Stack>
          </Group>
        </Card>

        {/* Related Articles */}
        <Title order={3}>Related Articles</Title>
        <ScrollArea>
          <Group>
            {[1, 2, 3].map((i) => (
              <Card key={i} w={300}>
                <Card.Section>
                  <Image
                    h={160}
                    src={`https://picsum.photos/300/160?random=${i}`}
                    alt="Related article image"
                  />
                </Card.Section>
                <Stack mt="md">
                  <Badge w="fit-content">Technology</Badge>
                  <Text fw={500}>Understanding State Management in Modern Web Apps</Text>
                  <Group>
                    <Avatar size="sm" >JD</Avatar>
                    <Text size="sm" c="dimmed">John Doe</Text>
                  </Group>
                </Stack>
              </Card>
            ))}
          </Group>
        </ScrollArea>

        {/* Comments Section Preview */}
        <Card>
          <Stack>
            <Group justify="space-between">
              <Text fw={500}>Comments (23)</Text>
              <Button variant="light">View All</Button>
            </Group>
            
            <Paper p="md">
              <Stack>
                <Group>
                  <Avatar>AS</Avatar>
                  <Stack gap={0}>
                    <Text size="sm" fw={500}>Alice Smith</Text>
                    <Text size="xs" c="dimmed">2 hours ago</Text>
                  </Stack>
                </Group>
                <Text size="sm">
                  Great article! The comparison between different frameworks was particularly helpful.
                  Looking forward to more content like this.
                </Text>
                <Group>
                  <Button variant="subtle" size="xs" leftSection={<IconHeart size={16} />}>
                    12
                  </Button>
                  <Button variant="subtle" size="xs" leftSection={<IconMessageCircle size={16} />}>
                    Reply
                  </Button>
                </Group>
              </Stack>
            </Paper>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};

export default ArticleDemo;