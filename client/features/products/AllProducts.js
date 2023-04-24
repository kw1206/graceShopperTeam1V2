import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleProduct from "./SingleProduct";
import { selectAllProducts, fetchAllProducts } from "./allProductsSlice";
import AddProductForm from "../admin/AddProductForm.js";

const AllProductsPage = () => {
  const loggedInAsAdmin = useSelector((state) => state.auth.me);
  // const products = useSelector((state) => state.allProducts);
  const products = useSelector(selectAllProducts);
  const [loading, setLoading] = useState(true);
  // default sort order + filter is ascending by id with all products on view
  const [sortAndFilter, setSortAndFilter] = useState({
    column: "id",
    order: "asc",
    filter: "all",
  });
  // collects every available category to make up filters
  const [filterCategories, setFilterCategories] = useState([]);
  // categories to sort by
  const column = ["id", "title", "brand", "category", "price"];

  // sort functionality
  const sortProductsBy = (event) => {
    setSortAndFilter({
      column: event.target.value,
      order: sortAndFilter.order,
      filter: sortAndFilter.filter,
    });
  };
  const sortProductsOrder = (event) => {
    let newOrder = "";
    if (event.target.value === "ascending") {
      newOrder = "asc";
    } else {
      newOrder = "desc";
    }
    setSortAndFilter({
      column: sortAndFilter.column,
      order: newOrder,
      filter: sortAndFilter.filter,
    });
  };

  // filter functionality
  const getCategories = (array) => {
    let categories = [];
    array.forEach((product) => categories.push(product.category));
    let filteredCategories = [...new Set(categories)];
    return filteredCategories.sort();
  };
  const filterProductsBy = (event) => {
    setSortAndFilter({
      column: sortAndFilter.column,
      order: sortAndFilter.order,
      filter: event.target.value,
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts(sortAndFilter));
  }, [sortAndFilter]);

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
      setFilterCategories(getCategories(products));
    }
  }, [products]);

  return (
    <div className="page">
      <div className="selectSortAndFilter">
        <div>
          <label>Sort by: </label>
          <select onChange={sortProductsBy}>
            {column.map((sortCategory) => (
              <option key={sortCategory}>{sortCategory}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Order</label>
          <select onChange={sortProductsOrder}>
            <option>ascending</option>
            <option>descending</option>
          </select>
        </div>
        <div>
          <label>Filter by: </label>
          <select onChange={filterProductsBy}>
            <option>all</option>
            {filterCategories.map((filterCategory) => (
              <option key={filterCategory}>{filterCategory}</option>
            ))}
          </select>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      {loading ? (
        <h3>Products loading</h3>
      ) : loggedInAsAdmin.isAdmin ? (
        <div id="productsPageAdminView">
          <div id="addProductFormDiv">
            <AddProductForm />
          </div>
          <div id="allProductsAdminView">
            {products.length > 0 ? (
              products.map((product) => (
                <SingleProduct product={product} key={product.id} />
              ))
            ) : (
              <p>There are no products in the store</p>
            )}
          </div>
        </div>
      ) : (
        <div id="allProductsUserGuestView">
          {products.length > 0 ? (
            products.map((product) => (
              <SingleProduct product={product} key={product.id} />
            ))
          ) : (
            <p>There are no products in the store</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllProductsPage;
