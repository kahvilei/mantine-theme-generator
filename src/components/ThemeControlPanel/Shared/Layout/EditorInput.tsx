import React from 'react';
import { Group, Stack } from '@mantine/core';

interface EditorInputProps {
  label?: string;
  labelIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const EditorInput: React.FC<EditorInputProps> = ({
  label,
  labelIcon: icon,
  children,
}: EditorInputProps) => {
  return (
    <Stack gap={3}>
      {label && (
        <Group gap={5}>
          {icon && icon}
          {label && label}
        </Group>
      )}
      {children}
    </Stack>
  );
};

export default EditorInput;
