import React from 'react';
import { Box, Paper, Stack, Text } from '@mantine/core';
import NumberUnitSelector, {
  NumberUnitSelectorProps,
} from '@/components/ThemeControlPanel/Shared/Input/NumberUnitSelector';

interface NumberUnitSelectorListProps {
  list: Array<NumberUnitSelectorProps>;
  selector: (value: string | number) => string;
  onChange: (value: string | number) => void;
}

export const NumberUnitSelectorList: React.FC<NumberUnitSelectorListProps> = ({
  list,
  selector,
  onChange,
}) => {
  return (
    <Box>
      <Text size="sm">Radius settings</Text>
      <Paper withBorder p="sm">
        <Stack>
          {list.map((element) => (
            <NumberUnitSelector
              key={element.label}
              label={element.label}
              value={
                selector(element.label ?? '')
              }
              onChange={(value:string) => onChange(value)}
              min={element.min ?? 0}
              max={element.max ?? 100}
            />
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};
