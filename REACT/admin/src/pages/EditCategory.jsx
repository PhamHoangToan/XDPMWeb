import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategoryById, updateCategory } from "../api";

const EditCategory = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  const [name, setName] = useState(""); // Tên danh mục
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(""); // Lỗi khi lấy dữ liệu

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const data = await fetchCategoryById(id); // Lấy danh mục theo ID
        if (data.success) {
          setName(data.data.name); // Set tên danh mục vào state
        } else {
          setError("Không tìm thấy danh mục với ID này!");
        }
      } catch (error) {
        // Sử dụng thông báo chi tiết lỗi
        setError(`Có lỗi khi kết nối đến server: ${error.response?.data?.message || error.message || error}`);
      } finally {
        setLoading(false);
      }
    };
  
    loadCategory();
  }, [id]); // Chạy lại khi id thay đổi
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim()) {
      alert("Tên danh mục không được để trống!");
      return;
    }
  
    try {
      const result = await updateCategory(id, { name });
      if (result.success) {
        alert("Danh mục đã được cập nhật thành công!");
        navigate("/category-list"); // Chuyển hướng về danh sách danh mục
      } else {
        alert(result.message || "Cập nhật danh mục thất bại!");
      }
    } catch (error) {
      // Sử dụng thông báo chi tiết lỗi
      alert(`Có lỗi xảy ra khi cập nhật danh mục: ${error.message || error}`);
    }
  };
  

  // Nếu đang tải dữ liệu hoặc có lỗi
  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
