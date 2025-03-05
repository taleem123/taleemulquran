import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import PageTitle from '../../components/pagetitle';
import Footer from '../../components/footer';
import Scrollbar from '../../components/scrollbar';
import Box from '@mui/material/Box';
import './style.css';
import { Grid2, Typography } from '@mui/material';

const SurahDetails = () => {
  const location = useLocation();
  const { surah } = location.state; // Get Surah data from location state

  if (!surah) {
    return (
      <Typography variant="h6" color="error">
        Surah data is not available. Please try again.
      </Typography>
    );
  }

  const SoundCloudPlaylist = ({ playlistUrl }) => {
    const [isLoading, setIsLoading] = React.useState(true);

    return (
      <div className="soundcloud-container">
        {isLoading && (
          <Typography variant="body2" color="textSecondary">
            Loading playlist...
          </Typography>
        )}
        <iframe
          className="soundcloud-iframe"
          src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
            playlistUrl
          )}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false`}
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
      <PageTitle pageTitle="تعلیم القرآن ( آڈیوٰ تفسیر )" pagesub="Audio Tafseer" />
      <Box sx={{ width: '100%', padding: 3 }}>
        <Grid2 container spacing={6} justifyContent="center" alignItems="center">
          <Grid2 item xs={6} sm={6} md={4} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h5">{surah.englishName}</Typography>
            <Typography variant="subtitle1">{surah.englishNameTranslation}</Typography>
          </Grid2>
          <Grid2 item xs={6} sm={6} md={4} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
            <Typography variant="h5">{surah.name}</Typography>
            <Typography variant="subtitle1">Total Ayaat: {surah.numberOfAyahs}</Typography>
          </Grid2>
        </Grid2>
      </Box>
      <Box sx={{ width: '100%' }}>
        <SoundCloudPlaylist playlistUrl={surah.playlistUrl} />
      </Box>
      <Footer footerClass="wpo-ne-footer-2" />
      <Scrollbar />
    </Fragment>
  );
};

export default SurahDetails;
