import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
    },
    surface: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
  fonts: {
    heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  fontSizes: {
    '2xs': '0.625rem',
    xs: '0.75rem',
    sm: '0.8125rem',
    md: '0.875rem',
    lg: '1rem',
    xl: '1.125rem',
    '2xl': '1.25rem',
    '3xl': '1.5rem',
    '4xl': '1.875rem',
    '5xl': '2.25rem',
    '6xl': '3rem',
    '7xl': '3.75rem',
  },
  radii: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
  },
  shadows: {
    card: '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
    elevated: '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
    modal: '0 20px 25px -5px rgb(0 0 0 / 0.12), 0 8px 10px -6px rgb(0 0 0 / 0.06)',
    glow: '0 0 0 3px rgba(99, 102, 241, 0.15)',
  },
  styles: {
    global: {
      body: {
        bg: 'surface.50',
        color: 'surface.900',
        fontSize: 'md',
        lineHeight: '1.6',
        WebkitFontSmoothing: 'antialiased',
      },
      '*::selection': {
        bg: 'brand.100',
        color: 'brand.900',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 600,
        borderRadius: 'md',
        _focus: { boxShadow: 'glow' },
      },
      sizes: {
        sm: { px: 3, py: 1.5, fontSize: 'sm' },
        md: { px: 4, py: 2, fontSize: 'sm' },
        lg: { px: 6, py: 3, fontSize: 'md' },
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: { bg: 'brand.600', _disabled: { bg: 'brand.300' } },
          _active: { bg: 'brand.700' },
        },
        ghost: {
          color: 'surface.700',
          _hover: { bg: 'surface.100' },
          _active: { bg: 'surface.200' },
        },
        outline: {
          borderColor: 'surface.200',
          color: 'surface.700',
          _hover: { bg: 'surface.50', borderColor: 'brand.300' },
        },
      },
      defaultProps: { size: 'md', variant: 'solid' },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'md',
          borderColor: 'surface.200',
          _focus: { borderColor: 'brand.400', boxShadow: 'glow' },
          _placeholder: { color: 'surface.400' },
        },
      },
      sizes: {
        md: { field: { px: 3, py: 2, fontSize: 'sm' } },
      },
      defaultProps: { size: 'md' },
    },
    Select: {
      baseStyle: {
        field: {
          borderRadius: 'md',
          borderColor: 'surface.200',
          _focus: { borderColor: 'brand.400', boxShadow: 'glow' },
        },
      },
    },
    Table: {
      baseStyle: {
        th: {
          fontWeight: 600,
          fontSize: 'xs',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'surface.500',
          borderBottom: '1px solid',
          borderColor: 'surface.100',
        },
        td: {
          fontSize: 'sm',
          borderBottom: '1px solid',
          borderColor: 'surface.100',
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          borderRadius: 'xl',
          boxShadow: 'modal',
        },
        header: {
          fontWeight: 600,
          fontSize: 'lg',
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'lg',
          boxShadow: 'card',
          bg: 'white',
          border: '1px solid',
          borderColor: 'surface.100',
        },
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: 'full',
        px: 2,
        py: 0.5,
        fontSize: '2xs',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      },
    },
    Tabs: {
      baseStyle: {
        tab: {
          fontWeight: 500,
          fontSize: 'sm',
          _selected: {
            color: 'brand.600',
            borderColor: 'brand.500',
          },
        },
      },
    },
    Tooltip: {
      baseStyle: {
        borderRadius: 'md',
        fontSize: 'xs',
        px: 3,
        py: 1.5,
      },
    },
    Toast: {
      defaultProps: {
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      },
    },
  },
})

export default theme
