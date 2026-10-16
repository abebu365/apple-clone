import React from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/bootstrap.css";
import "./assets/style.css";
import Iphone from "./Components/Iphone/Iphone";
import SingleProduct from "./Components/SingleProduct/SingleProduct";
import "./App.css";
import SharedLayout from "./Components/SharedLayout/SharedLayout";
import Body from "./Components/Main/Body";
function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/" element={<Body />} />
        <Route path="/body" element={<Body />} />
        <Route path="/Iphone" element={<Iphone />} />
        <Route path="/iphone/:product_id" element={<SingleProduct />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
