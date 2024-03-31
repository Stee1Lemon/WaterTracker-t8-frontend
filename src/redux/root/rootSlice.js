import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: '',
};

export const rootSlice = createSlice({
    name: 'root',
    initialState,
    extraReducers: builder => {
        builder
            .addMatcher(action => action.type.endsWith('/pending'), state => {
                state.isLoading = true;
                state.error = null;
            })
            .addMatcher(action => action.type.endsWith('/rejected'), (state, {payload}) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addMatcher(action => action.type.endsWith('/fulfilled'), state => {
                state.isLoading = false;
            })

    }
});

export const rootReducer = rootSlice.reducer;