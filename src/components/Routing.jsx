import React from "react";
import { Routes, Route } from "react-router-dom";
import { BASE_PATH } from "../config";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import BooksPage from "./BooksPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={`${BASE_PATH}/`} element={<HomePage />} />
      <Route path={`${BASE_PATH}/about`} element={<AboutPage />} />
      <Route path={`${BASE_PATH}/contact`} element={<ContactPage />} />
      <Route path={`${BASE_PATH}/BooksPage`} element={<BooksPage />} />
      {/* <Route path={`${BASE_PATH}/book/:id`} element={<BookPurchasePage />} />
      <Route path={`${BASE_PATH}/cart`} element={<Cart />} />
      <Route path={`${BASE_PATH}/preview`} element={<Preview />} /> */}
      <Route path="*" element={<h1>404 - הדף לא נמצא</h1>} />
    </Routes>
  );
}
