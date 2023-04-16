import React from 'react'
import service1 from '../../images/service/img-1.png'
import service2 from '../../images/service/img-2.png'
import './style.css'

const Service = (props) => {
    return(
        <div className="service-area section-padding">
            <div className="container">
                <div className="service-wrap">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="service-item">
                                <div className="service-title">
                                    <span>Islamic School</span>
                                    <h2>Seek knowledge from the cradle to the grave.</h2>
                                    <p>The Weekend School of the Islamic Center of Allah is committed to providing quality Islamic Education according to the Quran and the Sunnah of the Prophet Mohammed (Peace Be upon Him) to a diverse student population in the greater area.</p>
                                </div>
                                <div className="routine-table">
                                    <ul className="routne-head">
                                        <li>School Calendar</li>
                                        <li>Fall Semester</li>
                                        <li>Spring Semester</li>
                                    </ul>
                                    <ul>
                                        <li>First day</li>
                                        <li>12.5.2021</li>
                                        <li>1.7.2021</li>
                                    </ul>
                                    <ul>
                                        <li>Late registration</li>
                                        <li>17.8.2021</li>
                                        <li>1.12.2021</li>
                                    </ul>
                                    <ul>
                                        <li>Last day</li>
                                        <li>20.9.2021</li>
                                        <li>8.12.2021</li>
                                    </ul>
                                </div>
                                <div className="btns">
                                    <a href="/service-single" className="theme-btn-s3">Know More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="service-img">
                                <img src={service1} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="service-wrap-s2">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="service-img">
                                <img src={service2} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="service-item">
                                <div className="service-title">
                                    <span>Mosque Development</span>
                                    <h2>Come to the Mosque for your spritual treatment</h2>
                                    <p>The Weekend School of the Islamic Center of Allah is committed to providing quality Islamic Education according to the Quran and the Sunnah of the Prophet Mohammed (Peace Be upon Him) to a diverse student population in the greater area.</p>
                                </div>
                                <div className="wpo-counter-grids">
                                    <div className="grid">
                                        <div>
                                            <h2><span className="odometer" data-count="45">45</span>+</h2>
                                        </div>
                                        <p>New Mosque</p>
                                    </div>
                                    <div className="grid">
                                        <div>
                                            <h2><span className="odometer" data-count="30">30</span>+</h2>
                                        </div>
                                        <p>Old Mosque</p>
                                    </div>
                                    <div className="grid">
                                        <div>
                                            <h2><span className="odometer" data-count="85">85</span>+</h2>
                                        </div>
                                        <p>Imams</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service;