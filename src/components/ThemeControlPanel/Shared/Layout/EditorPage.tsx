import React from 'react';
import { Stack, Title } from '@mantine/core';

interface EditorPageProps {
  children?: React.ReactNode;
  title?: string;
}

const EditorPage: React.FC<EditorPageProps> = ({ children, title }) => {
  return (
    <Stack p={'lg'} gap="xl">
      {title && <Title order={3}>{title}</Title>}
      {children}
    </Stack>
  );
};

export default EditorPage;
