import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import PageTitle from '../../components/pagetitle';
import Footer from '../../components/footer';
import Scrollbar from '../../components/scrollbar';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';

const SurahDetails = () => {
  const location = useLocation();
  const { surah } = location.state; // Get Surah data from location state

  const SoundCloudPlaylist = ({ playlistUrl }) => {
    return (
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
        <iframe
          src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
            playlistUrl
          )}&color=%23222&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '10px',
          }}
          frameBorder="no"
          allow="autoplay"
          title="SoundCloud Playlist"
        ></iframe>
      </div>
    );
  };


  return (
    <Fragment>
      <Navbar />
      <PageTitle pageTitle="تعلیم القرآن ( آڈیوٰ تفسیر )" pagesub="Audio Tafseer" />
      <Box sx={{ width: '100%', padding: 3 }}>
        <Grid container spacing={6} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h5">{surah.englishName}</Typography>
            <Typography variant="subtitle1">{surah.englishNameTranslation}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
            <Typography variant="h5">{surah.name}</Typography>
            <Typography variant="subtitle1">Total Ayaat: {surah.numberOfAyahs}</Typography>
          </Grid>
        </Grid>
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
