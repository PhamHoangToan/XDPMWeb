import React from "react";
import { useParams, useNavigate,Link } from "react-router-dom";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("Order ID:", id);
  
  // Dữ liệu giả
  const orderDetails = {
    order: {
      username: "Nguyễn Văn A",
      phone: "0123456789",
      address: "123 Đường ABC, TP. HCM",
      date: "2025-03-30",
      number: 3,
      total_price: 1500000,
      status: "Đang xử lý",
      payment: "Thanh toán khi nhận hàng",
    },
    items: [
      { product_name: "Sản phẩm 1", quantity: 1, price: 500000 },
      { product_name: "Sản phẩm 2", quantity: 2, price: 250000 },
    ],
  };

  return (
    <div className="order-details-container">
      <h1>Chi tiết đơn hàng</h1>
      <div className="order-details">
        <p><strong>Khách hàng:</strong> {orderDetails.order.username}</p>
        <p><strong>Số điện thoại:</strong> {orderDetails.order.phone}</p>
        <p><strong>Địa chỉ:</strong> {orderDetails.order.address}</p>
        <p><strong>Ngày đặt:</strong> {orderDetails.order.date}</p>
        <p><strong>Số lượng:</strong> {orderDetails.order.number}</p>
        <p><strong>Tổng tiền:</strong> {orderDetails.order.total_price.toLocaleString()} VND</p>
        <p><strong>Trạng thái:</strong> {orderDetails.order.status}</p>
        <p><strong>Thanh toán:</strong> {orderDetails.order.payment}</p>
      </div>

      <div className="product-list">
        <h2>Danh sách sản phẩm:</h2>
        <table>
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Tổng</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.items.map((item, index) => (
              <tr key={index}>
                <td>{item.product_name}</td>
                <td>{item.quantity}</td>
                <td>{item.price.toLocaleString()} VND</td>
                <td>{(item.quantity * item.price).toLocaleString()} VND</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="back-button-container">
        <Link to="/orders" className="back-button">Quay lại</Link>
      </div>
    </div>
  );
};

export default OrderDetail;
