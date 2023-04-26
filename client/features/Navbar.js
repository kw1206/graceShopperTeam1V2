import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const loggedInAsAdmin = useSelector((state) => state.auth.me);
  const firstName = useSelector((state) => state.auth.me.firstName);
  const lastName = useSelector((state) => state.auth.me.lastName);
  const [firstInitial, setFirstInitial] = useState("");
  const [lastInitial, setLastInitial] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (firstName) {
      let initial = firstName.slice(0,1).toUpperCase()
      setFirstInitial(initial)
    }
    if (lastName) {
      let initial = lastName.slice(0,1).toUpperCase()
      setLastInitial(initial)
    }
  }, [firstName, lastName]);
  
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };
  
  return (
    <div
      className="navBar"
      id={loggedInAsAdmin.isAdmin ? "navBarAdmin" : "navBarUserGuest"}
    >
      <div id="navBarContents">
        <h1>GS Team 1</h1>
        <nav>
          {isLoggedIn ? (
            // if you are logged in...
            <div className="navLinks">
              {loggedInAsAdmin.isAdmin ? (
              // links if you are logged in as an admin
                <>
                  <Link title="view dashboard" to="/home">
                    Dashboard
                  </Link>
                  <Link title="view all products" to="/products">
                    View products
                  </Link>
                </>
              ) : (
              // links if you are logged in as a user
                <>
                  <Link title="view all products" to="/products">
                    All Products
                  </Link>
                  <Link title="view my cart" to="/cart">
                    Cart
                  </Link>
                </>
              )}
              <Link id="initials" title="view my account" to="/myAccount">
                {firstInitial}
                {lastInitial}
              </Link>
              <button
                id="logoutBtn"
                title="logout"
                type="button"
                onClick={logoutAndRedirectHome}
              >
                Logout
              </button>
            </div>
          ) : (
          // links if you are not logged in
            <div className="navLinks">
              <Link title="view all products" to="/products">
                All Products
              </Link>
              <Link title="login" to="/login">
                Login
              </Link>
              <Link title="sign up" to="/signup">
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
