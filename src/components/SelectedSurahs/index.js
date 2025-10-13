import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Grid
} from '@mui/material';
import surahData from '../SurahList/surahData.json';
import Madina from '../../images/madina.png';
import Makka from '../../images/makka.png';
import './style.css';

const SelectedSurahs = () => {
  const navigate = useNavigate();

  // Select 6 popular/important Surahs
  const selectedSurahs = [
    surahData.find(s => s.number === 1),   // Al-Faatiha
    surahData.find(s => s.number === 2),   // Al-Baqara
    surahData.find(s => s.number === 3),   // Aal-i-Imraan
    surahData.find(s => s.number === 4),   // An-Nisaa
    surahData.find(s => s.number === 5),   // Al-Maaida
    surahData.find(s => s.number === 6),   // Al-An'aam
  ].filter(Boolean);

  const handleSurahClick = useCallback((surah) => {
    navigate(`/tafseer/audios/${surah.number}`, { state: { surah } });
  }, [navigate]);

  const SurahTile = ({ surah }) => {
    const isMeccan = surah.revelationType === 'Meccan';
    
    return (
      <Card 
        className="surah-tile"
        onClick={() => handleSurahClick(surah)}
      >
        <CardContent className="surah-tile-content">
          <Box className="surah-tile-header">
            {/* Left side - English info */}
            <Box className="surah-english-section">
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
            </Box>

            {/* Right side - Arabic info */}
            <Box className="surah-arabic-section">
              <img
                src={isMeccan ? Makka : Madina}
                alt={isMeccan ? 'Meccan' : 'Medinan'}
                className="revelation-icon"
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
                Ayat: {surah.numberOfAyahs}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="selected-surahs-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-header">
              <Typography 
                variant="h3" 
                component="h2"
                className="section-title"
                sx={{
                  fontWeight: 'bold',
                  color: '#1a365d',
                  mb: 2,
                  textAlign: 'center'
                }}
              >
                منتخب سورتیں
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{
                  textAlign: 'center',
                  mb: 4,
                  maxWidth: '600px',
                  margin: '0 auto 2rem'
                }}
              >
                قرآن کریم کی منتخب سورتوں کو سنیں اور سیکھیں
              </Typography>
            </div>
          </div>
        </div>

        <div className="surahs-grid">
          <div className="surahs-grid-container">
            {selectedSurahs.map((surah) => (
              <SurahTile key={surah.number} surah={surah} />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <button
            className="view-all-btn"
            onClick={() => navigate('/tafseer/audios')}
          >
            تمام سورتیں دیکھیں
          </button>
        </Box>
      </div>
    </section>
  );
};

export default SelectedSurahs;
