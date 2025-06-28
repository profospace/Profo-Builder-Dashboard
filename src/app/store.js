import { configureStore } from '@reduxjs/toolkit'
import propertiesReducers from "../features/properties/propertiesSlice";

export const store = configureStore({
    reducer: {
    properties: propertiesReducers,
    },
  });