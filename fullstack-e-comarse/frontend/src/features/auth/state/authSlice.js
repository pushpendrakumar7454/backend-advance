import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",

    initialState: {
        users: [],
        accessToken: null,
        isLoading: false
    },

    reducers: {
        addUser: (state, action) => {
            state.users = action.payload;
            state.isLoading = false;
        },

        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },

        removeUser: (state) => {
            state.users = [];
            state.accessToken = null;
            state.isLoading = false;
        }

    }
});

export const {
    addUser,
    setAccessToken,
    removeUser
} = authSlice.actions;

export default authSlice.reducer;