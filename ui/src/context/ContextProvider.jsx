import React, { createContext, useContext, useState } from 'react';
import { TypesEditor } from '~/components/ElementTypes/ElementTypes';
const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [openSlide, setOpenSlide] = useState({
        open: false,
        back: false,
    }); // create blank slide when items store empty array
    const [changeEditorType, setChangeEditorType] = useState(TypesEditor);

    const showLoading = () => {
        setLoading(true);
    };
    const hideLoading = () => setLoading(false);

    return (
        <StateContext.Provider
            value={{
                loading,
                setChangeEditorType,
                changeEditorType,
                showLoading,
                hideLoading,
                openSlide,
                setOpenSlide,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
