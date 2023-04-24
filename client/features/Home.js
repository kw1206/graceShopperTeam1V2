import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductSummary from "./admin/ProductsSummary";
import AllUsers from "./admin/AllUsers";
import { Link } from "react-router-dom";
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
                <Link to={"/products"}>
                  View all + create new products
                </Link>
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
          <div id="salesFigures">
            <h3>Sales</h3>
          </div>
        </div>
      ) : (
        <div id="userHomePage">
        <div id="circle1">1</div>
        <div id="circle2">2</div>
        <div id="circle3">3</div>
        <div id="circle4">4</div>
        <div id="circle5">5</div>
        <div id="circle6">6</div>
        <div id="circle7">7</div>
        <div id="circle8">8</div>
        </div>
      )}
    </div>
  );
};

export default Home;
