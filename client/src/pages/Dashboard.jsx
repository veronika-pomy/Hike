import React, { useEffect } from 'react';
import Map from '../components/Map';
import Weather from '../components/Weather';
import Sidebar from '../components/Sidebar';

import '../style/Dashboard.css';

import { useDashContext } from '../context/useDashboardContext';

const Dashboard = () => {

    const { setDash } = useDashContext();

    useEffect(() => {
        setDash(true);
    },[]);

    return (
        <div className='dashboard'>
            <Sidebar />
            <Map />
            <Weather />
        </div>
    )
}

export default Dashboard;
