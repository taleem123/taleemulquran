// Animation Tokens
export const animations = {
  // Duration
  duration: {
    instant: '150ms',
    fast: '250ms',
    normal: '350ms',
    slow: '500ms',
    slower: '750ms',
    slowest: '1000ms',
  },
  
  // Easing Functions
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  },
  
  // Keyframes
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    fadeInUp: {
      from: { opacity: 0, transform: 'translateY(30px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    fadeInDown: {
      from: { opacity: 0, transform: 'translateY(-30px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    fadeInLeft: {
      from: { opacity: 0, transform: 'translateX(-30px)' },
      to: { opacity: 1, transform: 'translateX(0)' },
    },
    fadeInRight: {
      from: { opacity: 0, transform: 'translateX(30px)' },
      to: { opacity: 1, transform: 'translateX(0)' },
    },
    scaleIn: {
      from: { opacity: 0, transform: 'scale(0.8)' },
      to: { opacity: 1, transform: 'scale(1)' },
    },
    slideInUp: {
      from: { transform: 'translateY(100%)' },
      to: { transform: 'translateY(0)' },
    },
    slideInDown: {
      from: { transform: 'translateY(-100%)' },
      to: { transform: 'translateY(0)' },
    },
    pulse: {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.05)' },
      '100%': { transform: 'scale(1)' },
    },
    float: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-20px)' },
    },
    shimmer: {
      '0%': { backgroundPosition: '-1000px 0' },
      '100%': { backgroundPosition: '1000px 0' },
    },
    rotate: {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },
    wave: {
      '0%, 100%': { transform: 'rotate(0deg)' },
      '25%': { transform: 'rotate(-10deg)' },
      '75%': { transform: 'rotate(10deg)' },
    },
  },
  
  // Pre-built Animations
  presets: {
    fadeIn: 'fadeIn 0.5s ease-out',
    fadeInUp: 'fadeInUp 0.6s ease-out',
    fadeInDown: 'fadeInDown 0.6s ease-out',
    fadeInLeft: 'fadeInLeft 0.6s ease-out',
    fadeInRight: 'fadeInRight 0.6s ease-out',
    scaleIn: 'scaleIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    slideInUp: 'slideInUp 0.5s ease-out',
    slideInDown: 'slideInDown 0.5s ease-out',
    pulse: 'pulse 2s ease-in-out infinite',
    float: 'float 3s ease-in-out infinite',
    shimmer: 'shimmer 2s linear infinite',
    rotate: 'rotate 1s linear infinite',
    wave: 'wave 1s ease-in-out infinite',
  },
  
  // Hover Effects
  hover: {
    lift: {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    scale: {
      transform: 'scale(1.05)',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    glow: {
      boxShadow: '0 0 20px rgba(0, 167, 213, 0.5)',
      transition: 'box-shadow 0.3s ease',
    },
    brighten: {
      filter: 'brightness(1.1)',
      transition: 'filter 0.3s ease',
    },
  },
  
  // Stagger Delays (for sequential animations)
  stagger: {
    children: (index) => ({
      animationDelay: `${index * 100}ms`,
    }),
  },
};

export default animations;

