import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword, resetPassword } from "../api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState(""); 
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Gửi email nhận mã OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const result = await forgotPassword(email);

      if (result.success) {
        setMessage("Mã xác thực đã được gửi tới email của bạn.");
        setStep(2);
      } else {
        setMessage(result.message || "Không thể gửi mã xác thực.");
      }
    } catch {
      setMessage("Lỗi hệ thống, vui lòng thử lại sau.");
    }
  };

  // Gửi mã OTP + mật khẩu mới để reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");

    // Kiểm tra 2 mật khẩu có khớp không
    if (newPassword !== confirmNewPassword) {
      setMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const result = await resetPassword(email, otp, newPassword);

      if (result.success) {
        alert("Mật khẩu đã được đặt lại thành công!");
        navigate("/login"); // Điều hướng về trang đăng nhập
      } else {
        setMessage(result.message || "Không thể đặt lại mật khẩu.");
      }
    } catch {
      setMessage("Lỗi hệ thống, vui lòng thử lại sau.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Quên Mật Khẩu</h2>
        {message && <p style={{ color: "red" }}>{message}</p>}

        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Gửi mã xác thực</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <input
              type="text"
              placeholder="Nhập mã xác thực"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu mới"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
            <button type="submit">Đặt lại mật khẩu</button>
          </form>
        )}

        <p className="switch-link">
          Quay lại <a href="/login">Đăng nhập</a>
        </p>
      </div>
    </div>
  );
}
