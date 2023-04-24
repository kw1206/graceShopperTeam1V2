//this will be a users profile
//order history should be a component on this page

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const dummyUser = {
  firstName: "Sheldon",
  lastName: "Quigley",
  username: "hbingley1@plala.or.jp",
  password: "CQutx25i8r",
  ip: "253.240.20.181",
  address: {
    address: "6007 Applegate Lane",
    city: "Louisville",
    coordinates: {
      lat: 38.1343013,
      lng: -85.6498512,
    },
    postalCode: "40219",
    state: "KY",
  },
  bank: {
    cardExpire: "10/23",
    cardNumber: "5355920631952404",
    cardType: "mastercard",
    currency: "Ruble",
    iban: "MD63 L6YC 8YH4 QVQB XHIK MTML",
  },
};

const dummyOrder = [
  {
    id: 1,
    isFulfilled: true,
    userId: 2,
    createdAt: "2023-04-21T21:26:02.288Z",
    updatedAt: "2023-04-21T21:26:02.288Z",
    items: [
      {
        id: 2,
        quantity: "5",
        createdAt: "2023-04-21T21:26:02.517Z",
        updatedAt: "2023-04-21T21:26:02.517Z",
        productId: 1,
        cartId: 2,
        product: {
          id: 1,
          title: "Samsung Universe 9",
          brand: "Samsung",
          description:
            "Samsung's new variant which goes beyond Galaxy to the Universe",
          price: "1249.00",
          category: "smartphones",
          inventory: 10,
          thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
          images: ["https://i.dummyjson.com/data/products/3/1.jpg"],
          createdAt: "2023-04-21T21:26:02.299Z",
          updatedAt: "2023-04-21T21:26:02.299Z",
        },
      },
    ],
  },
  {
    id: 2,
    isFulfilled: true,
    userId: 2,
    createdAt: "2023-04-21T21:26:02.288Z",
    updatedAt: "2023-04-21T21:26:02.288Z",
    items: [
      {
        id: 2,
        quantity: "5",
        createdAt: "2023-04-21T21:26:02.517Z",
        updatedAt: "2023-04-21T21:26:02.517Z",
        productId: 1,
        cartId: 2,
        product: {
          id: 1,
          title: "Samsung Universe 9",
          brand: "Samsung",
          description:
            "Samsung's new variant which goes beyond Galaxy to the Universe",
          price: "1249.00",
          category: "smartphones",
          inventory: 10,
          thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
          images: ["https://i.dummyjson.com/data/products/3/1.jpg"],
          createdAt: "2023-04-21T21:26:02.299Z",
          updatedAt: "2023-04-21T21:26:02.299Z",
        },
      },
    ],
  },
  {
    id: 3,
    isFulfilled: true,
    userId: 2,
    createdAt: "2023-04-21T21:26:02.288Z",
    updatedAt: "2023-04-21T21:26:02.288Z",
    items: [
      {
        id: 2,
        quantity: "5",
        createdAt: "2023-04-21T21:26:02.517Z",
        updatedAt: "2023-04-21T21:26:02.517Z",
        productId: 1,
        cartId: 2,
        product: {
          id: 1,
          title: "Samsung Universe 9",
          brand: "Samsung",
          description:
            "Samsung's new variant which goes beyond Galaxy to the Universe",
          price: "1249.00",
          category: "smartphones",
          inventory: 10,
          thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
          images: ["https://i.dummyjson.com/data/products/3/1.jpg"],
          createdAt: "2023-04-21T21:26:02.299Z",
          updatedAt: "2023-04-21T21:26:02.299Z",
        },
      },{
        id: 2,
        quantity: "5",
        createdAt: "2023-04-21T21:26:02.517Z",
        updatedAt: "2023-04-21T21:26:02.517Z",
        productId: 1,
        cartId: 2,
        product: {
          id: 1,
          title: "Samsung Universe 9",
          brand: "Samsung",
          description:
            "Samsung's new variant which goes beyond Galaxy to the Universe",
          price: "1249.00",
          category: "smartphones",
          inventory: 10,
          thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
          images: ["https://i.dummyjson.com/data/products/3/1.jpg"],
          createdAt: "2023-04-21T21:26:02.299Z",
          updatedAt: "2023-04-21T21:26:02.299Z",
        },
      },{
        id: 2,
        quantity: "5",
        createdAt: "2023-04-21T21:26:02.517Z",
        updatedAt: "2023-04-21T21:26:02.517Z",
        productId: 1,
        cartId: 2,
        product: {
          id: 1,
          title: "Samsung Universe 9",
          brand: "Samsung",
          description:
            "Samsung's new variant which goes beyond Galaxy to the Universe",
          price: "1249.00",
          category: "smartphones",
          inventory: 10,
          thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
          images: ["https://i.dummyjson.com/data/products/3/1.jpg"],
          createdAt: "2023-04-21T21:26:02.299Z",
          updatedAt: "2023-04-21T21:26:02.299Z",
        },
      },{
        id: 2,
        quantity: "5",
        createdAt: "2023-04-21T21:26:02.517Z",
        updatedAt: "2023-04-21T21:26:02.517Z",
        productId: 1,
        cartId: 2,
        product: {
          id: 1,
          title: "Samsung Universe 9",
          brand: "Samsung",
          description:
            "Samsung's new variant which goes beyond Galaxy to the Universe",
          price: "1249.00",
          category: "smartphones",
          inventory: 10,
          thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
          images: ["https://i.dummyjson.com/data/products/3/1.jpg"],
          createdAt: "2023-04-21T21:26:02.299Z",
          updatedAt: "2023-04-21T21:26:02.299Z",
        },
      },
    ],
  },
];

const UserAccountDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const loggedInAsAdmin = useSelector((state) => state.auth.me);

  console.log(dummyOrder[0].items);

  return (
    <div className="page">
      <div className="userInfo">
        <div id="accountDetails">
          <h2>Account details</h2>
          <table id="userDetailsTable">
            <tbody>
              <tr>
                <td className="accountProperty">First name:</td>
                <td>{dummyUser.firstName}</td>
              </tr>
              <tr>
                <td className="accountProperty">Last name:</td>
                <td>{dummyUser.lastName}</td>
              </tr>
              <tr>
                <td className="accountProperty">Username:</td>
                <td>{dummyUser.username}</td>
              </tr>
              <tr>
                <td className="accountProperty">Password:</td>
                <td>**********</td>
              </tr>
              <tr>
                <td className="accountProperty">Address:</td>
                <td>
                  {dummyUser.address.address}
                  <br />
                  {dummyUser.address.city}, {dummyUser.address.city}
                  <br />
                  {dummyUser.address.postalCode}
                </td>
              </tr>
              <tr>
                <td className="accountProperty">Payment info:</td>
                <td>**********</td>
              </tr>
            </tbody>
          </table>
          {loggedInAsAdmin.isAdmin ? (
            <></>
          ) : (
            <button id="editAccountBtn">Edit my account</button>
          )}
        </div>
        <div id="orderHistory">
          <h2>Order history</h2>
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
                  <td>date fulfilled</td>
                  <td>
                    <ul>
                      {order.items.map((item) => (
                        <Link to={`/products/${item.productId}`} key={order.items.indexOf(item)}>
                        <li>Product #: {item.productId} | Quantity: {item.quantity} | {item.product.title}</li>
                        </Link>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* {loggedInAsAdmin.isAdmin ? (
          <>
            <p>Inventory: {selectedProduct.invnetory}</p>
            <p>Product ID #{selectedProduct.id}</p>
            <button id="deleteBtn" onClick={deleteThisProduct}>
              Delete product
            </button>
            <Link to={`/products/${id}/editProduct`}>
              <button id="editBtn">Edit product</button>
            </Link>
          </>
        ) : (
          <>
            <p>View more {selectedProduct.category}</p>
            <button id="addBtn">Add to cart</button>
          </>
        )} */}
      </div>
    </div>
  );
};

export default UserAccountDetails;
