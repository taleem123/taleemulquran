import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar'
import PageTitle from '../../components/pagetitle'
import About from '../../components/about'
// import Course from '../../components/Course'
// import EventSection from '../../components/event'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import abimg from '../../images/about3.png'
// import evn1 from '../../images/event/img-3.jpg'
// import evn2 from '../../images/event/img-4.jpg'


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
