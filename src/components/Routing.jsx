import React from "react";
import { Routes, Route } from "react-router-dom";
import { BASE_PATH } from "../config";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import OrderBook from "./OrderBook";
import Cart from "./Cart";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={`${BASE_PATH}/`} element={<HomePage />} />
      <Route path={`${BASE_PATH}/about`} element={<AboutPage />} />
      <Route path={`${BASE_PATH}/contact`} element={<ContactPage />} />
      <Route path={`${BASE_PATH}/OrderBook`} element={<OrderBook />} />
      <Route path={`${BASE_PATH}/cart`} element={<Cart />} />
      <Route path={`${BASE_PATH}/contactPage`} element={<ContactPage />} />
      <Route path="*" element={<h1>404 - הדף לא נמצא</h1>} />
    </Routes>
  );
}
