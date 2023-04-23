import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const loggedInAsAdmin = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  const firstName = useSelector((state) => state.auth.me.firstName);

  return (
    <div
      className="navBar"
      id={loggedInAsAdmin.isAdmin ? "navBarAdmin" : "navBarUserGuest"}
    >
      <h1>GS Team 1</h1>
      <nav>
        {isLoggedIn ? (
          <>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <p>Welcome back, {firstName}</p>
            {loggedInAsAdmin.isAdmin ? <></> : <Link to="/cart">Cart</Link>}
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </>
        ) : (
          <>
            {/* The navbar will show these links before you log in */}
            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
