import { Autocomplete, Stack, Switch, } from '@mantine/core';
import HeadingsSettings from './HeadingsSettings';

import ThemeContext from '../ThemeContext/ThemeContext';
import { useContext } from 'react';

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

const TypographyControl = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack mt="md">
      <Autocomplete
        label="Main Font Family"
        data={commonFonts}
        value={theme.getBodyFontFamily()}
        onChange={(value) => theme.setBodyFontFamily(value)}
        placeholder="Select or type a font family"
      />

      <Autocomplete
        label="Heading Font Family"
        data={commonFonts}
        value={theme.getHeadingFontFamily()}
        onChange={(value) => theme.setHeadingFontFamily(value)}
        placeholder="Select or type a font family"
      />

      <Autocomplete
        label="Monospace Font Family"
        data={monospaceFonts}
        value={theme.getMonospaceFontFamily()}
        onChange={(value) => theme.setMonospaceFontFamily(value)}
        placeholder="Select or type a monospace font family"
      />

      <Switch
        label="Font Smoothing"
        checked={theme.getFontSmoothing()}
        onChange={(event) => theme.setFontSmoothing(event.currentTarget.checked)}
      />

      <HeadingsSettings />

    </Stack>
  );
};

export default TypographyControl;
