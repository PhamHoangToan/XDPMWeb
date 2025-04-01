import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const mockProduct = {
    product_id: 1,
    product_name: "Bánh Bông Lan Trứng Muối",
    price: "350.000",
    image: "banh-bong-lan.jpg",
    size: "M",
    description: "Bánh bông lan mềm mịn với trứng muối.",
    cate_id: 2,
};

const mockCategories = {
    1: "Bánh ngọt",
    2: "Bánh mặn",
};

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    
    useEffect(() => {
        // Giả lập API lấy dữ liệu sản phẩm theo ID
        if (parseInt(id) === mockProduct.product_id) {
            setProduct(mockProduct);
        }
    }, [id]);

    return (
        <div className="product-detail">
            <h1>CHI TIẾT SẢN PHẨM</h1>
            {product ? (
                <div className="product-info">
                    <img src={`../public/${product.image}`} alt="Hình ảnh sản phẩm" />
                    <div className="product-details">
                        <h2>{product.product_name}</h2>
                        <p><strong>Giá:</strong> {product.price} VND</p>
                        <p><strong>Size:</strong> {product.size}</p>
                        <p><strong>Mô tả:</strong> {product.description}</p>
                        <p><strong>Danh mục:</strong> {mockCategories[product.cate_id] || "Không xác định"}</p>
                    </div>
                </div>
            ) : (
                <p style={{ textAlign: "center", padding: "20px" }}>Sản phẩm không tồn tại hoặc không hợp lệ.</p>
            )}
            <div className="actions">
                <button onClick={() => navigate("/product-list")} className="back-button">Quay lại</button>
            </div>
        </div>
    );
};

export default ProductDetail;
