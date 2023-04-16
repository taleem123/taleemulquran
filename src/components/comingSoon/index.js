import React from 'react'
import {Link} from 'react-router-dom'
import comingSoon from '../../images/comingsoon.jpg'
import './style.css'

const Error = (props) => {
    return(
        <section className="error-404-section section-padding">
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="content clearfix">
                            <div className="error">
                                <img src={comingSoon} alt=""/>
                            </div>
                            <div className="error-message">
                                {/* <h3>Oops! Page Not Found!</h3> */}
                                <p>Ths content is not ready yet.</p>
                                <Link to="/" className="theme-btn-s4">Back to home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Error;