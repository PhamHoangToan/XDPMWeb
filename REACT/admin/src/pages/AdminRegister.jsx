import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AdminRegister() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Đăng ký thành công!");
    setTimeout(() => {
      navigate("/login"); // Chuyển hướng sang trang đăng nhập
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="/logobanh.png" alt="Admin Logo" />
        <h2>Đăng ký Admin</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Đăng Ký</button>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;
