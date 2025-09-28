

import {MantineThemeOverride, virtualColor} from "@mantine/core";

export const Mantine: MantineThemeOverride = {
  // Copy content from JSON
  scale: 1,
  fontSmoothing: true,
  focusRing: "auto",
  white: "#fff",
  black: "#000",
  colors: {
    dark: [
      "#C9C9C9",
      "#b8b8b8",
      "#828282",
      "#696969",
      "#424242",
      "#3b3b3b",
      "#2e2e2e",
      "#242424",
      "#1f1f1f",
      "#141414"
    ],
    gray: [
      "#f8f9fa",
      "#f1f3f5",
      "#e9ecef",
      "#dee2e6",
      "#ced4da",
      "#adb5bd",
      "#868e96",
      "#495057",
      "#343a40",
      "#212529"
    ],
    red: [
      "#fff5f5",
      "#ffe3e3",
      "#ffc9c9",
      "#ffa8a8",
      "#ff8787",
      "#ff6b6b",
      "#fa5252",
      "#f03e3e",
      "#e03131",
      "#c92a2a"
    ],
    pink: [
      "#fff0f6",
      "#ffdeeb",
      "#fcc2d7",
      "#faa2c1",
      "#f783ac",
      "#f06595",
      "#e64980",
      "#d6336c",
      "#c2255c",
      "#a61e4d"
    ],
    grape: [
      "#f8f0fc",
      "#f3d9fa",
      "#eebefa",
      "#e599f7",
      "#da77f2",
      "#cc5de8",
      "#be4bdb",
      "#ae3ec9",
      "#9c36b5",
      "#862e9c"
    ],
    violet: [
      "#f3f0ff",
      "#e5dbff",
      "#d0bfff",
      "#b197fc",
      "#9775fa",
      "#845ef7",
      "#7950f2",
      "#7048e8",
      "#6741d9",
      "#5f3dc4"
    ],
    indigo: [
      "#edf2ff",
      "#dbe4ff",
      "#bac8ff",
      "#91a7ff",
      "#748ffc",
      "#5c7cfa",
      "#4c6ef5",
      "#4263eb",
      "#3b5bdb",
      "#364fc7"
    ],
    blue: [
      "#e7f5ff",
      "#d0ebff",
      "#a5d8ff",
      "#74c0fc",
      "#4dabf7",
      "#339af0",
      "#228be6",
      "#1c7ed6",
      "#1971c2",
      "#1864ab"
    ],
    cyan: [
      "#e3fafc",
      "#c5f6fa",
      "#99e9f2",
      "#66d9e8",
      "#3bc9db",
      "#22b8cf",
      "#15aabf",
      "#1098ad",
      "#0c8599",
      "#0b7285"
    ],
    teal: [
      "#e6fcf5",
      "#c3fae8",
      "#96f2d7",
      "#63e6be",
      "#38d9a9",
      "#20c997",
      "#12b886",
      "#0ca678",
      "#099268",
      "#087f5b"
    ],
    green: [
      "#ebfbee",
      "#d3f9d8",
      "#b2f2bb",
      "#8ce99a",
      "#69db7c",
      "#51cf66",
      "#40c057",
      "#37b24d",
      "#2f9e44",
      "#2b8a3e"
    ],
    lime: [
      "#f4fce3",
      "#e9fac8",
      "#d8f5a2",
      "#c0eb75",
      "#a9e34b",
      "#94d82d",
      "#82c91e",
      "#74b816",
      "#66a80f",
      "#5c940d"
    ],
    yellow: [
      "#fff9db",
      "#fff3bf",
      "#ffec99",
      "#ffe066",
      "#ffd43b",
      "#fcc419",
      "#fab005",
      "#f59f00",
      "#f08c00",
      "#e67700"
    ],
    orange: [
      "#fff4e6",
      "#ffe8cc",
      "#ffd8a8",
      "#ffc078",
      "#ffa94d",
      "#ff922b",
      "#fd7e14",
      "#f76707",
      "#e8590c",
      "#d9480f"
    ]
  },
  primaryColor: "blue",
  primaryShade: {
    light: 6,
    dark: 8
  },
  defaultGradient: {
    from: "blue",
    to: "cyan",
    deg: 45
  },
  radius: {
    xs: "calc(0.125rem * var(--mantine-scale))",
    sm: "calc(0.25rem * var(--mantine-scale))",
    md: "calc(0.5rem * var(--mantine-scale))",
    lg: "calc(1rem * var(--mantine-scale))",
    xl: "calc(2rem * var(--mantine-scale))"
  },
  spacing: {
    xs: "calc(0.625rem * var(--mantine-scale))",
    sm: "calc(0.75rem * var(--mantine-scale))",
    md: "calc(1rem * var(--mantine-scale))",
    lg: "calc(1.25rem * var(--mantine-scale))",
    xl: "calc(2rem * var(--mantine-scale))"
  },
  defaultRadius: "md",
  fontFamily: "Roboto",
  fontFamilyMonospace: "Roboto Mono",
  headings: {
    fontFamily: "Roboto",
    fontWeight: "700",
    sizes: {
      h1: {
        fontSize: "calc(2.125rem * var(--mantine-scale))",
        lineHeight: "1.3",
        fontWeight: "700"
      },
      h2: {
        fontSize: "calc(1.625rem * var(--mantine-scale))",
        lineHeight: "1.35",
        fontWeight: "700"
      },
      h3: {
        fontSize: "calc(1.375rem * var(--mantine-scale))",
        lineHeight: "1.4",
        fontWeight: "700"
      },
      h4: {
        fontSize: "calc(1.125rem * var(--mantine-scale))",
        lineHeight: "1.45",
        fontWeight: "700"
      },
      h5: {
        fontSize: "calc(1rem * var(--mantine-scale))",
        lineHeight: "1.5",
        fontWeight: "700"
      },
      h6: {
        fontSize: "calc(0.875rem * var(--mantine-scale))",
        lineHeight: "1.5",
        fontWeight: "700"
      }
    }
  },
  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em"
  },
  components: {}
};

