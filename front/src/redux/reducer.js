import { createSlice } from '@reduxjs/toolkit';

const sesionSlice = createSlice({
    name: 'sesion',
    initialState: {
        userSesion: JSON.parse(localStorage.getItem('userSesion')) || null,
    },
    reducers: {
        userLogIn: (state, action) => {
            const sessionData = {
                ...action.payload.data,
                expiry: Date.now() + 600000
            };
            state.userSesion = sessionData;
            localStorage.setItem('userSesion', JSON.stringify(sessionData));
        },
        userLogOut: (state) => {
            state.userSesion = null;
            localStorage.removeItem('userSesion');
        },
        checkSession: (state) => {
            const sessionData = JSON.parse(localStorage.getItem('userSesion'));
            if (sessionData) {
                if (Date.now() > sessionData.expiry) {
                    state.userSesion = null;
                    localStorage.removeItem('userSesion');
                } else {
                    state.userSesion = sessionData;
                }
            }
        },
        updateUserImage: (state, action) => {
            if (state.userSesion) {
                state.userSesion.profileImage = action.payload;
                localStorage.setItem('userSesion', JSON.stringify(state.userSesion));
            }
        }
    },
});

export const { userLogIn, userLogOut, checkSession, updateUserImage } = sesionSlice.actions;
export default sesionSlice.reducer;
