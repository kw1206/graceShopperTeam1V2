import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import selectAllUsers from "../features/admin/allUsersSlice";
import selectAllProducts from "../features/products/allProductsSlice";
import expandedProductSlice from "../features/products/expandedProductSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    allUsers: selectAllUsers,
    allProducts: selectAllProducts,
    expandedProduct: expandedProductSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