export const Murkrow: MantineThemeOverride = {
  scale: 1,
  fontSmoothing: true,
  focusRing: "auto",
  white: "#ffffff",
  black: "#24292f",
  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em"
  },
  colors: {
    dark: [
      "#fff",
      "#7b92c7",
      "#4765aa",
      "#2f4371",
      "#27375c",
      "#1c2a4a",
      "#151e33",
      "#0e1626",
      "#0a101d",
      "#060b15"
    ],
    gray: [
      "#e3e7f1",
      "#d8ddeb",
      "#ced4e5",
      "#c3cadf",
      "#b8c1d9",
      "#b8c1d9",
      "#7b8cb8",
      "#4b5c8b",
      "#2a334d",
      "#090b10"
    ],
    blue: [
      "#d1deeb",
      "#aecce7",
      "#8bb9e2",
      "#68a6de",
      "#4393d9",
      "#4393d9",
      "#1473bb",
      "#005187",
      "#003052",
      "#000e1c"
    ],
    green: [
      "#dafbe1",
      "#aceebb",
      "#6fdd8b",
      "#4ac26b",
      "#2da44e",
      "#1a7f37",
      "#116329",
      "#044f1e",
      "#003d16",
      "#002d11"
    ],
    yellow: [
      "#f7f1e5",
      "#faeacd",
      "#fce3b5",
      "#fddd9d",
      "#fed687",
      "#ffd685",
      "#ffb82d",
      "#ce8906",
      "#744d03",
      "#191102"
    ],
    orange: [
      "#fff1e5",
      "#ffd8b5",
      "#ffb77c",
      "#fb8f44",
      "#e16f24",
      "#bc4c00",
      "#953800",
      "#762c00",
      "#5c2200",
      "#471700"
    ]
  },
  primaryShade: {
    light: 6,
    dark: 5
  },
  primaryColor: "yellow",
  autoContrast: true,
  luminanceThreshold: 0.3,
  fontFamily: "Rubik",
  fontFamilyMonospace: "Roboto Mono",
  headings: {
    fontFamily: "Rubik",
    fontWeight: "600",
    sizes: {
      h1: {
        fontSize: "calc(2.125rem * var(--mantine-scale))",
        lineHeight: "1.3",
        fontWeight: "300"
      },
      h2: {
        fontSize: "calc(1.625rem * var(--mantine-scale))",
        lineHeight: "1.35",
        fontWeight: "300"
      },
      h3: {
        fontSize: "calc(1.375rem * var(--mantine-scale))",
        lineHeight: "1.4",
        fontWeight: "300"
      },
      h4: {
        fontSize: "calc(1.125rem * var(--mantine-scale))",
        lineHeight: "1.45",
        fontWeight: "500"
      },
      h5: {
        fontSize: "calc(1rem * var(--mantine-scale))",
        lineHeight: "1.5",
        fontWeight: "400"
      },
      h6: {
        fontSize: "calc(0.875rem * var(--mantine-scale))",
        lineHeight: "1.5",
        fontWeight: "400"
      }
    }
  },
  defaultRadius: "md",
  defaultGradient: {
    from: "blue",
    to: "gray",
    deg: 45
  }
};

