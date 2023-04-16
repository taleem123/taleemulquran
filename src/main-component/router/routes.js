import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Homepage from '../HomePage'
import AboutPage from '../AboutPage'
import ServicePage from '../ServicePage'
import ServiceSinglePage from '../ServiceSinglePage'
import EventPage from '../EventPage'
import EventPageSingle from '../EventPageSingle'
import DonatePage from '../DonatePage'
import ErrorPage from '../ErrorPage'  
import ContactPage from '../ContactPage' 
import AllSurahs from '../AllSurahs'
import ShortVideos from '../ShortVideos'
import SurahDetails from '../SurahDetails'
import UnderConstruction from '../UnderConstruction'


const AllRoute = () => { 

  return (
    <div className="App">
       <Router>
          <Routes>
            <Route exact path='/' element={<Homepage/>} />
            {/* <Route path='/home' element={<Homepage/>} /> */}
            <Route path='/about' element={<AboutPage/>} />
            <Route path='/services' element={<ServicePage/>} />
            <Route path='/service-single' element={<ServiceSinglePage/>} />
            <Route path='/event' element={<EventPage/>} />
            <Route path='/event-single' element={<EventPageSingle/>} />
            <Route path='/donate' element={<DonatePage/>} />
            <Route path='/contact' element={<ContactPage/>} />
            <Route path='/tafseer/:format' element={<AllSurahs/>} />
            <Route path='/tafseer/:format/:surahNumber' element={<SurahDetails/>} />
            <Route path='/video/:surahNumber' element={<SurahDetails/>} />
            <Route path='/pdf/:surahNumber' element={<SurahDetails/>} />
            <Route path='/shorts' element={<ShortVideos/>} />
            <Route path='*' element={<ErrorPage/>} />
            <Route path='/coming-soon' element={<UnderConstruction/>} />
          </Routes>
      </Router>
      
    </div>
  );
}

export default AllRoute;
