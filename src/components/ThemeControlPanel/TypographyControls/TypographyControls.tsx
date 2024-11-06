import { Autocomplete, Stack, Switch, } from '@mantine/core';
import HeadingsSettings from './HeadingsSettings';
import { useThemeContext } from '../ThemeContext/ThemeContext';

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
  const { getBodyFontFamily, setBodyFontFamily, getHeadingFontFamily, setHeadingFontFamily, getMonospaceFontFamily, setMonospaceFontFamily, getFontSmoothing, setFontSmoothing, } = useThemeContext();
  return (
    <Stack mt="md">
      <Autocomplete
        label="Main Font Family"
        data={commonFonts}
        value={getBodyFontFamily()}
        onChange={(value) => setBodyFontFamily(value)}
        placeholder="Select or type a font family"
      />

      <Autocomplete
        label="Heading Font Family"
        data={commonFonts}
        value={getHeadingFontFamily()}
        onChange={(value) => setHeadingFontFamily(value)}
        placeholder="Select or type a font family"
      />

      <Autocomplete
        label="Monospace Font Family"
        data={monospaceFonts}
        value={getMonospaceFontFamily()}
        onChange={(value) => setMonospaceFontFamily(value)}
        placeholder="Select or type a monospace font family"
      />

      <Switch
        label="Font Smoothing"
        checked={getFontSmoothing()}
        onChange={(event) => setFontSmoothing(event.currentTarget.checked)}
      />

      <HeadingsSettings />

    </Stack>
  );
};

export default TypographyControl;
