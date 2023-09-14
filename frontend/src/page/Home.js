import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../component/NavBar";
import ProductList from "../component/ProductList";

const Home = () => {
  return (
    <div>
      <Link>
        <NavBar />
        <ProductList />
      </Link>
    </div>
  );
};

export default Home;
