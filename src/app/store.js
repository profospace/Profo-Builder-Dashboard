import { configureStore } from '@reduxjs/toolkit'
import propertiesReducers from "../features/properties/propertiesSlice";
import projectsReducers from "../features/projects/projectsSlice";
import authReducer from "../features/auth/authSlice";
import callbacksReducer from "../features/callbacks/callbacksSlice";

export const store = configureStore({
    reducer: {
    auth: authReducer,
    properties: propertiesReducers,
    projects: projectsReducers,
    callbacks: callbacksReducer
    },
  });