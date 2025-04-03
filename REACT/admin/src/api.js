import axios from "axios";

// Địa chỉ API backend
const STATISTICS_API_URL = "https://backend-web-hung-14.onrender.com/api/statistics";
const CATEGORY_API_URL = "https://backend-web-hung-14.onrender.com/api/categories";
const BASE_URL = "https://backend-web-hung-14.onrender.com/api/reviews/admin";

export const fetchAllReviews = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data;  // Dữ liệu trả về từ API
    } catch (error) {
      console.error("Error fetching reviews", error);
      throw error;
    }
  };
  
  // Hàm xóa đánh giá
  export const deleteReview = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting review", error);
      throw error;
    }
  };
// Lấy danh sách danh mục
export const fetchCategories = async () => {
  try {
    const response = await axios.get(CATEGORY_API_URL);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error);
    return { success: false, message: "Lỗi kết nối đến server" };
  }
};

export const fetchCategoryById = async (id) => {
  try {
    const response = await axios.get(`${CATEGORY_API_URL}/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error);
    return { success: false, message: "Không thể tải danh mục." };
  }
};

// Thêm danh mục mới
export const addCategory = async (category) => {
  try {
    const response = await axios.post(CATEGORY_API_URL, category);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Lỗi khi thêm danh mục:", error);
    return { success: false, message: "Thêm danh mục thất bại!" };
  }
};

// Sửa danh mục
export const updateCategory = async (id, category) => {
  try {
    const response = await axios.put(`${CATEGORY_API_URL}/${id}`, category);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Lỗi khi cập nhật danh mục:", error);
    return { success: false, message: "Cập nhật danh mục thất bại!" };
  }
};

// Xóa danh mục
export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${CATEGORY_API_URL}/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi xóa danh mục:", error);
    return { success: false, message: "Xóa danh mục thất bại!" };
  }
};


export const fetchStatistics = async (year, month, day) => {
  console.log("Gửi request API:", { year, month, day });

  try {
    const response = await axios.get(STATISTICS_API_URL, {
      params: {
        year,
        month: month || undefined,
        day: day || undefined,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("API Response:", response.data);

    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: "Dữ liệu thống kê không hợp lệ" };
    }
  } catch (error) {
    console.error("Lỗi khi lấy thống kê:", error);
    console.log("Phản hồi từ server:", error.response?.data);

    return {
      success: false,
      message: error.response?.data?.message || "Lỗi kết nối đến server",
    };
  }
};
