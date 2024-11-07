import { Box, Group, Slider, Stack, Text, Title } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import GroupedColorSelector from './Reusable Controls/GroupedColorSelector';
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
  const customColors = useSelector(selectCustomColors);
  const mantineColors = useSelector(selectMantineColors);
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
            colors={[{ theme: customColors }, { mantine: mantineColors }]}
            mainColor={{ shade: startShade, name: gradientStart }}
            onSelect={handleGradientFromChange}
          />
          <GroupedColorSelector
            colors={[{ theme: customColors }, { mantine: mantineColors }]}
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
          <Box
            bg={'white'}
            p={'3'}
            style={{ borderRadius: '15px' }}
          >
            <Text
              className={classes.gradientText}
              style={{
                backgroundImage: `linear-gradient(${gradientAngle}deg, ${startShade}, ${endShade})`,
              }}
            >
              {gradientAngle}deg
            </Text>
          </Box>
        </Group>
        <Slider
          label="Angle"
          value={gradientAngle}
          onChange={handleGradientAngleChange}
          max={360}
          min={0}
          step={1}
        />
      </Stack>
    </Box>
  );
};

export default GradientControls;