export const Remoraid: MantineThemeOverride = {
  colors: {
    dark: [
      '#fafcff',
      '#cad5e8',
      '#8697b5',
      '#4c5d7d',
      '#222833',
      '#222938',
      '#0b0f14',
      '#0b0f14',
      '#030405',
      '#000000'
    ],
    gray: [
      '#e3e7f1',
      '#d8ddeb',
      '#ced4e5',
      '#c3cadf',
      '#b8c1d9',
      '#b8c1d9',
      '#7b8cb8',
      '#4b5c8b',
      '#2a334d',
      '#090b10'
    ],
    blue: [
      '#ddf4ff',
      '#b6e3ff',
      '#80ccff',
      '#54aeff',
      '#218bff',
      '#0969da',
      '#0550ae',
      '#033d8b',
      '#0a3069',
      '#002155'
    ],
    green: [
      '#dafbe1',
      '#aceebb',
      '#6fdd8b',
      '#4ac26b',
      '#2da44e',
      '#1a7f37',
      '#116329',
      '#044f1e',
      '#003d16',
      '#002d11'
    ],
    yellow: [
      '#fff8c5',
      '#fae17d',
      '#eac54f',
      '#d4a72c',
      '#bf8700',
      '#9a6700',
      '#7d4e00',
      '#633c01',
      '#4d2d00',
      '#3b2300'
    ],
    orange: [
      '#fff1e5',
      '#ffd8b5',
      '#ffb77c',
      '#fb8f44',
      '#e16f24',
      '#bc4c00',
      '#953800',
      '#762c00',
      '#5c2200',
      '#471700'
    ],
    red: [
      '#fff5f5',
      '#ffe3e3',
      '#ffc9c9',
      '#ffa8a8',
      '#ff8787',
      '#ff6b6b',
      '#fa5252',
      '#f03e3e',
      '#e03131',
      '#c92a2a'
    ],
    pink: [
      '#fff0f6',
      '#ffdeeb',
      '#fcc2d7',
      '#faa2c1',
      '#f783ac',
      '#f06595',
      '#e64980',
      '#d6336c',
      '#c2255c',
      '#a61e4d'
    ],
    grape: [
      '#f8f0fc',
      '#f3d9fa',
      '#eebefa',
      '#e599f7',
      '#da77f2',
      '#cc5de8',
      '#be4bdb',
      '#ae3ec9',
      '#9c36b5',
      '#862e9c'
    ],
    violet: [
      '#f3f0ff',
      '#e5dbff',
      '#d0bfff',
      '#b197fc',
      '#9775fa',
      '#845ef7',
      '#7950f2',
      '#7048e8',
      '#6741d9',
      '#5f3dc4'
    ],
    indigo: [
      '#edf2ff',
      '#dbe4ff',
      '#bac8ff',
      '#91a7ff',
      '#748ffc',
      '#5c7cfa',
      '#4c6ef5',
      '#4263eb',
      '#3b5bdb',
      '#364fc7'
    ],
    cyan: [
      '#e3fafc',
      '#c5f6fa',
      '#99e9f2',
      '#66d9e8',
      '#3bc9db',
      '#22b8cf',
      '#15aabf',
      '#1098ad',
      '#0c8599',
      '#0b7285'
    ],
    teal: [
      '#e6fcf5',
      '#c3fae8',
      '#96f2d7',
      '#63e6be',
      '#38d9a9',
      '#20c997',
      '#12b886',
      '#0ca678',
      '#099268',
      '#087f5b'
    ],
    lime: [
      '#f4fce3',
      '#e9fac8',
      '#d8f5a2',
      '#c0eb75',
      '#a9e34b',
      '#94d82d',
      '#82c91e',
      '#74b816',
      '#66a80f',
      '#5c940d'
    ],
    Remoraid: [
      '#dcf2de',
      '#c7eccc',
      '#b2e6b9',
      '#9de1a6',
      '#88db93',
      '#88db93',
      '#5fc26d',
      '#479454',
      '#296133',
      '#19361d'
    ]
  },
  primaryColor: 'Remoraid',
  primaryShade: {
    light: 6,
    dark: 5
  },
  white: '#ffffff',
  black: '#24292f',
  autoContrast: true,
  luminanceThreshold: 0.3,
  fontFamily: 'Open Sans',
  fontFamilyMonospace: 'Roboto Mono',
  headings: {
    fontFamily: 'Open Sans',
    fontWeight: '500',
    sizes: {
      h1: {
        fontSize: '3.125rem',
        lineHeight: '1.3',
        fontWeight: '700'
      },
      h2: {
        fontSize: '1.625rem',
        lineHeight: '1.35',
        fontWeight: '0'
      },
      h3: {
        fontSize: '1.375rem',
        lineHeight: '1.4',
        fontWeight: '0'
      },
      h4: {
        fontSize: '1.125rem',
        lineHeight: '1.45',
        fontWeight: '0'
      },
      h5: {
        fontSize: '1rem',
        lineHeight: '1.5',
        fontWeight: '0'
      },
      h6: {
        fontSize: '0.875rem',
        lineHeight: '1.5',
        fontWeight: '0'
      }
    }
  },
  scale: 1,
  radius: {
    xs: '0.325rem',
    sm: '0.75rem',
    md: '0.7rem',
    lg: '1.2rem',
    xl: '2.4rem'
  },
  spacing: {
    xs: '0.525rem',
    sm: '0.65rem',
    md: '0.9rem',
    lg: '1.35rem',
    xl: '2.2rem'
  },
  defaultRadius: 'md',
  breakpoints: {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em'
  },
  fontSmoothing: true,
  respectReducedMotion: false,
  focusRing: 'auto',
  cursorType: 'default',
  components: {
    Input: {
      defaultProps: {
        variant: 'default',
        radius: 'xl'
      },
      styles: {}
    },
    Card: {
      defaultProps: {
        withBorder: true
      },
      styles: {}
    }
  }
};

