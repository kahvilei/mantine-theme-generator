import React from 'react';
import { Group, Stack, Text } from '@mantine/core';

const ShadeSelector: React.FC<{
  colors: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}> = ({ colors, selectedIndex, onSelect }) => {
  return (
    <Group
      gap={2}
      h={30}
      justify="stretch"
      align="stretch"
      wrap="nowrap"
      style={{ borderRadius: '5px' }}
    >
      {colors.map((color, index) => (
        <Stack
          key={index}
          bg={color}
          w="100%"
          align="center"
          justify="center"
          c="white"
          onClick={() => onSelect(index)}
          style={{
            cursor: 'pointer',
            border: index === selectedIndex ? `2px solid white` : '2px solid transparent',
            zIndex: index === selectedIndex ? 1 : 0,
            transition: 'transform 100ms',
            transform: index === selectedIndex ? 'scale(1.3)' : 'scale(1)',
            borderRadius:
              index === 0
                ? 'var(--mantine-radius-default) 0 0 var(--mantine-radius-default)'
                : index === colors.length - 1
                  ? '0 var(--mantine-radius-default) var(--mantine-radius-default) 0'
                  : '0',
          }}
        >
          {index === selectedIndex && <Text size='xs'>{index}</Text>}
        </Stack>
      ))}
    </Group>
  );
};

export default ShadeSelector;
