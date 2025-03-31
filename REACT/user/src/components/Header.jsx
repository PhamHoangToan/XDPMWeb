import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUser(storedUsername);
    }
  }, []);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-md">
      <div className="container-fluid">
        <img src="/logobanh.png" alt="Logo" className="logo" />

        {/* Menu */}
        <div className={`navbar-collapse ${isMenuOpen ? "show" : ""}`} id="collapsibleNavbar">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/products">Menu</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Khung input tìm kiếm */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <a href={`/search?query=${encodeURIComponent(query)}`} className="text-white fs-5 ms-2">
            <img src="/icon/search.svg" alt="" />
          </a>
        </div>

        {/* Nhóm icon */}
        <div className="d-flex gap-3 icon-group position-relative">
          <a href="/cart" className="text-white fs-5">
            <img src="/icon/basket3-fill.svg" alt="" className="icon" />
          </a>

          {/* Kiểm tra nếu đã đăng nhập thì hiển thị dropdown */}
          {user ? (
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="userDropdown"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
              >
                {user}
              </button>
              <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`} aria-labelledby="userDropdown">
                <li>
                  <a className="dropdown-item-user" href="/profile">
                    Tài khoản của tôi
                  </a>
                </li>
                <li>
                  <a className="dropdown-item-user" onClick={handleLogout}>
                    Đăng xuất
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <a href="/register" className="text-white fs-5">
              <img src="/icon/person-fill.svg" alt="" className="icon" />
            </a>
          )}

          {/* Nút mở menu trên mobile */}
          <button
            className={`menu-toggle-btn ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            type="button"
            aria-label="Toggle navigation"
          >
            <img src="/icon/list.svg" alt="" className="icon"/>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;