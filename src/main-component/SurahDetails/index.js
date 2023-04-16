import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar'
import PageTitle from '../../components/pagetitle'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import AudioPlayer from 'material-ui-audio-player';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './style.css'


const SurahDetails = () => {
  const { format, surahNumber } = useParams();
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    cursor: 'pointer',
  }));
  const [surah, setSurah] = useState('');
  useEffect(() => {
    fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`).then(resp => resp.json()).then(resp => { setSurah(resp.data) })
  }, [])
  const dataArray = [
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/01%20Al%20Baqarah%20Ayat%2001%20to%2003.mp3",
        title: "Sabaq 1",
        detail: `Surah Bakara,Al Baqarah Ayat 01 to 03`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/02%20Al%20Baqarah%20Ayat%2004%20to%2010.mp3",
        title: "Sabaq 2",
        detail: `Surah Bakara, Ayat 4 to 10`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/03%20Al%20Baqarah%20Ayat%2011%20to%2020.mp3",
        title: "Sabaq 3",
        detail: `Surah Bakara, Ayat 11 to 20`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/04%20Al%20Baqarah%20Aayat%2021%20to%2025.mp3",
        title: "Sabaq 4",
        detail: `Surah Bakara, Ayat 21 to 25`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/05%20Al%20Baqarah%20Ayat%2026%20to%2029.mp3",
        title: "Sabaq 5",
        detail: `Surah Bakara, Ayat 26 to 29`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/06%20Al%20Baqarah%20Ayat%2030%20to%2033.mp3",
        title: "Sabaq 6",
        detail: `Surah Bakara, Ayat 30 to 33`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/07%20Al%20Baqarah%20Ayat%2034%20to%2036.mp3",
        title: "Sabaq 7",
        detail: `Surah Bakara, Ayat 34 to 36`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/08%20Al%20Baqarah%20Ayat%2037%20to%2039.mp3",
        title: "Sabaq 8",
        detail: `Surah Bakara, Ayat 37 to 39`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/09%20Al%20Baqarah%20Ayat%2040%20to%2046.mp3",
        title: "Sabaq 9",
        detail: `Surah Bakara, Ayat 40 to 46`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/10%20Al%20Baqarah%20Ayat%2047%20to%2054.mp3",
        title: "Sabaq 10",
        detail: `Surah Bakara, Ayat 47 to 54`,
      },
      {
        url: "hhttps://archive.org/download/al-baqarah-by-sheikh-saeed/11%20Al%20Baqrah%20Ayat%2055%20to%2061.mp3",
        title: "Sabaq 11",
        detail: `Surah Bakara, Ayat 55 to 61`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/12%20Al%20Baqarah%20Ayat%2062%20to%2071.mp3",
        title: "Sabaq 12",
        detail: `Surah Bakara, Ayat 62 to 71`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/13%20Al%20Baqarah%20Ayat%2072%20to%2082.mp3",
        title: "Sabaq 13",
        detail: `Surah Bakara, Ayat 72 to 82`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/14%20Al%20Baqarah%20Ayat%2083%20to%2086.mp3",
        title: "Sabaq 14",
        detail: `Surah Bakara, Ayat 83 to 86`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/15%20Al%20Baqarah%20Ayat%2087%20to%2096.mp3",
        title: "Sabaq 15",
        detail: `Surah Bakara, Ayat 87 to 96`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/16%20Al%20Baqarah%20Ayat%2097%20to%20103.mp3",
        title: "Sabaq 16",
        detail: `Surah Bakara, Ayat 97 to 103`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/17%20Al%20Baqarah%20Ayat%20104%20to%20112.mp3",
        title: "Sabaq 17",
        detail: `Surah Bakara, Ayat 104 too 112`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/18%20Al%20Baqarah%20Ayat%20113%20to%20121.mp3",
        title: "Sabaq 18",
        detail: `Surah Bakara, Ayat 113 to 121`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/19%20Al%20Baqarah%20Ayat%20122%20to%20129.mp3",
        title: "Sabaq 19",
        detail: `Surah Bakara, Ayat 122 to 129`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/20%20Al%20Baqarah%20Ayat%20130%20to%20141.mp3",
        title: "Sabaq 20",
        detail: `Surah Bakara, Ayat 130 to 141`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/21%20Al%20Baqarah%20Ayat%20142%20to%20143.mp3",
        title: "Sabaq 21",
        detail: `Surah Bakara, Ayat 142 to 143`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/22%20Al%20Baqarah%20Ayat%20144%20to%20150.mp3",
        title: "Sabaq 22",
        detail: `Surah Bakara, Ayat 144 to 150`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/23%20Al%20Baqara%20Ayat%20151%20to%20157.mp3",
        title: "Sabaq 23",
        detail: `Surah Bakara, Ayat 151 to 157`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/24%20Al%20Baqara%20Ayat%20158%20to%20167.mp3",
        title: "Sabaq 24",
        detail: `Surah Bakara, Ayat 158 to 167`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/25%20Al%20Baqara%20Ayat%20168%20to%20170.mp3",
        title: "Sabaq 25",
        detail: `Surah Bakara, Ayat 168 to 170`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/26%20Al%20Baqara%20Ayat%20171%20to%20176.mp3",
        title: "Sabaq 26",
        detail: `Surah Bakara, Ayat 171 to 176`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/27%20Al%20Baqara%20Ayat%20177%20to%20182.mp3",
        title: "Sabaq 27",
        detail: `Surah Bakara, Ayat 177 to 182`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/28%20Al%20Baqara%20Ayat%20183%20to%20185.mp3",
        title: "Sabaq 28",
        detail: `Surah Bakara, Ayat 183 to 185`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/29%20Al%20Baqara%20Ayat%20186%20to%20188.mp3",
        title: "Sabaq 29",
        detail: `Surah Bakara, Ayat 186 to 188`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/30%20Al%20Baqara%20Ayat%20189%20to%20191.mp3",
        title: "Sabaq 30",
        detail: `Surah Bakara, Ayat 189 to 191`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/31%20Al%20Baqara%20Ayat%20191%20to%20195.mp3",
        title: "Sabaq 31",
        detail: `Surah Bakara, Ayat 192 to 195`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/32%20Al%20Baqara%20Ayat%20195%20to%20198.mp3",
        title: "Sabaq 32",
        detail: `Surah Bakara, Ayat 196 to 198`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/33%20Al%20Baqara%20Ayat%20198%20to%20202.mp3",
        title: "Sabaq 33",
        detail: `Surah Bakara, Ayat 199 to 202`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/34%20Al%20Baqara%20Ayat%20203%20to%20207.mp3",
        title: "Sabaq 34",
        detail: `Surah Bakara, Ayat 203 to 207`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/35%20Al%20Baqra%20Ayat%20208%20to%20211.mp3",
        title: "Sabaq 35",
        detail: `Surah Bakara, Ayat 208 to 2011`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/36%20Al%20Baqara%20Ayat%20212%20to%20215.mp3",
        title: "Sabaq 36",
        detail: `Surah Bakara, Ayat 212 to 215`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/37%20Al%20Baqra%20Ayat%20216%20to%20218.mp3",
        title: "Sabaq 37",
        detail: `Surah Bakara, Ayat 216 to 218`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/38%20Al%20Baqra%20Ayat%20219%20to%20220.mp3",
        title: "Sabaq 38",
        detail: `Surah Bakara, Ayat 219 to 220`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/39%20Al%20Baqra%20Ayat%20221%20to%20222.mp3",
        title: "Sabaq 39",
        detail: `Surah Bakara, Ayat 221 to 222`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/40%20Al%20Baqara%20Ayat%20223%20to%20227.mp3",
        title: "Sabaq 40",
        detail: `Surah Bakara, Ayat 223 to 227`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/41%20Al%20Baqara%20Ayat%20228%20to%20229.mp3",
        title: "Sabaq 41",
        detail: `Surah Bakara, Ayat 228 to 229`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/42%20Al%20Baqara%20Ayat%20230%20to%20232.mp3",
        title: "Sabaq 42",
        detail: `Surah Bakara, Ayat 230 to 232`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/43%20Al%20Baqara%20Ayat%20233%20to%20235.mp3",
        title: "Sabaq 43",
        detail: `Surah Bakara, Ayat 233 to 235`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/44%20Al%20Baqara%20Ayat%20236%20to%20242.mp3",
        title: "Sabaq 44",
        detail: `Surah Bakara, Ayat 236 to 242`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/45%20Al%20Baqara%20Ayat%20243%20to%20246.mp3",
        title: "Sabaq 45",
        detail: `Surah Bakara, Ayat 243 to 246`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/46%20Al%20Baqara%20Ayat%20247%20to%20248.mp3",
        title: "Sabaq 46",
        detail: `Surah Bakara, Ayat 247 to 248`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/47%20Al%20Baqara%20Ayat%20249%20to%20252.mp3",
        title: "Sabaq 47",
        detail: `Surah Bakara, Ayat 249 to 252`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/48%20Al%20Baqra%20Ayat%20253%20to%20255.mp3",
        title: "Sabaq 48",
        detail: `Surah Bakara, Ayat 253 to 255`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/49%20Al%20Baqrah%20Ayat%20256%20to%20257.mp3",
        title: "Sabaq 49",
        detail: `Surah Bakara, Ayat 256 to 257`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/50%20Al%20Baqrah%20Ayat%20258%20to%20260.mp3",
        title: "Sabaq 50",
        detail: `Surah Bakara, Ayat 258 to 260`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/51%20Al%20Baqrah%20Ayat%20261%20to%20266.mp3",
        title: "Sabaq 51",
        detail: `Surah Bakara, Ayat 261 to 266`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/52%20Al%20Baqarh%20Ayat%20267%20to%20274.mp3",
        title: "Sabaq 52",
        detail: `Surah Bakara, Ayat 267 to 274`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/53%20Al%20Baqrah%20Ayat%20275%20to%20277.mp3",
        title: "Sabaq 53",
        detail: `Surah Bakara, Ayat 275 to 277`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/54%20Al%20Baqrah%20Ayat%20278%20to%20281.mp3",
        title: "Sabaq 54",
        detail: `Surah Bakara, Ayat 278 to 281`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/55%20Al%20Baqrah%20Ayat%20282%20to%20283.mp3",
        title: "Sabaq 55",
        detail: `Surah Bakara, Ayat 282 to 283`,
      },
      {
        url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/56%20Al%20Baqrah%20Ayat%20284%20to%20286.mp3",
        title: "Sabaq 56",
        detail: `Surah Bakara, Ayat 284 to 286`,
      },
    ];
  // const _getPlayer = (player, dispatcher) => {
  //   console.log(dispatcher.state)
  // }
  // pagination code block start ...

  const chaptersPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end indexes based on the current page number
  const startIndex = (currentPage - 1) * chaptersPerPage;
  const endIndex = startIndex + chaptersPerPage;

  // Slice the data array to display the chapters for the current page
  const currentChapters = dataArray.slice(startIndex, endIndex);

  // Create a button to navigate to the previous page
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const prevButton = (
    <Button onClick={handlePrevClick} disabled={currentPage === 1} variant="outlined">Previous</Button>
  );

  // Create a button to navigate to the next page
  const handleNextClick = () => {
    if (currentPage < Math.ceil(dataArray.length / chaptersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const nextButton = (
    <Button onClick={handleNextClick} disabled={currentPage === Math.ceil(dataArray.length / chaptersPerPage)} variant="outlined">Next</Button>
  );
  // pagination code block end ...

  // preloader for audios ...

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Fragment>
      <Navbar />
      <PageTitle pageTitle={'تعلیم القرآن ( آڈیوٰ تفسیر )'} pagesub={'Audio Tafseer'} />
      <Box sx={{ width: '100%' }}>
        <Grid style={{ justifyContent: "center" }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid style={{ marginBottom: "20px", marginTop: "20px" }} item xs={12} md={8}>
            <span style={{ float: "right", textAlign: "right" }}>
              <Typography component="h2" variant="h5">
                {surah.name}
              </Typography>
              <Typography variant="subtitle1" >
                Ayaat: {surah.numberOfAyahs}
              </Typography>
            </span>
            <span>
              <Typography component="h2" variant="h5">
                {surah.englishName}
              </Typography>
              <Typography variant="subtitle1" >
                {surah.englishNameTranslation}
              </Typography>
            </span>
          </Grid>
        </Grid>
      </Box>
      {isLoading ? (
        <div className="loader">
          <CircularProgress />
          <Typography variant="h6">Loading...</Typography>
        </div>
      ) : (
        <div></div>
      )}
      <Box sx={{ width: '100%' }}>
        <Grid style={{ justifyContent: "center" }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {currentChapters.map((item, key) => {
            return (
              <>
                <Grid style={{ marginBottom: "10px" }} item xs={12} md={8} key={key}>
                  <Item elevation={3}>
                    <div style={{ justifyContent: "center", marginBottom: "10px" }}>
                      <AudioPlayer spacing={1} src={item.url} elevation={0} variation={'primary'} />
                      {/* <AudioPlayer src={item.url} elevation={0} getPlayer={_getPlayer} /> */}
                    </div>
                    {/* <span style={{ float: "right", textAlign: "right" }}>
                      <Typography component="h4" variant="h6">
                      سبق نمبر 1
                      </Typography>
                      <Typography  variant="subtitle1">
                      سورة بكارة آية 01-03
                      </Typography>
                    </span> */}
                    <span>
                      <Typography component="h4" variant="h5">
                        {item.title}
                      </Typography>
                      <Typography variant="subtitle1" >
                        {item.detail}
                      </Typography>
                    </span>
                  </Item>
                </Grid>
              </>
            )
          })}
        </Grid>
        <Stack direction="row" spacing={2} style={{ padding: "30px", justifyContent: 'center' }}>
          {prevButton} {nextButton}
        </Stack>
      </Box>
      <Footer footerClass={'wpo-ne-footer-2'} />
      <Scrollbar />
    </Fragment>
  )
};
export default SurahDetails;
