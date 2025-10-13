import React, { useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box
} from '@mui/material';
import surahData from '../SurahList/surahData.json';
import Madina from '../../images/madina.png';
import Makka from '../../images/makka.png';
import SectionHeader from '../SectionHeader';
import AnimatedBackground from '../AnimatedBackground';
import './style.css';

const SelectedSurahs = memo(() => {
  const navigate = useNavigate();

  // Select 6 audio surahs as requested
  const selectedSurahs = [
    surahData.find(s => s.number === 18),  // Al-Kahf (Al-Kahaf)
    surahData.find(s => s.number === 12),  // Yusuf (Yousuf)
    surahData.find(s => s.number === 67),  // Al-Mulk
    surahData.find(s => s.number === 36),  // Yaseen
    surahData.find(s => s.number === 33),  // Al-Ahzaab
    surahData.find(s => s.number === 9),   // At-Tawba (At-Tauba)
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
                #{surah.number}
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

            {/* Right side - Arabic info with Icon */}
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
                کل آیات: {surah.numberOfAyahs}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <AnimatedBackground variant="default" particleCount={0} enableParticles={false}>
      <section className="selected-surahs-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <SectionHeader 
                title="آڈیو تفسیر"
                subtitle="تعلیم القرآن کی مکمل سورتوں کو تفسیر سنیں"
              />
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
    </AnimatedBackground>
  );
});

SelectedSurahs.displayName = 'SelectedSurahs';

export default SelectedSurahs;
