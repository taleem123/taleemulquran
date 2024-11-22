import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar'
import SurahList from '../../components/SurahList'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';


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
            <SurahList formate={"Audio"}/>
            <Footer footerClass={'wpo-ne-footer-2'}/>
            <Scrollbar/>
        </Fragment>
    )
};
export default AllSurahs;
