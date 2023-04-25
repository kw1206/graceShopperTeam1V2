import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSingleUser, editUser, selectSingleUser } from "./userSlice";

const EditUserAccountDetails = () => {
  const loggedInUser = useSelector((state) => state.auth.me);
  const userId = loggedInUser.id;
  const user = useSelector((state) => selectSingleUser(state).user);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleUser(userId)).then(() => {});
  }, [dispatch, userId]);

  useEffect(() => {
    if (user.id > 0) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setLoading(false);
    }
  }, [user]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (confirm("Are you sure you want to make these edits?") === true) {
      dispatch(
        editUser({
          id: userId,
          firstName: firstName,
          lastName: lastName,
        })
      ).then(() => {
        dispatch(fetchSingleUser(userId));
        navigate(`/myaccount`);
      });
    }
  };

  return (
    <div className="page">
      {loading ? (
        <h3>Loading edit user form...</h3>
      ) : (
        <div id="editUserForm">
          <h3>Edit my profile</h3>
          <br />
          <form onSubmit={handleSubmit}>
            <label>First name:</label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label>Last name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <br />
            <div id="editUserFormBtns">
              <button className="productBtn" id="editProductBtn" type="submit">
                Submit edits
              </button>
              <button
                className="productBtn"
                id="cancelEditBtn"
                onClick={() => navigate("/myaccount")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditUserAccountDetails;
