import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import PageTitle from '../../components/pagetitle';
import Footer from '../../components/footer';
import Scrollbar from '../../components/scrollbar';
import Box from '@mui/material/Box';
import { Grid, Modal, Typography, Button, Stack, Skeleton, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';


const SurahDetails = () => {
  const { surahNumber } = useParams();
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    cursor: 'pointer',
  }));

  const [isLoading, setIsLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [surah, setSurah] = useState('');

  const dataArray = [
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/01%20Al%20Baqarah%20Ayat%2001%20to%2003.mp3",
      title: "Lecture 1",
      detail: `Surah Bakara, Ayat 01 to 03`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/02%20Al%20Baqarah%20Ayat%2004%20to%2010.mp3",
      title: "Lecture 2",
      detail: `Surah Bakara, Ayat 4 to 10`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/03%20Al%20Baqarah%20Ayat%2011%20to%2020.mp3",
      title: "Lecture 3",
      detail: `Surah Bakara, Ayat 11 to 20`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/04%20Al%20Baqarah%20Aayat%2021%20to%2025.mp3",
      title: "Lecture 4",
      detail: `Surah Bakara, Ayat 21 to 25`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/05%20Al%20Baqarah%20Ayat%2026%20to%2029.mp3",
      title: "Lecture 5",
      detail: `Surah Bakara, Ayat 26 to 29`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/06%20Al%20Baqarah%20Ayat%2030%20to%2033.mp3",
      title: "Lecture 6",
      detail: `Surah Bakara, Ayat 30 to 33`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/07%20Al%20Baqarah%20Ayat%2034%20to%2036.mp3",
      title: "Lecture 7",
      detail: `Surah Bakara, Ayat 34 to 36`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/08%20Al%20Baqarah%20Ayat%2037%20to%2039.mp3",
      title: "Lecture 8",
      detail: `Surah Bakara, Ayat 37 to 39`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/09%20Al%20Baqarah%20Ayat%2040%20to%2046.mp3",
      title: "Lecture 9",
      detail: `Surah Bakara, Ayat 40 to 46`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/10%20Al%20Baqarah%20Ayat%2047%20to%2054.mp3",
      title: "Lecture 10",
      detail: `Surah Bakara, Ayat 47 to 54`,
    },
    {
      url: "hhttps://archive.org/download/al-baqarah-by-sheikh-saeed/11%20Al%20Baqrah%20Ayat%2055%20to%2061.mp3",
      title: "Lecture 11",
      detail: `Surah Bakara, Ayat 55 to 61`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/12%20Al%20Baqarah%20Ayat%2062%20to%2071.mp3",
      title: "Lecture 12",
      detail: `Surah Bakara, Ayat 62 to 71`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/13%20Al%20Baqarah%20Ayat%2072%20to%2082.mp3",
      title: "Lecture 13",
      detail: `Surah Bakara, Ayat 72 to 82`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/14%20Al%20Baqarah%20Ayat%2083%20to%2086.mp3",
      title: "Lecture 14",
      detail: `Surah Bakara, Ayat 83 to 86`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/15%20Al%20Baqarah%20Ayat%2087%20to%2096.mp3",
      title: "Lecture 15",
      detail: `Surah Bakara, Ayat 87 to 96`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/16%20Al%20Baqarah%20Ayat%2097%20to%20103.mp3",
      title: "Lecture 16",
      detail: `Surah Bakara, Ayat 97 to 103`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/17%20Al%20Baqarah%20Ayat%20104%20to%20112.mp3",
      title: "Lecture 17",
      detail: `Surah Bakara, Ayat 104 too 112`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/18%20Al%20Baqarah%20Ayat%20113%20to%20121.mp3",
      title: "Lecture 18",
      detail: `Surah Bakara, Ayat 113 to 121`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/19%20Al%20Baqarah%20Ayat%20122%20to%20129.mp3",
      title: "Lecture 19",
      detail: `Surah Bakara, Ayat 122 to 129`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/20%20Al%20Baqarah%20Ayat%20130%20to%20141.mp3",
      title: "Lecture 20",
      detail: `Surah Bakara, Ayat 130 to 141`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/21%20Al%20Baqarah%20Ayat%20142%20to%20143.mp3",
      title: "Lecture 21",
      detail: `Surah Bakara, Ayat 142 to 143`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/22%20Al%20Baqarah%20Ayat%20144%20to%20150.mp3",
      title: "Lecture 22",
      detail: `Surah Bakara, Ayat 144 to 150`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/23%20Al%20Baqara%20Ayat%20151%20to%20157.mp3",
      title: "Lecture 23",
      detail: `Surah Bakara, Ayat 151 to 157`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/24%20Al%20Baqara%20Ayat%20158%20to%20167.mp3",
      title: "Lecture 24",
      detail: `Surah Bakara, Ayat 158 to 167`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/25%20Al%20Baqara%20Ayat%20168%20to%20170.mp3",
      title: "Lecture 25",
      detail: `Surah Bakara, Ayat 168 to 170`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/26%20Al%20Baqara%20Ayat%20171%20to%20176.mp3",
      title: "Lecture 26",
      detail: `Surah Bakara, Ayat 171 to 176`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/27%20Al%20Baqara%20Ayat%20177%20to%20182.mp3",
      title: "Lecture 27",
      detail: `Surah Bakara, Ayat 177 to 182`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/28%20Al%20Baqara%20Ayat%20183%20to%20185.mp3",
      title: "Lecture 28",
      detail: `Surah Bakara, Ayat 183 to 185`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/29%20Al%20Baqara%20Ayat%20186%20to%20188.mp3",
      title: "Lecture 29",
      detail: `Surah Bakara, Ayat 186 to 188`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/30%20Al%20Baqara%20Ayat%20189%20to%20191.mp3",
      title: "Lecture 30",
      detail: `Surah Bakara, Ayat 189 to 191`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/31%20Al%20Baqara%20Ayat%20191%20to%20195.mp3",
      title: "Lecture 31",
      detail: `Surah Bakara, Ayat 192 to 195`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/32%20Al%20Baqara%20Ayat%20195%20to%20198.mp3",
      title: "Lecture 32",
      detail: `Surah Bakara, Ayat 196 to 198`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/33%20Al%20Baqara%20Ayat%20198%20to%20202.mp3",
      title: "Lecture 33",
      detail: `Surah Bakara, Ayat 199 to 202`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/34%20Al%20Baqara%20Ayat%20203%20to%20207.mp3",
      title: "Lecture 34",
      detail: `Surah Bakara, Ayat 203 to 207`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/35%20Al%20Baqra%20Ayat%20208%20to%20211.mp3",
      title: "Lecture 35",
      detail: `Surah Bakara, Ayat 208 to 2011`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/36%20Al%20Baqara%20Ayat%20212%20to%20215.mp3",
      title: "Lecture 36",
      detail: `Surah Bakara, Ayat 212 to 215`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/37%20Al%20Baqra%20Ayat%20216%20to%20218.mp3",
      title: "Lecture 37",
      detail: `Surah Bakara, Ayat 216 to 218`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/38%20Al%20Baqra%20Ayat%20219%20to%20220.mp3",
      title: "Lecture 38",
      detail: `Surah Bakara, Ayat 219 to 220`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/39%20Al%20Baqra%20Ayat%20221%20to%20222.mp3",
      title: "Lecture 39",
      detail: `Surah Bakara, Ayat 221 to 222`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/40%20Al%20Baqara%20Ayat%20223%20to%20227.mp3",
      title: "Lecture 40",
      detail: `Surah Bakara, Ayat 223 to 227`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/41%20Al%20Baqara%20Ayat%20228%20to%20229.mp3",
      title: "Lecture 41",
      detail: `Surah Bakara, Ayat 228 to 229`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/42%20Al%20Baqara%20Ayat%20230%20to%20232.mp3",
      title: "Lecture 42",
      detail: `Surah Bakara, Ayat 230 to 232`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/43%20Al%20Baqara%20Ayat%20233%20to%20235.mp3",
      title: "Lecture 43",
      detail: `Surah Bakara, Ayat 233 to 235`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/44%20Al%20Baqara%20Ayat%20236%20to%20242.mp3",
      title: "Lecture 44",
      detail: `Surah Bakara, Ayat 236 to 242`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/45%20Al%20Baqara%20Ayat%20243%20to%20246.mp3",
      title: "Lecture 45",
      detail: `Surah Bakara, Ayat 243 to 246`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/46%20Al%20Baqara%20Ayat%20247%20to%20248.mp3",
      title: "Lecture 46",
      detail: `Surah Bakara, Ayat 247 to 248`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/47%20Al%20Baqara%20Ayat%20249%20to%20252.mp3",
      title: "Lecture 47",
      detail: `Surah Bakara, Ayat 249 to 252`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/48%20Al%20Baqra%20Ayat%20253%20to%20255.mp3",
      title: "Lecture 48",
      detail: `Surah Bakara, Ayat 253 to 255`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/49%20Al%20Baqrah%20Ayat%20256%20to%20257.mp3",
      title: "Lecture 49",
      detail: `Surah Bakara, Ayat 256 to 257`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/50%20Al%20Baqrah%20Ayat%20258%20to%20260.mp3",
      title: "Lecture 50",
      detail: `Surah Bakara, Ayat 258 to 260`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/51%20Al%20Baqrah%20Ayat%20261%20to%20266.mp3",
      title: "Lecture 51",
      detail: `Surah Bakara, Ayat 261 to 266`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/52%20Al%20Baqarh%20Ayat%20267%20to%20274.mp3",
      title: "Lecture 52",
      detail: `Surah Bakara, Ayat 267 to 274`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/53%20Al%20Baqrah%20Ayat%20275%20to%20277.mp3",
      title: "Lecture 53",
      detail: `Surah Bakara, Ayat 275 to 277`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/54%20Al%20Baqrah%20Ayat%20278%20to%20281.mp3",
      title: "Lecture 54",
      detail: `Surah Bakara, Ayat 278 to 281`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/55%20Al%20Baqrah%20Ayat%20282%20to%20283.mp3",
      title: "Lecture 55",
      detail: `Surah Bakara, Ayat 282 to 283`,
    },
    {
      url: "https://archive.org/download/al-baqarah-by-sheikh-saeed/56%20Al%20Baqrah%20Ayat%20284%20to%20286.mp3",
      title: "Lecture 56",
      detail: `Surah Bakara, Ayat 284 to 286`,
    },
  ];

  const chaptersPerPage = 10;
  const startIndex = (currentPage - 1) * chaptersPerPage;
  const endIndex = startIndex + chaptersPerPage;
  const currentChapters = dataArray.slice(startIndex, endIndex);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (surahNumber) {
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`)
        .then((resp) => resp.json())
        .then((resp) => {
          setSurah(resp.data);
        })
        .catch((err) => console.error("Error fetching Surah data:", err));
    }
  }, [surahNumber]); // Dependency array includes surahNumber


  const handleOpenModal = (audio) => {
    setCurrentAudio(audio);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentAudio(null);
    setOpen(false);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < Math.ceil(dataArray.length / chaptersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <PageTitle pageTitle={'تعلیم القرآن ( آڈیوٰ تفسیر )'} pagesub={'Audio Tafseer'} />

      <Box sx={{ width: '100%', padding: 3 }}>
        <Grid
          container
          spacing={6}
          justifyContent="center"
          alignItems="center"
        >
          {isLoading ? (
            <>
              <Skeleton variant="text" width="80%" height={50} />
              <Skeleton variant="text" width="60%" height={30} />
            </>
          ) : (
            <>
              <Grid item xs={12} sm={6} md={4} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography variant="h5">{surah.englishName}</Typography>
                <Typography variant="subtitle1">{surah.englishNameTranslation}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
                <Typography variant="h5">{surah.name}</Typography>
                <Typography variant="subtitle1">Ayaat: {surah.numberOfAyahs}</Typography>
              </Grid>
            </>
          )}
        </Grid>
      </Box>


      {isLoading ? (
        <Grid container spacing={3} justifyContent="center" style={{ padding: '20px' }}>
          {[...Array(10)].map((_, index) => (
            <Grid item xs={12} md={8} key={index}>
              <Skeleton variant="rectangular" height={100} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={3} justifyContent="center" style={{ padding: '20px' }}>
            {currentChapters.map((item, key) => (
              <Grid item xs={12} md={8} key={key}>
                <Item elevation={3} onClick={() => handleOpenModal(item)}>
                  <Typography component="h4" variant="h5">
                    {item.title}
                  </Typography>
                  <Typography variant="subtitle1">{item.detail}</Typography>
                </Item>
              </Grid>
            ))}
          </Grid>

          <Stack direction="row" spacing={2} style={{ padding: '30px', justifyContent: 'center' }}>
            <Button onClick={handlePrevClick} disabled={currentPage === 1} variant="outlined">
              Previous
            </Button>
            <Button
              onClick={handleNextClick}
              disabled={currentPage === Math.ceil(dataArray.length / chaptersPerPage)}
              variant="outlined"
            >
              Next
            </Button>
          </Stack>
        </Box>
      )}

      <Modal open={open} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: '90%',
            maxWidth: 600,
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          {currentAudio && (
            <>
              <Box
                sx={{
                  padding: 2,
                  borderRadius: '8px 8px 0 0',
                }}
              >
                <Typography variant="h6">{currentAudio.title}</Typography>
                <Typography variant="body2">{currentAudio.detail}</Typography>
              </Box>
              <Box sx={{ padding: 3 }}>
                <audio controls autoPlay style={{ width: '100%', borderRadius: '8px' }}>
                  <source src={currentAudio.url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <Button
                  onClick={handleCloseModal}
                  variant="contained"
                  color="warning"
                  style={{ marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                >
                  Close
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      <Footer footerClass={'wpo-ne-footer-2'} />
      <Scrollbar />
    </Fragment>
  );
};

export default SurahDetails;
