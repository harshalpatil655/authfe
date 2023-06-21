import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import HomePage from "./HomePage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default AllRoutes;