export const Sylveon: MantineThemeOverride = {
  colors: {
    dark: [
      '#f5f7ff',
      '#7182bd',
      '#415085',
      '#303c66',
      '#171d33',
      '#1b223b',
      '#10121a',
      '#0b0c0f',
      '#0d0d0f',
      '#0b0b0b'
    ],
    gray: [
      '#f5ebf3',
      '#f3e7f1',
      '#f1e4ee',
      '#efe0ec',
      '#edddea',
      '#b374a7',
      '#b56ba7',
      '#9e5490',
      '#572e50',
      '#10090f'
    ],
    blue: [
      '#eaeced',
      '#dbe7f2',
      '#cce2f6',
      '#bddefb',
      '#afd9fd',
      '#add9ff',
      '#4caafd',
      '#0e7ae1',
      '#07447d',
      '#010e18'
    ],
    green: [
      '#dafbe1',
      '#aceebb',
      '#6fdd8b',
      '#4ac26b',
      '#2da44e',
      '#1a7f37',
      '#116329',
      '#044f1e',
      '#003d16',
      '#002d11'
    ],
    yellow: [
      '#f7f1e5',
      '#faeacd',
      '#fce3b5',
      '#fddd9d',
      '#fed687',
      '#ffd685',
      '#ffb82d',
      '#ce8906',
      '#744d03',
      '#191102'
    ],
    orange: [
      '#fff1e5',
      '#ffd8b5',
      '#ffb77c',
      '#fb8f44',
      '#e16f24',
      '#bc4c00',
      '#953800',
      '#762c00',
      '#5c2200',
      '#471700'
    ],
    red: [
      '#fff5f5',
      '#ffe3e3',
      '#ffc9c9',
      '#ffa8a8',
      '#ff8787',
      '#ff6b6b',
      '#fa5252',
      '#f03e3e',
      '#e03131',
      '#c92a2a'
    ],
    pink: [
      '#fff0f6',
      '#ffdeeb',
      '#fcc2d7',
      '#faa2c1',
      '#f783ac',
      '#f06595',
      '#e64980',
      '#d6336c',
      '#c2255c',
      '#a61e4d'
    ],
    grape: [
      '#f8f0fc',
      '#f3d9fa',
      '#eebefa',
      '#e599f7',
      '#da77f2',
      '#cc5de8',
      '#be4bdb',
      '#ae3ec9',
      '#9c36b5',
      '#862e9c'
    ],
    violet: [
      '#f3f0ff',
      '#e5dbff',
      '#d0bfff',
      '#b197fc',
      '#9775fa',
      '#845ef7',
      '#7950f2',
      '#7048e8',
      '#6741d9',
      '#5f3dc4'
    ],
    indigo: [
      '#d6dbec',
      '#bfc7e6',
      '#a8b3e0',
      '#909fda',
      '#798bd4',
      '#798bd4',
      '#3d58c4',
      '#283e8b',
      '#152351',
      '#040918'
    ],
    cyan: [
      '#e3fafc',
      '#c5f6fa',
      '#99e9f2',
      '#66d9e8',
      '#3bc9db',
      '#22b8cf',
      '#15aabf',
      '#1098ad',
      '#0c8599',
      '#0b7285'
    ],
    teal: [
      '#e6fcf5',
      '#c3fae8',
      '#96f2d7',
      '#63e6be',
      '#38d9a9',
      '#20c997',
      '#12b886',
      '#0ca678',
      '#099268',
      '#087f5b'
    ],
    lime: [
      '#f4fce3',
      '#e9fac8',
      '#d8f5a2',
      '#c0eb75',
      '#a9e34b',
      '#94d82d',
      '#82c91e',
      '#74b816',
      '#66a80f',
      '#5c940d'
    ],
    fairy: virtualColor({
      name: "fairy",
      dark: "pink",
      light: "blue"
    })
  },
  primaryColor: 'fairy',
  primaryShade: {
    light: 6,
    dark: 5
  },
  white: '#ffffff',
  black: '#24292f',
  autoContrast: true,
  luminanceThreshold: 0.3,
  defaultGradient: {
    from: 'cyan',
    to: 'fairy',
    deg: 45
  },
  fontFamily: 'Poppins',
  fontFamilyMonospace: 'Roboto Mono',
  headings: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    sizes: {
      h1: {
        fontSize: '2.025rem',
        lineHeight: '1.3',
        fontWeight: '400'
      },
      h2: {
        fontSize: '1.625rem',
        lineHeight: '1.35',
        fontWeight: '500'
      },
      h3: {
        fontSize: '1.375rem',
        lineHeight: '1.4',
        fontWeight: '400'
      },
      h4: {
        fontSize: '1.125rem',
        lineHeight: '1.45',
        fontWeight: '500'
      },
      h5: {
        fontSize: '1rem',
        lineHeight: '1.5',
        fontWeight: '400'
      },
      h6: {
        fontSize: '0.875rem',
        lineHeight: '1.5',
        fontWeight: '400'
      }
    }
  },
  scale: 1,
  radius: {
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '2.2rem'
  },
  spacing: {
    xs: '0.525rem',
    sm: '1.15rem',
    md: '1.5rem',
    lg: '1.65rem',
    xl: '2.5rem'
  },
  defaultRadius: 'lg',
  breakpoints: {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em'
  },
  fontSmoothing: true,
  focusRing: 'auto',
  components: {
    Card: {
      defaultProps: {
        withBorder: true,
        radius: "md",
        padding: "lg"
      }
    },
  }
};

