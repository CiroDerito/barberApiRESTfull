import { configureStore } from '@reduxjs/toolkit';
import sesionReducer from './reducer';

const store = configureStore({
    reducer: {
        sesion: sesionReducer,
    },
});

export default store;
