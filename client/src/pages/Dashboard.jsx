import React, { useEffect } from 'react';
import Map from '../components/Map';
import WeatherContext from '../context/useWeatherContext';

import '../style/Dashboard.css';

import { useDashContext } from '../context/useDashboardContext';

const Dashboard = () => {

    // TODO: Authentication - look at the router not here

    const { setDash } = useDashContext();

    useEffect(() => {
        setDash(true);
    },[]);

    return (
        <WeatherContext>
            <div className='dashboard'>
                <Map />
            </div>
        </WeatherContext>
    );
};

export default Dashboard;
