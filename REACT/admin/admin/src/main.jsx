import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/login.css";
import "./css/dashboard.css";
// import AdminLogin from "./pages/AdminLogin.jsx";
// import AdminRegister from "./pages/AdminRegister.jsx";
import Dashboard from "./pages/Dashboard.jsx";
// import Review from "./pages/Review.jsx";
// import Category from "./pages/Category.jsx";
// import AddCategory from "./pages/AddCategory.jsx";
// import EditCategory from "./pages/EditCategory.jsx";
// import Thongke from "./pages/Thongke.jsx";
import User from "./pages/Customers.jsx";
import EditUser from "./pages/EditUser.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <Dashboard />
      <Routes>
        {/* <Route path="/" element={<AdminLogin />} />
        <Route path="/register" element={<AdminRegister />} /> */}
        {<Route path="/review-list" element={<Review />} /> }
        {/* <Route path="/category-list" element={<Category />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/category-edit/:id" element={<EditCategory />} />  */}
        {/* <Route path="/thongke-list" element={<Thongke />} />  */}
        <Route path="/customers" element={<User />} />
        <Route path="/customers" element={<EditUser />} />


      </Routes>
    </BrowserRouter>
  </StrictMode>
);
