import React from 'react';
import './Home.css';
import homenews from '../../images/home-news.png';
import homecharts from '../../images/home-charts.png';
import homefeatures from '../../images/home-feature.png';
import homeblog from '../../images/home-blog.png';
import homesimulater from '../../images/home-simulator.png';
import charts from "../../images/charts.jpg"
import Footer from "../../components/Footer.jsx"

export default function HomePage() {
    return (
        <>
            <div>
                <body className='home-page-body'>
                    <img src={charts} alt="background" class="backgroundpic" />
                    {/* News Section */}
                    <div className="home-container">
                        <div className="product-details">
                            <h1>News Section</h1>
                            <p className="information">The News Section is where you will find the latest News regarding the stock market. One can get all the information here on a daily basis, from what's going on in the market in general to what is up with specific company stocks. It is an unbiased page that depends only on the media.</p>
                            <div style={{ marginTop: "10px" }} className="control">
                                <button className="btn changes">
                                    <span className="price">Go</span>
                                    <span className="shopping-cart">&#8594;</span>
                                    <span className="buy">
                                        <a style={{ textDecoration: "none", color: "#21222A" }} href="/news">Visit Page</a>
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="product-image">
                            <img src={homenews} alt="News Section" />


                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="home-container">
                        <div className="product-details">
                            <h1>Charts Section</h1>
                            <p style={{ marginTop: "6px" }} className="information">The Chart Section contains the latest charts and trends. The Charts section is updated regularly and displays stock statistics. It shows different charts for commodities, forex, and companies. It displays all the stock information in a pictorial format via graphs, pie charts, line graphs, histograms, etc. </p>
                            <div className="control">
                                <button style={{ marginTop: "15px" }} className="btn">
                                    <span className="price">Go</span>
                                    <span className="shopping-cart">&#8594;</span>
                                    <span className="buy">
                                        <a style={{ textDecoration: "none", color: "#21222A" }} href="/charts">Visit Page</a>
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="product-image">
                            <img src={homecharts} alt="Charts Section" />
                        </div>
                    </div>

                    {/* Trading Simulator Section */}
                    <div className="home-container">
                        <div className="product-details">
                            <h1>Trading Simulator</h1>
                            <p className="information">The trading simulator, where all the magic happens. Here the user can trade in virtual money. It is the main idea behind this website, the trading simulator provides the user with virtual currency to trade in. It helps the user to learn about the stock market without actually risking their real money.</p>
                            <div className="control">
                                <button className="btn changes">
                                    <span className="price">Go</span>
                                    <span className="shopping-cart">&#8594;</span>
                                    <span className="buy">
                                        <a style={{ textDecoration: "none", color: "#21222A" }} href="/simulator">Visit Page</a>
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="product-image">
                            <img src={homesimulater} alt="Trading Simulator Section" />
                        </div>
                    </div>

                    {/* Featured Updates Section */}
                    <div className="home-container">
                        <div className="product-details">
                            <h1>Featured Updates</h1>
                            <p className="information">Platform for users to get updates on statistics of different stocks uploaded by analysts. The analysts are certified and have their own panel to perform research on different kinds of stocks and perform statistical operations on them for understanding them better or even predicting the stock market.</p>
                            <div style={{ marginTop: "10px" }} className="control">
                                <button className="btn changes">
                                    <span className="price">Go</span>
                                    <span className="shopping-cart">&#8594;</span>
                                    <span className="buy">
                                        <a style={{ textDecoration: "none", color: "#21222A" }} href="/featured">Visit Page</a>
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="product-image">
                            <img src={homefeatures} alt="Featured Updates Section" />
                        </div>
                    </div>

                    {/* Blog Posts Section */}
                    <div className="home-container">
                        <div className="product-details">
                            <h1>Blog Posts</h1>
                            <p style={{ lineHeight: "23px" }} className="information">A page where certified mentors write about stock markets, discuss ongoing trends, tell their opinions, and help the users out. The users can interact with the mentors by posting questions and the mentor can get back and answer the same via their panel. The mentor does not recommend which stocks to buy or influence the market.</p>
                            <div style={{ marginTop: "14px" }} className="control">
                                <button className="btn">
                                    <span className="price">Go</span>
                                    <span className="shopping-cart">&#8594;</span>
                                    <span className="buy">
                                        <a style={{ textDecoration: "none", color: "#21222A" }} href="/blogs">Visit Page</a>
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="product-image">
                            <img src={homeblog} alt="Blog Posts Section" />
                        </div>
                    </div>
                </body>
            </div>
            <Footer/>
        </>
    );
}