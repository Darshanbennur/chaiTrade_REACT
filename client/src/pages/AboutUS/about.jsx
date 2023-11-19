import React from 'react';
import './about.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import charts from "../../images/charts.jpg"
import Footer from "../../components/Footer.jsx";

library.add(fas, fab);

const AboutUs = () => {
  return (
    <>
      <div>
        <section className="about">
          <img src={charts} alt="background" className="backgroundpic" />
          <div className="about_aims">
            <div className="about_welcome">
              <h1 className="about_welcomehead">Unleashing Your Inner Maverick with Our Stock Trading Platform</h1>
            </div>
            <div className="about_aiminfo">
              <p className="about_content">• ➼ Our website aims to provide a comprehensive platform for trading financial
                assets
                and markets. We offer a
                wide range of trading instruments, including stocks, bonds, commodities, and cryptocurrencies, and our
                users can access them through a user-friendly interface and advanced trading tools.</p>
              <p className="about_content">• ➼ We are committed to ensuring the security and reliability of our platform, and
                we
                have a team of experts
                dedicated to improving our systems and implementing the latest technologies to protect our users' data
                and assets.</p>
              <p className="about_content">• ➼ Moreover, we value our users' satisfaction and strive to create a supportive
                trading community through
                social features and networking opportunities. Our contributors are committed to achieving our goals and
                improving our platform to meet our users' evolving needs.</p>
            </div>
          </div>

          <div className="about_features">
            <h2 className="about_featureshead">Our Key Features</h2>
            <div className="about_features">
              <div className="about_features-container">
                <div className="about_features-card">
                  <FontAwesomeIcon icon={['fas', 'mobile-alt']} className="features-icon" />

                  <h3 className="about_features-title">Simulator</h3>
                  <p className="about_features-desc">Use our trading simulator to invest virtual money without putting
                    your real money at risk
                    and become a trading pro!
                  </p>
                </div>
                <div className="about_features-card">
                  <FontAwesomeIcon icon={['fas', 'university']} className="features-icon" />
                  <h3 className="about_features-title">Featured Blogs</h3>
                  <p className="about_features-desc">Read and study reports written by the mentors.
                    Here mentors interacts with the user</p>
                </div>
                <div className="about_features-card">
                  <FontAwesomeIcon icon={['fas', 'chart-bar']} className="features-icon" />
                  <h3 className="about_features-title">Charts</h3>
                  <p className="about_features-desc">displays the current market status of different stocks in the form of
                    numerical data,
                    charts and graphs</p>
                </div>
                <div className="about_features-card">
                  <i className="fas fa-headset features-icon"></i>
                  <FontAwesomeIcon icon={['fas', 'headset']} className="features-icon" />
                  <h3 className="about_features-title">Support</h3>
                  <p className="about_features-desc">Our support team is available to assist you with any
                    questions or issues.</p>
                </div>
                <div className="about_features-card">
                  <FontAwesomeIcon icon={['fas', 'newspaper']} className="features-icon" />
                  <h3 className="about_features-title">News</h3>
                  <p className="about_features-desc">Get live updates about what's popping in the stock market.
                    Get the latest news from verified media outlets.</p>
                </div>
                <div className="about_features-card">
                  <FontAwesomeIcon icon={['fas', 'comments']} className="features-icon" />
                  <h3 className="about_features-title">Community Blogs</h3>
                  <p className="about_features-desc">Our community blogs allows you to connect with other users and share
                    your
                    experiences, thoughts and ideas.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about_contributors">
            <div className="about_contributorshead">
              <h2 className="about_contrihead">Our Contributors</h2>
            </div>
            <section id="about_contributorsinfo">
              <div className="about_row">
                <div className="col-lg-4 div1 div11">
                  <img className="about_img" src="https://picsum.photos/200/300" alt="oneprofilepic" />
                  <h3 className="about_names-h3">Darshan</h3>
                  <FontAwesomeIcon style={{marginRight : "10px"}} icon={faInstagram} />
                  <FontAwesomeIcon icon={faLinkedin} />
                  <p className="about_features-para">Android and Web Developer</p>
                </div>

                <div className="col-lg-4 div1 div12">
                  <img className="about_img" src="https://picsum.photos/300/400" alt="twoprofilepic" />
                  <h3 className="about_names-h3">Subhangi</h3>
                  <FontAwesomeIcon style={{marginRight : "10px"}} icon={faInstagram} />
                  <FontAwesomeIcon icon={faLinkedin} />
                  <p className="about_features-para">Web Developer</p>
                </div>

                <div className="col-lg-4 div1 div13">
                  <img className="about_img" src="https://picsum.photos/400/500" alt="threeprofilrpic" />
                  <h3 className="about_names-h3">Vamsidhar</h3>
                  <FontAwesomeIcon style={{marginRight : "10px"}} icon={faInstagram} />
                  <FontAwesomeIcon icon={faLinkedin} />
                  <p className="about_features-para">Web Developer</p>
                </div>

                <div className="col-lg-6 div1 div14">
                  <img className="about_img" src="https://picsum.photos/500/600" alt="fourprofilepic" />
                  <h3 className="about_names-h3">Hridayesh</h3>
                  <FontAwesomeIcon style={{marginRight : "10px"}} icon={faInstagram} />
                  <FontAwesomeIcon icon={faLinkedin} />
                  <p className="about_features-para">Web Developer</p>
                </div>

                <div className="col-lg-6 div1 div15">
                  <img className="about_img" src="https://picsum.photos/600/700" alt="fiveprofilepic" />
                  <h3 className="about_names-h3">Abraham</h3>
                  <FontAwesomeIcon style={{marginRight : "10px"}} icon={faInstagram} />
                  <FontAwesomeIcon icon={faLinkedin} />
                  <p className="about_features-para">Web Developer</p>
                </div>
              </div>
            </section>

          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
};

export default AboutUs;
