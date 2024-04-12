import React, { useState } from 'react'
import './Userdashboard.scss'
import Navbar from '../../../Components/Navbar/Navbar'
const Userdashboard = () => {
    const [userType, setUserType] = useState("patient");
    return (
        <>
            <div>
                <Navbar />
                <div className='dashboarduser'>
                    <div className='userstats'>
                        <div className='userstats1'>
                            <div>
                                <h2>Total Reports</h2>
                                <p>198</p>
                            </div>
                        </div>
                        <div className='userstats2'>
                            <div>
                                <h2>Total Prescriptions</h2>
                                <p>100</p>
                            </div>
                        </div>
                    </div>

                    <div className="report">
                        <div className='reportsshown'>
                            <div className='reportshownheading'>
                                <div>
                                    <h2>Reports</h2>
                                </div>
                                <div className='reportsshownheading2'>
                                    <h2>Add Report</h2>
                                </div>
                            </div>
                            <div className='reportshowncontent'>
                                <div className='reportsshowncontentdiv'>
                                    <h2>Report</h2>
                                </div>
                                <div className='reportsshowncontentdiv'>
                                    <h2>Report</h2>
                                </div>
                                <div className='reportsshowncontentdiv'>
                                    <h2>Report</h2>
                                </div>
                                <div className='reportsshowncontentdiv'>
                                    <h2>Report</h2>
                                </div>
                                <div className='reportsshowncontentdiv'>
                                    <h2>Report</h2>
                                </div>
                                <div className='reportsshowncontentdiv'>
                                    <h2>Report</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Userdashboard