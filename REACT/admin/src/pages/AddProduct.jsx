import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        product_name: "",
        price: "",
        image: null,
        size: "",
        description: "",
        cate_id: ""
    });
    const [categories, setCategories] = useState([
        { category_id: 1, name: "Điện thoại" },
        { category_id: 2, name: "Laptop" },
        { category_id: 3, name: "Phụ kiện" }
    ]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFileChange = (e) => {
        setProduct({ ...product, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitted product:", product);
        alert("Sản phẩm đã được thêm thành công (Dữ liệu giả)");
        setProduct({ product_name: "", price: "", image: null, size: "", description: "", cate_id: "" });
        navigate("/product-list");
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <h2>Thêm sản phẩm</h2>
                <div className="form-group">
                    <label>Tên sản phẩm *</label>
                    <input type="text" name="product_name" required value={product.product_name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Giá *</label>
                    <input type="text" name="price" required value={product.price} onChange={handleChange} />
                    {errorMessage && <span className="error-message">{errorMessage}</span>}
                </div>
                <div className="form-group">
                    <label>Hình ảnh *</label>
                    <input type="file" name="image" accept="image/*" required onChange={handleFileChange} />
                </div>
                <div className="form-group">
                    <label>Size *</label>
                    <input type="text" name="size" required value={product.size} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Mô tả *</label>
                    <textarea name="description" rows="6" required value={product.description} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label>Danh mục *</label>
                    <select name="cate_id" required value={product.cate_id} onChange={handleChange}>
                        <option value="">Chọn danh mục</option>
                        {categories.map(category => (
                            <option key={category.category_id} value={category.category_id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-addsp">Thêm sản phẩm</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
