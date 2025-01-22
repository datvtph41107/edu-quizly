import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const showLoading = () => {
        console.log(1);

        setLoading(true);
    };
    const hideLoading = () => setLoading(false);

    return (
        <StateContext.Provider
            value={{
                loading,
                showLoading,
                hideLoading,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
