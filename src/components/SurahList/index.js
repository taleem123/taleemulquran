import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import './style.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Makka from '../../images/makka.png'
import Madina from '../../images/madina.png'
import CircularProgress from '@material-ui/core/CircularProgress';

const SurahList = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah').then(resp => resp.json()).then(resp => {
      setData(resp.data)
      setIsLoading(false);
    })
  }, [])

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  }
  const navigate = useNavigate();
  const _openDetails = (format, surahNumber) => {
    navigate(`/tafseer/${format}/${surahNumber}`)
  }

  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    cursor: 'pointer'
  }));

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="service-single-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col col-lg-9 col-md-12 col-12">
            <div className="service-single-content">
              <h2>{props.formate} Tafseer</h2>
              <p> You can listen, download and share anytime. </p>
            </div>
            {isLoading ? (
              <div className="loader">
                <CircularProgress />
                <Typography variant="h6">Loading...</Typography>
              </div>
            ) : (
              ''
            )}
            <Box sx={{ width: '100%' }}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {data.map((surah, key) => {
                  return (
                    <Grid item xs={12} md={6} key={key} component="a" onClick={() => _openDetails(props.formate, surah.number)}>
                      <Item>
                        <span style={{ float: "right", textAlign: "right" }}>
                          <img src={surah.revelationType === 'Medinan' ? Madina : Makka} width="55px" height={'44px'} alt={surah.revelationType} />
                          <Typography component="h2" variant="h5">
                            {surah.name}
                          </Typography>
                          <Typography variant="subtitle1" >
                            Ayat: {surah.numberOfAyahs}
                          </Typography>
                        </span>
                        <span>
                          <Typography component="h4" variant="h6">
                            {surah.number}
                          </Typography>
                          <Typography component="h2" variant="h5">
                            {surah.englishName}
                          </Typography>
                          <Typography variant="subtitle1" >
                            {surah.englishNameTranslation}
                          </Typography>
                        </span>
                      </Item>
                    </Grid>
                  )
                })}
              </Grid>
            </Box>
          </div>
          <div className="col col-lg-3 col-md-12 col-12">
            <div className="service-sidebar">
              <div className="widget service-list-widget">
                <h3>All Formates</h3>
                <ul>
                  <li className="current"><Link to="/audio">Audio Formate</Link></li>
                  <li><Link onClick={ClickHandler} to="/video">Video Formate</Link></li>
                  <li><Link onClick={ClickHandler} to="/pdf">PDF Formate</Link></li>
                  <li><Link onClick={ClickHandler} to="#">Short Videos</Link></li>
                  <li><Link onClick={ClickHandler} to="/404">Posters and Wallpapers</Link></li>
                </ul>
              </div>
              {/* <div className="widget contact-widget">
                                <div>
                                    <h4>Request a Call Back</h4>
                                    <h2>(523) 456-789</h2>
                                </div>
                            </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SurahList;