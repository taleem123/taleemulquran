import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar'
// import PageTitle from '../../components/pagetitle'
import SurahList from '../../components/SurahList'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'


const ShortVideos =() => {
    return(
        <Fragment>
            <Navbar/>
            {/* <PageTitle pageTitle={'Audio Tafseer'} pagesub={'Audio Tafseer'}/>  */}
            {/* <SurahList/> */}
            Coming soon
            <Footer footerClass={'wpo-ne-footer-2'}/>
            <Scrollbar/>
        </Fragment>
    )
};
export default ShortVideos;
