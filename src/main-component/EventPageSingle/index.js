import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar'
// import PageTitle from '../../components/pagetitle'
import EventSingle from '../../components/EventSingle'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'


const EventPageSingle =() => {
    return(
        <Fragment>
            <Navbar/>
            {/* <PageTitle pageTitle={'Single Event'} pagesub={'Learn about Hajj'}/>  */}
            <EventSingle/>
            <Footer footerClass={'wpo-ne-footer-2'}/>
            <Scrollbar/>
        </Fragment>
    )
};
export default EventPageSingle;
