import React, { useState, useEffect } from "react";
import { fetchAllReviews, deleteReview } from "../api";

const ReviewAdmin = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const reviewsData = await fetchAllReviews();
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews", error);
        setError("Không thể tải đánh giá. Vui lòng thử lại sau.");
      }
      setLoading(false);
    };
    loadReviews();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa đánh giá này?")) {
      try {
        await deleteReview(id); // Gọi API xóa đánh giá
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review.review_id !== id) // Lọc bỏ đánh giá đã xóa
        );
      } catch (error) {
        console.error("Error deleting review", error);
        alert("Xóa đánh giá thất bại. Vui lòng thử lại.");
      }
    }
  };
  

  return (
    <div className="admin-review-container">
      <h2>Quản lý đánh giá</h2>
      {loading && <p>Đang tải đánh giá...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <div className="reviews-grid">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div className="review-card" key={review.review_id}>
                <p>
                  <strong>Khách hàng:</strong> {review.username || "Ẩn danh"}
                </p>
                <p>
                  <strong>Sản phẩm:</strong>{" "}
                  <span className="product-name">
                    {review.product_name || "Không rõ"}
                  </span>
                </p>
                <p>
                  <strong>Đánh giá:</strong>{" "}
                  <span className="description">{review.description}</span>
                </p>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(review.review_id)}
                >
                  Xóa
                </button>
              </div>
            ))
          ) : (
            <p>Không có đánh giá nào.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewAdmin;
