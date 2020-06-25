import React, { Fragment } from 'react';
import { AboutContent } from './About';
import './Home.scss';
import SearchPanel from './SearchPanel';

function Home() {
    return (
        <Fragment>
            <Banner />
            <AboutContent />
        </Fragment>
    );
}

function Banner() {
    return (
        <section className="banner_area">
            <div className="booking_table d_flex align-items-center">
                <div className="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0" data-background=""></div>
                <div className="container">
                    <div className="banner_content text-center">
                        <h6>Redeem miles</h6>
                        <h2>Start Your Journey</h2>
                        <p>
                            Asia Miles is Asia’s leading travel rewards program. <br/>
                            iRedeem helps you find award seats in a faster and simpler way. 
                        </p>
                        <a href="https://www.asiamiles.com" target="_blank" rel="noopener noreferrer" className="theme_btn button_hover">Learn More about Asia Miles</a>
                    </div>
                </div>
            </div>
            <SearchPanel />
        </section>
    )
}

export default Home;
