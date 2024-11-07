import { Autocomplete, Stack, Switch } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import HeadingsSettings from './HeadingsSettings';
import {
  selectBodyFontFamily,
  selectHeadingFontFamily,
  selectMonospaceFontFamily,
  selectFontSmoothing,
} from '@/data/ThemeState/themeSelectors';
import {
  setBodyFontFamily,
  setHeadingFontFamily,
  setMonospaceFontFamily,
  setFontSmoothing,
} from '@/data/ThemeState/themeSlice';

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
  const dispatch = useDispatch();

  // Selectors
  const bodyFontFamily = useSelector(selectBodyFontFamily);
  const headingFontFamily = useSelector(selectHeadingFontFamily);
  const monospaceFontFamily = useSelector(selectMonospaceFontFamily);
  const fontSmoothing = useSelector(selectFontSmoothing);

  // Action handlers
  const handleBodyFontFamilyChange = (value: string) => {
    dispatch(setBodyFontFamily(value));
  };

  const handleHeadingFontFamilyChange = (value: string) => {
    dispatch(setHeadingFontFamily(value));
  };

  const handleMonospaceFontFamilyChange = (value: string) => {
    dispatch(setMonospaceFontFamily(value));
  };

  const handleFontSmoothingChange = (checked: boolean) => {
    dispatch(setFontSmoothing(checked));
  };

  return (
    <Stack mt="md">
      <Autocomplete
        label="Main Font Family"
        data={commonFonts}
        value={bodyFontFamily}
        onChange={handleBodyFontFamilyChange}
        placeholder="Select or type a font family"
      />

      <Autocomplete
        label="Heading Font Family"
        data={commonFonts}
        value={headingFontFamily}
        onChange={handleHeadingFontFamilyChange}
        placeholder="Select or type a font family"
      />

      <Autocomplete
        label="Monospace Font Family"
        data={monospaceFonts}
        value={monospaceFontFamily}
        onChange={handleMonospaceFontFamilyChange}
        placeholder="Select or type a monospace font family"
      />

      <Switch
        label="Font Smoothing"
        checked={fontSmoothing}
        onChange={(event) => handleFontSmoothingChange(event.currentTarget.checked)}
      />

      <HeadingsSettings />
    </Stack>
  );
};

export default TypographyControl;