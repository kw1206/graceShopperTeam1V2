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
  const lastName = useSelector((state) => state.auth.me.lastName);

  return (
    <div
      className="navBar"
      id={loggedInAsAdmin.isAdmin ? "navBarAdmin" : "navBarUserGuest"}
    >
      <div id="navBarContents">
        <h1>GS Team 1</h1>
        <nav>
          {isLoggedIn ? (
            <div className="navLinks">
              {/* The navbar will show these links after you log in */}

              {/* <Link to="/cart">Cart</Link> */}
              {loggedInAsAdmin.isAdmin ? (
                <>
                  <Link title="view dashboard" to="/home">
                    Dashboard
                  </Link>
                  <Link title="view all products" to="/products">
                    View products
                  </Link>
                </>
              ) : (
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
                {firstName.slice(0, 1)}
                {lastName.slice(0, 1)}
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
            <div className="navLinks">
              {/* The navbar will show these links before you log in */}
              {/* <Link to="/home">Home</Link> */}
              <Link title="view all products" to="/products">
                All Products
              </Link>
              <Link title="view my cart" to="/cart">
                Cart
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
