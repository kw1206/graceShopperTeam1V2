import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { selectAllUsers } from "./allUsersSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "./allUsersSlice";
// TUTORIAL FOR MAKING DYNAMIC REACT TABLE
// https://www.youtube.com/watch?v=BqVH9Z_6p38

const Content = ({ entries, columns }) => {
  return (
    <tbody>
      {entries.map((entry) => (
        <tr key={entry.id}>
          {columns.map((column) => (
            <td key={column} className="usersTableCell">
              <Link to={`/users/${entry.id}`}>{entry[column]} </Link>
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
  const columns = ["id", "username", "lastName", "firstName"];

  const sortTable = (newSorting) => {
    setSorting({ ...sorting, ...newSorting });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers(sorting));
  }, [sorting]);

  return (
    <div id="usersTable">
      <table id="allUsersTable">
        <Header columns={columns} sorting={sorting} sortTable={sortTable} />
        <Content entries={users} columns={columns} />
        <tbody></tbody>
      </table>
    </div>
  );
};

export default AllUsers;
