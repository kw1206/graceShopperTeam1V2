import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleProduct from "./SingleProduct";
import { selectAllProducts, fetchAllProducts } from "./allProductsSlice";
import AddProductForm from "../admin/AddProductForm.js";
import { addProduct } from "./expandedProductSlice";

const AllProductsPage = () => {
  const loggedInAsAdmin = useSelector((state) => state.auth.me);

  const products = useSelector(selectAllProducts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [addProduct]);

  return (
    <div className="page">
      {loggedInAsAdmin.isAdmin ? (
        <div id="productsPageAdminView">
          <AddProductForm />
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
