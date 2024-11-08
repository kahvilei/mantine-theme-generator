import React from 'react';
import { Group, Text, Select, ColorInput, Switch, NumberInput, TextInput, ActionIcon, Card, Autocomplete, STYlE_PROPS_DATA } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { COMMON_CSS_SELECTORS, COMMON_STYLE_PROPS } from './componentPropDefinitions';
import { PropValue } from './componentPropDefinitions';
import { getPropInputType, getMantineComponentProps } from './componentPropDefinitions';
import GroupedColorSelector from '../Reusable Controls/GroupedColorSelector';


const ComponentPropertyEditor: React.FC<{
    componentName: string;
    propKey: string;
    propValue: PropValue;
    propDef: unknown;
    onChange: (value: PropValue) => void;
    onRemove: () => void;
  }> = ({ componentName, propKey, propValue, propDef, onChange, onRemove }) => {
    const inputType = getPropInputType(propDef);
  
    return (
        <Card radius="sm" padding="xs" withBorder >
      <Group justify='space-between' align='center' wrap='nowrap'>
        <Text size="sm" w={100}>{propKey}:</Text>
        <Group gap="xs" align="center" wrap='nowrap'>
        {inputType === 'select' && (
          <Select
            size="xs"
            value={propValue.toString()}
            data={propDef as string[]}
            onChange={(val) => onChange(val || '')}
          />
        )}
        {inputType === 'color' && (
          <GroupedColorSelector
          mainColor={{name:propValue.toString()}}
            onSelect={(val) => onChange(val)}
           />
        )}
        {inputType === 'boolean' && (
          <Switch
            size="xs"
            checked={Boolean(propValue)}
            onChange={(event) => onChange(event.currentTarget.checked)}
          />
        )}
        {inputType === 'number' && (
          <NumberInput
            size="xs"
            value={Number(propValue)}
            onChange={(val) => onChange(val || 0)}
          />
        )}
        {inputType === 'text' && (
          <TextInput
            size="xs"
            value={propValue.toString()}
            onChange={(event) => onChange(event.currentTarget.value)}
          />
        )}
        <ActionIcon color="red" onClick={onRemove}>
          <IconTrash size={16} />
        </ActionIcon>
        </Group>
      </Group>
        </Card>
    );
  };

  export default ComponentPropertyEditor;
  
  export const AddPropertyButton: React.FC<{
    componentName: string;
    availableProps: Record<string, unknown>;
    currentProps: Record<string, PropValue>;
    onAdd: (key: string) => void;
  }> = ({ componentName, currentProps, onAdd }) => {

    //get the available props from the mantine component
    const availableProps = getMantineComponentProps(componentName) || null;

    if (!availableProps) {
      return null;
    }

    //filter out the props that are already in the currentProps
    const propMapped = Object.keys(availableProps).filter(prop => !(prop in currentProps));

    const stylePropsMapped = Object.keys(STYlE_PROPS_DATA).filter(prop => !(prop in currentProps));

    return (
        <Select
            size="xs"
            placeholder="Add property"
            data={[
                { group: 'Component Props', items: propMapped },
                { group: 'Style Props', items: stylePropsMapped }
            ]}
            variant='filled'
            searchable
            rightSection={<IconPlus size={16} />}
            onChange={(val) => val && onAdd(val)}
        />
    );
  };
  
  export const StylePropertyEditor: React.FC<{
    selector: string;
    property: string;
    value: string;
    propDef: unknown;
    onChange: (value: PropValue) => void;
    onRemove: () => void;
  }> = ({ selector, property, propDef, value, onChange, onRemove }) => {
    const inputType = getPropInputType(propDef);
  
    return (
        <Card radius="sm" padding="xs" withBorder >
        <Group justify='space-between' align='center' wrap='nowrap'>
        <Text size="sm" w={100}>{property}:</Text>
        <Group gap="xs" align="center" wrap='nowrap'>
        {inputType === 'select' && (
          <Select
            size="xs"
            value={value as string}
            data={propDef as string[]}
            onChange={(val) => onChange(val || '')}
          />
        )}
        {inputType === 'color' && (
          <GroupedColorSelector
          mainColor={{name:value}}
            onSelect={(val) => onChange(val)}
           />
        )}
        {inputType === 'boolean' && (
          <Switch
            size="xs"
            checked={Boolean(value)}
            onChange={(event) => onChange(event.currentTarget.checked)}
          />
        )}
        {inputType === 'number' && (
          <NumberInput
            size="xs"
            value={Number(value)}
            onChange={(val) => onChange(val || 0)}
          />
        )}
        {inputType === 'text' && (
          <TextInput
            size="xs"
            value={value}
            onChange={(event) => onChange(event.currentTarget.value)}
          />
        )}
        <ActionIcon color="red" onClick={onRemove}>
          <IconTrash size={16} />
        </ActionIcon>
        </Group>
      </Group>
        </Card>
    );
  };
  
  export const AddStylePropertyButton: React.FC<{
    selector: string;
    currentStyles: Record<string, string>;
    onAdd: (property: string) => void;
  }> = ({ selector, currentStyles, onAdd }) => {
    const availableProps = Object.keys(COMMON_STYLE_PROPS)
      .filter(prop => !(prop in currentStyles));
  
    return (
      <Select
        size="xs"
        variant='filled'
        searchable
        placeholder="Add style property"
        data={availableProps}
        rightSection={<IconPlus size={16} />}
        onChange={(val) => val && onAdd(val)}
      />
    );
  };

  export const AddStyleSelectorButton: React.FC<{
    onAdd: (selector: string) => void;
  }> = ({ onAdd }) => {
    const availableSelectors = Object.values(COMMON_CSS_SELECTORS)
  
    return (
      <Select
        size="xs"
        variant='filled'
        searchable
        placeholder="Add style selector"
        data={availableSelectors}
        rightSection={<IconPlus size={16} />}
        onChange={(val) => val && onAdd(val)}
      />
    );
};