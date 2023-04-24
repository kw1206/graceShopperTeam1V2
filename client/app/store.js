import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import selectAllUsers from "../features/admin/allUsersSlice";
import  selectCurrentCart from "../features/cart/cartSlice";
import selectAllProducts from "../features/products/allProductsSlice";
import expandedProductSlice from "../features/products/expandedProductSlice";

//might need to add in a currentUser state to track
const store = configureStore({
  reducer: {
    auth: authReducer,
    allUsers: selectAllUsers,
    currentCart: selectCurrentCart,
    allProducts: selectAllProducts,
    expandedProduct: expandedProductSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
