// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import { BASE_PATH } from "../config";

// import HomePage from "./HomePage";
// import AboutPage from "./AboutPage";
// import ContactPage from "./Contact/ContactPage";
// import OrderBook from "./OrderBook";
// import Cart from "./Cart/Cart";
// import LessonExample from "./LessonExample";
// import OnlineLearningPage from "./VideoPage";
// import Checkout from "./Cart/Checkout";

// import AdminLogin from "./Admin/AdminLogin";
// import AdminDashboard from "./Admin/AdminDashboard";
// import ProtectedAdminRoute from "./ProtectedAdminRoute";
// import AdminLayout from "./Admin/AdminLayout";
// import AdminOrders from "./Admin/AdminOrders";
// import AdminBooks from "./Admin/AdminBooks";
// import AdminVideos from "./Admin/AdminVideos";
// import AdminInventory from "./Admin/AdminInventory";
// import ConfirmReceivedPage from "./ConfirmReceivedPage";
// import LessonsPage from "./LessonsPage";
// import GalleryPage from "./GalleryPage";
// import AdminLessons from "./Admin/AdminLessons";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       {/* התחברות מנהל */}
//       <Route path={`${BASE_PATH}/admin/login`} element={<AdminLogin />} />

//       {/* אזור מוגן למנהל */}
//       <Route
//         path={`${BASE_PATH}/admin`}
//         element={
//           <ProtectedAdminRoute>
//             <AdminLayout />
//           </ProtectedAdminRoute>
//         }
//       >
//         <Route path="dashboard" element={<AdminDashboard />} />
//         <Route path="orders" element={<AdminOrders />} />
//         <Route path="books" element={<AdminBooks />} />
//         <Route path="videos" element={<AdminVideos />} />
//         <Route path="inventory" element={<AdminInventory />} />
//         <Route path="lessons" element={<AdminLessons />} />
//       </Route>

//       {/* עמודים כלליים */}
//       <Route path={`${BASE_PATH}/`} element={<HomePage />} />
//       <Route path={`${BASE_PATH}/lessons`} element={<LessonsPage />} />
//       <Route path={`${BASE_PATH}/about`} element={<AboutPage />} />
//       <Route path={`${BASE_PATH}/contact`} element={<ContactPage />} />
//       <Route path={`${BASE_PATH}/OrderBook`} element={<OrderBook />} />
//       <Route path={`${BASE_PATH}/cart`} element={<Cart />} />
//       <Route path={`${BASE_PATH}/contactPage`} element={<ContactPage />} />
//       <Route path={`${BASE_PATH}/LessonExample`} element={<LessonExample />} />
//       <Route path={`${BASE_PATH}/OnlineLearning`} element={<OnlineLearningPage />} />
//       <Route path={`${BASE_PATH}/checkout`} element={<Checkout />} />
//       <Route path={`${BASE_PATH}/confirm-page/:orderCode`} element={<ConfirmReceivedPage />} />
//       <Route path={`${BASE_PATH}/gallery`} element={<GalleryPage />} />
      



//       {/* עמוד שגיאה */}
//       <Route path="*" element={<h1>404 - הדף לא נמצא</h1>} />
//     </Routes>
//   );
// }
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
import ConfirmReceivedPage from "./ConfirmReceivedPage";
import LessonsPage from "./LessonsPage";
import GalleryPage from "./GalleryPage";

import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminOrders from "./Admin/AdminOrders";
import AdminBooks from "./Admin/AdminBooks";
import AdminVideos from "./Admin/AdminVideos";
import AdminInventory from "./Admin/AdminInventory";
import AdminLessons from "./Admin/AdminLessons";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

import Layout from "./Layout"; // ה-Layout הראשי שלך
import AdminTopics from "./Admin/AdminTopics";

export default function AppRoutes() {
  return (
    <Routes>
      {/* דף התחברות מנהל */}
      <Route path={`${BASE_PATH}/admin/login`} element={<AdminLogin />} />

      {/* אזור מנהל מוגן */}
      <Route
        path={`${BASE_PATH}/admin`}
        element={
          <ProtectedAdminRoute>
            <Layout />
          </ProtectedAdminRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="books" element={<AdminBooks />} />
        <Route path="videos" element={<AdminVideos />} />
        <Route path="inventory" element={<AdminInventory />} />
        <Route path="lessons" element={<AdminLessons />} />
        <Route path="topics" element={<AdminTopics />} />
      </Route>

      {/* אזור אתר כללי עם Layout */}
      <Route path={BASE_PATH} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="lessons" element={<LessonsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="OrderBook" element={<OrderBook />} />
        <Route path="cart" element={<Cart />} />
        <Route path="LessonExample" element={<LessonExample />} />
        <Route path="OnlineLearning" element={<OnlineLearningPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="confirm-page/:orderCode" element={<ConfirmReceivedPage />} />
        <Route path="gallery" element={<GalleryPage />} />

        {/* עמוד שגיאה */}
        <Route path="*" element={<h1>404 - הדף לא נמצא</h1>} />
      </Route>
    </Routes>
  );
}
