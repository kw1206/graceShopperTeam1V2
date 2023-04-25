import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleUser, selectSingleUser } from "./userSlice";

const EditUserAccountDetails = () => {
  const [loading, setLoading] = useState(true);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");

  const loggedInUser = useSelector((state) => state.auth.me);
  const userId = loggedInUser.id;
  const selectedUser = useSelector((state) => selectSingleUser(state).user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, []);
  useEffect(() => {
    if (selectedUser.id > 0) {
      setLoading(false);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser.id > 0) {
      setEditedFirstName(selectedUser.firstName);
      setEditedLastName(selectedUser.lastName);
    }
  }, [selectedUser]);

  const cancelEdit = () => {
    navigate("/myaccount");
  };

  return (
    <div className="page">
      <div id="editUserForm">
        <h3>Edit my profile</h3>
        <br />
        <form>
          <label>First name:</label>
          <input
            type="text"
            required
            value={editedFirstName}
            onChange={(event) => setEditedFirstName(event.target.value)}
          />
          <label>Last name:</label>
          <input
            type="text"
            value={editedLastName}
            onChange={(event) => setEditedLastName(event.target.value)}
          />
          <br />
          <div id="editUserFormBtns">
            <button className="productBtn" id="editProductBtn" type="submit">
              Submit edits
            </button>
            <button
              className="productBtn"
              id="cancelEditBtn"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserAccountDetails;
