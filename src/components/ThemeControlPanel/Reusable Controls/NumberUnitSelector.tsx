import React, { useEffect, useState } from 'react';
import { Group, NumberInput, Card, Select, Text } from '@mantine/core';

interface NumberUnitSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  min?: number;
  max?: number;
}

import classes from './NumberUnitSelector.module.css';

const NumberUnitSelector: React.FC<NumberUnitSelectorProps> = ({
  value,
  onChange,
  label,
  min = 0,
  max = 1000,
}) => {
  const cssUnits = [
    { value: 'px', label: 'px' },
    { value: 'rem', label: 'rem' },
    { value: 'em', label: 'em' },
    { value: '%', label: '%' },
    { value: 'vh', label: 'vh' },
    { value: 'vw', label: 'vw' },
  ];

  // Parse default value into number and unit
  const parseValue = (value: string) => {
    const match = value.match(/^([-\d.]+)(\D+)$/);
    return {
      number: match ? parseFloat(match[1]) : 0,
      unit: match ? match[2] : 'px',
    };
  };

  const defaultParsed = parseValue(value);
  const [numberValue, setNumberValue] = useState(defaultParsed.number);
  const [unitValue, setUnitValue] = useState(defaultParsed.unit);

  useEffect(() => {
    onChange(`${numberValue}${unitValue}`);
  }, [numberValue, unitValue]);

  return (
    <Card p='xs' className={classes.numberUnitSelector}>
    <Group align="center" wrap='nowrap'>
      <Text w={'150px'}>{label}</Text>
      <NumberInput
        value={numberValue}
        onChange={(value) => setNumberValue(value as number || 0)}
        min={min}
        max={max}
        w={'30%'}
        step={unitValue === 'rem' || unitValue === 'em' ? 0.1 : 1}
      />
      <Select
        data={cssUnits}
        w={'30%'}
        value={unitValue}
        onChange={(value) => setUnitValue(value || 'px')}
      />
    </Group>
    </Card>
  );
};

export default NumberUnitSelector;