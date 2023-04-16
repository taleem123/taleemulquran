import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar'
// import PageTitle from '../../components/pagetitle'
import SurahList from '../../components/SurahList'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


const AllSurahs =() => {
  const { format } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
   if(!['audios', 'videos', 'pdf'].includes(format))
    navigate('/404')
  })
    return(
        <Fragment>
            <Navbar/>
            {/* <PageTitle pageTitle={'Audio Tafseer'} pagesub={'Audio Tafseer'}/>  */}
            <SurahList formate={"Audio"}/>
            <Footer footerClass={'wpo-ne-footer-2'}/>
            <Scrollbar/>
        </Fragment>
    )
};
export default AllSurahs;
