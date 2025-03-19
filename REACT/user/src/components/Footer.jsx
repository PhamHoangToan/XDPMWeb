import  { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaArrowUp } from "react-icons/fa6";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Hiển thị nút khi cuộn xuống dưới
  useEffect(() => {
    const checkScrollTop = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

  // Hàm cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">

          <div className="col-md-3">
            <img src="logobanh.png" alt="Logo" className="footer-logo" />
            <p className="footer-desc">
              Chuyên cung cấp bánh tươi ngon, đảm bảo chất lượng và hương vị tuyệt vời.
            </p>
          </div>

          <div className="col-md-2">
            <h5 className="footer-title">Liên kết</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/products" className="footer-link">Menu</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5 className="footer-title">Liên hệ</h5>
            <p>123 Đường ABC, Quận 1, TP.HCM</p>
            <p>support@banhngon.com</p>
            <p>0987 654 321</p>
          </div>

          <div className="col-md-3">
            <h5 className="footer-title">Theo dõi chúng tôi</h5>
            <div className="footer-social">
              <a href="#" className="social-icon"><FaFacebookF /></a>
              <a href="#" className="social-icon"><FaInstagram /></a>
              <a href="#" className="social-icon"><FaYoutube /></a>
            </div>
            <img src="image.png" alt="Hình bánh" className="footer-cake" />
          </div>
        </div>

        <div className="text-center footer-copyright">
          <p>&copy; {new Date().getFullYear()} Bánh Ngon. All rights reserved.</p>
        </div>

        {/* Nút quay về đầu trang */}
        {showScroll && (
          <button className="scroll-to-top" onClick={scrollToTop}>
            <FaArrowUp />
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