export const Goomy: MantineThemeOverride = {
  scale: 1,
  fontSmoothing: true,
  focusRing: "auto",
  white: "#ffffff",
  black: "#2e085c",
  colors: {
    dark: [
      "#ffffff",
      "#beb3d1",
      "#a495be",
      "#8a78aa",
      "#715d94",
      "#715d94",
      "#584872",
      "#3e3451",
      "#251f2f",
      "#0b0a0d"
    ],
    gray: [
      "#f0e7f3",
      "#ecdff0",
      "#e8d8ed",
      "#e4d1eb",
      "#e0cae8",
      "#e0cae8",
      "#b783ca",
      "#8845a1",
      "#4c265a",
      "#100713"
    ],
    green: [
      "#c3eac9",
      "#95dea0",
      "#91db88",
      "#80cc78",
      "#78b86c",
      "#77c46e",
      "#3d914c",
      "#31783e",
      "#1d662c",
      "#124d1a"
    ],
    red: [
      "#fff5f5",
      "#ffe3e3",
      "#ffc9c9",
      "#ffa8a8",
      "#eb6363",
      "#f24e4e",
      "#f75959",
      "#f55858",
      "#fc6868",
      "#c92a2a"
    ],
    blue: [
      "#dae4ed",
      "#c1d7ea",
      "#a8cae7",
      "#8fbce3",
      "#75afe0",
      "#75afe0",
      "#288ad6",
      "#0b619b",
      "#00385c",
      "#000f1c"
    ],
    darkgoo: [
      '#d1c7dd',
      '#af9ec3',
      '#8c76a9',
      '#6b5687',
      '#4b3c5e',
      '#4b3c5e',
      '#423454',
      '#2b2336',
      '#1c1722',
      '#0b0b0d'
    ],
    lightgoo: [
      '#eeecf3',
      '#efebf5',
      '#efebf7',
      '#efebf8',
      '#f0ebfa',
      '#f0ebfa',
      '#f7f5fa',
      '#6631d0',
      '#381a75',
      '#0c041a'
    ],
    goo: virtualColor({
      name: "goo",
      dark: "darkgoo",
      light: "lightgoo"
    })
  },
  primaryShade: {
    light: 5,
    dark: 5
  },
  primaryColor: "green",
  autoContrast: true,
  luminanceThreshold: 0.3,
  fontFamily: "Nunito",
  fontFamilyMonospace: "Roboto Mono",
  headings: {
    fontFamily: "Nunito",
    fontWeight: "600",
    sizes: {
      h1: {
        fontSize: "calc(2.125rem * var(--mantine-scale))",
        lineHeight: "1.3",
        fontWeight: "600"
      },
      h2: {
        fontSize: "calc(1.625rem * var(--mantine-scale))",
        lineHeight: "1.35",
        fontWeight: "600"
      },
      h3: {
        fontSize: "calc(1.375rem * var(--mantine-scale))",
        lineHeight: "1.4",
        fontWeight: "600"
      },
      h4: {
        fontSize: "calc(1.125rem * var(--mantine-scale))",
        lineHeight: "1.45",
        fontWeight: "600"
      },
      h5: {
        fontSize: "calc(1rem * var(--mantine-scale))",
        lineHeight: "1.5",
        fontWeight: "600"
      },
      h6: {
        fontSize: "calc(0.875rem * var(--mantine-scale))",
        lineHeight: "1.5",
        fontWeight: "600"
      }
    }
  },
  defaultRadius: "xl",
  defaultGradient: {
    from: "green",
    to: "lime",
    deg: 45
  },
  spacing: {
    xs: "calc(0.625rem * var(--mantine-scale))",
    sm: "calc(0.75rem * var(--mantine-scale))",
    md: "calc(1rem * var(--mantine-scale))",
    lg: "calc(1.25rem * var(--mantine-scale))",
    xl: "calc(2rem * var(--mantine-scale))"
  },
  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em"
  },
  radius: {
    xs: "calc(0.125rem * var(--mantine-scale))",
    sm: "calc(0.25rem * var(--mantine-scale))",
    md: "calc(0.5rem * var(--mantine-scale))",
    lg: "calc(1rem * var(--mantine-scale))",
    xl: "calc(2rem * var(--mantine-scale))"
  },
  components: {
    Card: {
      defaultProps: {
        bg: 'var(--mantine-color-goo-5)'
      },
      styles: {}
    },
    Paper: {
      defaultProps: {
        bg: 'var(--mantine-color-goo-6)',
        shadow: 'md'
      },
      styles: {}
    },
    Input: {
      defaultProps: {
        variant: 'default'
      },
      styles: {}
    }
  }
};

