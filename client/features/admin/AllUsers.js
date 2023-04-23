import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { selectAllUsers } from "./allUsersSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "./allUsersSlice";
// TUTORIAL FOR MAKING DYNAMIC REACT TABLE
// https://www.youtube.com/watch?v=BqVH9Z_6p38

const SearchBar = ({ searchTable }) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="userSearchBar">
      <form>
        <input
          type="search"
          placeholder="Search users"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
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
  const isDescSorting = sorting.column === column && sorting.order === "desc";
  const isAscSorting = sorting.column === column && sorting.order === "asc";
  const futureSortingOrder = isDescSorting ? "asc" : "desc";
  // const noSortingOrder = !sorting.order;
  return (
    <th
      key={column}
      className="usersTableCell"
      id={column}
      onClick={() =>
        sortTable({
          column: column,
          order: futureSortingOrder,
        })
      }
    >
      {column}
      {isDescSorting && <span>▼</span>}
      {isAscSorting && <span>▲</span>}
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
  const columns = ["id", "username", "lastName", "firstName"];

  const sortTable = (newSorting) => {
    setSorting({...sorting, ...newSorting});
  };
  const searchTable = (newSearchValue) => {
    setSearchValue(newSearchValue);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers(sorting));
    console.log('sorting -->', sorting)
  }, [sorting]); // add sorting to dependencies to sort feature later

  return (
    <div className="page">
      <div id="usersTable">
        <SearchBar searchTable={searchTable} />
        <table>
          <Header columns={columns} sorting={sorting} sortTable={sortTable} />
          <Content entries={users} columns={columns} />
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
