import React, { Fragment, useState, useCallback, useMemo } from 'react';

import {
  Typography,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Search
} from '@mui/icons-material';
import SectionHeader from '../../components/SectionHeader';
import AnimatedBackground from '../../components/AnimatedBackground';
import VideoCard from '../../components/VideoCard';
import { useShortVideos } from '../../hooks/useFirebaseData';

import Navbar from '../../components/Navbar'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import './style.css'

const ShortVideos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  
  // Use Firebase data
  const { videos: allVideos, loading, error } = useShortVideos();
  

  // Filter and sort videos
  const filteredVideos = useMemo(() => {
    // Create a new array to avoid mutating the original
    let filtered = [...allVideos];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (video.description && video.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter (removed since we don't have categories anymore)
    // if (filterBy !== 'all') {
    //   filtered = filtered.filter(video => video.category === filterBy);
    // }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
          return dateB - dateA;
        case 'oldest':
          const dateAOld = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
          const dateBOld = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
          return dateAOld - dateBOld;
        case 'most_viewed':
          return (b.views || 0) - (a.views || 0);
        case 'longest':
          // For now, sort by title length as we don't have duration
          return b.title.length - a.title.length;
        case 'shortest':
          // For now, sort by title length as we don't have duration
          return a.title.length - b.title.length;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, sortBy, allVideos]);


  if (loading) {
    return (
      <Fragment>
        <Navbar />
        <AnimatedBackground variant="cool" particleCount={0} enableParticles={false}>
          <section className="service-single-section section-padding">
            <div className="container">
              <SectionHeader 
              title="Short Videos"
              subtitle="All video explanations and teachings of the Holy Quran"
              />
              <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress />
              </Box>
            </div>
          </section>
        </AnimatedBackground>
        <Footer footerClass={'wpo-ne-footer-2'} />
        <Scrollbar />
      </Fragment>
    );
  }

  if (error) {
    return (
      <Fragment>
        <Navbar />
        <AnimatedBackground variant="cool" particleCount={0} enableParticles={false}>
          <section className="service-single-section section-padding">
            <div className="container">
              <SectionHeader 
              title="Short Videos"
              subtitle="All video explanations and teachings of the Holy Quran"
              />
              <Alert severity="error" sx={{ mt: 2 }}>
                Failed to load videos. Please try again later.
              </Alert>
            </div>
          </section>
        </AnimatedBackground>
        <Footer footerClass={'wpo-ne-footer-2'} />
        <Scrollbar />
      </Fragment>
    );
  }

  return (
        <Fragment>
      <Navbar />
      <AnimatedBackground variant="cool" particleCount={0} enableParticles={false}>
      <section className="service-single-section section-padding">
        <div className="container">
          <SectionHeader 
              title="Short Videos"
              subtitle="All video explanations and teachings of the Holy Quran"
          />

          {/* Search and Filter Bar */}
          <div className="search-filter-container">
            <TextField
              fullWidth
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />,
              }}
              className="search-input"
            />

            <div className="filter-controls">
              <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                    label="Sort By"
                >
                    <MenuItem value="newest">Newest</MenuItem>
                    <MenuItem value="oldest">Oldest</MenuItem>
                    <MenuItem value="most_viewed">Most Viewed</MenuItem>
                    <MenuItem value="longest">Longest</MenuItem>
                    <MenuItem value="shortest">Shortest</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="tafseer">Tafseer</MenuItem>
                  <MenuItem value="ethics">Ethics</MenuItem>
                  <MenuItem value="prayer">Prayer</MenuItem>
                  <MenuItem value="benefits">Benefits</MenuItem>
                  <MenuItem value="family">Family</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          {/* Results Count */}
          <div className="results-count">
            <Typography variant="body2" color="text.secondary">
              Showing {filteredVideos.length} of {allVideos.length} videos
            </Typography>
          </div>

          {/* Videos Grid */}
          <div className="videos-grid">
            <Grid container spacing={2}>
              {filteredVideos.length === 0 ? (
                <Grid size={12}>
                    <div className="empty-state">
                    <div className="empty-state-icon">🎥</div>
                    <h3>No videos found</h3>
                    <p>Try changing your search or filter criteria</p>
                    <Button 
                      variant="outlined" 
                      onClick={() => {
                        setSearchTerm('');
                        setFilterBy('all');
                        setSortBy('newest');
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                </Grid>
              ) : (
                filteredVideos.map((video) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={video.id}>
                    <VideoCard video={video} showModal={true} />
                  </Grid>
                ))
              )}
            </Grid>
          </div>
        </div>
      </section>
      </AnimatedBackground>


      <Footer footerClass={'wpo-ne-footer-2'} />
      <Scrollbar />
        </Fragment>
  );
};
export default ShortVideos;
