import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrdersByUser} from "../api";

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (userId) {
      loadOrders();
    } else {
      setError("Vui lòng đăng nhập để xem tài khoản.");
    }
  }, [userId]);

  const loadOrders = async () => {
    const data = await fetchOrdersByUser();
    setOrders(data.orders || []);
  };


  return (
    <div className="profile-container">
      <h2 className="profile-title">Tài Khoản Của Tôi</h2>

      {error && <p className="profile-error">{error}</p>}

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

      {showOrders && <OrderList orders={orders} onBack={() => setShowOrders(false)} />}

    </div>
  );
};

export default Profile;