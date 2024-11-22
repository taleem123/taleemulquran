import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar'
import PageTitle from '../../components/pagetitle'
import About from '../../components/about'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import abimg from '../../images/about3.png'


const AboutPage =() => {
    return(
        <Fragment>
            <Navbar/>
            <PageTitle pageTitle={'About Us'} pagesub={'About'}/> 
            <About aboutImg={abimg}/>
            {/* <Course/> */}
            {/* <EventSection eventImg1={evn1} eventImg2={evn2}  EventClass={'wpo-event-area-2'}/> */}
            <Footer footerClass={'wpo-ne-footer-2'}/>
            <Scrollbar/>
        </Fragment>
    )
};
export default AboutPage;
