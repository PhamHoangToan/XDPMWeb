import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  const [name, setName] = useState("");

  // Giả lập dữ liệu danh mục cần chỉnh sửa
  useEffect(() => {
    const fakeCategory = {
      category_id: id,
      name: "Danh mục mẫu",
    };
    setName(fakeCategory.name);
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Danh mục đã được cập nhật thành công!");
    navigate("/category-list"); // Chuyển hướng về trang danh sách danh mục
  };

  return (
    <div className="edit-category-form">
      <h1>Chỉnh sửa danh mục</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên danh mục:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="div-button">
          <button type="submit" className="btn btn-save mt-3">
            Lưu thay đổi
          </button>
          <button
            type="button"
            className="btn btn-cancel mt-3"
            onClick={() => navigate("/category-list")}
          >
            Quay lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
