import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentUser: "something"
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
        },
        logout: (state)=>{
            return initialState;
        }
    }
})

export const {loginSuccess, logout} = userSlice.actions;

export default userSlice.reducer;