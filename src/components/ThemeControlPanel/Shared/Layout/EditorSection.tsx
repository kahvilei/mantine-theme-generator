import React from 'react';
import {Group, Stack, Title} from '@mantine/core';


interface EditorSectionProps {
  label?: string;
  labelIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const EditorSection: React.FC<EditorSectionProps> = ({
  label,
  labelIcon: icon,
  children,
}: EditorSectionProps) => {

  return (
    <Stack  gap="sm">
      {label && (
        <Group gap={5} align="start">
          {icon && icon}
          <Title order={4}>{label && label}</Title>
        </Group>
      )}
      {children}
    </Stack>
  );
};

export default EditorSection;
