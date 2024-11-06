import {
  Box,
  ColorInput,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useThemeContext } from '../ThemeContext/ThemeContext';
import MantineDefaultColorEdit from './Reusable Controls/MantineDefaultColorEdit';

const ColorDefaults = () => {
  const { getWhite, setWhite, getBlack, setBlack } = useThemeContext();

  return (
    <Box maw={'100%'}>
      <Stack mt="md">
        <Title order={4}>Default Color Override</Title>
        <Stack>
          <Stack gap="0">
            <Text>Default Mantine Colors</Text>
            <Text size="xs" c="dimmed" maw={'100%'}>
              {' '}
              These are the default colors provided by Mantine, you may override these colors below.
              Note that some colors are used by default by certain mantine components (like white,
              black, dark, and grey), and some will only appear if they are explicitly used.
            </Text>
          </Stack>
          <ColorInput
            label="White"
            description="Shade-less color used as the background on light mode as well as some accents on dark mode."
            value={getWhite()}
            onChange={(color) => setWhite(color)}
          />
          <ColorInput
            label="Black"
            description="Shade-less color used as the text color on light mode."
            value={getBlack()}
            onChange={(color) => setBlack(color)}
          />
        </Stack>
        <Stack>
          <Text>Shade-based colors</Text>
          <MantineDefaultColorEdit />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ColorDefaults;
