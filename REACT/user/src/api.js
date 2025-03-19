import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/products";
const CATEGORY_API_URL = "http://localhost:5000/categories.php";
const REVIEWS_API_URL = "http://localhost:5000/reviews.php";
const LOGIN_API_URL = "http://localhost:5000/api/users/login";
const CART_API_URL = "http://localhost:5000/api/cart";
const CART_API_URL1 = "http://localhost:5000/api/cart/cart";
const ORDER_API_URL = "http://localhost:5000/api/order";
const REGISTER_API_URL = "http://localhost:5000/api/users/register";
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
  const userId = localStorage.getItem("user_id"); // Lấy user_id từ localStorage
  if (!userId) {
    return { success: false, message: "Chưa đăng nhập" };
  }

  try {
    const response = await axios.get(`${ORDER_API_URL}?user_id=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy thông tin user:", error);
    return { success: false, message: "Lỗi kết nối đến server" };
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

  // Xử lý giá trị mặc định nếu thiếu
  const orderDate = orderData.date || new Date().toISOString().slice(0, 10); // yyyy-mm-dd
  const orderNumber = orderData.number || 1; // default là 1 sản phẩm
  const orderStatus = orderData.status || "Đang xử lý"; // mặc định là "Đang xử lý"

  const orderDataWithDateNumberAndStatus = {
    ...orderData,
    date: orderDate,
    number: orderNumber,
    status: orderStatus
  };

  try {
    const response = await axios.post(
      ORDER_API_URL,
      orderDataWithDateNumberAndStatus,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.data.success) {
      console.error("Lỗi trả về từ server:", response.data);
      return { success: false, message: response.data.message || "Có lỗi xảy ra khi đặt hàng" };
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
    const response = await axios.get(`${ORDER_API_URL}?order_id=${orderId}`);
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
    return { success: false, message: "Lỗi kết nối đến server" };
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
      alert("Thêm vào giỏ hàng thành công!");
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
    const response = await axios.get(`${API_BASE_URL}?search=${encodeURIComponent(keyword)}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi tìm kiếm sản phẩm:", error);
    return [];
  }
};


