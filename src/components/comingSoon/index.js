import React from 'react'
import {Link} from 'react-router-dom'
import './style.css'

const ComingSoon = (props) => {
    return(
        <section className="coming-soon-section">
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="coming-soon-content">
                            <div className="coming-soon-icon">
                                <i className="ti-settings"></i>
                            </div>
                            <h1 className="coming-soon-title">Coming Soon</h1>
                            <p className="coming-soon-description">
                                We're working hard to bring you something amazing. 
                                This feature is currently under development and will be available soon.
                            </p>
                            <div className="coming-soon-actions">
                                <Link to="/" className="btn btn-primary">Back to Home</Link>
                                <Link to="/contact" className="btn btn-outline">Contact Us</Link>
                            </div>
                            <div className="coming-soon-features">
                                <h3>What to expect:</h3>
                                <ul>
                                    <li><i className="ti-check"></i> Enhanced user experience</li>
                                    <li><i className="ti-check"></i> New learning materials</li>
                                    <li><i className="ti-check"></i> Improved functionality</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ComingSoon;