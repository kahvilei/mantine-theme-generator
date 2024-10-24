import React from 'react';
import { Autocomplete, MantineThemeOverride, Stack, Switch } from '@mantine/core';

interface TypographyControlProps {
  theme: MantineThemeOverride;
  updateTheme: (theme: Partial<MantineThemeOverride>) => void;
}

const commonFonts = [
  'Arial',
  'Helvetica',
  'Verdana',
  'Tahoma',
  'Trebuchet MS',
  'Times New Roman',
  'Georgia',
  'Garamond',
  'Courier New',
  'Brush Script MT',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Raleway',
  'Oswald',
  'Ubuntu',
  'Source Sans Pro',
];

const monospaceFonts = [
  'Consolas',
  'Courier New',
  'Lucida Console',
  'Monaco',
  'Menlo',
  'DejaVu Sans Mono',
  'Bitstream Vera Sans Mono',
  'Courier',
  'Fira Code',
  'Source Code Pro',
  'Ubuntu Mono',
  'JetBrains Mono',
];

const TypographyControl: React.FC<TypographyControlProps> = ({ theme, updateTheme }) => {
  return (
    <Stack mt="md">
      <Autocomplete
        label="Main Font Family"
        data={commonFonts}
        value={theme.fontFamily}
        onChange={(value) => updateTheme({ fontFamily: value })}
        placeholder="Select or type a font family"
      />

      <Autocomplete
        label="Heading Font Family"
        data={commonFonts}
        value={theme.headings?.fontFamily}
        onChange={(value) => updateTheme({ headings: { ...theme.headings, fontFamily: value } })}
        placeholder="Select or type a font family"
      />

      <Autocomplete
        label="Monospace Font Family"
        data={monospaceFonts}
        value={theme.fontFamilyMonospace}
        onChange={(value) => updateTheme({ fontFamilyMonospace: value })}
        placeholder="Select or type a monospace font family"
      />

      <Switch
        label="Font Smoothing"
        checked={theme.fontSmoothing}
        onChange={(event) => updateTheme({ fontSmoothing: event.currentTarget.checked })}
      />
    </Stack>
  );
};

export default TypographyControl;
