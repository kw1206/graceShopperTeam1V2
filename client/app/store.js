import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import selectAllUsers from "../features/admin/allUsersSlice";
<<<<<<< HEAD
import  selectCurrentCart from "../features/cart/cartSlice";
=======
import selectAllProducts from "../features/products/allProductsSlice";
import expandedProductSlice from "../features/products/expandedProductSlice";
>>>>>>> 580c97d7d08468661c420b736d10be4c6be323de

const store = configureStore({
  reducer: {
    auth: authReducer,
    allUsers: selectAllUsers,
<<<<<<< HEAD
    currentCartB: selectCurrentCart
=======
    allProducts: selectAllProducts,
    expandedProduct: expandedProductSlice,
>>>>>>> 580c97d7d08468661c420b736d10be4c6be323de
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
