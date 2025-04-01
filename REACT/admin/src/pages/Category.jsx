import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories, deleteCategory } from "../api";

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // Lấy danh sách danh mục từ API
  const loadCategories = async () => {
    const data = await fetchCategories();
    console.log(data);  // In ra dữ liệu để kiểm tra
    if (data.success) {
      setCategories(data.data);  // Set dữ liệu vào state nếu thành công
    } else {
      alert(data.message);  // Hiển thị thông báo lỗi nếu không thành công
    }
  };
  

  useEffect(() => {
    loadCategories();
  }, []);

  // Xóa danh mục
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
      const success = await deleteCategory(id);
      if (success) {
        setCategories(categories.filter((category) => category.category_id !== id));
      } else {
        alert("Xóa danh mục thất bại!");
      }
    }
  };

  return (
    <div className="category-container">
      <button onClick={() => navigate("/add-category")} className="category-btn-primary">
        Thêm danh mục mới
      </button>

      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category.category_id}>
                <td>{category.category_id}</td>
                <td>{category.name}</td>
                <td>
                  <button
                    onClick={() => navigate(`/category-edit/${category.category_id}`)}
                    className="category-btn-warning"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(category.category_id)}
                    className="category-btn-danger"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">Không có danh mục nào!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
