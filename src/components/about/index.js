import React from 'react';

import {Link} from 'react-router-dom'
// import IslamicCalander from '../Calander'
import tmr1 from '../../images/prayer-shape/2.png'
import tmr2 from '../../images/prayer-shape/1.png'
import tmr3 from '../../images/prayer-shape/3.png'
import VideoModal from '../ModalVideo'
import './style.css'

const About = (props) => {
    const ClickHandler = () =>{
        window.scrollTo(10, 0);
     }
    return(
        <div className="wpo-about-area section-padding">
            <div className="container">
                <div className="wpo-about-wrap">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="wpo-about-img-3">
                                <img src={props.aboutImg} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 colsm-12">
                            <div className="wpo-about-text">
                                <div className="wpo-section-title">
                                    <span>About Us</span>
                                    <h2>Seeking of knowledge is a duty of every Muslim</h2>
                                </div>
                                <p>The rise of Muslims to the zenith of civilization in a period of four decades was based on lslam's emphasis on learning. This is obvious when one takes a look at the Qur'an and the traditions of Prophet Muhammad which are filled with references to learning, education, observation.</p>
                                <div className="btns">
                                    <Link onClick={ClickHandler} to="/about" className="theme-btn" tabIndex="0">Discover More</Link>
                                    <ul>
                                        <li className="video-holder">
                                            <VideoModal/>
                                        </li>
                                        {/* <li className="video-text">
                                            Watch Our Video
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="timer-section">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="timer-text">
                                {/* <h2>Hijri Calander</h2>
                                <p>As of year 2022</p>
                                <span>Mon 15 Nov, 2021</span>
                            </div>
                        </div>
                        <div className="col-lg-5 offset-lg-1">
                            <IslamicCalander/>
                        </div>
                    </div>
                </div>
                <div className="timer-section">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="timer-text"> */}
                                <h2>Prayer Times</h2>
                                <p>Prayer times in Lahore, Pakistan</p>
                                {/* <span>Mon 15 Nov, 2021</span> */}
                            </div>
                        </div>
                        <div className="col-lg-5 offset-lg-1">
                            <div className="timer-num">
                                <ul>
                                    <li>Fajr<span>03:30</span></li>
                                    <li>Sunrize<span>07:05</span></li>
                                    <li>Dhuhr<span>13:00</span></li>
                                    <li>Asr<span>16:00</span></li>
                                    <li>Maghrib<span>19:12</span></li>
                                    <li>Isha'a<span>21:15</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="timer-shape1">
                        <img src={tmr1} alt="" />
                    </div>
                    <div className="timer-shape2">
                        <img src={tmr2} alt="" />
                    </div>
                    <div className="timer-shape3">
                        <img src={tmr3} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;