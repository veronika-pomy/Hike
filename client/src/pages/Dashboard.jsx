import React, { useEffect } from 'react';
import Map from '../components/Map';

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
        </div>
    );
};

export default Dashboard;
