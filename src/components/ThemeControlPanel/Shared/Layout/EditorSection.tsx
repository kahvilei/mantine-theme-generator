import React from 'react';
import {Group, Stack, Title, TitleOrder} from '@mantine/core';
import classes from './EditorSection.module.css';

interface EditorSectionProps {
  label?: string;
  order?: TitleOrder;
  gap?: string;
  labelIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const EditorSection: React.FC<EditorSectionProps> = ({
  label,
  order,
  gap,
  labelIcon: icon,
  children,
}: EditorSectionProps) => {
  return (
    <Stack gap={gap??"md"} className={((order??4)<=4)?classes.section:classes.subSection}>
      {label && (
        <Group gap={5} align="start" className={((order??4)<=4)?classes.sectionLabel:classes.subSectionLabel}>
          {icon && icon}
          <Title order={order??4}>{label && label}</Title>
        </Group>
      )}
      {children}
    </Stack>
  );
};
interface EditorSubSectionProps {
  label?: string;
  children?: React.ReactNode
}
export const EditorSubSection:React.FC<EditorSubSectionProps> = ({label, children}: EditorSubSectionProps) => {
  return (
      <EditorSection order={5} gap="xs" label={label}>{children}</EditorSection>
  )
}

export default EditorSection;
