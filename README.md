# Mantine Theme Generator: 'Remoraid'

Visual editor for Mantine UI v7 themes with real-time preview. Still a work in progress :)

Give me a star in exchange for motivation.

![Remoraid dashboard](/readme-files/remoraid.png)

## Features

- Live preview of changes
- (Pretty much) Full theme customization (colors, typography, spacing, components)
- Ready-to-use preset themes with thematically appropriate naming convention
- Export to JSON or TypeScript
- Multi-language support + language specific fonts for Chinese and Japanese.

## Usage

1. Go to the [editor](https://kahvilei.github.io/mantine-theme-generator/)
2. Select a theme from quickstart, upload a json/tsx file, or start from scratch
3. Edit the theme to your liking, or don't
4. Download the theme file with the download button
5. Copy the theme json or ts into your project and load in like so (you will have to do some extra parsing if using json -- createTheme function):

```typescript
// In your project
import { MantineProvider } from '@mantine/core';
import theme from './your-theme';

function App() {
  return (
    <MantineProvider theme={theme}>
      {/* Your app */}
    </MantineProvider>
  );
}
```

## Control panel tab details

### Quick Setup
- Pick a preset theme
- Choose a primary color
- Select fonts

### Colors
- Set primary color
- Create custom colors
  - Either standard or virtual, with options for the color shade generation behavior and the ability to edit each shade individually.
- Override Mantine colors
  - Useful especially for colors like "dark" and "grey" which are used by default for most, if not all, components
- Configure gradients

### Typography
- Set font families
- Customize heading styles

### Size & Layout
- Adjust spacing scale
- Set border radiuses
- Configure breakpoints
- Manage some accessibility settings

### Components
- Set default props
- Add style rules
- Target specific component parts

## Advanced features

### Virtual Colors
Colors that change between light/dark mode:
1. Add new color with "+"
2. Select "Virtual" type
3. Pick different colors for light/dark


### Component Styling
1. Go to Components tab
2. Select component
3. Add props or style rules

## Contributing

Contributions welcome! This project is still evolving.

1. Fork the repo
2. Create a branch (`git checkout -b cool-feature`)
3. Commit changes (`git commit -m 'Add cool feature'`)
4. Push to branch (`git push origin cool-feature`)
5. Open a PR

Feel free to open issues for bugs or feature suggestions.

## Questions & Feedback

Have questions or suggestions? Open an issue or reach out directly. I'm open to feedback and happy to help with questions.

## License

MIT

---