import React, { useContext, useState } from 'react';
import { Card, NumberInput, Slider, Stack, Switch, Text, Title } from '@mantine/core';
import ThemeContext from '../ThemeContext/ThemeContext';
import GroupedColorSelector from './Reusable Controls/GroupedColorSelector';
import ShadeSelector from './Reusable Controls/ShadeSelector';

const PrimaryColorSettings: React.FC = () => {
  const themeManager = useContext(ThemeContext);
  const primaryColor = themeManager.getPrimaryColor();
  const primaryShades = [...themeManager.getShadesFromColorString(primaryColor)];

  return (
    <Card withBorder padding="lg">
      <Title order={4}>Primary Color Settings</Title>
      <Stack gap="xl" mt="md">
        <GroupedColorSelector
          colors={[
            { theme: themeManager.getCustomColors() },
            { mantine: themeManager.getMantineColors() },
          ]}
          mainColor={{ shade: themeManager.getMainColorShade(primaryColor), name: primaryColor }}
          onSelect={(color) => themeManager.setPrimaryColor(color)}
        />
        <Stack>
          <Switch
            label="Use different shades for light and dark modes"
            checked={themeManager.schemeDependentPrimaryShade}
            onChange={(event) => {
              if (event.currentTarget.checked) {
                themeManager.setPrimaryShade({ light: 6, dark: 8 });
              } else {
                themeManager.setPrimaryShade(6);
              }
            }}
          />

          {themeManager.schemeDependentPrimaryShade ? (
            <>
              <Text size="sm" mt="md">
                Light Mode Primary Shade
              </Text>
              <ShadeSelector
                colors={primaryShades}
                selectedIndex={themeManager.getPrimaryShade('light')}
                onSelect={(value) =>
                  themeManager.setPrimaryShade({
                    light: value,
                    dark: themeManager.getPrimaryShade('dark'),
                  })
                }
              />
              <Text size="sm" mt="md">
                Dark Mode Primary Shade
              </Text>
              <ShadeSelector
                colors={primaryShades}
                selectedIndex={themeManager.getPrimaryShade('dark')}
                onSelect={(value) =>
                  themeManager.setPrimaryShade({
                    light: themeManager.getPrimaryShade('light'),
                    dark: value,
                  })
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
                selectedIndex={themeManager.getPrimaryShade()}
                onSelect={(value) => themeManager.setPrimaryShade(value)}
              />
            </>
          )}
        </Stack>

        <Stack>
          <Switch
            label="Auto Contrast"
            checked={themeManager.theme.autoContrast}
            onChange={(event) => {
              themeManager.theme.autoContrast = event.currentTarget.checked;
              themeManager.commitChanges();
            }}
          />

          {themeManager.theme.autoContrast && (
            <Stack>
              <Text size="sm" mt="md">
                Luminance Threshold
              </Text>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={themeManager.getLuminanceThreshold()}
                onChange={(value) => themeManager.setLuminanceThreshold(value)}
                label={(value) => value.toFixed(2)} // Display the current value as the label
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default PrimaryColorSettings;
