import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorBoundary from '../../components/ErrorBoundary';

// Lazy load components for better performance
const Homepage = React.lazy(() => import('../HomePage'));
const AboutPage = React.lazy(() => import('../AboutPage'));
const ErrorPage = React.lazy(() => import('../ErrorPage'));
const ContactPage = React.lazy(() => import('../ContactPage'));
const AllSurahs = React.lazy(() => import('../AllSurahs'));
const ShortVideos = React.lazy(() => import('../ShortVideos'));
const SurahDetails = React.lazy(() => import('../SurahDetails'));
const UnderConstruction = React.lazy(() => import('../UnderConstruction'));

const AllRoute = () => { 
  return (
    <div className="App">
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
            <Routes>
              <Route exact path='/' element={<Homepage/>} />
              <Route path='/about' element={<AboutPage/>} />
              <Route path='/contact' element={<ContactPage/>} />
              <Route path='/tafseer/:format' element={<AllSurahs/>} />
              <Route path='/tafseer/:format/:surahNumber' element={<SurahDetails/>} />
              <Route path='/video/:surahNumber' element={<SurahDetails/>} />
              <Route path='/pdf/:surahNumber' element={<SurahDetails/>} />
              <Route path='/shorts' element={<ShortVideos/>} />
              <Route path='/coming-soon' element={<UnderConstruction/>} />
              <Route path='*' element={<ErrorPage/>} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default AllRoute;
