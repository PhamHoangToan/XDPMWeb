import { useEffect, useState } from "react";
import { getCart, updateCartQuantity, removeFromCart } from "../api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      setError("Vui lòng đăng nhập để xem giỏ hàng");
      return;
    }
  
    const result = await getCart();
    console.log("Kết quả lấy giỏ hàng:", result);
  
    if (result.success) {
      setCartItems(result.cart);
      setError(""); // Clear lỗi nếu có dữ liệu
    } else {
      setCartItems([]); // Clear cart nếu lỗi
      setError(result.message || "Không thể lấy giỏ hàng");
    }
  };
  
  const handleQuantityChange = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;

    await updateCartQuantity(cartId, newQuantity);
    fetchCart();
  };

  const handleRemoveFromCart = async (cartId) => {
    const result = await removeFromCart(cartId);
  
    if (result.success) {
      fetchCart(); // Refresh giỏ hàng sau khi xóa
    } else {
      alert(result.message || "Xóa sản phẩm thất bại!");
    }
  };
  

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true,
    }).format(value);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = 30000;
  const finalTotal = totalPrice + shippingFee;

  return (
    <div className="cart-container">
      <h2 className="cart-title">Giỏ hàng</h2>

      {error ? (
        <p className="alert alert-danger text-center">{error}</p>
      ) : cartItems.length === 0 ? (
        <p className="alert alert-warning text-center">Giỏ hàng trống</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.product_id} className="row cart-item">
              <div className="col-md-2">
                <img
                  src={`/upload/${item.image}`}
                  alt={item.name}
                  className="cart-item-image img-fluid"
                />
              </div>
              <div className="col-md-5 d-flex flex-column justify-content-center">
                <h5 className="cart-item-name">{item.product_name}</h5>
                <p className="text-muted">{formatCurrency(item.price)} đ</p>
              </div>
              <div className="col-md-2 quantity-container">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.cart_id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="quantity-text">{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.cart_id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="col-md-2">
                <span className="fw-bold">
                  {formatCurrency(item.price * item.quantity)} đ
                </span>
              </div>
              <div className="col-md-1">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveFromCart(item.cart_id)}
                >
                  ✖
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary p-4 mt-4">
            <div className="d-flex justify-content-between">
              <span>Tạm tính:</span>
              <span>{formatCurrency(totalPrice)} đ</span>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <span>Giao hàng:</span>
              <span className="fw-bold">{formatCurrency(shippingFee)} đ</span>
            </div>
            <div className="d-flex justify-content-between text-danger fw-bold fs-5">
              <span>Tổng:</span>
              <span>{formatCurrency(finalTotal)} đ</span>
            </div>
          </div>

          <button className="btn-checkout w-100 mt-3" onClick={handleCheckout}>
            Tiến hành thanh toán
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
