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
import GroupedColorSelector from './Reusable Controls/GroupedColorSelector';

const GradientControls: React.FC = () => {
  const theme = useContext(ThemeContext);
  const primaryColor = theme.getPrimaryColor();

  return (
    <Card withBorder padding="lg">
      <Stack mt="md">
        <Title order={4}>Gradient</Title>
        <Group grow>
        <GroupedColorSelector
          colors={[
            { theme: theme.getCustomColors() },
            { mantine: theme.getMantineColors() },
          ]}
          mainColor={{ shade: theme.getMainColorShade(primaryColor), name: primaryColor }}
          onSelect={(color) => theme.setPrimaryColor(color)}
        />
           <GroupedColorSelector
          colors={[
            { theme: theme.getCustomColors() },
            { mantine: theme.getMantineColors() },
          ]}
          mainColor={{ shade: theme.getMainColorShade(primaryColor), name: primaryColor }}
          onSelect={(color) => theme.setPrimaryColor(color)}
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
      </Stack>
    </Card>
  );
};

export default GradientControls;
