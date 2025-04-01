import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Thêm dòng này


const Order = () => {
  const navigate = useNavigate(); // Khai báo useNavigate
  // Dữ liệu giả
  const [orders, setOrders] = useState([
    {
      order_id: 1,
      username: "Nguyễn Văn A",
      phone: "0987654321",
      address: "Hà Nội",
      date: "2025-03-30",
      number: 2,
      total_price: 500000,
      payment: "Chuyển khoản",
      status: "Đang xử lý",
    },
    {
      order_id: 2,
      username: "Trần Thị B",
      phone: "0978123456",
      address: "Hồ Chí Minh",
      date: "2025-03-29",
      number: 1,
      total_price: 300000,
      payment: "Tiền mặt",
      status: "Đã giao",
    },
    {
      order_id: 3,
      username: "Lê Văn C",
      phone: "0912345678",
      address: "Đà Nẵng",
      date: "2025-03-28",
      number: 3,
      total_price: 700000,
      payment: "Chuyển khoản",
      status: "Đang giao",
    },
    {
      order_id: 4,
      username: "Phạm Thị D",
      phone: "0901122334",
      address: "Cần Thơ",
      date: "2025-03-27",
      number: 5,
      total_price: 1500000,
      payment: "Tiền mặt",
      status: "Hủy bỏ",
    },
    
  ]);

  const [filterStatus, setFilterStatus] = useState("");

  // Lọc trạng thái
  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  // Cập nhật trạng thái đơn hàng
  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.order_id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Xóa đơn hàng
  const handleDelete = (orderId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này không?")) {
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.order_id !== orderId)
      );
    }
  };

  return (
    <div className="order-container">
      {/* Bộ lọc trạng thái */}
      <div className="filter-form">
        <label htmlFor="status">Lọc theo trạng thái:</label>
        <select id="status" value={filterStatus} onChange={handleFilterChange}>
          <option value="">Tất cả</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Đang giao">Đang giao</option>
          <option value="Đã giao">Đã giao</option>
          <option value="Hủy bỏ">Hủy bỏ</option>
        </select>
      </div>

      {/* Danh sách đơn hàng */}
      <div className="orders-grid">
        {orders.length > 0 ? (
          orders
            .filter((order) =>
              filterStatus ? order.status === filterStatus : true
            )
            .map((order) => (
              <div className="order-card" key={order.order_id}>
                <p><strong>Khách hàng:</strong> {order.username}</p>
                <p><strong>Số điện thoại:</strong> {order.phone}</p>
                <p><strong>Địa chỉ:</strong> {order.address}</p>
                <p><strong>Ngày đặt:</strong> {order.date}</p>
                <p><strong>Số lượng:</strong> {order.number}</p>
                <p><strong>Tổng tiền:</strong> {order.total_price.toLocaleString()} VND</p>
                <p><strong>Thanh toán:</strong> {order.payment}</p>

                {/* Cập nhật trạng thái */}
                <div className="status-container">
                  <p><strong>Trạng thái:</strong></p>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                  >
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đang giao">Đang giao</option>
                    <option value="Đã giao">Đã giao</option>
                    <option value="Hủy bỏ">Hủy bỏ</option>
                  </select>
                </div>

                {/* Nút Xóa và Xem */}
                <div className="double-button">
                  <button className="xoaview-btn" onClick={() => handleDelete(order.order_id)}>
                    Delete
                  </button>
                  <button className="xoaview-btn" onClick={() => navigate(`/order-edit/${order.order_id}`)}>
                     View
                  </button>
                </div>
              </div>
            ))
        ) : (
          <p>Không có đơn hàng nào.</p>
        )}
      </div>
    </div>
  );
};

export default Order;
