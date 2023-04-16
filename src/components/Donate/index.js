import React, { useEffect } from 'react'
import {toast} from "react-toastify";

import pmt1 from '../../images/checkout/img-1.png'
// import pmt2 from '../../images/checkout/img-2.png'
// import pmt3 from '../../images/checkout/img-3.png'
// import pmt4 from '../../images/checkout/img-4.png'
// import pmt5 from '../../images/checkout/upaise-logo.jpg'
import pmt6 from '../../images/checkout/logo_JazzCash.png'
import pmt7 from '../../images/checkout/easypesa.png'
import './style.css'

const Donate = (props) => {

    const SubmitHandler = (e) =>{
        e.preventDefault()
    }
    useEffect(() => {
      toast.info('For now, we are not collecting Donations Online here!!! \n See attached Account numbers and Send Manually.', {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    });
    return(
        <div className="wpo-donation-page-area section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="wpo-donate-header">
                            <h2>Make a Donation</h2>
                        </div>
                        <form onSubmit={SubmitHandler} action="#">
                            {/* <div className="wpo-donations-amount">
                                <h2>Your Donation</h2>
                                <input type="text" className="form-control" name="text" id="text" placeholder="Enter Donation Amount"/>
                            </div>
                            <div className="wpo-donations-details">
                                <h2>Details</h2>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                                        <input type="text" className="form-control" name="name" id="fname" placeholder="First Name"/>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                                        <input type="text" className="form-control" name="name" id="name" placeholder="Last Name"/>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group clearfix">
                                        <input type="email" className="form-control" name="email" id="email" placeholder="Email"/>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                                        <input type="text" className="form-control" name="Adress" id="Adress" placeholder="Adress"/>
                                    </div>
                                    <div className="col-lg-12 col-12 form-group">
                                        <textarea className="form-control" name="note" id="note" placeholder="Message"></textarea>
                                    </div>
                                </div>
                            </div> */}
                            <section className="wpo-news-letter-section">
                                <div className="container">
                                    <div className="wpo-news-letter-wrap">
                                        <div className="row">
                                            <div className="col col-lg-10 offset-lg-1 col-md-8 offset-md-2">
                                                <div className="wpo-newsletter">
                                                    <h4>Account Title: Abdur-Rabb</h4>
                                                    <p className="noteHelp">Meezan: 0246 0101 262 811 <br/>
                                                      Jazzcash: 0321 4696962 <br/>
                                                      EasyPesa: 0310 3332565</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="wpo-doanation-payment">
                                <h2>Choose Your Payment Method</h2>
                                <div className="wpo-payment-area">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="wpo-payment-option" id="open4">
                                                <div className="wpo-payment-select">
                                                    <ul>
                                                        <li className="addToggle">
                                                            <input id="add"  type="radio" name="payment" value="30"/>
                                                            <label htmlFor="add">Payment By Card</label>
                                                        </li>
                                                        <li className="removeToggle">
                                                            <input id="remove" type="radio" name="payment" value="30"/>
                                                            <label htmlFor="remove">Offline Donation</label>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div id="open5" className="payment-name">
                                                    <ul>
                                                        {/* <li className="visa"><input id="1" type="radio" name="size" value="30"/>
                                                        <label htmlFor="1"><img src={pmt5} alt=""/></label>
                                                        </li> */}
                                                        <li className="mas"><input id="2" type="radio" name="size" value="30"/>
                                                            <label htmlFor="2"><img src={pmt6} alt=""/></label>
                                                        </li>
                                                        <li className="ski"><input id="3" type="radio" name="size" value="30"/>
                                                            <label htmlFor="3"><img src={pmt7} alt=""/></label>
                                                        </li>
                                                        <li className="visa"><input id="4" type="radio" name="size" value="30"/>
                                                            <label htmlFor="4"><img src={pmt1} alt=""/></label>
                                                        </li>
                                                        {/* <li className="mas"><input id="5" type="radio" name="size" value="30"/>
                                                            <label htmlFor="5"><img src={pmt2} alt=""/></label>
                                                        </li>
                                                        <li className="ski"><input id="6" type="radio" name="size" value="30"/>
                                                            <label htmlFor="6"><img src={pmt3} alt=""/></label>
                                                        </li>
                                                        <li className="pay"><input id="7" type="radio" name="size" value="30"/>
                                                            <label htmlFor="7"><img src={pmt4} alt=""/></label>
                                                        </li> */}
                                                    </ul>
                                                    <div className="contact-form form-style">
                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-12 col-12">
                                                                <label>Card holder Name</label>
                                                                <input type="text" placeholder="" name="name"/>
                                                            </div>
                                                            <div className="col-lg-6 col-md-12 col-12">
                                                                <label>Card Number</label>
                                                                <input type="text" placeholder="" id="card" name="card"/>
                                                            </div>
                                                            <div className="col-lg-6 col-md-12 col-12">
                                                                <label>CVV</label>
                                                                <input type="text" placeholder="" name="CVV"/>
                                                            </div>
                                                            <div className="col-lg-6 col-md-12 col-12">
                                                                <label>Expire Date</label>
                                                                <input type="text" placeholder="" name="date"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="submit-area">
                                <button type="submit" className="theme-btn submit-btn">Donate Now</button>
                            </div>
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Donate;