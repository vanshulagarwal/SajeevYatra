import React, { useState } from 'react'
import './HospitalDashboard.scss'
import Navbar from '../../../Components/Navbar/Navbar'
import { useEffect } from 'react';

const HospitalDashboard = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3000/api/v1/dashboarddata', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Data fetched successfully');
                console.log(data);
                setData(data.data);
            } else {
                console.log(response)
                console.log('data fetch failed');
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <div>
                <Navbar />
                <div className='dashboarduser'>
                    <div className='userstats'>
                        <div className='userstats1'>
                            <div>
                                <h2>Total Reports</h2>
                                <p>{data.uid}</p>
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

export default HospitalDashboard