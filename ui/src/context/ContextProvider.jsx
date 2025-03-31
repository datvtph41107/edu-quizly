import React, { createContext, useContext, useState } from 'react';
const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [editorMoute, setEditorMoute] = useState(false);
    const [editors, setEditors] = useState({});
    const showLoading = () => {
        setLoading(true);
    };
    const hideLoading = () => setLoading(false);

    return (
        <StateContext.Provider
            value={{
                editors,
                setEditors,
                loading,
                editorMoute,
                setEditorMoute,
                showLoading,
                hideLoading,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
