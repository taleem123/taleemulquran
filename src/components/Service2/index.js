import React from 'react'
import { Link } from 'react-router-dom'
import videoImage from '../../images/video.png'
import pdfImage from '../../images/pdf.png'
import audioImage from '../../images/audio.png'
import shortVideos from '../../images/service/shortvideos.png'
import './style.css'

const Service2 = (props) => {

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  }

  const formats = [
    {
      simg: videoImage,
      title: "تعلیم القرآن ( ویڈیو تفسیر )",
      link: "/coming-soon"
    },
    {
      simg: audioImage,
      title: "تعلیم القرآن ( آڈیوٰ تفسیر )",
      link: "/tafseer/audios"
    },
    {
      simg: pdfImage,
      title: "تعلیم القرآن ( پی ڈی ایف تفسیر )",
      link: "/coming-soon"
    },
    {
      simg: shortVideos,
      title: "تعلیم القرآن ( شارٹ ویڈیوز )",
      link: "/coming-soon"
    },
  ]

  return (
    <div className={`service-area-2 ${props.serviceClass}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="wpo-section-title">
              <h2>تعلیم القرآن </h2>
              <hr/>
              <p className='urdu-font'>
                ٹیکنالوجی کے دور میں جہاں اچھائی اور برائی ایک کلک پر دستیاب ہے وہاں ضرورت اس امر کی ہے کہ قرآن مجید کے حقیقی علم کو عوام میں روشناس کروا نے کے لیے تعلیم القرآن جیسی   نایاب تفسیر اب ڈیجیٹل صورت میں بھی دستیاب ہو۔ 
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
                <Link onClick={ClickHandler} to={item.link}>
                <div className="service-single-item">
                  <div className="service-single-img">
                    <Link onClick={ClickHandler} to={item.link}><img src={item.simg} alt="" /></Link>
                  </div>
                  <div className="service-text urdu-font">
                    <h2><Link onClick={ClickHandler} to={item.link}>{item.title}</Link></h2>
                  </div>
                </div>
              </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Service2;