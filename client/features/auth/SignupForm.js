import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate } from "../../app/store";

const SignupForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const firstName = evt.target.firstName.value;
    const lastName = evt.target.lastName.value;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    if (!firstName || !lastName || !username || !password)
      return alert("Please fill in every field of the register form");
    dispatch(
      authenticate({
        firstName,
        lastName,
        username,
        password,
        method: formName,
      })
    );
  };

  return (
    <div className="page">
      <div id="registerPage">
        <div>
          <h2>Register as new user</h2>
          <form onSubmit={handleSubmit} name={name}>
            <div>
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input required name="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input required name="lastName" type="text" />
            </div>
            <div>
              <label htmlFor="username">
                <small>Username</small>
              </label>
              <input required name="username" type="text" />
            </div>
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input required name="password" type="password" />
            </div>
            <div>
              <button className="loginSignUpBtn" type="submit">
                {displayName}
              </button>
            </div>
          </form>
        </div>
        <div id="loginInstructions">
          <h4>Sign up to add items to your cart!</h4>
          <h5>Already have an account?</h5>
          ❯❯❯<Link id="signupLink" to="/login">Login</Link>❮❮❮
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
