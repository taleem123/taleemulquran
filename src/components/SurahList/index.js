import React from 'react';
import surahData from './surahData.json';
import './style.css'
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Madina from '../../images/madina.png';
import Makka from '../../images/makka.png';

const SurahList = (props) => {
  const navigate = useNavigate();
  const _openDetails = (format, surahNumber) => {
    const selectedSurah = surahData.find((surah) => surah.number === surahNumber);
    navigate(`/tafseer/${format}/${surahNumber}`, { state: { surah: selectedSurah } });
  };


  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    cursor: 'pointer',
  }));


  return (
    <section className="service-single-section section-padding">
      <div className="container">
        <div className="service-single-content">
          <h2>{props.formate} Tafseer</h2>
          <p> You can listen, download and share anytime. </p>
        </div>

        <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {surahData.map((surah) => (
              <Grid
                item
                xs={12}
                md={6}
                key={surah.number}
                component="a"
                onClick={() => _openDetails(props.formate, surah.number)}
              >
                <Item>
                  <span style={{ float: 'right', textAlign: 'right' }}>
                    <img
                      src={surah.revelationType === 'Medinan' ? Madina : Makka}
                      width="55px"
                      height="44px"
                      alt={surah.revelationType}
                    />
                    <Typography component="h2" variant="h5">
                      {surah.name}
                    </Typography>
                    <Typography variant="subtitle1">Ayat: {surah.numberOfAyahs}</Typography>
                  </span>
                  <span>
                    <Typography component="h4" variant="h6">
                      {surah.number}
                    </Typography>
                    <Typography component="h2" variant="h5">
                      {surah.englishName}
                    </Typography>
                    <Typography variant="subtitle1">{surah.englishNameTranslation}</Typography>
                  </span>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </section>
  );
};

export default SurahList;
