import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar'
import PageTitle from '../../components/pagetitle'
import ServiceSingle from '../../components/ServiceSingle'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'


const ServiceSinglePage =() => {
    return(
        <Fragment>
            <Navbar/>
            <PageTitle pageTitle={'Services'} pagesub={'Service'}/> 
            <ServiceSingle/>
            <Footer footerClass={'wpo-ne-footer-2'}/>
            <Scrollbar/>
        </Fragment>
    )
};
export default ServiceSinglePage;
