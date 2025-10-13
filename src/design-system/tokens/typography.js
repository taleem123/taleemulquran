// Design System Typography Tokens
export const typography = {
  // Font families
  fontFamily: {
    primary: ['Inter', 'system-ui', 'sans-serif'],
    secondary: ['Amiri', 'Times New Roman', 'serif'],
    mono: ['JetBrains Mono', 'Consolas', 'monospace'],
  },
  
  // Font sizes
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    xxl: '1.5rem',    // 24px
    xxxl: '1.875rem', // 30px
    huge: '2.25rem',  // 36px
    massive: '3rem',  // 48px
  },
  
  // Font weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
  
  // Typography scale
  scale: {
    h1: {
      fontSize: '2.25rem', // 36px
      fontWeight: 700,
      lineHeight: 1.2,
      fontFamily: 'primary',
    },
    h2: {
      fontSize: '1.875rem', // 30px
      fontWeight: 700,
      lineHeight: 1.3,
      fontFamily: 'primary',
    },
    h3: {
      fontSize: '1.5rem', // 24px
      fontWeight: 600,
      lineHeight: 1.3,
      fontFamily: 'primary',
    },
    h4: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
      lineHeight: 1.4,
      fontFamily: 'primary',
    },
    h5: {
      fontSize: '1.125rem', // 18px
      fontWeight: 600,
      lineHeight: 1.4,
      fontFamily: 'primary',
    },
    h6: {
      fontSize: '1rem', // 16px
      fontWeight: 600,
      lineHeight: 1.4,
      fontFamily: 'primary',
    },
    body1: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: 1.6,
      fontFamily: 'primary',
    },
    body2: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: 1.6,
      fontFamily: 'primary',
    },
    caption: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400,
      lineHeight: 1.4,
      fontFamily: 'primary',
    },
    overline: {
      fontSize: '0.75rem', // 12px
      fontWeight: 500,
      lineHeight: 1.4,
      fontFamily: 'primary',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  
  // Urdu/Arabic typography
  urdu: {
    fontFamily: ['Amiri', 'Times New Roman', 'serif'],
    direction: 'rtl',
    textAlign: 'right',
    fontSize: {
      sm: '0.9rem',
      md: '1rem',
      lg: '1.1rem',
      xl: '1.2rem',
      xxl: '1.5rem',
      xxxl: '2rem',
    },
  },
};

export default typography;
