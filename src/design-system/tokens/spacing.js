// Design System Spacing Tokens
export const spacing = {
  // Base spacing unit (8px)
  unit: 8,
  
  // Spacing scale
  xs: 4,    // 0.5 * unit
  sm: 8,    // 1 * unit
  md: 16,   // 2 * unit
  lg: 24,   // 3 * unit
  xl: 32,   // 4 * unit
  xxl: 48,  // 6 * unit
  xxxl: 64, // 8 * unit
  
  // Component-specific spacing
  component: {
    padding: {
      xs: 8,
      sm: 12,
      md: 16,
      lg: 20,
      xl: 24,
    },
    margin: {
      xs: 8,
      sm: 16,
      md: 24,
      lg: 32,
      xl: 40,
    },
    gap: {
      xs: 8,
      sm: 12,
      md: 16,
      lg: 20,
      xl: 24,
    },
  },
  
  // Layout spacing
  layout: {
    section: {
      padding: '80px 0',
      margin: '0 0 40px 0',
    },
    container: {
      padding: '0 20px',
      maxWidth: '1200px',
    },
    grid: {
      gap: 24,
      padding: '20px 0',
    },
  },
  
  // Responsive spacing
  responsive: {
    mobile: {
      section: {
        padding: '60px 0',
      },
      container: {
        padding: '0 15px',
      },
      grid: {
        gap: 16,
        padding: '16px 0',
      },
    },
    tablet: {
      section: {
        padding: '70px 0',
      },
      container: {
        padding: '0 20px',
      },
      grid: {
        gap: 20,
        padding: '18px 0',
      },
    },
  },
};

export default spacing;
