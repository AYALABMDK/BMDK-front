import React from "react";
import { Routes, Route } from "react-router-dom";
import { BASE_PATH } from "../config";

import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import ContactPage from "./Contact/ContactPage";
import OrderBook from "./OrderBook";
import Cart from "./Cart/Cart";
import LessonExample from "./LessonExample";
import OnlineLearningPage from "./VideoPage";
import Checkout from "./Cart/Checkout";

import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import AdminLayout from "./Admin/AdminLayout";
import AdminOrders from "./Admin/AdminOrders";
import AdminBooks from "./Admin/AdminBooks";
import AdminVideos from "./Admin/AdminVideos";
import AdminInventory from "./Admin/AdminInventory";
import ConfirmReceivedPage from "./ConfirmReceivedPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* התחברות מנהל */}
      <Route path={`${BASE_PATH}/admin/login`} element={<AdminLogin />} />

      {/* אזור מוגן למנהל */}
      <Route
        path={`${BASE_PATH}/admin`}
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="books" element={<AdminBooks />} />
        <Route path="videos" element={<AdminVideos />} />
        <Route path="inventory" element={<AdminInventory />} />
      </Route>

      {/* עמודים כלליים */}
      <Route path={`${BASE_PATH}/`} element={<HomePage />} />
      <Route path={`${BASE_PATH}/about`} element={<AboutPage />} />
      <Route path={`${BASE_PATH}/contact`} element={<ContactPage />} />
      <Route path={`${BASE_PATH}/OrderBook`} element={<OrderBook />} />
      <Route path={`${BASE_PATH}/cart`} element={<Cart />} />
      <Route path={`${BASE_PATH}/contactPage`} element={<ContactPage />} />
      <Route path={`${BASE_PATH}/LessonExample`} element={<LessonExample />} />
      <Route path={`${BASE_PATH}/OnlineLearning`} element={<OnlineLearningPage />} />
      <Route path={`${BASE_PATH}/checkout`} element={<Checkout />} />
      <Route path={`${BASE_PATH}/confirm-page/:orderCode`} element={<ConfirmReceivedPage />} />


      {/* עמוד שגיאה */}
      <Route path="*" element={<h1>404 - הדף לא נמצא</h1>} />
    </Routes>
  );
}
