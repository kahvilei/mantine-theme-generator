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
            value={
              theme.getGradientFrom() || theme.getAllColorKeysArray()[0]
            }
            onChange={(color) =>
              theme.setGradientFrom(color as string)
            }
            renderOption={renderColorSelect}
            leftSection={
              <ColorSwatch
                color={theme.getGradientFromMainHex()}
                size={20}
              />
            }
          />
          <Select
            label="Default Gradient To"
            data={theme.getAllColorKeysArray()}
            value={theme.getGradientTo() || theme.getAllColorKeysArray()[0]}
            onChange={(color) =>
              theme.setGradientTo(color as string)
            }
            renderOption={renderColorSelect}
            leftSection={
              <ColorSwatch
                color={theme.getGradientToMainHex()}
                size={20}
              />
            }
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
        <ColorInput
          label="White"
          value={theme.getWhite()}
          onChange={(color) => theme.setWhite(color)}
        />
        <ColorInput
          label="Black"
          value={theme.getBlack()}
          onChange={(color) => theme.setBlack(color)}
        />
        <Stack>
          <Text>Default Mantine Colors</Text>
          <MantineDefaultColorEdit />
        </Stack>
      </Stack>
    </Card>
  );
};

function MantineDefaultColorEdit() {
  const theme = useContext(ThemeContext);
  return (
    <>
      {Array.from(theme.getMantineColors().entries()).map(([name, shades], index) => (
        <Stack key={index}>
          <Text>{name}</Text>
          <ColorInput
            value={theme.getMainColorShade(name)}
            onChange={(color) => {
              theme.setColorFromString(name, color);
            }}
          />
        </Stack>
      ))
      }
    </>
  );
}

export default ColorDefaults;
