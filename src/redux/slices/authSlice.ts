import {createSlice} from '@reduxjs/toolkit';
import UserData from '../../model/UserData';
const AUTH_ITEM = "auth-item";
const defaultState: UserData = {role:"signedOut", email:"" };
const fromStroge: string | null = localStorage.getItem(AUTH_ITEM);
const initialState: {userData: UserData} = fromStroge==null ? {userData: defaultState} : {userData: JSON.parse(fromStroge)};


const authSlice = createSlice({
    initialState,
    name: "authState",
    reducers: {
        set: (state, data) => {
                state.userData = data.payload as UserData;
                localStorage.setItem(AUTH_ITEM, JSON.stringify(data.payload));

        },
        reset: (state) => {
            state.userData = defaultState;
            localStorage.removeItem(AUTH_ITEM);
        }

    }
});
export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;