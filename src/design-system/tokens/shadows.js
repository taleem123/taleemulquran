// Design System Shadow Tokens
export const shadows = {
  // Elevation shadows
  elevation: {
    0: 'none',
    1: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    2: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
    3: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    4: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
    5: '0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)',
  },
  
  // Component-specific shadows
  component: {
    card: {
      default: '0 2px 8px rgba(0, 0, 0, 0.06)',
      hover: '0 8px 25px rgba(0, 0, 0, 0.15)',
      active: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    button: {
      default: '0 2px 4px rgba(0, 0, 0, 0.1)',
      hover: '0 4px 8px rgba(0, 0, 0, 0.15)',
      active: '0 1px 2px rgba(0, 0, 0, 0.1)',
    },
    modal: {
      backdrop: '0 4px 20px rgba(0, 0, 0, 0.3)',
      content: '0 8px 32px rgba(0, 0, 0, 0.2)',
    },
    input: {
      default: '0 0 0 1px rgba(0, 0, 0, 0.1)',
      focus: '0 0 0 2px rgba(0, 167, 213, 0.3)',
      error: '0 0 0 2px rgba(255, 77, 79, 0.3)',
    },
  },
  
  // Interactive shadows
  interactive: {
    hover: '0 4px 12px rgba(0, 167, 213, 0.3)',
    focus: '0 0 0 3px rgba(0, 167, 213, 0.2)',
    active: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  
  // Platform-specific shadows
  platform: {
    youtube: '0 4px 12px rgba(255, 0, 0, 0.2)',
    facebook: '0 4px 12px rgba(24, 119, 242, 0.2)',
    tiktok: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
};

export default shadows;
