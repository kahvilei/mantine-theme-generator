import React, { useContext } from 'react';
import {
  Card,
  ColorInput,
  ColorSwatch,
  Group,
  Select,
  SelectProps,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import ThemeContext from '../ThemeContext/ThemeContext';
import MantineDefaultColorEdit from './Reusable Controls/MantineDefaultColorEdit';

const ColorDefaults: React.FC = () => {
  const theme = useContext(ThemeContext);

  const renderColorSelect: SelectProps['renderOption'] = ({ option }) => (
    <Group>
      <ColorSwatch color={theme.getMainColorShade(option.value)} size={'20px'} />
      <Text>{option.value}</Text>
    </Group>
  );

  return (
    <Card withBorder padding="lg">
      <Stack mt="md">
        <Title order={4}>Color Defaults</Title>
        <Group grow>
          <Select
            label="Default Gradient From"
            data={theme.getAllColorKeysArray()}
            value={theme.getGradientFrom() || theme.getAllColorKeysArray()[0]}
            onChange={(color) => theme.setGradientFrom(color as string)}
            renderOption={renderColorSelect}
            leftSection={<ColorSwatch color={theme.getGradientFromMainHex()} size={20} />}
          />
          <Select
            label="Default Gradient To"
            data={theme.getAllColorKeysArray()}
            value={theme.getGradientTo() || theme.getAllColorKeysArray()[0]}
            onChange={(color) => theme.setGradientTo(color as string)}
            renderOption={renderColorSelect}
            leftSection={<ColorSwatch color={theme.getGradientToMainHex()} size={20} />}
          />
        </Group>
        <div
          style={{
            width: '100%',
            height: '50px',
            background: `linear-gradient(to right, ${theme.getGradientFromMainHex()}, ${theme.getGradientToMainHex()}`,
            borderRadius: theme.getDefaultRadius(),
          }}
        />

        <Stack>
          <Stack gap="0">
            <Text>Default Mantine Colors</Text>
            <Text size="xs" c="dimmed">
              {' '}
              These are the default colors provided by Mantine, you may override these colors below.
              Note that some colors are used by default by certain mantine components (like white,
              black, dark, and grey), and some will only appear if they are explicitly used.
            </Text>
          </Stack>
          <ColorInput
            label="White"
            description="Shade-less color used as the background on light mode as well as some accents on dark mode."
            value={theme.getWhite()}
            onChange={(color) => theme.setWhite(color)}
          />
          <ColorInput
            label="Black"
            description="Shade-less color used as the text color on light mode."
            value={theme.getBlack()}
            onChange={(color) => theme.setBlack(color)}
          />
        </Stack>
        <Stack>
          <Text>Shade-based colors</Text>
          <MantineDefaultColorEdit />
        </Stack>
      </Stack>
    </Card>
  );
};

export default ColorDefaults;
