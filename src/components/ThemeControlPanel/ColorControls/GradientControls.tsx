import React, { useContext } from 'react';
import { Box, Card, DEFAULT_THEME, Group, Slider, Stack, Text, Title } from '@mantine/core';
import ThemeContext from '../ThemeContext/ThemeContext';
import GroupedColorSelector from './Reusable Controls/GroupedColorSelector';
import classes from './ColorControls.module.css';

const GradientControls: React.FC = () => {
  const theme = useContext(ThemeContext);
  const gradientStart = theme.getGradientFrom() || 'blue';
  const gradientEnd = theme.getGradientTo() || 'cyan';

  const gradientAngle = theme.getGradientAngle();

  return (
    <Box>
      <Stack mt="md">
        <Title order={4}>Gradient</Title>
        <Group grow>
          <GroupedColorSelector
            colors={[{ theme: theme.getCustomColors() }, { mantine: theme.getMantineColors() }]}
            mainColor={{ shade: theme.getMainColorShade(gradientStart), name: gradientStart }}
            onSelect={(color) => theme.setGradientFrom(color)}
          />
          <GroupedColorSelector
            colors={[{ theme: theme.getCustomColors() }, { mantine: theme.getMantineColors() }]}
            mainColor={{ shade: theme.getMainColorShade(gradientEnd), name: gradientEnd }}
            onSelect={(color) => theme.setGradientTo(color)}
          />
        </Group>
        <Group
          justify="center"
          align="center"
          style={{
            width: '100%',
            height: '150px',
            background: `linear-gradient( ${gradientAngle}deg, ${theme.getMainColorShade(
              gradientStart
            )}, ${theme.getMainColorShade(gradientEnd)})`,
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
                backgroundImage: `linear-gradient( ${gradientAngle}deg, ${theme.getMainColorShade(
                  gradientStart
                )}, ${theme.getMainColorShade(gradientEnd)})`,
              }}
            >
              {gradientAngle}deg
            </Text>
          </Box>
        </Group>
        <Slider
          label="Angle"
          value={gradientAngle}
          onChange={(value) => theme.setGradientAngle(value)}
          max={360}
          min={0}
          step={1}
        />
      </Stack>
    </Box>
  );
};

export default GradientControls;
