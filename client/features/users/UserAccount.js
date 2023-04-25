import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchSingleUser,
  fetchOrderHistory,
  selectSingleUser,
} from "./userSlice";

const UserAccountDetails = () => {
  const { id } = useParams();
  const selectedUser = useSelector((state) => selectSingleUser(state).user);
  const selectedUserOrderHistory = useSelector(
    (state) => selectSingleUser(state).orderHistory
  );

  const loggedInUser = useSelector((state) => state.auth.me);
  const userId = loggedInUser.id;

  const dispatch = useDispatch();
  useEffect(() => {
    if (loggedInUser.isAdmin) {
      dispatch(fetchSingleUser(id));
      dispatch(fetchOrderHistory(id));
    } else {
      dispatch(fetchSingleUser(userId));
      dispatch(fetchOrderHistory(userId));
    }
  }, []);

  console.log("loggedInUser -->", loggedInUser);
  console.log("userId -->", userId);
  console.log("selectedUserOrderHistory -->", selectedUserOrderHistory);

  return (
    <div className="page">
      <Link className="goBack" to="/home">
        ❮❮❮ dashboard
      </Link>
      <div className="userInfo">
        <div id="accountDetails">
          <h2>Account details</h2>
          <table id="userDetailsTable">
            <tbody>
              <tr>
                <td className="accountProperty">First name:</td>
                <td>{selectedUser.firstName}</td>
              </tr>
              <tr>
                <td className="accountProperty">Last name:</td>
                <td>{selectedUser.lastName}</td>
              </tr>
              <tr>
                <td className="accountProperty">Username:</td>
                <td>{selectedUser.username}</td>
              </tr>
              <tr>
                <td className="accountProperty">Password:</td>
                <td>**********</td>
              </tr>
              {/* <tr>
                <td className="accountProperty">Address:</td>
                <td>
                  {dummyUser.address.address}
                  <br />
                  {dummyUser.address.city}, {dummyUser.address.city}
                  <br />
                  {dummyUser.address.postalCode}
                </td>
              </tr> */}
              <tr>
                <td className="accountProperty">Payment info:</td>
                <td>**********</td>
              </tr>
            </tbody>
          </table>
          {loggedInUser.isAdmin ? (
            <></>
          ) : (
            <Link to="/myaccount/edit">
              <button id="editAccountBtn">Edit my account</button>
            </Link>
          )}
        </div>
        <div id="orderHistory">
          <h2>Order history</h2>
          {selectedUserOrderHistory.length > 0 ? (
            <table id="orderHistoryTable">
              <thead>
                <tr>
                  <th id="orderNum">Order #</th>
                  <th id="dateSubmitted">Date submitted</th>
                  <th id="itemsPurchased">Items purchased</th>
                </tr>
              </thead>
              <tbody>
                {dummyOrder.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.updatedAt.slice(0, 10)}</td>
                    <td>
                      <ul>
                        {order.items.map((item) => (
                          <li key={order.items.indexOf(item)}>
                            Product #: {item.productId} | Quantity:{" "}
                            {item.quantity} | {item.product.title}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p id="noOrderHistory">No order history</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccountDetails;
