import { configureStore } from '@reduxjs/toolkit';
import editorReducer from './reducers/editorSlice';

const store = configureStore({
    reducer: editorReducer,
});

export default store;
