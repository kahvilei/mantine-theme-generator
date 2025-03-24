import { useDispatch, useSelector } from 'react-redux';
import { AngleSlider, Group, Stack } from '@mantine/core';
import { RootState } from '@/data/store';
import {
  selectGradientAngle,
  selectGradientFrom,
  selectGradientTo,
  selectMainColorShade,
} from '@/data/ThemeState/themeSelectors';
import { setGradientAngle, setGradientFrom, setGradientTo } from '@/data/ThemeState/themeSlice';
import {IconAspectRatio} from "@tabler/icons-react";
import React from "react";
import ThemeColorSelector from "@/components/ThemeControlPanel/Shared/Colors/ThemeColorSelector";

const GradientControls = () => {
  const dispatch = useDispatch();

  // Selectors
    const gradientStart = useSelector(selectGradientFrom) || 'blue';
    const gradientEnd = useSelector(selectGradientTo) || 'cyan';
  const gradientAngle = useSelector(selectGradientAngle) || 180;
  const startShade = useSelector((state: RootState) => selectMainColorShade(state, gradientStart));
  const endShade = useSelector((state: RootState) => selectMainColorShade(state, gradientEnd));

  // Action handlers
  const handleGradientFromChange = (color: string) => {
    dispatch(setGradientFrom(color));
  };

  const handleGradientToChange = (color: string) => {
    dispatch(setGradientTo(color));
  };

  const handleGradientAngleChange = (value: number) => {
    dispatch(setGradientAngle(value));
  };

  return (
    <Stack gap="xs" >
        <Group gap={5}>
            <IconAspectRatio size={20} />
            Gradient
        </Group>
      <Group
        justify="center"
        align="center"
        style={{
          width: '100%',
          height: '150px',
          background: `linear-gradient(${gradientAngle}deg, ${startShade}, ${endShade})`,
          borderRadius: 'var(--mantine-radius-default)',
        }}
      >
        <AngleSlider value={gradientAngle} onChange={handleGradientAngleChange} />
      </Group>
        <Group mt='-5rem' p="1rem" justify="space-between">
        <ThemeColorSelector
            mainColorSelector={selectGradientFrom}
            onSelect={handleGradientFromChange}
        />
        <ThemeColorSelector
            mainColorSelector={selectGradientTo}
            onSelect={handleGradientToChange}
        />
    </Group>
    </Stack>
  );
};

export default GradientControls;
