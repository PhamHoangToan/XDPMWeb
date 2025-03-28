import { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { loginUser } from "../api";
=======
import { googleAuth, loginUser } from "../api";
import { GoogleLogin } from "@react-oauth/google";
>>>>>>> 33fab41 (add mint)

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
<<<<<<< HEAD
    navigate("/forgot-password"); 
=======
    navigate("/forgot-password");
  };

  const handleGoogleSuccess = async (response) => {
    console.log("Google Login Success:", response);
    
    try {
      const result = await googleAuth(response.credential); // Call backend to authenticate with Google token
      console.log("Google Auth Result:", result);

      if (result.token) {
        alert("Đăng nhập Google thành công!");
        localStorage.setItem("token", result.token);
        localStorage.setItem("address", result.user.address);
        localStorage.setItem("phone", result.user.phone);
        localStorage.setItem("user_id", result.user.user_id);
        localStorage.setItem("username", result.user.username);
        navigate("/");
        window.location.reload();
      } else {
        setError("Đăng nhập Google thất bại.");
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi đăng nhập với Google.");
      console.error(err);
    }
  };

  const handleError = () => {
    console.log("Login Failed");
>>>>>>> 33fab41 (add mint)
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

<<<<<<< HEAD
          <button className="google-btn">
            <img src="/icon/google.svg" alt="" /> Đăng nhập với Google
          </button>

=======
          {/* <button className="google-btn">
            <img src="/icon/google.svg" alt="" /> Đăng nhập với Google
          </button> */}
          <div>
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleError} />
          </div>
>>>>>>> 33fab41 (add mint)
          <p className="switch-link">
            Chưa có tài khoản? <a href="/register">Đăng ký</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
