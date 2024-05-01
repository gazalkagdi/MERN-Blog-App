import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true,
                state.error = null
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload,
                state.error = null,
                state.loading = false
        },
        signInFailure: (state, action) => {
            state.error = action.payload,
                state.loading = false
        },
        updateStart: (state) => {
            state.loading = true,
                state.error = null
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload,
                state.error = null,
                state.loading = false
        },
        updateFailure: (state, action) => {
            state.error = action.payload,
                state.loading = false
        },
        deleteUserStart: (state) => {
            state.loading = true,
                state.error = null
        },
        deleteUserSuccess: (state) => {
            state.loading = false,
                state.currentUser = null,
                state.error = null
        },
        deleteUserFailure: (state, action) => {
            state.loading = false,
                state.error = action.payload
        },
        startSignout: (state) => {
            state.loading = false,
                state.error = null,
                state.currentUser = null
        }
    },
});

export const { signInStart, signInSuccess, signInFailure, updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, startSignout } = userSlice.actions;

export default userSlice.reducer;