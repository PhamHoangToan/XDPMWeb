import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/products";
const CATEGORY_API_URL = "https://backend-web-hung-8.onrender.com/api/categories";
const REVIEWS_API_URL = "https://backend-web-hung-8.onrender.com/api/reviews";
const LOGIN_API_URL = "http://localhost:5000/api/users/login";
const CART_API_URL = "http://localhost:5000/api/cart";
const CART_API_URL1 = "http://localhost:5000/api/cart/cart";
const ORDER_API_URL = "http://localhost:5000/api/order";
const ORDERDetail_API_URL = "http://localhost:5000/api/orders/order-detail";
const REGISTER_API_URL = "http://localhost:5000/api/users/register";
const API_URL = "http://localhost:5000/api/users";
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(REGISTER_API_URL, userData);
    return response.data;
  } catch (error) {
    console.log("Lỗi từ server:", error.response);
    
    if (error.response && error.response.data) {
      return { success: false, message: error.response.data.message || "Đăng ký thất bại" };
    }
    
    return { success: false, message: "Lỗi kết nối đến server" };
  }
};

export const fetchOrdersByUser = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("Không tìm thấy token! Người dùng chưa đăng nhập.");
      return {
        success: false,
        message: "Bạn chưa đăng nhập!",
        data: [],
      };
    }

    const response = await axios.get(`${ORDER_API_URL}/orders/my-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Kết quả lấy đơn hàng:", response.data);

    // Giả sử backend trả về { success: true, data: [...] }
    return {
      success: true,
      data: response.data.data || [],
    };

  } catch (error) {
    console.error("Lỗi lấy đơn hàng:", error);

    if (error.response) {
      // Backend trả lỗi chi tiết
      return {
        success: false,
        message: error.response.data.message || "Có lỗi xảy ra khi lấy đơn hàng",
        data: [],
      };
    }

    // Lỗi không có response (ví dụ: mất mạng, lỗi server chết)
    return {
      success: false,
      message: "Lỗi kết nối đến server",
      data: [],
    };
  }
};

export const fetchUserReviews = async () => {
  const userId = localStorage.getItem("user_id"); // Lấy user_id từ localStorage
  if (!userId) {
    return { success: false, message: "Chưa đăng nhập" };
  }

  try {
    const response = await axios.get(`${REVIEWS_API_URL}?user_id=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy thông tin user:", error);
    return { success: false, message: "Lỗi kết nối đến server" };
  }
};

// Lấy thông tin user theo user_id
export const fetchUserInfo = async () => {
  const userId = localStorage.getItem("user_id"); // Lấy user_id từ localStorage
  if (!userId) {
    return { success: false, message: "Chưa đăng nhập" };
  }

  try {
    const response = await axios.get(`${ORDER_API_URL}?getUserInfo=1&user_id=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy thông tin user:", error);
    return { success: false, message: "Lỗi kết nối đến server" };
  }
};

export const placeOrder = async (orderData) => {
  const token = localStorage.getItem("token");

  // Validate cơ bản
  if (!orderData || !Array.isArray(orderData.items) || orderData.items.length === 0) {
    return {
      success: false,
      message: "Không có sản phẩm nào trong đơn hàng!",
    };
  }

  // Xử lý giá trị mặc định nếu thiếu
  const orderDate = orderData.date || new Date().toISOString().slice(0, 10); // yyyy-mm-dd
  const orderNumber = orderData.number || orderData.items.length; // số lượng sản phẩm
  const orderStatus = orderData.status || "Đang xử lý"; // mặc định là "Đang xử lý"

  // Tạo payload gửi lên backend
  const payload = {
    ...orderData,
    date: orderDate,
    number: orderNumber,
    status: orderStatus,
    // items đã có sẵn trong orderData
  };

  try {
    const response = await axios.post(
     `${ORDER_API_URL}/orders/full`, // backend API route tạo đơn hàng + chi tiết đơn hàng
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data.success) {
      console.error("Lỗi trả về từ server:", response.data);
      return {
        success: false,
        message: response.data.message || "Có lỗi xảy ra khi đặt hàng",
      };
    }

    return response.data;

  } catch (error) {
    if (error.response) {
      console.error("Lỗi response:", error.response.data);
      return {
        success: false,
        message: error.response.data.message || "Có lỗi xảy ra khi đặt hàng",
      };
    } else if (error.request) {
      console.error("Không nhận được phản hồi từ server:", error.request);
      return {
        success: false,
        message: "Không nhận được phản hồi từ server",
      };
    } else {
      console.error("Lỗi khác:", error.message);
      return {
        success: false,
        message: "Đã xảy ra lỗi không xác định",
      };
    }
  }
};

export const fetchOrderDetail = async (orderId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Không tìm thấy token trong localStorage!");
      return { success: false, message: "Bạn chưa đăng nhập." };
    }

    const response = await axios.get(`${ORDERDetail_API_URL}?order_id=${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi lấy chi tiết đơn hàng:", error);
    return { success: false, message: "Lỗi kết nối đến server" };
  }
};


// Lấy giỏ hàng theo user_id
export const getCart = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return { success: false, message: "Chưa đăng nhập" };
  }

  try {
    const response = await axios.get(CART_API_URL1, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi lấy giỏ hàng:", error);
    return { success: false, message: "Giỏ hàng chưa có sản phẩm" };
  }
};


export const addToCart = async (product_id, quantity) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Bạn cần đăng nhập trước!");
    return { success: false, message: "Người dùng chưa đăng nhập!" };
  }

  try {
    const response = await axios.post(
      CART_API_URL,
      { product_id, quantity }, // Không cần user_id, backend tự lấy từ token
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
     
      return response.data;
    } else {
      alert(response.data.message);
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Lỗi thêm vào giỏ hàng:", error);
    return { success: false, message: "Lỗi kết nối đến server" };
  }
};


