import React from 'react';
import { Stack } from '@mantine/core';
import DefaultColorItem from './ColorItem'; // Adjust the import path
import { useDispatch, useSelector } from 'react-redux';
import {
  setColorFromString,
  deleteColor,
} from '../../../../data/ThemeState/themeSlice';
import {
  selectMantineColors,
} from '../../../../data/ThemeState/themeSelectors';

const MantineDefaultColorEdit: React.FC = () => {
  const colors = useSelector(selectMantineColors);
  const dispatch = useDispatch();

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
      {Array.from(colors.entries()).map(([name, shades], index) => (
          <DefaultColorItem
            key={index}
            name={name}
            shades={shades as unknown as string[]}
            description={descriptions[name] || ''}
            type="mantine"
            color={shades[5]}
            onReset={() => dispatch(deleteColor({ colorName: name,}))}
            onEdit={(name, color) => dispatch(setColorFromString({ key: name, value: color,}))}
            onEditShades={(name, shades) => dispatch(setColorFromString({ key: name, value: shades,}))}
          />
      ))}
      </Stack>
  );
};

export default MantineDefaultColorEdit;
