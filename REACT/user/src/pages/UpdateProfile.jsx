/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../api";

const UpdateProfile = () => {
  const [user, setUser] = useState({
    email: "",
    username: "", // 🔥 Đảm bảo khớp với backend
    phone: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("⚠️ Không tìm thấy token trong localStorage!");
        return;
      }

      try {
        const userData = await getUserProfile(token);
        console.log("📌 Dữ liệu API trả về:", userData); // Log kiểm tra API

        setUser((prev) => ({
          ...prev,
          email: userData.email || "",
          username: userData.username || "", // ✅ Đổi từ name → username
          phone: userData.phone || "",
          address: userData.address || "",
        }));
      } catch (error) {
        console.error("❌ Lỗi khi lấy dữ liệu người dùng:", error);
      }
    };

    fetchUserData(); // 🚀 GỌI HÀM NÀY!
  }, []); // ✅ useEffect chỉ chạy một lần khi component mount

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("⚠️ Bạn chưa đăng nhập!");
      return;
    }

    console.log("📤 Dữ liệu gửi đi:", user); // Log kiểm tra trước khi gửi API

    try {
      await updateUserProfile(token, user);
      alert("✅ Cập nhật hồ sơ thành công!");
    } catch (error) {
      console.error("❌ Lỗi cập nhật hồ sơ:", error);
      alert("❌ Cập nhật hồ sơ thất bại!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box register">
        <h2 className="text-center">Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <input
                type="email"
                className="form-control"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
                disabled
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="username" // 🔥 Đổi từ name → username
                value={user.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="address"
                value={user.address}
                onChange={handleChange}
                placeholder="Address"
                required
              />
            </div>
          </div>

          <div className="divider text-center">Password Update</div>

          <div className="row">
            <div className="col-md-6">
              <input
                type="password"
                className="form-control"
                name="currentPassword"
                value={user.currentPassword}
                onChange={handleChange}
                placeholder="Current Password"
              />
            </div>
            <div className="col-md-6">
              <input
                type="password"
                className="form-control"
                name="newPassword"
                value={user.newPassword}
                onChange={handleChange}
                placeholder="New Password"
              />
            </div>
            <div className="col-md-12">
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm New Password"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
