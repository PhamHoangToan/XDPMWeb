import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const mockProduct = {
    product_id: 1,
    product_name: "Bánh Bông Lan Trứng Muối",
    price: "350.000",
    image: "banh-bong-lan.jpg",
    size: "Lớn",
    description: "Bánh bông lan mềm mịn, thơm ngon.",
    cate_id: 2
};

const mockCategories = [
    { category_id: 1, name: "Bánh ngọt" },
    { category_id: 2, name: "Bánh mặn" },
    { category_id: 3, name: "Bánh kem" }
];

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(mockProduct);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Cập nhật sản phẩm:", product);
        navigate("/product-list");
    };

    return (
        <div className="form-container">
            <h2>Sửa sản phẩm</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="product_name">Tên sản phẩm:</label>
                    <input type="text" id="product_name" name="product_name" value={product.product_name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Hình ảnh:</label>
                    {product.image && <img src={`/public/${product.image}`} alt="Hình ảnh sản phẩm" width="100" />}
                    <input type="file" id="image" name="image" />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Giá:</label>
                    <input type="text" id="price" name="price" value={product.price} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="size">Size:</label>
                    <input type="text" id="size" name="size" value={product.size} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Mô tả:</label>
                    <textarea id="description" name="description" rows="5" value={product.description} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="cate_id">Danh mục:</label>
                    <select id="cate_id" name="cate_id" value={product.cate_id} onChange={handleChange} required>
                        {mockCategories.map((category) => (
                            <option key={category.category_id} value={category.category_id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className="actions-form">
                    <button type="submit" className="btn-edit">Cập nhật</button>
                    <button type="button" className="back-button" onClick={() => navigate("/product-list")}>Quay lại</button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
