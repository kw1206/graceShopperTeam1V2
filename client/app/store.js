import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import selectAllUsers from "../features/admin/allUsersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    allUsers: selectAllUsers
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
