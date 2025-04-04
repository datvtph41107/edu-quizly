import React, { createContext, useContext, useState } from 'react';
import { TypesEditor } from '~/components/ElementTypes/ElementTypes';
const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [editorMoute, setEditorMoute] = useState(false);
    const [editor, setEditor] = useState({});
    const [changeEditorType, setChangeEditorType] = useState(TypesEditor);

    const showLoading = () => {
        setLoading(true);
    };
    const hideLoading = () => setLoading(false);

    return (
        <StateContext.Provider
            value={{
                editor,
                setEditor,
                loading,
                setChangeEditorType,
                changeEditorType,
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
