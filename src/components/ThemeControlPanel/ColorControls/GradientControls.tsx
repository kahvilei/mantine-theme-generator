import React, { useContext } from 'react';
import { Box, DEFAULT_THEME, Group, Slider, Stack, Text, Title } from '@mantine/core';
import { useThemeContext } from '../ThemeContext/ThemeContext';
import GroupedColorSelector from './Reusable Controls/GroupedColorSelector';
import classes from './ColorControls.module.css';

const GradientControls: React.FC = () => {
  const { getCustomColors, getMantineColors, getMainColorShade, getGradientFrom, getGradientTo, setGradientFrom, setGradientTo, getGradientAngle, setGradientAngle } = useThemeContext();

  const gradientStart = getGradientFrom() || 'blue';
  const gradientEnd = getGradientTo() || 'cyan';

  const gradientAngle = getGradientAngle()?getGradientAngle():180;

  return (
    <Box>
      <Stack mt="md">
        <Title order={4}>Gradient</Title>
        <Group grow>
          <GroupedColorSelector
            colors={[{ theme: getCustomColors() }, { mantine: getMantineColors() }]}
            mainColor={{ shade: getMainColorShade(gradientStart), name: gradientStart }}
            onSelect={(color) => setGradientFrom(color)}
          />
          <GroupedColorSelector
            colors={[{ theme: getCustomColors() }, { mantine: getMantineColors() }]}
            mainColor={{ shade: getMainColorShade(gradientEnd), name: gradientEnd }}
            onSelect={(color) => setGradientTo(color)}
          />
        </Group>
        <Group
          justify="center"
          align="center"
          style={{
            width: '100%',
            height: '150px',
            background: `linear-gradient( ${gradientAngle}deg, ${getMainColorShade(
              gradientStart
            )}, ${getMainColorShade(gradientEnd)})`,
            borderRadius: DEFAULT_THEME.radius.sm,
          }}
        >
          <Box
            bg={'white'}
            p={'3'}
            style={{
              borderRadius: DEFAULT_THEME.radius.sm,
            }}
          >
            <Text
              className={classes.gradientText}
              style={{
                backgroundImage: `linear-gradient( ${gradientAngle}deg, ${getMainColorShade(
                  gradientStart
                )}, ${getMainColorShade(gradientEnd)})`,
              }}
            >
              {gradientAngle}deg
            </Text>
          </Box>
        </Group>
        <Slider
          label="Angle"
          value={gradientAngle}
          onChange={(value) => setGradientAngle(value)}
          max={360}
          min={0}
          step={1}
        />
      </Stack>
    </Box>
  );
};

export default GradientControls;
