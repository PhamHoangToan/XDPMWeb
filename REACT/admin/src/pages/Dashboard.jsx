import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FaUser, FaBox, FaClipboardList, FaPlusCircle, FaTags, FaFolder, FaFolderPlus,
  FaShoppingCart, FaUserCheck, FaComments, FaThumbsUp, FaShoppingBag,
  FaCartArrowDown, FaChartPie, FaChartLine
} from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import "../css/dashboard.css";

const AdminDashboard = () => {
  const username = "Admin";
  const statistics = { orders: 100, products: 50, reviews: 30 };

  // State để quản lý mở rộng submenu
  const [openMenu, setOpenMenu] = useState({
    products: false,
    categories: false,
    orders: false,
    reviews: false,
    carts: false,
    stats: false
  });


  // Hàm toggle submenu
  const toggleMenu = (menu) => {
    setOpenMenu((prev) => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const location = useLocation(); // Lấy đường dẫn hiện tại
  const [showStats, setShowStats] = useState(true); // Ban đầu hiển thị thống kê

  useEffect(() => {
    if (location.pathname !== "/") {
      setShowStats(false); // Khi chuyển sang trang khác, ẩn thống kê
    }
  }, [location.pathname]); // Chạy lại khi đường dẫn thay đổi

  return (
    <div>
      <header>
        <div className="logo">
          <img src="logobanh.png" alt="Logo" />
        </div>
        <h4><a href="/">Dashboard</a></h4>
        <div className="admin-info">
          <div className="dropdown">
            <FaUser />
            <span className="username">{username}</span>
            <div className="dropdown-menu">
              <a href="/logout" className="logout-btn">Logout</a>
            </div>
          </div>
        </div>
        <div className="toggle-btn">
          <BiMenu />
        </div>
      </header>

      {/* Sidebar */}
      <div className="sidebar">
        <a href="#" className="menu-item" onClick={() => toggleMenu("products")}>
          <FaBox /> Quản lý sản phẩm
        </a>
        <div className={`submenu ${openMenu.products ? "active" : ""}`}>
          <a href="/product-list"><FaClipboardList /> Sản phẩm</a>
          <a href="/product-add"><FaPlusCircle /> Thêm sản phẩm</a>
        </div>

        <a href="#" className="menu-item" onClick={() => toggleMenu("categories")}>
          <FaTags /> Quản lý danh mục
        </a>
        <div className={`submenu ${openMenu.categories ? "active" : ""}`}>
          <a href="/category-list"><FaFolder /> Danh mục</a>
        </div>

        <a href="/orders" className="menu-item">
          <FaShoppingCart /> Quản lý đơn hàng
        </a>

        <a href="/customers" className="menu-item">
          <FaUserCheck /> Quản lý khách hàng
        </a>

        <a href="#" className="menu-item" onClick={() => toggleMenu("reviews")}>
          <FaComments /> Quản lý đánh giá</a>
        <div className={`submenu ${openMenu.reviews ? "active" : ""}`}>
          <a href="/review-list"><FaThumbsUp /> Đánh giá</a>
        </div>

        <a href="#" className="menu-item" onClick={() => toggleMenu("carts")}>
          <FaShoppingBag /> Quản lý giỏ hàng
        </a>
        <div className={`submenu ${openMenu.carts ? "active" : ""}`}>
          <a href="/cart-list"><FaCartArrowDown /> Giỏ hàng</a>
        </div>

        <a href="#" className="menu-item" onClick={() => toggleMenu("stats")}>
          <FaChartPie /> Thống kê
        </a>
        <div className={`submenu ${openMenu.stats ? "active" : ""}`}>
          <a href="/thongke-list"><FaChartLine /> Thống kê</a>
        </div>
      </div>

      {/* Chỉ hiển thị thống kê khi ở trang Dashboard ("/") */}
      {showStats && location.pathname === "/" && (
        <div className="stats-container">
          <div className="stats-box">
            <p>{statistics.orders}</p>
            <h3>Đơn hàng</h3>
            <a href="/order-list" className="btn-view">Xem chi tiết</a>
          </div>
          <div className="stats-box">
            <p>{statistics.products}</p>
            <h3>Sản phẩm</h3>
            <a href="/product-list" className="btn-view">Xem chi tiết</a>
          </div>
          <div className="stats-box">
            <p>{statistics.reviews}</p>
            <h3>Đánh giá</h3>
            <a href="/review-list" className="btn-view">Xem chi tiết</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;