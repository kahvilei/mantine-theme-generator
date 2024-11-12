import { AngleSlider, Box, Group, Slider, Stack, Text, Title } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import GroupedColorSelector from '../Reusable Controls/GroupedColorSelector';
import classes from './ColorControls.module.css';
import { 
  selectCustomColors, 
  selectMantineColors,
  selectGradientFrom,
  selectGradientTo,
  selectGradientAngle,
  selectMainColorShade
} from '@/data/ThemeState/themeSelectors';
import { 
  setGradientFrom, 
  setGradientTo, 
  setGradientAngle 
} from '@/data/ThemeState/themeSlice';

import { RootState } from '@/data/store';


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
    <Box>
      <Stack mt="md">
        <Title order={4}>Gradient</Title>
        <Group grow>
          <GroupedColorSelector
            mainColor={{ shade: startShade, name: gradientStart }}
            onSelect={handleGradientFromChange}
          />
          <GroupedColorSelector
            mainColor={{ shade: endShade, name: gradientEnd }}
            onSelect={handleGradientToChange}
          />
        </Group>
        <Group
          justify="center"
          align="center"
          style={{
            width: '100%',
            height: '150px',
            background: `linear-gradient(${gradientAngle}deg, ${startShade}, ${endShade})`,
            borderRadius: '15px',
          }}
        >
            <AngleSlider
              value={gradientAngle}
              onChange={handleGradientAngleChange}
            />
        </Group>
      </Stack>
    </Box>
  );
};

export default GradientControls;