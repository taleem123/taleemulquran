import React from 'react'
// import {Link}  from 'react-router-dom'
// import Logo from '../../images/logo.png'
import Newsletter from '../Newsletter'
import './style.css'

const Footer = (props) =>{

    // const ClickHandler = () =>{
    //     window.scrollTo(10, 0);
    //  }

  return(
    <div className={`wpo-ne-footer ${props.footerClass}`}>
        <Newsletter/>
        <footer className="wpo-site-footer">
            <div className="wpo-upper-footer">
                <div className="container">
                    <div className="row">
                        {/* <div className="col col-lg-3 col-md-6 col-12">
                            <div className="widget about-widget">
                                <div className="logo widget-title">
                                    <img src={Logo} alt="" />
                                </div>
                                <ul>
                                    <li><Link onClick={ClickHandler} target="_blank" to={{pathname:"https://www.facebook.com/masjidurrahman.official/"}}><i className="ti-facebook"></i></Link></li>
                                    <li><Link onClick={ClickHandler} target="_blank" to={{pathname:"https://twitter.com/masjid_official?lang=en"}}><i className="ti-twitter-alt"></i></Link></li>
                                    <li><Link onClick={ClickHandler} target="_blank" to={{pathname:"https://www.instagram.com/masjidurrahman/"}}><i className="ti-instagram"></i></Link></li>
                                    <li><Link onClick={ClickHandler} target="_blank" to={{pathname:"https://wa.me/03214696962"}}><i className="fa fa-whatsapp"></i></Link></li>
                                </ul>
                            </div>
                        </div> */}
                        {/* <div className="col col-lg-3 col-md-6 col-12">
                            <div className="widget link-widget">
                                <div className="widget-title">
                                    <h3>YouTube Channels</h3>
                                </div>
                                <ul className='youtube-links'>
                                    <li><Link onClick={ClickHandler} target="_blank" to={{pathname:"https://www.youtube.com/masjidarrehman"}}>Masjid-ur-Rahman</Link></li>
                                    <li><Link onClick={ClickHandler} target="_blank" to={{pathname:"https://www.youtube.com/channel/UC0po2chbhpXu87ffRrtdFkw"}}>Mohsineen Youth Squad</Link></li>
                                    <li><Link onClick={ClickHandler} target="_blank" to={{pathname:"https://www.youtube.com/channel/UCOo1nozyYXKo34-Jz115ASQ"}}>Phool Kids Club</Link></li>
                                    <li><Link onClick={ClickHandler} target="_blank" to={{pathname:"https://www.youtube.com/channel/UCQ_XDSEvjkso3eC-3VMH3-g"}}>Al-Hadaya Forum</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col col-lg-5 offset-lg-1 col-md-6 col-12">
                            <div className="widget market-widget wpo-service-link-widget">
                                <div className="widget-title">
                                    <h3>Contact </h3>
                                </div>
                                <div className="contact-ft">
                                    <ul>
                                        <li><i className="fi ti-location-pin"></i>Plot 761, Ravi Block Allama Iqbal Town, Lahore, Punjab</li>
                                        <li><i className="fi flaticon-call"></i>+92-321-4696962</li>
                                        <li><i className="fi flaticon-envelope"></i>info@aricc.com</li>
                                    </ul>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="wpo-lower-footer">
                <div className="container">
                    <div className="row">
                        <div className="col col-xs-12">
                            <p className="copyright">&copy; 2023 <b>TALEEM UL QURAN</b>. All rights reserved</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  )
} 

export default Footer;