import { useNavigate } from "react-router-dom";

export function AdminLogin() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Giả lập đăng nhập thành công, thực tế cần kiểm tra từ API
    alert("Đăng nhập thành công!");
    navigate("/admin");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="/logobanh.png" alt="Admin Logo" />
        <h2>Đăng nhập Admin</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Mật khẩu" required />
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
