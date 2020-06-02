import React, { Fragment } from 'react';
import about_bg from './image/about_bg.jpg';
import './Home.scss';
import SearchPanel from './SearchPanel';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Home() {
    const { pathname } = useLocation();  
    useEffect(() => {
      window.scrollTo(0, 0);
    });
    return (
        <Fragment>
            <Banner />
            <About />
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
                        <h6>Away from monotonous life</h6>
                        <h2>Relax Your Mind</h2>
                        <p>If you are looking at blank cassettes on the web, you may be very confused at the<br /> difference in price. You may see some for as low as $.17 each.</p>
                        <a href="#" className="btn theme_btn button_hover">Get Started</a>
                    </div>
                </div>
            </div>
            <SearchPanel />
        </section>
    )
}

function About() {
    return (
        <section className="about_history_area section_gap">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 d_flex align-items-center">
                        <div className="about_content ">
                            <h2 className="title title_color">About Us <br />Our History<br />Mission & Vision</h2>
                            <p>inappropriate behavior is often laughed off as “boys will be boys,” women face higher conduct standards especially in the workplace. That’s why it’s crucial that, as women, our behavior on the job is beyond reproach. inappropriate behavior is often laughed.</p>
                            <a href="#" className="button_hover theme_btn_two">Request Custom Price</a>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img className="img-fluid" src={about_bg} alt="img" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home;
