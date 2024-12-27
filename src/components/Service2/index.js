import React from 'react';
import { Link } from 'react-router-dom';
import videoImage from '../../images/video.png';
import pdfImage from '../../images/pdf.png';
import audioImage from '../../images/audio.png';
import shortVideos from '../../images/shortvideos.png';
import './style.css';

const Service2 = (props) => {

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  }

  return (
    <div className={`service-area-2 ${props.serviceClass}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="wpo-section-title">
              <h2>تعلیم القرآن </h2>
              <hr />
              <p className='urdu-font'>
                ٹیکنالوجی کے دور میں جہاں اچھائی اور برائی ایک کلک پر دستیاب ہے وہاں ضرورت اس امر کی ہے کہ قرآن مجید کے حقیقی علم کو عوام میں روشناس کروا نے کے لیے تعلیم القرآن جیسی نایاب تفسیر اب ڈیجیٹل صورت میں بھی دستیاب ہو۔
              </p>
              <p className='urdu-font'>
                قرآن پاک کی یہ حیرت انگیز تفسیر سلف صالحین کی تعلیمات کو حالات حاضرہ سے روشناس اور مربوط کرتی ہے۔
              </p>
            </div>
          </div>
        </div>
        <div className="service-wrap">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 custom-grid mb-2 col-12">
              <Link onClick={ClickHandler} to="/tafseer/audios">
                <div className="service-single-item">
                  <div className="service-single-img">
                    <img src={audioImage} alt=" پی ڈی ایف تفسیر " />
                  </div>
                  <div className="service-text urdu-font">
                    <h2> تعلیم القرآن ( آڈیوٰ تفسیر )</h2>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 custom-grid mb-2 col-12">
              {/* <Link onClick={ClickHandler} to="/tafseer/shortvideos"> */}
                <div className="service-single-item">
                <div className="ribbon ribbon-top-left"><span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Coming Soon</span></div>
                  <div className="service-single-img">
                    <img src={shortVideos} alt=" پی ڈی ایف تفسیر " />
                  </div>
                  <div className="service-text urdu-font">
                    <h2> تعلیم القرآن ( شارٹ ویڈیوز )</h2>
                  </div>
                </div>
              {/* </Link> */}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 custom-grid mb-2 col-12">
              <div className="service-single-item box">
                <div className="ribbon ribbon-top-left"><span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Coming Soon</span></div>
                <div className="service-single-img">
                  <img src={pdfImage} alt=" پی ڈی ایف تفسیر " />
                </div>
                <div className="service-text urdu-font">
                  <h2>تعلیم القرآن ( پی ڈی ایف تفسیر )</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 custom-grid mb-2 col-12">
              <div className="service-single-item box">
                <div className="ribbon ribbon-top-left"><span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Coming Soon</span></div>
                <div className="service-single-img">
                  <img src={videoImage} alt=" ویڈیو تفسیر " />
                </div>
                <div className="service-text urdu-font">
                  <h2>تعلیم القرآن ( ویڈیو تفسیر )</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Service2;
