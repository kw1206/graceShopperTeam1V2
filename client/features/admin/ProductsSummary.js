import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllProducts,
  fetchAllProducts,
} from "../products/allProductsSlice";
import { Link } from "react-router-dom";
const Content = ({ entries, columns }) => {
  return (
    <tbody>
      {entries.map((entry) => (
        <tr key={entry.id}>
          {columns.map((column) => (
            <td key={column} className="usersTableCell">
              <Link to={`/products/${entry.id}`}>{entry[column]}</Link>
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
      id={`product${column}`}
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

const ProductSummary = () => {
  const products = useSelector(selectAllProducts);
  const [sorting, setSorting] = useState({ column: "id", order: "asc", filter: "all" });
  const columns = ["id", "title", "brand", "category", "price", "inventory"];

  const sortTable = (newSorting) => {
    setSorting({ ...sorting, ...newSorting });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts(sorting));
  }, [sorting]);

  console.log(products);

  return (
    <>
        <table id="productsTable">
          <Header columns={columns} sorting={sorting} sortTable={sortTable} />
          <Content entries={products} columns={columns} />
        </table>
      </>
  );
};

export default ProductSummary;
