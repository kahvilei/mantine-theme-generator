import React, { useEffect, useState } from 'react';
import { Group, NumberInput, Card, Select, Text } from '@mantine/core';

interface NumberUnitSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  step?: number
  hasUnits?: boolean;
  min?: number;
  max?: number;
}

import classes from './NumberUnitSelector.module.css';

const NumberUnitSelector: React.FC<NumberUnitSelectorProps> = ({
  value,
  onChange,
  step = undefined,
  label,
  hasUnits = true,
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

  const parseValue = (value: string) => {
    const match = value.match(/^([-\d.]+)(\D+)?$/);
    return {
      number: match ? parseFloat(match[1]) : 0,
      unit: hasUnits ? (match?.[2] || 'px') : '',
    };
  };

  const defaultParsed = parseValue(value);
  const [numberValue, setNumberValue] = useState(defaultParsed.number);
  const [unitValue, setUnitValue] = useState(defaultParsed.unit);
  const [dynamicStep, setDynamicStep] = useState(1);



  useEffect(() => {
    onChange(hasUnits ? `${numberValue}${unitValue}` : `${numberValue}`);
    if (step == undefined) {
      if (unitValue === 'px') {
        setDynamicStep(1);
      } else if (unitValue === 'rem') {
        setDynamicStep(0.1);
      } else if (unitValue === 'em') {
        setDynamicStep(0.1);
      } else if (unitValue === '%') {
        setDynamicStep(1);
      } else if (unitValue === 'vh') {
        setDynamicStep(1);
      } else if (unitValue === 'vw') {
        setDynamicStep(1);
      }
    }
  }, [numberValue, unitValue, hasUnits]);

  return (
    <Card p='xs' className={classes.numberUnitSelector}>
      <Group align="center" wrap='nowrap'>
        <Text w={'150px'}>{label}</Text>
        <NumberInput
          value={numberValue}
          onChange={(value) => setNumberValue(value as number || 0)}
          min={min}
          max={max}
          w={hasUnits ? '30%' : '60%'}
          step={step || dynamicStep}
        />
        {hasUnits && (
          <Select
            data={cssUnits}
            w={'30%'}
            value={unitValue}
            onChange={(value) => setUnitValue(value || 'px')}
          />
        )}
      </Group>
    </Card>
  );
};

export default NumberUnitSelector;