import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { MantineThemeOverride } from '@mantine/core';
import ThemeDisplay, { ThemeDisplayProps } from './ThemeDisplay';

export default {
  title: 'Components/ThemeDisplay',
  component: ThemeDisplay,
  argTypes: {
    mode: {
      control: {
        type: 'select',
        options: ['light', 'dark'],
      },
    },
    theme: {
      control: 'object',
    },
  },
} as Meta;

const Template: StoryFn<ThemeDisplayProps> = (args: any) => <ThemeDisplay {...args} />;

export const LightMode = Template.bind({});
LightMode.args = {
  mode: 'light',
  theme: {
    colorScheme: 'light',
    primaryColor: 'blue',
    fontFamily: 'Arial, sans-serif',
  } as Partial<MantineThemeOverride>,
};

export const DarkMode = Template.bind({});
DarkMode.args = {
  mode: 'dark',
  theme: {
    colorScheme: 'dark',
    primaryColor: 'blue',
    fontFamily: 'Arial, sans-serif',
  } as Partial<MantineThemeOverride>,
};

export const CustomTheme = Template.bind({});
CustomTheme.args = {
  mode: 'light',
  theme: {
    colorScheme: 'light',
    primaryColor: 'blue',
    fontFamily: 'Arial, sans-serif',
  } as Partial<MantineThemeOverride>,
};
