import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar'
import ComingSoon from '../../components/comingSoon'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'


const ErrorPage =() => {
    return(
        <Fragment>
            <Navbar/>
            <ComingSoon/>
            <Footer footerClass={'wpo-ne-footer-2'}/>
            <Scrollbar/>
        </Fragment>
    )
};
export default ErrorPage;

