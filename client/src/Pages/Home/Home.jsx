import React from 'react'
import './Home.scss';
import doctor from './doctor.jpeg';
import { Link } from 'react-router-dom';
import paitent from './Paitent.png';
import gp134 from './Group 134.png';
import logo_ambulance from './logo_ambulance.png';
import hospital from './hospital.png';
import ambulance from './Ambulance.png';
import feature1 from './feature1.png';
import feature2 from './feature2.png';
import feature3 from './feature3.png';


const Home = () => {
    return (
        <>
            <div className='home-page'>
                <div className='home-navbar'>
                    <h2>HaiDoc<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 13H8V10H10.5V7.5H13.5V10H16V13H13.5V15.5H10.5V13ZM12 2L4 5V11.09C4 16.14 7.41 20.85 12 22C16.59 20.85 20 16.14 20 11.09V5L12 2Z" fill="url(#paint0_linear_102_239)" />
                        <defs>
                            <linearGradient id="paint0_linear_102_239" x1="1.5" y1="2" x2="18.5" y2="20.5" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#51D9DB" />
                                <stop offset="1" stop-color="#017399" />
                            </linearGradient>
                        </defs>
                    </svg>
                    </h2>
                    <Link to='/bookambulance/questions'><button><h4>Book An Ambulance</h4></button></Link>
                </div>
                <div className='Home-outside'>

                    <div className='Home-1'>
                        <div className='homefullcontent'>
                            <div className='HomeContent'>
                                <h1>We Are Ready To
                                    <span> Help Your Health </span >
                                    Problems</h1>
                            </div>
                            <div className='HomeContent2'>
                                <p>
                                    In times like today, your health is very important,
                                    especially since the number of COVID-19 cases is
                                    increasing day by day,
                                    so we are ready to help you
                                    with your health consultation
                                </p>
                                <Link to='/bookambulance/questions'><button><h4>Book An Ambulance</h4><img src={logo_ambulance}></img></button></Link>
                            </div>
                        </div>
                        <div className='HomeImage'>
                            <img className='doctorImg' src={gp134} />
                        </div>
                    </div>
                </div>
                <div className='mainbuttons'>
                    <div className='feature1'>
                        <Link to="/user/login" > <button className='b1'><h4>User</h4><img src={paitent}></img></button></Link>
                    </div>
                    <div className='feature2'>
                        <Link to="/hospital/register"> <button className='b2'><h4>Hospital</h4><img src={hospital}></img></button></Link>
                    </div>
                    <div className='feature3'>
                        <Link to="/ambulance/login"><button className='b3'><h4>Ambulance</h4><img src={ambulance}></img></button></Link>
                    </div>
                </div>
                <div className='featurescomponent'>
                    <div className='featurecomponentheading'>
                        <h2>Our <span className='spannn'>Main Services</span>
                            <br /> Categories</h2>
                    </div>
                    <div className='featurecomponentcontent'>
                        <div className='featurecomponentcontent1 head'>
                            <div className='same1 same'>
                                <img src={feature1}></img>
                                <h2>Chat with doctor</h2>
                                <p>You can connect directly, quickly and easily, and there is no need to doubt the quality of the consultation and treatment offered.</p>
                            </div>
                        </div>
                        <div className='featurecomponentcontent2 head'>
                            <div className='same2 same'>
                                <img src={feature2}></img>
                                <h2>Health Store</h2>
                                <p>Talk about the health complaints you are experiencing and don't hesitate to ask about the proper treatment</p>
                            </div>
                        </div>
                        <div className='featurecomponentcontent3 head'>
                            <div className='same3 same'>
                                <img src={feature3}></img>
                                <h2>Visit hospitals</h2>
                                <p>Talk about the health complaints you are experiencing and don't hesitate to ask about the proper treatment</p>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="footer">
                    <h3>Copyright © 2024. Created by team - CLUTCH.</h3>
                </div>
            </div>
        </>
    )
}
export default Home