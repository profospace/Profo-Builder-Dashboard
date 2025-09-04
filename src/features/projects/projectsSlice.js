import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectsService from './projectsService';


const initialState = {
  projects: [],
  projectInteraction : [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ""
};

export const getAllProjects = createAsyncThunk('projects/getAllProjects', async (builderId, thunkAPI) => {
  try {
    return await projectsService.getAllProjects(builderId);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getProjectAllInteractions = createAsyncThunk('projects/getProjectAllInteractions', async (data, thunkAPI) => {
  console.log("data" , data)
  try {
    return await projectsService.getProjectAllInteractions(data);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {

    reducers: {
      resetProjects: () => initialState, // Reset to initial state
    // ... other reducers
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(getAllProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("Action comming" , action.payload)
        state.projects = action.payload.data.projects;
        // state.message = action.payload.message;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getProjectAllInteractions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectAllInteractions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projectInteraction = [...state.projectInteraction, ...action.payload.data];
        // state.propertyInteraction = action.payload.data;
        // state.message = action.payload.message;
      })
      .addCase(getProjectAllInteractions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      
      
  }
});
export const { resetProjects } = projectsSlice.actions
export default projectsSlice.reducer;
