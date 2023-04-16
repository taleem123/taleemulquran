import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar'
import PageTitle from '../../components/pagetitle'
import ComingSoon from '../../components/comingSoon'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'


const ErrorPage =() => {
    return(
        <Fragment>
            <Navbar/>
            {/* <PageTitle pageTitle={'404'} pagesub={'404'}/>  */}
            <ComingSoon/>
            <Footer footerClass={'wpo-ne-footer-2'}/>
            <Scrollbar/>
        </Fragment>
    )
};
export default ErrorPage;

