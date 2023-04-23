import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/Home";
import Cart from "../features/cart/Cart";
import { me } from "./store";
import AllProductsPage from "../features/products/AllProducts";
import AllUsers from "../features/admin/AllUsers";
import ExpandedProduct from "../features/products/ExpandedProduct";
import EditProductForm from "../features/admin/EditProductForm";
/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        // ROUTES IF YOU ARE LOGGED IN
        <Routes>
          {/* GENERAL */}
          <Route path="/*" element={<AllProductsPage />} />
          <Route path="/home" element={<AllProductsPage />} />
          {/* PRODUCT ROUTES */}
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/products/:id" element={<ExpandedProduct />} />
          {/* CART ROUTE */}
          <Route path="/cart" element={<Cart />} />
          {/* ROUTES FOR LOGGED IN USERS */}
          {/* <Route path="/myaccount" element={<UserAccountDetails />} /> */}
          {/* ROUTES FOR ADMINS */}
          <Route path="/users" element={<AllUsers />} />
          <Route path="/products/:id/editProduct" element={<EditProductForm />} />

        </Routes>
      ) : (
        // ROUTES IF YOU ARE NOT LOGGED IN
        <Routes>
          {/* LOGIN ROUTES */}
          <Route path="/login" element={<AuthForm name="login" displayName="Login" />} />
          <Route path="/signup" element={<AuthForm name="signup" displayName="Sign Up" />} />
          {/* GENERAL */}
          <Route path="/*" element={<AllProductsPage />} />
          <Route path="/home" element={<AllProductsPage />} />
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
