import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/login.css";
import "./css/dashboard.css";
// import "./css/a.css";
// import AdminLogin from "./pages/AdminLogin.jsx";
import AdminRegister from "./pages/AdminRegister.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Review from "./pages/Review.jsx";
import Category from "./pages/Category.jsx";
import AddCategory from "./pages/AddCategory.jsx";
import EditCategory from "./pages/EditCategory.jsx";
import Thongke from "./pages/Thongke.jsx";
import User from "./pages/Customers.jsx";
import EditUser from "./pages/EditUser.jsx";
import Order from "./pages/Order.jsx";
import OrderDetail from "./pages/OrderDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Product from "./pages/Product.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <Dashboard />
      <Routes>
        {/* <Route path="/" element={<AdminLogin />} /> */}
        <Route path="/register" element={<AdminRegister />} /> 
        <Route path="/review-list" element={<Review />} />
        <Route path="/category-list" element={<Category />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/category-edit/:id" element={<EditCategory />} /> 
        <Route path="/thongke-list" element={<Thongke />} /> 
        <Route path="/customers" element={<User />} />
        <Route path="/customers-edit/:id" element={<EditUser />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/order-edit/:id" element={<OrderDetail />} />
        <Route path="/cart-list" element={<Cart />} />
        <Route path="/product-list" element={<Product />} />
        <Route path="/product-add" element={<AddProduct />} />
        <Route path="/product-edit/:id" element={<EditProduct />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />



      </Routes>
    </BrowserRouter>
  </StrictMode>
);
