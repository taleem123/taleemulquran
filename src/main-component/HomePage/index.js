import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar'
import Hero from '../../components/hero'
import SelectedSurahs from '../../components/SelectedSurahs'
import RecentVideos from '../../components/RecentVideos'
import SelectedLessons from '../../components/SelectedLessons'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import hero1 from '../../images/slider/no-bg-logo.png'


const HomePage =() => {
    return(
        <Fragment>
            <Navbar/>
            <Hero HeroStyleClass={'hero-style-2'} heroImg={hero1}/>
            <SelectedSurahs/>
            <RecentVideos/>
            <SelectedLessons/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default HomePage;