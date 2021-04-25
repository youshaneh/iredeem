import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import about_bg from '../images/about_bg.jpg';
import './About.scss';

function About() {
    return (
        <Fragment>
            <section className="breadcrumb_area">
                <div className="overlay bg-parallax" data-stellar-ratio="0.8" data-stellar-vertical-offset="0" data-background=""></div>
                <div className="container">
                    <div className="page-cover text-center">
                        <h2 className="page-cover-tittle f_48">About Us</h2>
                    </div>
                </div>
            </section>
            <AboutContent />
        </Fragment>
    )
}

export function AboutContent(props) {
    return (
        <section className="about_history_area section_gap">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 align-items-center">
                        <div className="about_content ">
                            <h2 className="title">About<br />Our Mission &amp; Vision</h2>
                            <p>
                                This website is designed by a fan of Cathay Pacific who has deposited tens of
                                thousands of mileage into his Asia Miles Account only to find it difficult to
                                find award seats to redeem.
                                Although the official website is good for searching tickets on one specific day,
                                chances are that you have to check dozens of days to find an award seat,
                                which can be tedious and time consuming.<br />
                                iRedeem tries to provide an intuitive way to find all award seats you might
                                be interested in. We strive to track as many routes as possible
                                and keep the data up to date in the hopes that everyone can redeem their mileage
                                for award tickets and enjoy their trips.

                            </p>
                            <Link to="/search" className="button_hover theme_btn stretch" onClick={() => {
                                setTimeout(() => {
                                    window.scrollTo({
                                        top: 0,
                                        left: 0,
                                        behavior: 'smooth'
                                    });
                                }, 0)
                            }}>Search</Link>
                        </div>
                    </div>
                    <div className="col-md-6 center-vertical">
                        <img className="img-fluid" src={about_bg} alt="img" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;
