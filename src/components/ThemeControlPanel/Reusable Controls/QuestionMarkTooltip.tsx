import React from 'react';
import { Tooltip, ActionIcon } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';

interface QuestionMarkTooltipProps {
    description: string;
    color: string;
    }
export default function QuestionMarkTooltip({ description, color }: QuestionMarkTooltipProps) {
  return (
    <Tooltip label={description}>
                    <ActionIcon
                      c={color}
                      size={12}
                      radius={100}
                      bd={'1px solid'}
                      variant="outline"
                    >
                      <IconQuestionMark size={12} />
                    </ActionIcon>
                  </Tooltip>
    );
}