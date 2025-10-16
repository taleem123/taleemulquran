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
import { useLessons } from '../../hooks/useFirebaseData';

import Navbar from '../../components/Navbar'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import './style.css'

const SelectedLessonsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  
  // Use Firebase data
  const { lessons: allLessons, loading, error } = useLessons();
  

  // Filter and sort lessons
  const filteredLessons = useMemo(() => {
    // Create a new array to avoid mutating the original
    let filtered = [...allLessons];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(lesson =>
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lesson.description && lesson.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter (removed since we don't have categories anymore)
    // if (filterBy !== 'all') {
    //   filtered = filtered.filter(lesson => lesson.category === filterBy);
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
  }, [searchTerm, sortBy, allLessons]);



  if (loading) {
    return (
      <Fragment>
        <Navbar />
        <AnimatedBackground variant="purple" particleCount={0} enableParticles={false}>
          <section className="service-single-section section-padding">
            <div className="container">
              <SectionHeader 
              title="Selected Lessons"
              subtitle="Detailed interpretation lessons, stories and comprehensive lectures for guidance"
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
        <AnimatedBackground variant="purple" particleCount={0} enableParticles={false}>
          <section className="service-single-section section-padding">
            <div className="container">
              <SectionHeader 
              title="Selected Lessons"
              subtitle="Detailed interpretation lessons, stories and comprehensive lectures for guidance"
              />
              <Alert severity="error" sx={{ mt: 2 }}>
                Failed to load lessons. Please try again later.
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
      <AnimatedBackground variant="purple" particleCount={0} enableParticles={false}>
      <section className="service-single-section section-padding">
        <div className="container">
          <SectionHeader 
              title="Selected Lessons"
              subtitle="Detailed interpretation lessons, stories and comprehensive lectures for guidance"
          />

          {/* Search and Filter Bar */}
          <div className="search-filter-container">
            <TextField
              fullWidth
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />,
              }}
              className="search-input"
            />

            <div className="filter-controls">
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>ترتیب</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="ترتیب"
                >
                  <MenuItem value="newest">تازہ ترین</MenuItem>
                  <MenuItem value="oldest">پرانی</MenuItem>
                  <MenuItem value="most_viewed">زیادہ دیکھی گئی</MenuItem>
                  <MenuItem value="longest">طویل</MenuItem>
                  <MenuItem value="shortest">مختصر</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>قسم</InputLabel>
                <Select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  label="قسم"
                >
                  <MenuItem value="all">تمام</MenuItem>
                  <MenuItem value="tafseer">تفسیر</MenuItem>
                  <MenuItem value="ethics">اخلاق</MenuItem>
                  <MenuItem value="prayer">نماز</MenuItem>
                  <MenuItem value="benefits">فوائد</MenuItem>
                  <MenuItem value="family">خاندان</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          {/* Results Count */}
          <div className="results-count">
            <Typography variant="body2" color="text.secondary">
              {filteredLessons.length} میں سے {allLessons.length} ویڈیوز دکھائی جا رہی ہیں
            </Typography>
          </div>

          {/* Lessons Grid */}
          <div className="videos-grid">
            <Grid container spacing={2}>
              {filteredLessons.length === 0 ? (
                <Grid size={12}>
                  <div className="empty-state">
                    <div className="empty-state-icon">📚</div>
                    <h3>کوئی سبق نہیں ملا</h3>
                    <p>اپنی تلاش کی شرائط کو تبدیل کرنے کی کوشش کریں</p>
                    <Button 
                      variant="outlined" 
                      onClick={() => {
                        setSearchTerm('');
                        setFilterBy('all');
                        setSortBy('newest');
                      }}
                    >
                      فلٹر صاف کریں
                    </Button>
                  </div>
                </Grid>
              ) : (
                filteredLessons.map((lesson) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={lesson.id}>
                    <VideoCard video={lesson} showModal={true} />
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

export default SelectedLessonsPage;