export const Vivillan: MantineThemeOverride = {
  scale: 1,
  fontSmoothing: true,
  focusRing: "auto",
  white: "#ffffff",
  black: "#07300a",
  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em"
  },
  colors: {
    dark: [
      "#f4f7f2",
      "#5fa839",
      "#748c86",
      "#4f756b",
      "#13403a",
      "#17382b",
      "#00170f",
      "#082624",
      "#07291e",
      "#020500"
    ],
    gray: [
      "#F8FAF6",
      "#F0F4EC",
      "#E5EAE0",
      "#D4DED0",
      "#A6B6A0",
      "#788D73",
      "#5D705A",
      "#455347",
      "#303C31",
      "#1F2A17"
    ],
    green: [
      "#E7F5E4",
      "#D0EBC9",
      "#B9E1AF",
      "#A2D794",
      "#8BCE7A",
      "#44A336",
      "#378929",
      "#2A6F1F",
      "#1D5415",
      "#113A0C"
    ],
    brown: [
      "#F7F2E7",
      "#EFE6D0",
      "#E6DABA",
      "#DECFA3",
      "#D5C38D",
      "#8B6D3F",
      "#725835",
      "#5A472C",
      "#423623",
      "#2A2419"
    ],
    moss: [
      "#e6f0ca",
      "#d4e6a2",
      "#c3dd79",
      "#b1d450",
      "#9bc22f",
      "#9bc22f",
      "#77971f",
      "#546c12",
      "#314107",
      "#0f1600"
    ],
    amber: [
      "#FFF8E7",
      "#FFF1D0",
      "#FFEABA",
      "#FFE3A3",
      "#FFDC8D",
      "#E6A517",
      "#BF8813",
      "#996C0F",
      "#73510B",
      "#4C3607"
    ],
    lime: [
      "#ebf5da",
      "#def2c1",
      "#d2eea7",
      "#c5ea8d",
      "#b8e673",
      "#b8e673",
      "#93da26",
      "#669e0c",
      "#395a04",
      "#0c1700"
    ],
    red: [
      "#e6c7c7",
      "#daa0a0",
      "#ce7979",
      "#c25252",
      "#a63a3a",
      "#a63a3a",
      "#832c2c",
      "#5e1f1f",
      "#3a1112",
      "#180404"
    ],
    orange: [
      "#ebd8c8",
      "#e3bd9b",
      "#dba26f",
      "#d28742",
      "#b56d2a",
      "#b56d2a",
      "#8e541d",
      "#673c12",
      "#402305",
      "#1b0a00"
    ],
    mist: [
      "#e4e9f0",
      "#d8e2ee",
      "#ccdaec",
      "#bfd3ea",
      "#b3cbe8",
      "#b3cbe8",
      "#6699d4",
      "#2b68ab",
      "#133a62",
      "#010d19"
    ],
    blue: [
      "#c9dae7",
      "#a1c1dd",
      "#79a9d2",
      "#5191c7",
      "#3677ad",
      "#3677ad",
      "#255d89",
      "#164264",
      "#09283e",
      "#000e18"
    ],
    grape: [
      "#e0c9e7",
      "#cda3d8",
      "#ba7ec9",
      "#a659ba",
      "#8b419e",
      "#8b419e",
      "#6d327c",
      "#4e2459",
      "#2f1536",
      "#110714"
    ],
    pink: [
      "#e8d0d9",
      "#dcb2c1",
      "#cf95a9",
      "#c27791",
      "#b55979",
      "#b55979",
      "#91405c",
      "#672d41",
      "#3d1a26",
      "#14070b"
    ],
    indigo: [
      "#cdd2e9",
      "#acb6de",
      "#8c9ad3",
      "#6b7dc8",
      "#4a61bd",
      "#4a61bd",
      "#354997",
      "#25346c",
      "#151e41",
      "#050916"
    ]
  },
  primaryShade: {
    light: 5,
    dark: 6
  },
  primaryColor: "moss",
  autoContrast: true,
  luminanceThreshold: 0.37,
  fontFamily: "Lato",
  fontFamilyMonospace: "Source Code Pro",
  headings: {
    fontFamily: "Playfair Display",
    fontWeight: "600",
    sizes: {
      h1: {
        fontSize: "calc(2.6rem * var(--mantine-scale))",
        fontWeight: "700",
        lineHeight: "1.3"
      },
      h2: {
        fontSize: "calc(2.1rem * var(--mantine-scale))",
        fontWeight: "600",
        lineHeight: "1.35"
      },
      h3: {
        fontSize: "calc(1.75rem * var(--mantine-scale))",
        fontWeight: "400",
        lineHeight: "1.4"
      },
      h4: {
        fontSize: "calc(1.425rem * var(--mantine-scale))",
        fontWeight: "200",
        lineHeight: "1.45"
      },
      h5: {
        fontSize: "calc(1rem * var(--mantine-scale))",
        fontWeight: "600",
        lineHeight: "1.5"
      },
      h6: {
        fontSize: "calc(0.875rem * var(--mantine-scale))",
        fontWeight: "600",
        lineHeight: "1.5"
      }
    }
  },
  defaultRadius: "md",
  components: {
    Button: {
      defaultProps: {
        variant: "filled",
        radius: "md",
        size: "sm"
      },
      styles: {
        root: {
          fontWeight: "600"
        }
      }
    },
    Card: {
      defaultProps: {
        withBorder: true,
        radius: "md",
        padding: "lg"
      }
    },
    Paper: {
      defaultProps: {
        radius: "md",
        withBorder: true,
        bg: "var(--mantine-color-default)"
      }
    },
    Badge: {
      defaultProps: {
        radius: "md",
        variant: "light"
      },
      styles: {
        root: {
          textTransform: "none",
          fontWeight: "500"
        }
      }
    },
    Blockquote: {
      defaultProps: {
        color: "amber"
      },
      styles: {}
    },
    Avatar: {
      defaultProps: {
        color: "mist"
      },
      styles: {}
    },
    Input: {
      defaultProps: {
        variant: "filled"
      },
      styles: {}
    }
  },
  spacing: {
    xs: "calc(0.625rem * var(--mantine-scale))",
    sm: "calc(1rem * var(--mantine-scale))",
    md: "calc(1.1rem * var(--mantine-scale))",
    lg: "calc(1.65rem * var(--mantine-scale))",
    xl: "calc(2.1rem * var(--mantine-scale))"
  },
  radius: {
    xs: "calc(0.125rem * var(--mantine-scale))",
    sm: "calc(0.25rem * var(--mantine-scale))",
    md: "calc(0.375rem * var(--mantine-scale))",
    lg: "calc(0.75rem * var(--mantine-scale))",
    xl: "calc(1.5rem * var(--mantine-scale))"
  },
  defaultGradient: {
    from: "moss",
    to: "lime",
    deg: 45
  }
};

export const premadeThemes: Record<string, MantineThemeOverride> = {
  Remoraid,
  Mantine,
  Murkrow,
  Sylveon,
  Goomy,
  Vivillan,
};
