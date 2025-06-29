import { configureStore } from '@reduxjs/toolkit'
import propertiesReducers from "../features/properties/propertiesSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
    auth: authReducer,
    properties: propertiesReducers,
    },
  });