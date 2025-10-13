import React, { useState, useEffect, useCallback, useMemo } from 'react';
import surahData from './surahData.json';
import './style.css';
import './enhanced-style.css';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Alert, TextField, Button, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Madina from '../../images/madina.png';
import Makka from '../../images/makka.png';
import LoadingSpinner from '../LoadingSpinner';
import ErrorBoundary from '../ErrorBoundary';
import { Search, BookmarkBorder, Bookmark } from '@mui/icons-material';

const SurahList = (props) => {
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
    { value: 'all', label: 'تمام سورتیں', count: surahData.length },
    { value: 'meccan', label: 'مکی', count: surahData.filter(s => s.revelationType === 'Meccan').length },
    { value: 'medinan', label: 'مدنی', count: surahData.filter(s => s.revelationType === 'Medinan').length },
    { value: 'bookmarked', label: 'بک مارک', count: bookmarkedSurahs.size }
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
            <h2>{props.formate} تفسیر</h2>
            <p>آپ کسی بھی وقت سن، ڈاؤن لوڈ اور شیئر کر سکتے ہیں۔</p>
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
            <h2>{props.formate} تفسیر</h2>
            <p>آپ کسی بھی وقت سن، ڈاؤن لوڈ اور شیئر کر سکتے ہیں۔</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="search-filter-container">
            <TextField
              fullWidth
              placeholder="سورتوں کے نام یا ترجمہ سے تلاش کریں..."
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
              {filteredSurahs.length} میں سے {surahData.length} سورتیں دکھائی جا رہی ہیں
            </Typography>
          </Box>

          {/* Surah Grid */}
          <Box sx={{ width: '100%' }}>
            {filteredSurahs.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <h3>کوئی سورت نہیں ملی</h3>
                <p>اپنی تلاش یا فلٹر کی شرائط کو تبدیل کرنے کی کوشش کریں</p>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedFilter('all');
                  }}
                >
                  فلٹر صاف کریں
                </Button>
              </div>
            ) : (
              <div className="surahs-grid-container">
                {filteredSurahs.map((surah) => (
                  <Item
                    key={surah.number}
                    className="surah-tile"
                    onClick={() => _openDetails(props.formate, surah.number)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        _openDetails(props.formate, surah.number);
                      }
                    }}
                  >
                    <div className="surah-tile-content">
                      <div className="surah-tile-header">
                        {/* Left side - English info */}
                        <div className="surah-english-section">
                          <Typography
                            component="div"
                            className="surah-number"
                          >
                            {surah.number}
                          </Typography>
                          <Typography
                            component="div"
                            className="surah-english-name"
                          >
                            {surah.englishName}
                          </Typography>
                          <Typography
                            component="div"
                            className="surah-english-translation"
                          >
                            {surah.englishNameTranslation}
                          </Typography>
                        </div>

                        {/* Right side - Arabic info */}
                        <div className="surah-arabic-section">
                          <img
                            src={surah.revelationType === 'Medinan' ? Madina : Makka}
                            alt={surah.revelationType}
                            className="revelation-icon"
                            loading="lazy"
                          />
                          <Typography
                            component="div"
                            className="surah-arabic-name"
                          >
                            {surah.name}
                          </Typography>
                          <Typography
                            component="div"
                            className="surah-ayat-count"
                          >
                            Ayaat: {surah.numberOfAyahs}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </Item>
                ))}
              </div>
            )}
          </Box>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default SurahList;
