import React, { useState } from "react";

const Cart = () => {
  // Dữ liệu giả lập
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      username: "Nguyễn Văn A",
      product_name: "Sản phẩm 1",
      image: "product1.jpg",
      price: 100000,
      quantity: 2,
    },
    {
      id: 2,
      username: "Trần Thị B",
      product_name: "Sản phẩm 2",
      image: "product2.jpg",
      price: 200000,
      quantity: 1,
    },
    {
      id: 3,
      username: "Lê Văn C",
      product_name: "Sản phẩm 3",
      image: "product3.jpg",
      price: 150000,
      quantity: 3,
    },
  ]);

  return (
    <div>
      {cartItems.length > 0 ? (
        <div className="cart-list-wrapper">
          {cartItems.map((item) => (
            <div className="cart-box" key={item.id}>
              <div className="cart-header">
                <h3>{item.username}</h3>
              </div>
              <div className="cart-body">
                <div className="product-img-container">
                  <img
                    src={`/img/upload/${item.image}`}
                    alt="Hình ảnh sản phẩm"
                    className="product-image"
                  />
                </div>
                <div className="product-info-container">
                  <h4>{item.product_name}</h4>
                  <p className="product-pricee">
                    Giá: {item.price.toLocaleString()} VND
                  </p>
                  <p className="product-quantity">
                    Số lượng: {item.quantity}
                  </p>
                  <p className="total-price">
                    Tổng tiền: {(item.quantity * item.price).toLocaleString()} VND
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-cart-items">Hiện tại không có giỏ hàng nào.</p>
      )}
    </div>
  );
};

export default Cart;
