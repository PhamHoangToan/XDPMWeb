import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchOrdersByUser, fetchUserReviews } from "../api";

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (userId) {
      loadOrders();
      loadReviews();
    } else {
      setError("Vui lòng đăng nhập để xem tài khoản.");
    }
  }, [userId]);

  useEffect(() => {
    if (location.state?.showOrders) {
      setShowOrders(true);
    }
  }, [location.state]);

  const loadOrders = async () => {
    const data = await fetchOrdersByUser();
    console.log("Kết quả fetchOrdersByUser:", data);
  
    if (data.success) {
      setOrders(data.data || []);   
    } else {
      setOrders([]);  // hoặc set lỗi gì đó
    }
  };
  
  const loadReviews = async () => {
    const data = await fetchUserReviews();
    setReviews(data.reviews || []);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Tài Khoản Của Tôi</h2>
      <button
        className="profile-btn update-profile-btn"
        onClick={() => navigate("/update-profile")}
      >
        Cập nhật thông tin
      </button>

      {error && <p className="profile-error">{error}</p>}

      {!showOrders && !showReviews ? (
        <div className="profile-summary">
          <div className="profile-card">
            <h3>{orders.length}</h3>
            <p>Tổng số đơn hàng</p>
            <button className="profile-btn" onClick={() => setShowOrders(true)}>
              Xem đơn hàng
            </button>
          </div>
          <div className="profile-card">
            <h3>{reviews.length}</h3>
            <p>Tổng số đánh giá</p>
            <button className="profile-btn" onClick={() => setShowReviews(true)}>
              Xem đánh giá
            </button>
          </div>
        </div>
      ) : null}

      {/* Danh sách đơn hàng */}
      {showOrders && (
        <div className="profile-orders">
          <h3 className="profile-section-title">Lịch Sử Đơn Hàng</h3>
          <button className="profile-btn-back" onClick={() => setShowOrders(false)}>
            Quay lại
          </button>

          {orders.length === 0 ? (
            <p className="empty-orders">Bạn chưa có đơn hàng nào.</p>
          ) : (
            <div className="timeline">
              {orders.map((order, index) => (
                <div key={order.order_id} className="timeline-item">
                  <div className="timeline-content">
                    <h4>Mã đơn: {order.order_id}</h4>
                    <p><strong>Ngày đặt:</strong> {order.date}</p>
                    <p><strong>Phương thức thanh toán:</strong> {order.payment}</p>
                    <p><strong>Tổng tiền ({order.number} sản phẩm):</strong> {order.total_price} đ</p>
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                    <button className="profile-btn order-detail-btn"
                      onClick={() => navigate(`/order/${order.order_id}`)}
                    >
                      Xem Chi Tiết
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Danh sách đánh giá */}
      {showReviews && (
        <div className="profile-reviews">
          <h3 className="profile-section-title">Đánh Giá Của Bạn</h3>
          <button className="profile-btn-back" onClick={() => setShowReviews(false)}>
            Quay lại
          </button>
          {reviews.length === 0 ? (
            <p className="empty-reviews">Bạn chưa có đánh giá nào.</p>
          ) : (
            <div className="profile-reviews-list">
              {reviews.map((review) => (
                <div key={review.review_id} className="review-card">
                  <h4 className="review-product">{review.product_name}</h4>
                  <p className="review-date">{review.created_at}</p>
                  <p className="review-text">{review.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}


    </div>
  );
};

export default Profile;