import React from 'react'
import './style.css'

const PageTitle = (props) => {
    return(
        <div className="wpo-breadcumb-area">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="wpo-breadcumb-wrap urdu-font">
                            <h2>{props.pageTitle}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageTitle;