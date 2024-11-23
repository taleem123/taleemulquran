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

  const formats = [
    {
      simg: videoImage,
      title: "تعلیم القرآن ( ویڈیو تفسیر )",
      link: "/coming-soon",
      comingSoon: true
    },
    {
      simg: audioImage,
      title: "تعلیم القرآن ( آڈیوٰ تفسیر )",
      link: "/tafseer/audios",
      comingSoon: false
    },
    {
      simg: pdfImage,
      title: "تعلیم القرآن ( پی ڈی ایف تفسیر )",
      link: "/coming-soon",
      comingSoon: true
    },
    {
      simg: shortVideos,
      title: "تعلیم القرآن ( شارٹ ویڈیوز )",
      link: "/shorts",
      comingSoon: false
    },
  ];

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
            {formats.map((item, i) => (
              <div className="col-lg-6 col-md-6 col-sm-6 custom-grid col-12" key={i}>
                {item.comingSoon ? (
                  <div className="service-single-item coming-soon">
                    <div className="coming-soon-ribbon"><span>Coming Soon</span></div>
                    <div className="service-single-img">
                      <img src={item.simg} alt={item.title} />
                    </div>
                    <div className="service-text urdu-font">
                      <h2>{item.title}</h2>
                    </div>
                  </div>
                ) : (
                  <Link onClick={ClickHandler} to={item.link}>
                    <div className="service-single-item">
                      <div className="service-single-img">
                        <img src={item.simg} alt={item.title} />
                      </div>
                      <div className="service-text urdu-font">
                        <h2>{item.title}</h2>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service2;
