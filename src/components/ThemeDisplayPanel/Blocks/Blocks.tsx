// themeBlocks.tsx
import React from 'react';
import { Box } from '@mantine/core';

export interface ThemeBlock {
  id: string;
  title: string;
  tags: string[];
  render: React.ReactNode;
}

export const themeBlocks: ThemeBlock[] = [
  {
    id: 'typography-sample',
    title: 'Typography Demo',
    tags: ['Text', 'Heading', 'Typography'],
    render: (
      <Box>
        <h1>Heading One</h1>
        <p>Some body text to show styles.</p>
      </Box>
    ),
  },
  {
    id: 'card-sample',
    title: 'Card + Button Demo',
    tags: ['Card', 'Button', 'Group'],
    render: (
      <Box>
        <div style={{ padding: 16, border: '1px solid var(--mantine-color-gray-3)', borderRadius: 4 }}>
          <p>Card content</p>
          <button>Click me</button>
        </div>
      </Box>
    ),
  },
  {
    id: 'form-inputs',
    title: 'Form Inputs Demo',
    tags: ['TextInput', 'Checkbox', 'Select'],
    render: (
      <Box>
        <label>
          Name:
          <input type="text" placeholder="Your name" />
        </label>
        <label>
          Accept:
          <input type="checkbox" />
        </label>
      </Box>
    ),
  },
];
