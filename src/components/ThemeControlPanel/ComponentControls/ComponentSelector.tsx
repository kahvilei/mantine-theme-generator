
 import { CATEGORIZED_COMPONENTS } from './componentPropDefinitions';
 import mantineProps from '@/data/mantineProps.json'
  
  // Type for component names
  export type MantineComponentName = keyof typeof mantineProps;
  
  // Helper function to check if a string is a valid Mantine component name
  export const isMantineComponent = (name: string): name is MantineComponentName => {
    return name in mantineProps;
  };

  
  // Helper to get all components in a category
  export const getComponentsByCategory = (category: keyof typeof CATEGORIZED_COMPONENTS) => {
    return CATEGORIZED_COMPONENTS[category];
  };
  
  // Helper to get the category of a component
  export const getComponentCategory = (componentName: MantineComponentName) => {
    for (const [category, components] of Object.entries(CATEGORIZED_COMPONENTS)) {
      if (components.includes(componentName as never)) {
        return category;
      }
    }
    return 'other';
  };
  

import React from 'react';
import { Select } from '@mantine/core';

const ComponentSelector: React.FC<{
    value: string | null;
    onChange: (value: string | null) => void;
  }> = ({ value, onChange }) => {
    return (
      <Select
        label="Select Component"
        placeholder="Choose a component to customize"
        value={value}
        onChange={onChange}
        w={'100%'}
        searchable
        data={Object.entries(CATEGORIZED_COMPONENTS).map(([category, components]) => ({
          group: category.charAt(0).toUpperCase() + category.slice(1),
          items: components.map(comp => ({
            value: comp,
            label: comp
          }))
        }))}
      />
    );
  };

export default ComponentSelector;