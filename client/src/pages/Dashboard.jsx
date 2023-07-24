import React, { useEffect } from 'react';
import Map from '../components/Map';
import Weather from '../components/Weather';

import '../style/Dashboard.css';

import { useDashContext } from '../context/useDashboardContext';

const Dashboard = () => {

    const { setDash } = useDashContext();

    useEffect(() => {
        setDash(true);
    },[]);

    return (
        <div className='dashboard'>
            <Map />
            {/* <Weather /> */}
        </div>
    )
}

export default Dashboard;
