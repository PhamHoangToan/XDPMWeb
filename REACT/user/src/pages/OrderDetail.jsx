import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrderDetail } from "../api";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("orderId param:", orderId); // kiểm tra giá trị param
    const getOrderDetail = async () => {
      const result = await fetchOrderDetail(orderId);
      console.log("Kết quả trả về từ API:", result);
      setOrder(result.order);
    };
    getOrderDetail();
  }, [orderId]);
  

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
      useGrouping: true,
    }).format(value).replace(",", ".");
  };
  const totalPrice = order ? order.reduce((total, item) => total + item.price * item.quantity, 0) : 0;
  const shippingFee = 30; // Use API value or default to 30
  const finalTotal = totalPrice + shippingFee;
  return (
    <div className="order-container">
      <button className="profile-btn-back" onClick={() => navigate("/profile", { state: { showOrders: true } })}>
        Quay lại
      </button>

      <h2 className="order-title">Chi tiết đơn hàng #{orderId}</h2>

      {order && (
        <div className="order-content">
          {/* Wrapper for the first three sections */}
          <div className="order-info-wrapper">
            {/* 1. Thông tin khách hàng */}
            <div className="order-section customer-info">
              <h3>Thông tin khách hàng</h3>
              <p><strong>Tên:</strong> {order[0]?.username}</p>
              <p><strong>Email:</strong> {order[0]?.email}</p>
              <p><strong>Điện thoại:</strong> {order[0]?.phone}</p>
              <p><strong>Địa chỉ:</strong> {order[0]?.address}</p>
            </div>

            <div>
              {/* 4. Phương thức thanh toán */}
              <div className="order-section payment-info">
                <h3>Phương thức thanh toán</h3>
                <p><strong>{order[0]?.payment || "Chưa xác định"}</strong></p>
              </div>

              {/* 5. Trạng thái đơn hàng */}
              <div className="order-section status-info">
                <h3>Trạng thái đơn hàng</h3>
                <p><strong className={order[0]?.status === "Hoàn thành" ? "status-completed" : ""}>{order[0]?.status || "Đang xử lý"}</strong></p>
              </div>
            </div>
          </div>

          {/* 3. Sản phẩm đã mua */}
          <div className="order-section">
            <h3>Sản phẩm đã mua</h3>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Hình ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {order.map((item, index) => (
                  <tr key={index}>
                    <td><img src={`/upload/${item.image}`} alt={item.product_name} /></td>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(item.price)} đ</td>
                    <td>{formatCurrency(item.quantity * item.price)} đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 2. Tóm tắt đơn hàng */}
          <div className="order-total">
            <p><strong>Tạm tính:</strong> <span>{formatCurrency(totalPrice)} đ</span></p>
            <p><strong>Phí giao hàng:</strong> <span>{formatCurrency(shippingFee)} đ</span></p>
            <p><strong>Tổng tiền:</strong> <span>{formatCurrency(finalTotal)} đ</span></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;