# Mantine theme editor/generator 

Work in progress editor for Mantine theme override generation. Basic functionality is there, with some bugs and missing features. The goal of this project is to let you edit mantine themes in as much or as little detail as you'd like, all from a UI with a live preview.

Shoot me a line if you have any questions on functionality or how to use it. My current objective is smoothing out rough edges, but in the future I'd like to add the ability to edit default component props/styles.

## How to use

1. go to the [editor](https://kahvilei.github.io/mantine-theme-generator/)
2. select a theme from the dropdown, or start from scratch
3. edit the theme to your liking
4. download the theme json with the download button
5. copy the theme json into your project and load it with the `createTheme` function from mantine

```tsx
import { createTheme } from '@mantine/core';

const theme = createTheme(yourThemeJson);
```

## Current features

### Primary Color Settings

### Custom Color Settings

### Default Gradient Settings

### Default Color Override

### Default Font Settings

### "General" settings



link: https://kahvilei.github.io/mantine-theme-generator/

mantine docs: https://mantine.dev/docs/theming/override-styles/
mantine repo: https://github.com/mantinedev/mantine
