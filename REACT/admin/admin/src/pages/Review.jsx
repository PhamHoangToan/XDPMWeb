import React, { useState } from "react";


const Review = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      username: "Nguyễn Văn A",
      product_name: "Bánh Kem Chocolate",
      description: "Bánh ngon, mềm và rất thơm!",
      created_at: "2025-03-30",
    },
    {
      id: 2,
      username: "Trần Thị B",
      product_name: "Bánh Mì Bơ Tỏi",
      description: "Bánh giòn, hương vị rất đặc biệt.",
      created_at: "2025-03-29",
    },
    {
      id: 3,
      username: "Lê Văn C",
      product_name: "Bánh Su Kem",
      description: "Nhân kem béo ngậy, rất thích!",
      created_at: "2025-03-28",
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa đánh giá này?")) {
      setReviews(reviews.filter((review) => review.id !== id));
    }
  };

  return (
    <div className="review-container">
      <h1>Danh sách đánh giá</h1>
      <div className="reviews-grid">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div className="review-card" key={review.id}>
              <p><strong>Khách hàng:</strong> {review.username}</p>
              <p><strong>Sản phẩm:</strong> <span className="product-name">{review.product_name}</span></p>
              <p><strong>Đánh giá:</strong> <span className="description">{review.description}</span></p>
              <p><strong>Ngày đánh giá:</strong> <span className="date">{review.created_at}</span></p>
              <button className="delete-btn" onClick={() => handleDelete(review.id)}>Xóa</button>
            </div>
          ))
        ) : (
          <p>Không có đánh giá nào.</p>
        )}
      </div>
    </div>
  );
};

export default Review;
