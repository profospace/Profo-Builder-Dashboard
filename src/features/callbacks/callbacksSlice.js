import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import callbacksService from './callbacksService';

const initialState = {
    callbacks: [],
    pagination: {
        current: 1,
        total: 1,
        totalRecords: 0
    },
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
};

export const getAllCallbacks = createAsyncThunk(
    'callbacks/getAllCallbacks',
    async ({ builderId, status, page, limit }, thunkAPI) => {
        try {
            return await callbacksService.getAllCallbacks(builderId, status, page, limit);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateCallbackStatus = createAsyncThunk(
    'callbacks/updateCallbackStatus',
    async ({ callbackId, status }, thunkAPI) => {
        try {
            return await callbacksService.updateCallbackStatus(callbackId, status);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteCallback = createAsyncThunk(
    'callbacks/deleteCallback',
    async (callbackId, thunkAPI) => {
        try {
            return await callbacksService.deleteCallback(callbackId);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const callbacksSlice = createSlice({
    name: 'callbacks',
    initialState,
    reducers: {
        resetCallbacks: () => initialState,
        clearCallbacksError: (state) => {
            state.isError = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            // Get all callbacks
            .addCase(getAllCallbacks.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getAllCallbacks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.callbacks = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(getAllCallbacks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })

            // Update callback status
            .addCase(updateCallbackStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCallbackStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // Update the specific callback in the array
                const updatedCallback = action.payload.data;
                const index = state.callbacks.findIndex(callback => callback._id === updatedCallback._id);
                if (index !== -1) {
                    state.callbacks[index] = updatedCallback;
                }
            })
            .addCase(updateCallbackStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })

            // Delete callback
            .addCase(deleteCallback.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCallback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // Remove the deleted callback from the array
                const deletedCallbackId = action.meta.arg;
                state.callbacks = state.callbacks.filter(callback => callback._id !== deletedCallbackId);
                state.pagination.totalRecords -= 1;
            })
            .addCase(deleteCallback.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            });
    }
});

export const { resetCallbacks, clearCallbacksError } = callbacksSlice.actions;
export default callbacksSlice.reducer;