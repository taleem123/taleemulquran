import React from 'react';
import { Skeleton, Box, Grid } from '@mui/material';

const SkeletonLoader = ({ 
  variant = 'rectangular', 
  width = '100%', 
  height = 20,
  count = 1,
  spacing = 1,
  animation = 'wave'
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <Skeleton
      key={index}
      variant={variant}
      width={width}
      height={height}
      animation={animation}
      sx={{ marginBottom: spacing }}
    />
  ));

  return <Box>{skeletons}</Box>;
};

// Specific skeleton components for different use cases
export const SurahCardSkeleton = () => (
  <Box sx={{ padding: 2, border: '1px solid #e0e0e0', borderRadius: 2, margin: 1 }}>
    <Skeleton variant="rectangular" width="100%" height={120} sx={{ marginBottom: 2 }} />
    <Skeleton variant="text" width="60%" height={24} sx={{ marginBottom: 1 }} />
    <Skeleton variant="text" width="40%" height={20} sx={{ marginBottom: 1 }} />
    <Skeleton variant="text" width="80%" height={16} />
  </Box>
);

export const SurahListSkeleton = ({ count = 6 }) => (
  <Grid container spacing={2}>
    {Array.from({ length: count }, (_, index) => (
      <Grid xs={12} md={6} key={index}>
        <SurahCardSkeleton />
      </Grid>
    ))}
  </Grid>
);

export const AudioPlayerSkeleton = () => (
  <Box sx={{ padding: 3, textAlign: 'center' }}>
    <Skeleton variant="rectangular" width="100%" height={200} sx={{ marginBottom: 2 }} />
    <Skeleton variant="text" width="50%" height={24} sx={{ margin: '0 auto', marginBottom: 1 }} />
    <Skeleton variant="text" width="30%" height={20} sx={{ margin: '0 auto' }} />
  </Box>
);

export const NavigationSkeleton = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
    <Skeleton variant="circular" width={40} height={40} sx={{ marginRight: 2 }} />
    <Skeleton variant="text" width={200} height={24} />
  </Box>
);

export default SkeletonLoader;
