import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: "Something",
    isUserloggedIn: false,
    isPremium: false,
    isMentor: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
        },
        setUserDetails: (state, action) => {
            state.currentUser = action.payload;
        },
        setLoggedIn: (state, action) => {
            state.isUserloggedIn = action.payload;
        },
        setPremium: (state, action) => {
            state.isPremium = action.payload;
        },
        setUserCostInHand: (state, action) => {
            state.currentUser["costInHand"] = action.payload;
        },
        setUserCostInvested: (state, action) => {
            state.currentUser["costInvested"] = action.payload;
        },
        setCostInCreditsWallet: (state, action) => {
            state.currentUser["wallet"] = action.payload;
        },
        setMentor: (state, action) => {
            state.isMentor = action.payload;
        },
        logout: (state) => {
            return initialState;
        }
    }
})

export const { loginSuccess, setLoggedIn, setPremium, setMentor, logout, setUserDetails,
    setUserCostInHand, setUserCostInvested, setCostInCreditsWallet } = userSlice.actions;

export default userSlice.reducer;