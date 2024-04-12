import React from 'react'
import './Navbar.scss'
const Navbar = () => {
    return (
        <div className='commonnavbar'>
            <div className='commonnavbarlogo'>
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
            </div>
            <div className='commonnavbarbutton'>
                <h2>LOGOUT</h2>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.4492 2.46484H16.0572C16.6235 2.46484 17.1666 2.68979 17.567 3.0902C17.9674 3.49062 18.1923 4.03369 18.1923 4.59996V6.73508H16.0572V4.59996H6.4492V21.6809H16.0572V19.5458H18.1923V21.6809C18.1923 22.2472 17.9674 22.7902 17.567 23.1906C17.1666 23.5911 16.6235 23.816 16.0572 23.816H6.4492C5.88294 23.816 5.33986 23.5911 4.93945 23.1906C4.53904 22.7902 4.31409 22.2472 4.31409 21.6809V4.59996C4.31409 4.03369 4.53904 3.49062 4.93945 3.0902C5.33986 2.68979 5.88294 2.46484 6.4492 2.46484V2.46484Z" fill="#828282" />
                    <path d="M17.221 16.9731L18.7262 18.4783L24.064 13.1405L18.7262 7.80273L17.221 9.30799L19.9753 12.073H9.65198V14.2081H19.9753L17.221 16.9731Z" fill="#828282" />
                </svg>
            </div>
        </div >
    )
}

export default Navbar