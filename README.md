# Mantine theme editor/generator 

Work in progress editor for Mantine theme override generation. Basic functionality is there, with some bugs and incomplete features. The goal of this project is to let you edit mantine themes in as much or as little detail as you'd like, all from a UI with a live preview.

Shoot me a line if you have any questions on functionality or how to use it. My current objective is smoothing out rough edges, but in the future I'd like to add the ability to edit default component props/styles.

## How to use

1. go to the [editor](https://kahvilei.github.io/mantine-theme-generator/)
2. select a theme from the dropdown, or start from scratch
3. edit the theme to your liking
4. download the theme json with the download button
5. copy the theme json into your project and load it with the `createTheme` function from mantine

```tsx
import { createTheme, MantineProvider } from '@mantine/core';
import yourThemeJson from './yourTheme.json';


const theme = createTheme(yourThemeJson);

function App() {
  return (
    <MantineProvider theme={theme}>
      <YourApp />
    </MantineProvider>
  );
}
```

## Current features

### Primary Color Settings
![alt text](/readme-files/primary-color-settings.png)

### Custom Color Settings
Add custom colors beyond the default set of colors. Adding a new color automatically generates its shade values, and you can edit them as you see fit.
![alt text](/readme-files/custom-color-settings.png)

### Default Gradient Settings
This allows you to edit the default gradient that appears for any component that uses a gradient. You can edit the colors and angle.
![alt text](/readme-files/default-gradient-settings.png)

### Default Color Override
The default mantine theme has a set of colors that are used throughout the library. This allows you to override those colors with your own.

For example, Mantine uses "dark" and its shades for all components in dark mode. Overriding it and its shades allows you to do interesting things like have headings, outlines, and filled components be an entirely different color than the backdrop — without custom css.

![alt text](/readme-files/default-color-override.png)

### Default Font Settings
Edit the font families for headings, body text, and code blocks. 

### "General" settings
This is where I threw all the other basic settings that didn't fit into the other categories. This area and font settings are the most incomplete parts of the editor.

link: https://kahvilei.github.io/mantine-theme-generator/

mantine docs: https://mantine.dev/docs/theming/override-styles/
mantine repo: https://github.com/mantinedev/mantine
