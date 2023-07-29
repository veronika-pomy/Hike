import React, { useState, useContext } from 'react';

export const DashContext = React.createContext();

export const useDashContext = () => useContext(DashContext);

export default function DashProvider ({children}) {
    const [ dash, setDash ] = useState(false);

    return (
        <DashContext.Provider value={{ dash, setDash }}>
            {children}
        </DashContext.Provider>
    )
};