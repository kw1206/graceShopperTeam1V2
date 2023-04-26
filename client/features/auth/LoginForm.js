import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate } from "../../app/store";

const LoginForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    if (!username || !password) return alert("Invalid username or password");
    dispatch(authenticate({ username, password, method: formName }));
  };

  return (
    <div className="page">
      <div id="loginPage">
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit} name={name}>
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
            {/* {error && <div> {error} </div>} */}
          </form>
        </div>
        <div id="loginInstructions">
          <h4>Log in to add items to your cart!</h4>
          <h5>Don't have an account?</h5>
          ❯❯❯<Link id="signupLink" to="/signup">Sign up</Link>❮❮❮
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
