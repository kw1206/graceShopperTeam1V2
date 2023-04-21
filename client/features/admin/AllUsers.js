import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { selectAllUsers } from "./allUsersSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "./allUsersSlice";
// TUTORIAL FOR MAKING DYNAMIC REACT TABLE
// https://www.youtube.com/watch?v=BqVH9Z_6p38

const dummyUsers = [
  {
    id: 1,
    firstName: "AdminFirstName",
    lastName: "AdminLastName",
    username: "admin@email.com",
    password: "123",
    ip: "117.29.86.254",
    address: {
      address: "1745 T Street Southeast",
      city: "Washington",
      coordinates: {
        lat: 38.867033,
        lng: -76.979235,
      },
      postalCode: "20020",
      state: "DC",
    },
    bank: {
      cardExpire: "06/22",
      cardNumber: "50380955204220685",
      cardType: "maestro",
      currency: "Peso",
      iban: "NO17 0695 2754 967",
    },
    role: "admin",
  },
  {
    id: 2,
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
  },
];
const SearchBar = ({ searchTable }) => {
  const [searchValue, setSearchValue] = useState("");
  const submitForm = (event) => {
    event.preventDefault();
    searchTable(searchValue);
  };
  return (
    <div className="userSearchBar">
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Search users"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
const Content = ({ entries, columns }) => {
  return (
    <tbody>
      {entries.map((entry) => (
        <tr key={entry.id}>
          {columns.map((column) => (
            <td key={column} className="usersTableCell">
              {entry[column]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
const HeaderCell = ({ column, sorting, sortTable }) => {
  // TO IMPLEMENT SORTING, WE'LL NEED TO UPDATE/CHANGE BACKEND ROUTES TO SERVE UP DIFFERENTLY SORTED DATA WITH EACH CLICK

  // const isDescSorting = sorting.column === column && sorting.order === "desc";
  // const isAscSorting = sorting.column === column && sorting.order === "asc";
  // const futureSortingOrder = isDescSorting ? "asc" : "des";
  return (
    <th
      key={column}
      className="usersTableCell"
      // onClick={() => sortTable({ column, order: futureSortingOrder })}
    >
      {column}
      {/* {isDescSorting && <span>⬇</span>}
      {isAscSorting && <span>⬆</span>} */}
    </th>
  );
};
const Header = ({ columns, sorting, sortTable }) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <HeaderCell
            column={column}
            sorting={sorting}
            key={column}
            sortTable={sortTable}
          />
        ))}
      </tr>
    </thead>
  );
};

const AllUsers = () => {
  const users = useSelector(selectAllUsers);
  const [sorting, setSorting] = useState({ column: "id", order: "asc" });
  const [searchValue, setSearchValue] = useState("");
  const columns = ["id", "username", "lastName", "firstName"]; // could we change User model so fullName is "lastName, fullName"?

  const sortTable = (newSorting) => {
    setSorting(newSorting);
  };

  const searchTable = (newSearchValue) => {
    setSearchValue(newSearchValue);
  };

  const dispatch = useDispatch();

  // need to write the admin users slice first to get this route
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [searchValue]); // add sorting to dependencies if we decide to implement sorting feature later

  console.log(users);

  return (
    <div id="usersTable">
      <SearchBar searchTable={searchTable} />
      <table>
        <Header columns={columns} sorting={sorting} sortTable={sortTable} />
        <Content entries={users} columns={columns} />
        <tbody></tbody>
      </table>
    </div>
  );
};

export default AllUsers;
