import React from 'react';
import '../index.css';
import Layout from '../components/layout/Layout';
import aboutLogo from '../components/image/About.png';
import aboutApp from '../components/image/about-app.png';

const About = () => {
  return (
    <Layout>
        <div className='about'>
          <section className="about-splash">
              <h1 data-text="NIKE">NIKE</h1>
          </section>

          <section className="about-headings">
            <div className="about-container">
                <h2 className="about-main-title">WELCOME TO NIKE, INC.</h2>
                <div className="about-content">
                    <div className="about-image">
                        <img src={aboutLogo} alt='' />
                    </div>
                </div>
                <div className="about-text-box">
                    <h3>Who We Are</h3>
                    <p>NIKE, Inc. is a team comprised of the Nike, Jordan and Converse brands driven by a shared purpose to leave an enduring impact. With a global footprint, culture of innovation and team-first mentality, we take action to create a future of continual progress for athletes, sport and our world. 43% of NIKE's leadership positions are held by women. 78% renewable energy in owned or operated facilities, up from 48% in FY20. $97.7M invested in NIKE, Inc.'s fiscal year 2021 to drive positive impact in communities around the world.</p>
                </div>
                <div className="about-text-box-app">
                    <h3 className="about-text-box-app-h3">About our Apps</h3>
                    <img src={aboutApp} className="about-text-box-app-image" alt='' />
                    <div className="about-text-box-app-explore" >
                        <p>Get the latest in the Nike App</p>
                        <button>Nike App</button>
                    </div>
                </div>
            </div>
        </section>
        </div>
    </Layout>
  )
}

export default About