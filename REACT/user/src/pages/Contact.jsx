import { Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Liên Hệ Với Chúng Tôi</h1>

      {/* Giờ làm việc */}
      <div className="contact-section working-hours">
        <h2>
          <Clock className="icon" /> Giờ làm việc
        </h2>
        <ul>
          <li><strong>Thứ 2 - Thứ 6:</strong> 8:00 - 22:00</li>
          <li><strong>Thứ 7 - Chủ Nhật:</strong> 9:00 - 23:00</li>
        </ul>
      </div>

      {/* Vị trí cửa hàng */}
      <div className="contact-section location">
        <h2>
          <MapPin className="icon" /> Vị Trí Cửa Hàng
        </h2>

      </div>

      {/* Gọi ngay */}
      <div className="contact-section call-us">
        <h2>
          <Phone className="icon" /> Hỗ Trợ Khách Hàng
        </h2>
        <p>Liên hệ ngay với chúng tôi để được tư vấn</p>
        <a href="tel:0123456789" className="call-button">Gọi Ngay</a>
      </div>
    </div>
  );
};

export default Contact;
