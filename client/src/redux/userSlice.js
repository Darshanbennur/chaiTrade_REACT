import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentUser: "userData",
    isUserloggedIn : false,
    isPremium : false,
    isMentor : false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            
        },
        setLoggedIn : (state, action) => {
            state.isUserloggedIn = action.payload;
        },
        setPremium : (state, action) => {
            state.isPremium = action.payload;
        },
        setMentor : (state, action) => {
            state.isMentor = action.payload;
        },
        logout: (state)=>{
            return initialState;
        }
    }
})

export const {loginSuccess, setLoggedIn, setPremium, setMentor, logout} = userSlice.actions;

export default userSlice.reducer;