import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Category = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([
    { category_id: 1, name: "Bánh ngọt" },
    { category_id: 2, name: "Bánh mặn" },
    { category_id: 3, name: "Bánh kem" },
    { category_id: 4, name: "Bánh trung thu" },
    { category_id: 5, name: "Bánh mì" },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
      setCategories(categories.filter((category) => category.category_id !== id));
    }
  };

  return (
    <div className="category-container">
      <h1 className="category-title">Danh mục sản phẩm</h1>

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
