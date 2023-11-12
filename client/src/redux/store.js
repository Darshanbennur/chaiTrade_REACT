import {configureStore, combineReducers} from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const rootReducer = combineReducers({
    userData : userSlice
});

const store = configureStore({
    reducer : rootReducer
})

export default store