//test


// Cập nhật số lượng sản phẩm trong giỏ hàng
export const updateCartQuantity = async (cartId, newQuantity) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.put(
      `${CART_API_URL}/${cartId}`,
      { quantity: newQuantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Lỗi cập nhật số lượng:", error);
  }
};


// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (cart_id) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(`${CART_API_URL}/${cart_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi xóa sản phẩm khỏi giỏ hàng:", error);
    return { success: false, message: "Lỗi kết nối đến server" };
  }
};


// Hàm đăng nhập
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(LOGIN_API_URL, { email, password });
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.log("Lỗi từ server:", error.response); // Kiểm tra lỗi API trả về

    if (error.response && error.response.data) {
      return { success: false, message: error.response.data.message || "Sai email hoặc mật khẩu" };
    }
    return { success: false, message: "Lỗi kết nối đến server" };
  }
};


// Lấy danh sách sản phẩm
export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy sản phẩm:", error);
    return [];
  }
};

// Lấy 4 sản phẩm ngẫu nhiên
export const fetchRandomProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}?random=true`);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy sản phẩm ngẫu nhiên:", error);
    return [];
  }
};

//Lấy danh sách danh mục
export const fetchCategories = async () => {
  try {
    const response = await axios.get(CATEGORY_API_URL);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy danh mục:", error);
    return [];
  }
};

//Lấy chi tiết sản phẩm theo ID
export const fetchProductsById = async (id) => {
  try {
    const url = `${API_BASE_URL}/${id}`;
    console.log("Fetching product from:", url);

    const response = await axios.get(url);

    console.log("API response:", response.data);

    return response.data; // Đảm bảo backend trả đúng 1 object
  } catch (error) {
    console.error("Lỗi lấy sản phẩm theo ID:", error.response?.data || error.message);
    return null;
  }
};


//Lấy đánh giá theo sản phẩm
export const fetchReviewsByProduct = async (id) => {
  try {
    const response = await axios.get(`${REVIEWS_API_URL}?id=${id}`);
    console.log("API response:", response.data); // Debug dữ liệu
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy đánh giá:", error);
    return null;
  }
};

//Tìm kiếm sản phẩm theo từ khóa
export const searchProducts = async (keyword) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search?keyword=${encodeURIComponent(keyword)}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi tìm kiếm sản phẩm:", error);
    return {
      success: false,
      message: "Lỗi tìm kiếm sản phẩm",
      data: []
    };
  }
};

export const forgotPassword = async (email) => {
  try {
    console.log("🔹 Sending forgot password request with email:", email);
    const response = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
    console.log("Forgot password response:", response.data);
    return response.data;
  } catch (error) {
    console.error(" Lỗi forgotPassword:", error);
    throw error;
  }
};


// export const forgotPassword = async (email) => {
//   try {
//     const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
//     return res.data;
//   } catch (error) {
//     console.error("Lỗi forgotPassword:", error);
//     return { success: false, message: "Có lỗi xảy ra." };
//   }
// };

export const resetPassword = async (email, otp, newPassword) => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
      email,
      otp,
      newPassword,
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi resetPassword:", error);
    return { success: false, message: "Có lỗi xảy ra." };
  }
};







export const fetchReviewsByProductId = async (productId) => {
  try {
    const response = await axios.get(`http://localhost:8081/api/reviews/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy đánh giá sản phẩm:", error);
    return [];
  }
};

export const submitReview = async ({ user_id, product_id, description }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      REVIEWS_API_URL,
      {
        user_id,
        product_id,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      }
    );

    return {
      success: true,
      message: "Đánh giá đã được gửi thành công!",
      data: response.data,
    };
  } catch (error) {
    console.error("Lỗi khi gửi đánh giá:", error);

    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "Lỗi khi gửi đánh giá",
      };
    }

    return {
      success: false,
      message: "Lỗi kết nối đến server",
    };
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updateUserProfile = async (token, userData) => {
  console.log("📤 Dữ liệu gửi lên server:", JSON.stringify(userData, null, 2)); // Log request

  try {
      const response = await axios.put("http://localhost:5000/api/users/update", userData, {
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
          }
      });

      console.log("✅ Phản hồi từ server:", response.data); // Log response
      return response.data;
  } catch (error) {
      console.error("❌ Lỗi khi gửi API:", error.response?.data || error.message);
      throw error;
  }
};

// export const createFullOrder = async (orderData) => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await axios.post("http://localhost:5000/api/orders", orderData, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Lỗi khi tạo đơn hàng:", error);
//     return { success: false, message: "Lỗi khi tạo đơn hàng" };
//   }
// };

// export const clearCart = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await axios.delete("http://localhost:5000/api/cart/clear", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Lỗi khi xóa giỏ hàng:", error);
//     return { success: false, message: "Lỗi khi xóa giỏ hàng" };
//   }
// };


