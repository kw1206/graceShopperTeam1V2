import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductSummary from "./admin/ProductsSummary";
import AllUsers from "./admin/AllUsers";

const Home = () => {
  const loggedInAsAdmin = useSelector((state) => state.auth.me);

  return (
    <div className="page">
      {loggedInAsAdmin.isAdmin ? (
        <div id="adminDashboard">
          <div id="productsUsersSummary">
            <div className="summaryViews">
              <div className="summaryHeader">
                <h3>PRODUCTS</h3>
                <Link to={"/products"}>View all + create new products</Link>
              </div>
              <div id="productsSummary">
                <ProductSummary />
              </div>
            </div>
            <div className="summaryViews">
              <div className="summaryHeader">
                <h3>USERS</h3>
              </div>
              <div id="usersSummary">
                <AllUsers />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
