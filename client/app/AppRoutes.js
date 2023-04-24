import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import LoginForm from "../features/auth/LoginForm";
import SignupForm from "../features/auth/SignupForm";
import Home from "../features/Home";
import Cart from "../features/cart/Cart";
import { me } from "./store";
import AllProductsPage from "../features/products/AllProducts";
import AllUsers from "../features/admin/AllUsers";
import ExpandedProduct from "../features/products/ExpandedProduct";
import EditProductForm from "../features/admin/EditProductForm";
import AddProductForm from "../features/admin/AddProductForm";
import UserAccountDetails from "../features/users/UserAccount";
/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const loggedInAsAdmin = useSelector((state) => state.auth.me);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        loggedInAsAdmin.isAdmin ? (
          // ROUTES FOR ADMINS
          <Routes>
            {/* GENERAL */}
            <Route path="/*" element={<AllProductsPage />} />
            <Route path="/home" element={<Home />} />
            {/* PRODUCT ROUTES */}
            <Route path="/products" element={<AllProductsPage />} />
            <Route path="/products/:id" element={<ExpandedProduct />} />
            {/* SPECIFIC TO ADMINS */}
            <Route
              path="/products/:id/editProduct"
              element={<EditProductForm />}
            />
            <Route
              path="/users/:id"
              element={<UserAccountDetails />}
            />
          </Routes>
        ) : (
          // ROUTES FOR LOGGED IN USERS
          <Routes>
            {/* GENERAL */}
            <Route path="/*" element={<AllProductsPage />} />
            <Route path="/home" element={<Home />} />
            {/* PRODUCT ROUTES */}
            <Route path="/products" element={<AllProductsPage />} />
            <Route path="/products/:id" element={<ExpandedProduct />} />
            {/* CART ROUTE */}
            <Route path="/cart" element={<Cart />} />
            {/* ROUTES FOR LOGGED IN USERS */}
            <Route path="/myaccount" element={<UserAccountDetails />} />
          </Routes>
        )
      ) : (
        // ROUTES IF YOU ARE NOT LOGGED IN
        <Routes>
          {/* LOGIN ROUTES */}
          <Route
            path="/login"
            element={<LoginForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<SignupForm name="signup" displayName="Sign Up" />}
          />
          {/* GENERAL */}
          <Route path="/*" element={<AllProductsPage />} />
          <Route path="/home" element={<Home />} />
          {/* PRODUCT ROUTES */}
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/products/:id" element={<ExpandedProduct />} />
          {/* CART ROUTE */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
