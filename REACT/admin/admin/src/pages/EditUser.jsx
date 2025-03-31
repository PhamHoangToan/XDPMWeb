import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Giả lập lấy dữ liệu người dùng từ API
    const fakeUser = {
      user_id: id,
      username: "nguyenvana",
      email: "nguyenvana@example.com",
      password: "123456",
      address: "123 Đường ABC, TP.HCM",
      phone: "0123456789",
    };
    setUser(fakeUser);
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu cập nhật:", user);
    alert("Cập nhật thành công!");
    navigate("/customers");
  };

  if (!user) {
    return <div className="alert alert-danger">Khách hàng không tồn tại.</div>;
  }

  return (
    <div className="edit-user-container">
      <h2>Chỉnh sửa thông tin khách hàng</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên đăng nhập:</label>
          <input type="text" name="username" value={user.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Mật khẩu:</label>
          <input type="password" name="password" value={user.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Địa chỉ:</label>
          <input type="text" name="address" value={user.address} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Số điện thoại:</label>
          <input type="text" name="phone" value={user.phone} onChange={handleChange} required />
        </div>
        <div className="actions-form">
          <button type="submit" className="btn-edit">Cập nhật</button>
          <button type="button" className="back-button" onClick={() => navigate("/customers")}>
            Quay lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;