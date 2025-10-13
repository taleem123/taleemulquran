import React from 'react';
import { Typography, Box } from '@mui/material';
import { spacing, typography, colors } from '../../tokens';
import './style.css';

const SectionHeader = ({ 
  title, 
  titleUrdu, 
  description, 
  variant = 'default',
  align = 'center',
  className = '',
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'page':
        return {
          title: typography.scale.h1,
          titleUrdu: { ...typography.scale.h2, ...typography.urdu },
          description: typography.scale.body1,
          spacing: spacing.layout.section,
        };
      case 'section':
        return {
          title: typography.scale.h2,
          titleUrdu: { ...typography.scale.h3, ...typography.urdu },
          description: typography.scale.body1,
          spacing: spacing.component.margin.lg,
        };
      case 'subsection':
        return {
          title: typography.scale.h4,
          titleUrdu: { ...typography.scale.h5, ...typography.urdu },
          description: typography.scale.body2,
          spacing: spacing.component.margin.md,
        };
      default:
        return {
          title: typography.scale.h3,
          titleUrdu: { ...typography.scale.h4, ...typography.urdu },
          description: typography.scale.body1,
          spacing: spacing.component.margin.lg,
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Box 
      className={`section-header section-header--${variant} section-header--${align} ${className}`}
      sx={{
        textAlign: align,
        marginBottom: spacing.xs, // Much smaller margin
        ...props.sx,
      }}
      {...props}
    >
      {title && (
        <Typography
          variant="h3"
          component="h2"
          className="section-header__title"
          sx={{
            ...styles.title,
            color: colors.semantic.text.primary,
            marginBottom: titleUrdu ? spacing.xs : spacing.xs,
          }}
        >
          {title}
        </Typography>
      )}

      {titleUrdu && (
        <Typography
          variant="h4"
          component="h3"
          className="section-header__title-urdu"
          sx={{
            ...styles.titleUrdu,
            color: colors.brand.accent,
            marginBottom: description ? spacing.xs : spacing.xs,
          }}
        >
          {titleUrdu}
        </Typography>
      )}

      {description && (
        <Typography
          variant="body1"
          className="section-header__description"
          sx={{
            ...styles.description,
            color: colors.semantic.text.secondary,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: typography.lineHeight.relaxed,
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default SectionHeader;
