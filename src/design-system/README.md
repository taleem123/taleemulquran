# Design System

A comprehensive design system built with React and Material-UI, following atomic design principles.

## 🏗️ Architecture

### Atomic Design Structure
```
src/design-system/
├── tokens/           # Design tokens (colors, spacing, typography, shadows)
├── atoms/           # Basic building blocks (Button, SectionHeader)
├── molecules/       # Simple combinations (VideoCard)
├── organisms/       # Complex components (VideoGrid, VideoSection)
├── components/      # Complete features (UniversalVideoPlayer)
└── index.js        # Main exports
```

## 🎨 Design Tokens

### Colors
- **Primary**: Blue color palette (#00a7d5)
- **Secondary**: Complementary colors
- **Brand**: Brand-specific colors
- **Neutral**: Grayscale palette
- **Semantic**: Text, background, border colors
- **Platform**: YouTube, Facebook, TikTok colors

### Spacing
- **Base unit**: 8px
- **Scale**: xs(4px) → sm(8px) → md(16px) → lg(24px) → xl(32px) → xxl(48px) → xxxl(64px)
- **Component-specific**: Padding, margin, gap values
- **Layout**: Section, container, grid spacing
- **Responsive**: Mobile, tablet, desktop variations

### Typography
- **Font families**: Inter (primary), Amiri (secondary), JetBrains Mono (mono)
- **Font sizes**: xs(12px) → sm(14px) → md(16px) → lg(18px) → xl(20px) → xxl(24px) → xxxl(30px) → huge(36px) → massive(48px)
- **Font weights**: light(300) → normal(400) → medium(500) → semibold(600) → bold(700) → extrabold(800)
- **Line heights**: tight(1.2) → normal(1.4) → relaxed(1.6) → loose(1.8)
- **Scale**: h1-h6, body1-body2, caption, overline
- **Urdu/Arabic**: RTL support with Amiri font

### Shadows
- **Elevation**: 0-5 levels with increasing depth
- **Component-specific**: Card, button, modal, input shadows
- **Interactive**: Hover, focus, active states
- **Platform-specific**: YouTube, Facebook, TikTok shadows

## 🧩 Components

### Atoms
- **SectionHeader**: Consistent section headers with variants (page, section, subsection)
- **Button**: Primary, secondary, outline, ghost, danger variants with sizes

### Molecules
- **VideoCard**: Unified video card component with platform support

### Organisms
- **VideoGrid**: Responsive grid layout for video cards
- **VideoSection**: Complete video section with header, grid, and view all button

### Components
- **UniversalVideoPlayer**: Single video player supporting YouTube, Facebook, TikTok

## 🚀 Usage

### Basic Import
```javascript
import { VideoSection, VideoCard, SectionHeader } from '../design-system';
```

### Using Design Tokens
```javascript
import { colors, spacing, typography } from '../design-system';

const styles = {
  backgroundColor: colors.brand.primary,
  padding: spacing.lg,
  fontSize: typography.fontSize.lg,
};
```

### Video Section Example
```javascript
import { VideoSection } from '../design-system';

const MyComponent = () => {
  const videos = [
    {
      id: 1,
      title: 'Video Title',
      titleUrdu: 'ویڈیو کا عنوان',
      sources: ['https://youtube.com/watch?v=123'],
      platform: 'youtube',
      duration: '5:30',
      views: '1K',
      date: '1/1/2024',
    },
  ];

  return (
    <VideoSection
      title="Recent Videos"
      titleUrdu="حالیہ ویڈیوز"
      description="Latest video content"
      videos={videos}
      onVideoClick={(video) => console.log('Video clicked:', video)}
      onDirectPlay={(video) => window.open(video.sources[0], '_blank')}
      onDownload={(video) => console.log('Download:', video)}
      onShare={(video) => console.log('Share:', video)}
      variant="section"
      columns={{ xs: 1, sm: 2, md: 3 }}
    />
  );
};
```

### Section Header Example
```javascript
import { SectionHeader } from '../design-system';

const MyComponent = () => (
  <SectionHeader
    title="Page Title"
    titleUrdu="صفحہ کا عنوان"
    description="Page description"
    variant="page"
    align="center"
  />
);
```

### Button Example
```javascript
import { Button } from '../design-system';

const MyComponent = () => (
  <Button
    variant="primary"
    size="large"
    onClick={() => console.log('Clicked')}
    startIcon={<PlayArrow />}
  >
    Play Video
  </Button>
);
```

## 🎯 Benefits

### Consistency
- Unified design language across all components
- Consistent spacing, colors, and typography
- Standardized component APIs

### Reusability
- Atomic design principles
- Composable components
- Shared design tokens

### Maintainability
- Single source of truth for design decisions
- Easy to update colors, spacing, etc.
- Centralized component logic

### Performance
- Optimized components with proper memoization
- Lazy loading support
- Reduced bundle size through tree shaking

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- High contrast mode support
- Reduced motion support

## 🔧 Customization

### Theme Override
```javascript
import { createTheme } from '@mui/material/styles';
import { colors, typography } from '../design-system';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.brand.primary,
    },
  },
  typography: {
    fontFamily: typography.fontFamily.primary.join(', '),
  },
});
```

### Component Variants
```javascript
// Custom video card variant
<VideoCard
  video={video}
  variant="compact"
  onClick={handleClick}
  sx={{
    '&:hover': {
      transform: 'scale(1.05)',
    },
  }}
/>
```

## 📱 Responsive Design

All components are built with mobile-first responsive design:
- **Mobile**: < 768px
- **Tablet**: 768px - 991px
- **Desktop**: > 991px

## ♿ Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Focus management
- High contrast mode
- Reduced motion support

## 🎨 Dark Mode Ready

The design system is prepared for dark mode implementation:
- CSS custom properties for colors
- Theme-aware components
- Consistent contrast ratios

## 📦 Bundle Size

The design system is optimized for minimal bundle impact:
- Tree-shakable exports
- Lazy loading support
- Minimal dependencies
- Optimized CSS
