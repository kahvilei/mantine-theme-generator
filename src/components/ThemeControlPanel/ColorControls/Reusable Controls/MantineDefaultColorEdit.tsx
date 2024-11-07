import React from 'react';
import { Stack, DEFAULT_THEME } from '@mantine/core';
import DefaultColorItem from './ColorItem'; // Adjust the import path

const MantineDefaultColorEdit: React.FC = () => {
  const colors = DEFAULT_THEME.colors as unknown as { [key: string]: string[] };

  const descriptions: { [key: string]: string } = {
    dark: 'used in dark mode as the background color and text color for most components. ',
    gray: 'used for borders, dividers, and other elements in light mode.',
    blue: 'the default primary color set by mantine.',
    red: 'commonly used for error messages and destructive actions.',
    green: 'commonly used for success messages and constructive actions.',
    yellow: 'commonly used for warning messages.',
  };

  return (
    <Stack gap="sm">
      {Object.entries(colors).map(([name, shades], index) => (
          <DefaultColorItem
            key={name}
            name={name}
            description={descriptions[name] || ''}
            type="mantine"
          />
      ))}
      </Stack>
  );
};

export default MantineDefaultColorEdit;
