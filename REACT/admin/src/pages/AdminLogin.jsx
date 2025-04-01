import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Danh sách tài khoản admin giả
const mockUsers = [
  { username: "admin", password: "admin123" },
  { username: "manager", password: "manager123" },
];

export function AdminLogin({ setIsAuthenticated }) { // Nhận prop setIsAuthenticated
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Kiểm tra username và password với dữ liệu giả
    const user = mockUsers.find((u) => u.username === username && u.password === password);

    if (user) {
      alert("Đăng nhập thành công!");
      setIsAuthenticated(true); // Cập nhật trạng thái đăng nhập
      navigate("/dashboard"); // Chuyển hướng sau khi đăng nhập
    } else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="/logobanh.png" alt="Admin Logo" />
        <h2>Đăng nhập Admin</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Đăng Nhập</button>
        </form>
        <p className="switch-link">
          Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
