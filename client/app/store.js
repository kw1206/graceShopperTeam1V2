import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import selectAllUsers from "../features/admin/allUsersSlice";
import  selectCurrentCart from "../features/cart/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    allUsers: selectAllUsers,
    currentCart: selectCurrentCart
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
