import { Box, Slider, Stack, Switch, Text, Title } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import GroupedColorSelector from './Reusable Controls/GroupedColorSelector';
import ShadeSelector from './Reusable Controls/ShadeSelector';
import {
  selectPrimaryColor,
  selectPrimaryShade,
  selectAutoContrast,
  selectLuminanceThreshold,
  selectCustomColors,
  selectMantineColors,
  selectMainColorShade,
  selectIsSchemeDependentPrimaryShade,
  selectShadesFromColorString
} from '@/data/ThemeState/themeSelectors';
import {
  setPrimaryColor,
  setPrimaryShade,
  setAutoContrast,
  setLuminanceThreshold
} from '@/data/ThemeState/themeSlice';
import { RootState } from '@/data/store';

const PrimaryColorSettings = () => {
  const dispatch = useDispatch();

  // Selectors
  const primaryColor = useSelector(selectPrimaryColor);
  const lightShade = useSelector((state: RootState) => 
    selectPrimaryShade(state, 'light')
  );
  const darkShade = useSelector ((state: RootState) =>
    selectPrimaryShade(state, 'dark')
  );
  const autoContrast = useSelector(selectAutoContrast);
  const luminanceThreshold = useSelector(selectLuminanceThreshold);
  const customColors = useSelector(selectCustomColors);
  const mantineColors = useSelector(selectMantineColors);
  const isSchemeDependentShade = useSelector(selectIsSchemeDependentPrimaryShade);
  const mainColorShade = useSelector((state: RootState) => 
    selectMainColorShade(state, primaryColor || 'blue')
  );
  const primaryShades = useSelector((state: RootState) => 
    selectShadesFromColorString(state, primaryColor)
  );

  // Action handlers
  const handlePrimaryColorChange = (color: string) => {
    dispatch(setPrimaryColor(color));
  };

  const handlePrimaryShadeChange = (value: number | { light: number; dark: number }) => {
    dispatch(setPrimaryShade(value));
  };

  const handleAutoContrastChange = (checked: boolean) => {
    dispatch(setAutoContrast(checked));
  };

  const handleLuminanceThresholdChange = (value: number) => {
    dispatch(setLuminanceThreshold(value));
  };

  return (
    <Box>
      <Title order={4}>Primary Color</Title>
      <Stack gap="xl" mt="md">
        <GroupedColorSelector
          colors={[
            { theme: customColors },
            { mantine: mantineColors },
          ]}
          mainColor={{ shade: mainColorShade, name: primaryColor || 'blue' }}
          onSelect={handlePrimaryColorChange}
        />
        <Stack>
          <Switch
            label="Use different shades for light and dark modes"
            checked={isSchemeDependentShade}
            onChange={(event) => {
              if (event.currentTarget.checked) {
                handlePrimaryShadeChange({ light: 6, dark: 8 });
              } else {
                handlePrimaryShadeChange(6);
              }
            }}
          />

          {isSchemeDependentShade ? (
            <>
              <Text size="sm" mt="md">Light Mode Primary Shade</Text>
              <ShadeSelector
                colors={primaryShades}
                selectedIndex={lightShade}
                onSelect={(value) => handlePrimaryShadeChange({
                  light: value,
                  dark: darkShade,
                })}
              />
              <Text size="sm" mt="md">Dark Mode Primary Shade</Text>
              <ShadeSelector
                colors={primaryShades}
                selectedIndex={darkShade}
                onSelect={(value) => handlePrimaryShadeChange({
                  light: lightShade,
                  dark: value,
                })}
              />
            </>
          ) : (
            <>
              <Text size="sm" mt="md">Primary Shade</Text>
              <ShadeSelector
                colors={primaryShades}
                selectedIndex={ lightShade }
                onSelect={(value) => handlePrimaryShadeChange(value)}
              />
            </>
          )}
        </Stack>

        <Stack>
          <Switch
            label="Auto Contrast"
            checked={autoContrast}
            onChange={(event) => handleAutoContrastChange(event.currentTarget.checked)}
          />

          {autoContrast && (
            <Stack>
              <Text size="sm" mt="md">Luminance Threshold</Text>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={luminanceThreshold}
                onChange={handleLuminanceThresholdChange}
                label={(value) => value.toFixed(2)}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default PrimaryColorSettings