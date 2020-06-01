import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer-area section_gap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12  col-md-12 col-sm-12">
                        <div className="single-footer-widget">
                            <h6 className="footer_title">About Agency</h6>
                            <p>The world has become so fast paced that people don’t want to stand by reading a page of information, they would much rather look at a presentation and understand the message. It has come to a point </p>
                        </div>
                    </div>
                </div>
                <div className="border_line"></div>
                <div className="row footer-bottom d-flex justify-content-between align-items-center">
                    <p className="col-lg-8 col-sm-12 footer-text m-0">
                        Copyright &copy; All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
