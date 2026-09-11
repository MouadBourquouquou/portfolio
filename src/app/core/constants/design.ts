/**
 * Mirrors the CSS design tokens defined in src/styles.css.
 * Used by the style guide and by services that need the palette at runtime.
 * Keep in sync with the @theme / :root blocks in styles.css.
 */
export const designTokens = {
  color: {
    background: '#F7F5F2',
    surface: '#FFFFFF',
    primary: '#111111',
    secondary: '#6B6B6B',
    border: '#E8E5E1',
    accent: '#0F766E',
    accentHover: '#115E59',
    success: '#15803D',
    onAccent: '#FFFFFF',
  },
  dark: {
    background: '#0A0A0A',
    surface: '#121212',
    primary: '#F5F5F5',
    secondary: '#A3A3A3',
    border: '#262626',
    accent: '#2DD4BF',
    accentHover: '#5EEAD4',
    success: '#4ADE80',
    onAccent: '#0A0A0A',
  },
  shadow: {
    card: '0 1px 2px rgba(17,17,17,0.04), 0 8px 30px rgba(17,17,17,0.06)',
    cardHover: '0 2px 4px rgba(17,17,17,0.05), 0 14px 40px rgba(17,17,17,0.12)',
    cardDark: '0 8px 40px rgba(0,0,0,0.30)',
    cardHoverDark: '0 14px 52px rgba(0,0,0,0.45)',
  },
  font: {
    heading: `'Cormorant Garamond', Georgia, 'Times New Roman', serif`,
    body: `'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif`,
  },
  radius: {
    sm: '0.375rem',
    md: '0.75rem',
    lg: '1.25rem',
    full: '9999px',
  },
  breakpoint: {
    xs: '30rem',
    sm: '40rem',
    md: '48rem',
    lg: '64rem',
    xl: '80rem',
    '2xl': '96rem',
  },
  spacing: {
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
  },
  easing: {
    outExpo: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
} as const;
