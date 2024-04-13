import React, { useState } from 'react'
import './AmbulanceDashboard.scss'
import Navbar from '../../../Components/Navbar/Navbar'
import { useEffect } from 'react';
import socket from '../../../socket';
import { useNavigate } from 'react-router-dom';

const AmbulanceDashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({});

    const [queries, setQueries] = useState([]);

    useEffect(() => {
        // Example: Listen for a 'message' event
        socket.on('booking-query', (formData) => {
            setQueries(prev => {
                return [...prev, formData]
            })
        });

        socket.on('gotomap', (formData) => {
            navigate('/map');
        });

        return () => {
            // Clean up event listeners when the component unmounts
            socket.off('message');
        };
    }, []);

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
                socket.emit('join-room', data.data.phnum);
            } else {
                console.log(response)
                console.log('data fetch failed');
            }
        }
        fetchData();
    }, [])

    const handleAccept = (phnum, query) => {
        socket.emit('booking-response', { response: "accept", query });
    }

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

                    <div>
                        {queries.map((query) => {
                            return <div>
                                <div>{query.location}, {query.phnum}</div>
                                <button onClick={() => handleAccept(query.phnum, query)}>Accept</button>
                            </div>
                        })}
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

export default AmbulanceDashboard