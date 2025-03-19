import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api"; // đường dẫn đúng file bạn lưu API gọi

export function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    address: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Kiểm tra mật khẩu và confirmPassword
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    // Tạo dữ liệu theo đúng backend yêu cầu
    const userData = {
      username: formData.fullName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      address: formData.address,
    };

    const result = await registerUser(userData);

    if (result.success === false) {
      setError(result.message);
    } else {
      setSuccess("Đăng ký thành công! Đang chuyển hướng...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box register">
        <h2>Đăng Ký</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <form onSubmit={handleRegister}>
          <div className="row">
            <div className="col-md-6">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="address"
                placeholder="Địa chỉ"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="fullName"
                placeholder="Họ và Tên"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="tel"
                name="phone"
                placeholder="Số điện thoại"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit">Đăng Ký</button>
        </form>

        <div className="divider">Hoặc</div>

        <button className="google-btn">
          <img src="/icon/google.svg" alt="" /> Đăng nhập với Google
        </button>

        <div className="switch-link">
          Đã có tài khoản? <a href="/login">Đăng nhập</a>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
