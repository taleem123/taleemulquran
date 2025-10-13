import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { spacing, typography, colors, shadows } from '../../tokens';
import './style.css';

const Button = ({ 
  variant = 'primary',
  size = 'medium',
  children,
  className = '',
  fullWidth = false,
  disabled = false,
  loading = false,
  startIcon,
  endIcon,
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.brand.primary,
          color: colors.neutral[0],
          border: `1px solid ${colors.brand.primary}`,
          '&:hover': {
            backgroundColor: colors.brand.primary,
            opacity: 0.9,
            transform: 'translateY(-2px)',
            boxShadow: shadows.interactive.hover,
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        };
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          color: colors.brand.primary,
          border: `1px solid ${colors.brand.primary}`,
          '&:hover': {
            backgroundColor: colors.brand.primary,
            color: colors.neutral[0],
            transform: 'translateY(-2px)',
            boxShadow: shadows.interactive.hover,
          },
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: colors.semantic.text.primary,
          border: `1px solid ${colors.semantic.border.primary}`,
          '&:hover': {
            backgroundColor: colors.semantic.background.secondary,
            borderColor: colors.brand.primary,
            color: colors.brand.primary,
          },
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: colors.semantic.text.secondary,
          border: 'none',
          '&:hover': {
            backgroundColor: colors.semantic.background.secondary,
            color: colors.semantic.text.primary,
          },
        };
      case 'danger':
        return {
          backgroundColor: colors.semantic.error,
          color: colors.neutral[0],
          border: `1px solid ${colors.semantic.error}`,
          '&:hover': {
            backgroundColor: colors.semantic.error,
            opacity: 0.9,
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(255, 77, 79, 0.3)',
          },
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: `${spacing.xs}px ${spacing.md}px`,
          fontSize: typography.fontSize.sm,
          minHeight: '32px',
        };
      case 'medium':
        return {
          padding: `${spacing.sm}px ${spacing.lg}px`,
          fontSize: typography.fontSize.md,
          minHeight: '40px',
        };
      case 'large':
        return {
          padding: `${spacing.md}px ${spacing.xl}px`,
          fontSize: typography.fontSize.lg,
          minHeight: '48px',
        };
      default:
        return {};
    }
  };

  return (
    <MuiButton
      className={`design-button design-button--${variant} design-button--${size} ${className}`}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        ...getVariantStyles(),
        ...getSizeStyles(),
        borderRadius: '25px',
        fontWeight: typography.fontWeight.medium,
        textTransform: 'none',
        transition: 'all 0.3s ease',
        boxShadow: shadows.component.button.default,
        '&:hover': {
          ...getVariantStyles()['&:hover'],
          boxShadow: shadows.component.button.hover,
        },
        '&:active': {
          ...getVariantStyles()['&:active'],
          boxShadow: shadows.component.button.active,
        },
        '&:disabled': {
          opacity: 0.6,
          cursor: 'not-allowed',
          transform: 'none',
        },
        ...props.sx,
      }}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </MuiButton>
  );
};

export default Button;
