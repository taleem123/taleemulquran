import React, { useState, useEffect, useCallback, useMemo } from 'react';
import surahData from './surahData.json';
import './enhanced-style.css';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Box, Alert, TextField, Button, Chip, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Madina from '../../images/madina.png';
import Makka from '../../images/makka.png';
import LoadingSpinner from '../LoadingSpinner';
import ErrorBoundary from '../ErrorBoundary';
import { Search, FilterList, PlayArrow, BookmarkBorder, Bookmark } from '@mui/icons-material';

const EnhancedSurahList = (props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [bookmarkedSurahs, setBookmarkedSurahs] = useState(new Set());

  // Simulate loading for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const _openDetails = useCallback((format, surahNumber) => {
    try {
      const selectedSurah = surahData.find((surah) => surah.number === surahNumber);
      if (!selectedSurah) {
        setError('Surah not found');
        return;
      }
      navigate(`/tafseer/${format}/${surahNumber}`, { state: { surah: selectedSurah } });
    } catch (err) {
      setError('Error navigating to surah details');
      console.error('Navigation error:', err);
    }
  }, [navigate]);

  const toggleBookmark = useCallback((surahNumber) => {
    setBookmarkedSurahs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(surahNumber)) {
        newSet.delete(surahNumber);
      } else {
        newSet.add(surahNumber);
      }
      return newSet;
    });
  }, []);

  // Filter and search logic
  const filteredSurahs = useMemo(() => {
    let filtered = surahData;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(surah => 
        surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.englishNameTranslation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.name.includes(searchTerm)
      );
    }

    // Apply revelation type filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(surah => 
        selectedFilter === 'meccan' ? surah.revelationType === 'Meccan' :
        selectedFilter === 'medinan' ? surah.revelationType === 'Medinan' :
        selectedFilter === 'bookmarked' ? bookmarkedSurahs.has(surah.number) :
        true
      );
    }

    return filtered;
  }, [searchTerm, selectedFilter, bookmarkedSurahs]);

  const filterOptions = [
    { value: 'all', label: 'All Surahs', count: surahData.length },
    { value: 'meccan', label: 'Meccan', count: surahData.filter(s => s.revelationType === 'Meccan').length },
    { value: 'medinan', label: 'Medinan', count: surahData.filter(s => s.revelationType === 'Medinan').length },
    { value: 'bookmarked', label: 'Bookmarked', count: bookmarkedSurahs.size }
  ];

  const Item = styled(Paper)(({ theme }) => ({
    padding: 0,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    }
  }));

  if (error) {
    return (
      <section className="service-single-section section-padding">
        <div className="container">
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="service-single-section section-padding">
        <div className="container">
          <div className="service-single-content">
            <h2>{props.formate} Tafseer</h2>
            <p>You can listen, download and share anytime.</p>
          </div>
          <LoadingSpinner message="Loading Surahs..." />
        </div>
      </section>
    );
  }

  return (
    <ErrorBoundary>
      <section className="service-single-section section-padding">
        <div className="container">
          <div className="service-single-content">
            <h2>{props.formate} Tafseer</h2>
            <p>You can listen, download and share anytime.</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="search-filter-container">
            <TextField
              fullWidth
              placeholder="Search Surahs by name or translation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />,
              }}
              className="search-input"
            />
            
            <div className="filter-buttons">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={selectedFilter === option.value ? 'contained' : 'outlined'}
                  onClick={() => setSelectedFilter(option.value)}
                  className="filter-btn"
                  size="small"
                >
                  {option.label} ({option.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <Box sx={{ marginBottom: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredSurahs.length} of {surahData.length} Surahs
            </Typography>
          </Box>

          {/* Surah Grid */}
          <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {filteredSurahs.length === 0 ? (
                <Grid xs={12}>
                  <div className="empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <h3>No Surahs Found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                    <Button 
                      variant="outlined" 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedFilter('all');
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </Grid>
              ) : (
                filteredSurahs.map((surah) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    key={surah.number}
                  >
                    <Item 
                      className="surah-card"
                      onClick={() => _openDetails(props.formate, surah.number)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          _openDetails(props.formate, surah.number);
                        }
                      }}
                    >
                      <div className="surah-card-content">
                        <div className="surah-header">
                          <Typography 
                            component="div" 
                            className="surah-number"
                            variant="h4"
                          >
                            {surah.number}
                          </Typography>
                          <img
                            src={surah.revelationType === 'Medinan' ? Madina : Makka}
                            width="40px"
                            height="40px"
                            alt={surah.revelationType}
                            className="revelation-icon"
                            loading="lazy"
                          />
                        </div>

                        <Typography 
                          component="div" 
                          className="surah-arabic-name"
                          variant="h6"
                        >
                          {surah.name}
                        </Typography>

                        <Typography 
                          component="div" 
                          className="surah-ayat-count"
                          variant="body2"
                        >
                          Ayat: {surah.numberOfAyahs}
                        </Typography>

                        <div className="surah-english-info">
                          <Typography 
                            component="div" 
                            className="surah-english-name"
                            variant="subtitle1"
                          >
                            {surah.englishName}
                          </Typography>
                          <Typography 
                            component="div" 
                            className="surah-english-translation"
                            variant="body2"
                          >
                            {surah.englishNameTranslation}
                          </Typography>
                        </div>

                        {/* Action Buttons */}
                        <div className="surah-action-btn">
                          <PlayArrow />
                        </div>

                        {/* Bookmark Button */}
                        <IconButton
                          className="bookmark-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(surah.number);
                          }}
                          sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 1)',
                            }
                          }}
                        >
                          {bookmarkedSurahs.has(surah.number) ? 
                            <Bookmark color="primary" /> : 
                            <BookmarkBorder />
                          }
                        </IconButton>
                      </div>
                    </Item>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default EnhancedSurahList;
