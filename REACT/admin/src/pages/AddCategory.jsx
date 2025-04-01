import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../api";

const AddCategory = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim()) {
      alert("Tên danh mục không được để trống!");
      return;
    }

    const result = await addCategory({ name });
    if (result) {
      alert("Danh mục đã được thêm thành công!");
      navigate("/category-list");
    } else {
      alert("Thêm danh mục thất bại!");
    }
  };

  return (
    <div className="edit-category-form">
      <h1>Thêm danh mục mới</h1>
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
          <button type="submit" className="btn btn-add mt-3">
            Thêm danh mục
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
