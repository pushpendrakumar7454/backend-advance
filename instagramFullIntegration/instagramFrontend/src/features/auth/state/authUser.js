import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");

const authSlice = createSlice({
    name: "auth",

    initialState: {
        user: storedUser ? JSON.parse(storedUser) : null,
        isAuthenticated: storedUser ? true : false,
        isLoading: false
    },

    reducers: {
        addUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;

            localStorage.setItem(
                "user",
                JSON.stringify(action.payload)
            );
        },

        removeUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;

            localStorage.removeItem("user");
        }
    }
});

export const { addUser, removeUser } = authSlice.actions;

export default authSlice.reducer;