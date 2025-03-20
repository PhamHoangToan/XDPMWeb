import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const result = await loginUser(email, password);
    console.log("Dữ liệu nhận từ API:", result);
    console.log("User object:", result.user);

    if (result.token) {
      alert("Đăng nhập thành công!");
      localStorage.setItem("token", result.token);
      localStorage.setItem("address", result.user.address);
      localStorage.setItem("phone", result.user.phone);
      localStorage.setItem("user_id", result.user.user_id);
      localStorage.setItem("username", result.user.username);
      navigate("/");
      window.location.reload();
    } else {
      console.log("Lỗi hiển thị:", result.message);
      setError(result.message);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password"); 
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Đăng Nhập</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Nút Đăng Nhập */}
          <button type="submit">Đăng Nhập</button>

          {/* Link hoặc button Quên mật khẩu */}
          <div className="forgot-password">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="forgot-password-btn"
            >
              Quên mật khẩu?
            </button>
          </div>

          <div className="divider">Hoặc</div>

          <button className="google-btn">
            <img src="/icon/google.svg" alt="" /> Đăng nhập với Google
          </button>

          <p className="switch-link">
            Chưa có tài khoản? <a href="/register">Đăng ký</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
