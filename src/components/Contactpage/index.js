import React from 'react';
import ContactForm from '../ContactFrom'
import './style.css'

const Contactpage = () => {

    return(
        <section className="wpo-contact-form-map section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col col-lg-12 col-md-6 col-sm-12 col-12">
                                <div className="contact-form">
                                    <h2>Get In Touch</h2>
                                    <ContactForm/>
                                </div>
                            </div>
                            {/* <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="contact-map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d487.46053658762634!2d74.30668573591302!3d31.557696197842276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190353f002217b%3A0x4affd9d9a6a55460!2sQadsia%20Mosque!5e0!3m2!1sen!2s!4v1680031929747!5m2!1sen!2s" allowFullScreen="" title="map" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </div> */}
                        </div>
                        <div className="wpo-contact-info">
                            <div className="row">
                                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                    <div className="info-item">
                                      <a href='youtube.com'>
                                        <h2>YouTube Channel</h2>
                                        <div className="info-wrap">
                                            <div className="info-icon">
                                                <i className="ti-youtube"></i>
                                            </div>
                                            <div className="info-text">
                                                  <span>Go to our YouTube</span>
                                            </div>
                                        </div>
                                      </a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                    <div className="info-item">
                                        <h2>info@taleemulquran.com</h2>
                                        <div className="info-wrap">
                                            <div className="info-icon-2">
                                                <i className="fi flaticon-envelope"></i>
                                            </div>
                                            <div className="info-text">
                                                <span>Official Mail</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                    <div className="info-item">
                                        <h2>+92-321-98765432</h2>
                                        <div className="info-wrap">
                                            <div className="info-icon-3">
                                                <i className="ti-headphone-alt"></i>
                                            </div>
                                            <div className="info-text">
                                                <span>Official Phone</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     )
        
}

export default Contactpage;
