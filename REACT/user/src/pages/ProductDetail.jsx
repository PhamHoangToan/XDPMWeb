import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductsById, fetchReviewsByProduct,addToCart } from "../api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  // Fetch sản phẩm và đánh giá
  useEffect(() => {
    const getProducts = async () => {
      try {
        console.log("Gọi fetchProductsById với id:", id);
        const data = await fetchProductsById(id);
        console.log("Kết quả sản phẩm:", data);
        setProduct(data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    const getReviews = async () => {
      try {
        const data = await fetchReviewsByProduct(id);
        console.log("Danh sách đánh giá:", data);
        setReviews(data);
      } catch (error) {
        console.error("Lỗi khi lấy đánh giá:", error);
      }
    };

    getProducts();
    getReviews();
  }, [id]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product) {
    return <p>Đang tải sản phẩm...</p>;
  }

  // Tránh lỗi nếu thiếu dữ liệu product.image, product.product_name...
  const {
    product_name = "Tên sản phẩm...",
    price = "0",
    size = "Không có thông tin",
    category_name = "Chưa phân loại",
    description = "Không có mô tả",
    image = "no-image.png",
  } = product;

  
  const handleAddToCart = async (product_id, quantity) => {
    const result = await addToCart(product_id, quantity);
  
    if (result.success) {
      alert("Đã thêm sản phẩm vào giỏ hàng!");
    } else {
      alert(result.message);
    }
  };
  
  // const handleAddToCart = async () => {
  //   const userId = localStorage.getItem("user_id");
  
  //   if (!userId) {
  //     alert("Bạn cần đăng nhập trước khi thêm vào giỏ hàng!");
  //     return;
  //   }
  
  //   const result = await addToCart(product, quantity);
  
  //   if (result.success) {
  //     alert("Sản phẩm đã được thêm vào giỏ hàng!");
  //   } else {
  //     alert(result.message || "Có lỗi xảy ra!");
  //   }
  // };
  
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi đánh giá ở đây...
    alert("Chức năng gửi đánh giá chưa được phát triển.");
  };

  return (
    <div className="container mt-5">
      <div className="row g-4 product-detail-container">
        {/* Cột ảnh sản phẩm */}
        <div className="col-md-5">
          <img
            src={`/upload/${image}`}
            alt={product_name}
            className="product-img"
            onError={(e) => (e.target.src = "/upload/no-image.png")}
          />
        </div>

        {/* Cột thông tin sản phẩm */}
        <div className="col-md-7">
          <h2 className="product-name">{product_name}</h2>
          <p className="product-price">{price.toLocaleString()} đ</p>
          <p className="product-size">Kích cỡ: {size}</p>
          <p className="product-category">Danh mục: <span>{category_name}</span></p>

          {/* Tăng giảm số lượng */}
          <div className="quantity-container">
            <button className="btn-quantity" onClick={decreaseQuantity}>−</button>
            <span className="quantity">{quantity}</span>
            <button className="btn-quantity" onClick={increaseQuantity}>+</button>
          </div>

          {/* Nút thêm vào giỏ hàng */}
          <button
            className="btn btn-brown w-100 mt-3"
            onClick={() => handleAddToCart(product.product_id, quantity)}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* Tabs mô tả & đánh giá */}
      <div className="product-tabs mt-4">
        <button
          className={`tab-button ${activeTab === "description" ? "active" : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Mô tả
        </button>
        <button
          className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Đánh giá
        </button>
      </div>

      {/* Nội dung Tab Mô tả */}
      {activeTab === "description" && (
        <div className="tab-content active">
          <h3>Mô tả sản phẩm</h3>
          <p className="product-description">{description}</p>
        </div>
      )}

      {/* Nội dung Tab Đánh giá */}
      {activeTab === "reviews" && (
        <div className="tab-content active">
          <h3>Đánh giá sản phẩm</h3>

          {/* Form đánh giá */}
          <div className="review-form">
            <h4>Thêm đánh giá của bạn</h4>
            <form onSubmit={handleReviewSubmit}>
              <textarea placeholder="Viết đánh giá..." required />
              <button type="submit">Gửi đánh giá</button>
            </form>
          </div>

          {/* Danh sách đánh giá */}
          <div className="review-container mt-3">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div className="review" key={review.review_id}>
                  <p className="review-author">{review.username}</p>
                  <p className="review-date">{review.created_at}</p>
                  <p className="review-text">{review.description}</p>
                </div>
              ))
            ) : (
              <p>Chưa có đánh giá nào.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
