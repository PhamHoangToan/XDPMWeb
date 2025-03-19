import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, placeOrder } from "../api";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Tiền mặt");
  
  const name = localStorage.getItem("username");
  const phone = localStorage.getItem("phone");
  const address = localStorage.getItem("address");
  const userId = localStorage.getItem("user_id");

  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState({
    name: name || "",
    phone: phone || "",
    address: address || "",
  });

  useEffect(() => {
    setCustomerInfo({
      name: name || "",
      phone: phone || "",
      address: address || "",
    });
  }, [name, phone, address]);

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const fetchCart = async () => {
    const data = await getCart();
    if (data.success) {
      setCartItems(data.cart);
    } else {
      alert("Không thể lấy dữ liệu giỏ hàng");
    }
  };

  const handleOrder = async () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert("Vui lòng nhập đầy đủ thông tin giao hàng.");
      return;
    }

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shippingFee = 30;
    const total = subtotal + shippingFee;

    const orderData = {
      user_id: userId,
      total_price: total,
      payment: paymentMethod,
      customer_info: customerInfo,
      items: cartItems,
    };

    const response = await placeOrder(orderData);
    if (response.success) {
      alert("Đặt hàng thành công!");
      navigate(`/order/${response.order_id}`);
    } else {
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = 30;
  const total = subtotal + shippingFee;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
      useGrouping: true,
    }).format(value).replace(",", ".");
  };

  return (
    <div className="checkout-container">
      <div className="row">
        {/* Thông tin khách hàng */}
        <div className="col-md-6">
          <div className="checkout-card p-4">
            <h4 className="mb-3">Thông tin thanh toán</h4>
            <label className="form-label">Họ và Tên</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Họ và Tên"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
            />
            <label className="form-label">Số điện thoại</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Số điện thoại"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
            />
            <label className="form-label">Địa chỉ giao hàng</label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Địa chỉ giao hàng"
              value={customerInfo.address}
              onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
            />

            <h5>Phương thức thanh toán</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="Tiền mặt"
                checked={paymentMethod === "Tiền mặt"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">Tiền mặt</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="Chuyển khoản"
                checked={paymentMethod === "Chuyển khoản"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">Chuyển khoản</label>
            </div>
          </div>
        </div>

        {/* Đơn hàng của bạn */}
        <div className="col-md-6">
          <div className="checkout-card p-4">
            <h4 className="mb-3">Đơn hàng của bạn</h4>
            <table className="checkout-table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price} đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
            <div className="d-flex justify-content-between">
              <strong>Tạm tính:</strong>
              <span>{formatCurrency(subtotal)} đ</span>
            </div>
            <div className="d-flex justify-content-between">
              <strong>Phí giao hàng:</strong>
              <span>{formatCurrency(shippingFee)} đ</span>
            </div>
            <div className="d-flex justify-content-between checkout-total">
              <strong>Tổng cộng:</strong>
              <span>{formatCurrency(total)} đ</span>
            </div>
            <button className="checkout-button" onClick={handleOrder}>
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
