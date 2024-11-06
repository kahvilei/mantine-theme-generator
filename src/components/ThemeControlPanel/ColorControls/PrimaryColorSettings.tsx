import { Box, MantineColorShade, Slider, Stack, Switch, Text, Title } from '@mantine/core';
import { useThemeContext } from '../ThemeContext/ThemeContext';
import GroupedColorSelector from './Reusable Controls/GroupedColorSelector';
import ShadeSelector from './Reusable Controls/ShadeSelector';

const PrimaryColorSettings = () => {
  const {
    getPrimaryColor,
    getPrimaryShade,
    setPrimaryColor,
    setPrimaryShade,
    getAutoContrast,
    setAutoContrast,
    getLuminanceThreshold,
    setLuminanceThreshold,
    isSchemeDependentPrimaryShade,
    getShadesFromColorString,
    getMainColorShade,
    getCustomColors,
    getMantineColors,
  } = useThemeContext();
  const primaryColor = getPrimaryColor();
  const primaryShades = [...getShadesFromColorString(primaryColor)];

  return (
    <Box>
      <Title order={4}>Primary Color</Title>
      <Stack gap="xl" mt="md">
        <GroupedColorSelector
          colors={[
            { theme: getCustomColors() },
            { mantine: getMantineColors() },
          ]}
          mainColor={{ shade: getMainColorShade(primaryColor), name: primaryColor || 'blue' }}
          onSelect={(color) => setPrimaryColor(color)}
        />
        <Stack>
          <Switch
            label="Use different shades for light and dark modes"
            checked={isSchemeDependentPrimaryShade()}
            onChange={(event) => {
              if (event.currentTarget.checked) {
                setPrimaryShade({ light: 6, dark: 8 }as unknown as MantineColorShade);
              } else {
                setPrimaryShade(6);
              }
            }}
          />

          {isSchemeDependentPrimaryShade() ? (
            <>
              <Text size="sm" mt="md">
                Light Mode Primary Shade
              </Text>
              <ShadeSelector
                colors={primaryShades}
                selectedIndex={getPrimaryShade('light')}
                onSelect={(value) =>
                  setPrimaryShade({
                    light: value,
                    dark: getPrimaryShade('dark'),
                  } as unknown as MantineColorShade)
                }
              />
              <Text size="sm" mt="md">
                Dark Mode Primary Shade
              </Text>
              <ShadeSelector
                colors={primaryShades}
                selectedIndex={getPrimaryShade('dark')}
                onSelect={(value) =>
                  setPrimaryShade({
                    light: getPrimaryShade('light'),
                    dark: value,
                  }as unknown as MantineColorShade)
                }
              />
            </>
          ) : (
            <>
              <Text size="sm" mt="md">
                Primary Shade
              </Text>
              <ShadeSelector
                colors={primaryShades}
                selectedIndex={getPrimaryShade()}
                onSelect={(value) => setPrimaryShade(value as unknown as MantineColorShade)}
              />
            </>
          )}
        </Stack>

        <Stack>
          <Switch
            label="Auto Contrast"
            checked={getAutoContrast()}
            onChange={(event) => {
              setAutoContrast(event.currentTarget.checked);
            }}
          />

          {getAutoContrast() && (
            <Stack>
              <Text size="sm" mt="md">
                Luminance Threshold
              </Text>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={getLuminanceThreshold()}
                onChange={(value) => setLuminanceThreshold(value)}
                label={(value) => value.toFixed(2)} // Display the current value as the label
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default PrimaryColorSettings;
