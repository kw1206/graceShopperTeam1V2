import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import LoginForm from "../features/auth/LoginForm";
import SignupForm from "../features/auth/SignupForm";
import Home from "../features/Home";
import Cart from "../features/cart/Cart";
import { me } from "./store";
import AllProducts from "../features/products/AllProducts";
import AllUsers from "../features/admin/AllUsers";

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
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/home" element={<AllProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/admin/products" element={<AllProducts />} />
          <Route path="/admin/users" element={<AllUsers />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/*" element={<AllProducts />} />
          <Route
            path="/login"
            element={<LoginForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<SignupForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<AllProducts />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
