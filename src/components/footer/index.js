import { Link } from 'react-router-dom'
import './style.css'

const Footer = (props) => {
  const currentYear = new Date().getFullYear();

  const ClickHandler = () => {
    window.scrollTo(0, 0);
  }

  return (
    <div className={`wpo-ne-footer ${props.footerClass}`}>
  <footer className="wpo-site-footer" dir="ltr">
        <div className="wpo-upper-footer">
          <div className="container">
            <div className="row">
              {/* About Section */}
              <div className="col col-lg-4 col-md-6 col-12">
                <div className="widget about-widget">
                    <h3>Taleem Ul Quran</h3>
                  <p>
                    Your comprehensive platform for learning the Holy Quran with detailed tafseer,
                    video lessons, and short educational content. Join thousands of students
                    in their journey of spiritual learning.
                  </p>
                  <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                    <a href="https://www.facebook.com/TaleemQuranPk" target="_blank" rel="noopener noreferrer" title="Facebook" style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '50%',
                      color: '#ffffff',
                      textDecoration: 'none',
                      border: '2px solid #ffffff',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                      transition: 'all 0.3s ease'
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a href="https://soundcloud.com/TaleemQuranPk" target="_blank" rel="noopener noreferrer" title="SoundCloud" style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '50%',
                      color: '#ffffff',
                      textDecoration: 'none',
                      border: '2px solid #ffffff',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                      transition: 'all 0.3s ease'
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.052-.1-.102-.1m-.899-1.447c-.074 0-.118.07-.111.167l.171 3.527-.171 3.505c-.007.097.037.17.111.17.068 0 .114-.073.121-.17l.192-3.505-.192-3.527c-.007-.097-.053-.167-.121-.167m1.91 1.383c-.062 0-.11.047-.119.111l-.193 2.181.193 2.141c.009.064.057.112.119.112.06 0 .108-.048.117-.112l.211-2.141-.211-2.181c-.009-.064-.057-.111-.117-.111m.959-1.938c-.083 0-.132.063-.141.144l-.152 4.086.152 4.046c.009.081.058.146.141.146.081 0 .131-.065.141-.146l.174-4.046-.174-4.086c-.01-.081-.06-.144-.141-.144m.99-1.038c-.097 0-.146.072-.156.166l-.111 5.089.111 5.042c.01.094.059.166.156.166.094 0 .145-.072.156-.166l.133-5.042-.133-5.089c-.011-.094-.062-.166-.156-.166m1.925 1.164c-.064 0-.119.051-.13.121l-.13 3.982.13 3.946c.011.07.066.122.13.122.062 0 .116-.052.129-.122l.15-3.946-.15-3.982c-.013-.07-.067-.121-.129-.121m.975-1.314c-.109 0-.163.082-.175.19l-.09 5.218.09 5.177c.012.108.066.189.175.189.108 0 .161-.081.174-.189l.108-5.177-.108-5.218c-.013-.108-.066-.19-.174-.19m1.001-.781c-.126 0-.185.094-.198.22l-.068 5.979.068 5.937c.013.126.072.219.198.219.125 0 .184-.093.197-.219l.09-5.937-.09-5.979c-.013-.126-.072-.22-.197-.22m1.018.107c-.14 0-.207.107-.221.246l-.05 5.847.05 5.804c.014.139.081.245.221.245.14 0 .207-.106.222-.245l.068-5.804-.068-5.847c-.015-.139-.082-.246-.222-.246m3.425.553c-.36 0-.656.297-.656.658v10.907c0 .362.296.66.656.66h10.361c.359 0 .656-.298.656-.66V8.61c0-.361-.297-.658-.656-.658H12.38z" />
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/TaleemQuranPk" target="_blank" rel="noopener noreferrer" title="Instagram" style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '50%',
                      color: '#ffffff',
                      textDecoration: 'none',
                      border: '2px solid #ffffff',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                      transition: 'all 0.3s ease'
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a href="https://www.youtube.com/@TaleemQuranPk" target="_blank" rel="noopener noreferrer" title="YouTube" style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '50%',
                      color: '#ffffff',
                      textDecoration: 'none',
                      border: '2px solid #ffffff',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                      transition: 'all 0.3s ease'
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="col col-lg-2 col-md-6 col-12">
                <div className="widget link-widget">
                  <div className="widget-title">
                    <h3>Quick Links</h3>
                  </div>
                  <ul>
                    <li><Link to="/" onClick={ClickHandler}>Home</Link></li>
                    <li><Link to="/about" onClick={ClickHandler}>About Us</Link></li>
                    <li><Link to="/contact" onClick={ClickHandler}>Contact</Link></li>
                    <li><Link to="/admin" target='_blank' onClick={ClickHandler}>Admin</Link></li>
                  </ul>
                </div>
              </div>

              {/* Learning Resources */}
              <div className="col col-lg-2 col-md-6 col-12">
                <div className="widget link-widget">
                  <div className="widget-title">
                    <h3>Learning Resources</h3>
                  </div>
                  <ul>
                    <li><Link to="/coming-soon" onClick={ClickHandler}>Video Tafseer</Link></li>
                    <li><Link to="/coming-soon" onClick={ClickHandler}>PDF Tafseer</Link></li>
                    <li><Link to="/tafseer/audios" onClick={ClickHandler}>Audio Tafseer</Link></li>
                    <li><Link to="/shorts" onClick={ClickHandler}>Short Videos</Link></li>
                    <li><Link to="/lessons" onClick={ClickHandler}>Lessons</Link></li>
                  </ul>
                </div>
              </div>

              {/* Surahs */}
              {/* <div className="col col-lg-2 col-md-6 col-12">
                                <div className="widget link-widget">
                                    <div className="widget-title">
                                        <h3>Popular Surahs</h3>
                                    </div>
                                    <ul>
                                        <li><Link to="/tafseer/audios/1" onClick={ClickHandler}>Al-Fatiha</Link></li>
                                        <li><Link to="/tafseer/audios/2" onClick={ClickHandler}>Al-Baqarah</Link></li>
                                        <li><Link to="/tafseer/audios/3" onClick={ClickHandler}>Ali 'Imran</Link></li>
                                        <li><Link to="/tafseer/audios/18" onClick={ClickHandler}>Al-Kahf</Link></li>
                                        <li><Link to="/tafseer/audios/36" onClick={ClickHandler}>Ya-Sin</Link></li>
                                        <li><Link to="/tafseer/audios/67" onClick={ClickHandler}>Al-Mulk</Link></li>
                                    </ul>
                                </div>
                            </div> */}

            </div>
          </div>
        </div>

        {/* Lower Footer */}
        <div className="wpo-lower-footer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <p className="copyright">
                  &copy; {currentYear} <b>Taleem Ul Quran</b>. All rights reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer;