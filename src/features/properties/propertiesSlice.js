import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import propertiesService from './propertiesService';


const initialState = {
  properties: [],
  propertyInteraction : [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ""
};

export const getAllProperties = createAsyncThunk('properties/getAllProperties', async (builderId, thunkAPI) => {
  try {
    return await propertiesService.getAllProperties(builderId);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchPropertyInteractions = createAsyncThunk('properties/getPropertyAllInteractions', async (data, thunkAPI) => {
  console.log("data" , data)
  try {
    return await propertiesService.getPropertyAllInteractions(data);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {

    reducers: {
      resetProperties: () => initialState, // Reset to initial state
    // ... other reducers
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(getAllProperties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.properties = action.payload.data.properties;
        // state.message = action.payload.message;
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(fetchPropertyInteractions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPropertyInteractions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.propertyInteraction = [...state.propertyInteraction, ...action.payload.data];
        // state.propertyInteraction = action.payload.data;
        // state.message = action.payload.message;
      })
      .addCase(fetchPropertyInteractions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      
      
  }
});
export const { resetProperties } = propertiesSlice.actions
export default propertiesSlice.reducer;
