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

First, go to the [editor](https://kahvilei.github.io/mantine-theme-generator/).

### Quick Setup
- Pick a preset theme
- Choose a primary color
- Select fonts

### Colors
- Set primary color
- Create custom colors
- Override Mantine colors
- Configure gradients

### Typography
- Set font families
- Customize heading styles

### Size & Layout
- Adjust spacing scale
- Set border radiuses
- Configure breakpoints
- Manage accessibility

### Components
- Set default props
- Add style rules
- Target specific component parts

### Export
Click the download button and choose JSON or TypeScript.

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

## Preview Options

- Dashboard
- Typography
- Components
- Forms

Toggle light/dark mode with the button in the header.

## Advanced Features

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