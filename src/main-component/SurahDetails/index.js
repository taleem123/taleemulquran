import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import Navbar from '../../components/Navbar';
import SectionHeader from '../../components/SectionHeader';
import AnimatedBackground from '../../components/AnimatedBackground';
import Footer from '../../components/footer';
import Scrollbar from '../../components/scrollbar';
import './style.css';
import surahData from '../../components/SurahList/surahData.json';
const SurahDetails = () => {
  const location = useLocation();
  const params = useParams();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get surah data from location state or URL parameters
  useEffect(() => {
    if (location.state?.surah) {
      setSurah(location.state.surah);
      setLoading(false);
    } else if (params.surahNumber) {
      // If coming from URL parameters, find surah data from JSON
      const surahNumber = parseInt(params.surahNumber);
      const foundSurah = surahData.find(s => s.number === surahNumber);
      if (foundSurah) {
        setSurah(foundSurah);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [location.state, params.surahNumber]);

  if (loading) {
    return (
      <Fragment>
        <Navbar />
        <AnimatedBackground variant="cool" particleCount={0} enableParticles={false}>
          <section className="service-single-section section-padding">
            <div className="container">
              <SectionHeader 
                title="Audio Tafseer"
                subtitle="Listen to the detailed tafseer of the Holy Quran"
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

  if (!surah) {
    return (
      <Fragment>
        <Navbar />
        <AnimatedBackground variant="cool" particleCount={0} enableParticles={false}>
          <section className="service-single-section section-padding">
            <div className="container">
              <SectionHeader 
                title="Audio Tafseer"
                subtitle="Listen to the detailed tafseer of the Holy Quran"
              />
              <Box display="flex" justifyContent="center" py={4}>
                <Typography variant="h6" color="error">
                  Surah data is not available. Please try again.
                </Typography>
              </Box>
            </div>
          </section>
        </AnimatedBackground>
        <Footer footerClass={'wpo-ne-footer-2'} />
        <Scrollbar />
      </Fragment>
    );
  }

  const SoundCloudPlaylist = ({ playlistUrl }) => {
    const [isLoading, setIsLoading] = React.useState(true);

    return (
      <div className="soundcloud-container">
        {isLoading && (
          <Typography variant="body2" color="textSecondary">
            پلے لسٹ لوڈ ہو رہی ہے...
          </Typography>
        )}
        <iframe
          className="soundcloud-iframe" 
          src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
            playlistUrl
          )}&auto_play=false&allowfullscreen=true&download=true&sharing=false&buying=false&frameborder=no&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false&allowtransparency=true&color=%230066cc&show_teaser=false&show_artwork=true&s=small&show_playcount=false&show_user=false`} 
          allow="autoplay"
          title={`Playlist for ${surah.englishName}`}
          aria-label={`Audio playlist for Surah ${surah.englishName}`}
          onLoad={() => setIsLoading(false)}
        ></iframe>
      </div>
    );
  };


  return (
    <Fragment>
      <Navbar />
      <AnimatedBackground variant="cool" particleCount={0} enableParticles={false}>
        <section className="service-single-section section-padding">
          <div className="container">
            <SectionHeader 
              title="Audio Tafseer"
              subtitle="Listen to the detailed tafseer of the Holy Quran"
            />
            
            {/* Surah Information - Single Card */}
            <div className="surah-info-container">
              <Card className="surah-info-card">
                <CardContent>
                  <div className="surah-info-content">
                    {/* Left Side - English */}
                    <div className="surah-info-left">
                      <div className="surah-number-section">
                        <Typography variant="h2" className="surah-number">
                          #{surah.number}
                        </Typography>
                      </div>
                      <div className="surah-details">
                        <Typography variant="h4" className="surah-english-name">
                          {surah.englishName}
                        </Typography>
                        <Typography variant="h6" className="surah-meaning">
                          {surah.englishNameTranslation}
                        </Typography>
                        <div className="surah-meta">
                          <Typography variant="body1" className="revelation-type">
                            {surah.revelationType === 'Meccan' ? 'Meccan' : 'Medinan'} • {surah.numberOfAyahs} Verses
                          </Typography>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="surah-info-divider"></div>

                    {/* Right Side - Arabic/Urdu */}
                    <div className="surah-info-right">
                      <Typography variant="h3" className="arabic-text">
                        {surah.name}
                      </Typography>
                      <div className="surah-meta-arabic">
                        <Typography variant="body1" className="revelation-type-arabic">
                          {surah.revelationType === 'Meccan' ? 'مکی' : 'مدنی'}
                        </Typography>
                        <Typography variant="body1" className="ayah-count-arabic">
                          کل آیات: {surah.numberOfAyahs}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Audio Player Section */}
            <div className="audio-player-section">
              <Card className="audio-player-card">
                <CardContent>
                  <Typography variant="h5" className="player-title">
                    Audio Tafseer
                  </Typography>
                  <Typography variant="body1" className="player-subtitle">
                    Listen to the detailed tafseer of {surah.englishName}
                  </Typography>
                  <div className="soundcloud-container">
                    <SoundCloudPlaylist playlistUrl={surah.playlistUrl} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </AnimatedBackground>

      <Footer footerClass={'wpo-ne-footer-2'} />
      <Scrollbar />
    </Fragment>
  );
};

export default SurahDetails;
