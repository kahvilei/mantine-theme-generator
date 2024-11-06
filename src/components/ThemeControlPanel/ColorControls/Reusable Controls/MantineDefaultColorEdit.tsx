import React, { useContext } from 'react';
import { Stack } from '@mantine/core';
import { useThemeContext } from '../../ThemeContext/ThemeContext';
import DefaultColorItem from './ColorItem'; // Adjust the import path

const MantineDefaultColorEdit: React.FC = () => {
  const { getMantineColors, getMainColorShade, setColorFromString, deleteColor } = useThemeContext();

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
      {Array.from(getMantineColors().entries()).map(([name, shades], index) => (
          <DefaultColorItem
            key={index}
            name={name}
            description={descriptions[name] || ''}
            type="mantine"
            color={getMainColorShade(name)}
            onReset={() => deleteColor(name)}
            onEdit={(color) => setColorFromString(name, color)}
          />
      ))}
      </Stack>
  );
};

export default MantineDefaultColorEdit;
