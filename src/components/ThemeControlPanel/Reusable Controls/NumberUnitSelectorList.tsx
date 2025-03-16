import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Paper, Stack, Text } from '@mantine/core';
import { RootState } from '@/main';
import NumberUnitSelector, {
  NumberUnitSelectorProps,
} from '@/components/ThemeControlPanel/Reusable Controls/NumberUnitSelector';

interface NumberUnitSelectorListProps {
  list: Array<NumberUnitSelectorProps>;
  selector: (state: RootState, value: string | number) => string;
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
      <Paper withBorder p={'sm'}>
        <Stack>
          {list.map((element) => (
            <NumberUnitSelector
              key={element.label}
              label={element.label}
              value={
                useSelector((state: RootState) => selector(state, element.label ?? '')) || '0px'
              }
              onChange={(value) => onChange(value)}
              min={element.min ?? 0}
              max={element.max ?? 100}
            />
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};
