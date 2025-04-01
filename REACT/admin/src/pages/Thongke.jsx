import React, { useState } from "react";
import { fetchStatistics } from "../api"; // Đảm bảo đúng đường dẫn đến file API

const ThongKe = () => {
  const [date, setDate] = useState(""); // Ngày
  const [month, setMonth] = useState(""); // Tháng
  const [year, setYear] = useState(""); // Năm
  const [data, setData] = useState(null); // Dữ liệu thống kê
  const [loading, setLoading] = useState(false); // Trạng thái loading

  const isValidDate = (day, month, year) => {
    const date = new Date(year, month - 1, day);
    return (
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (date && (!month || !year)) {
      alert("Vui lòng nhập đầy đủ tháng và năm khi chọn ngày.");
      setLoading(false);
      return;
    }

    if (date && month && year) {
      const selectedDay = parseInt(date);
      const selectedMonth = parseInt(month);
      const selectedYear = parseInt(year);
      if (!isValidDate(selectedDay, selectedMonth, selectedYear)) {
        alert("Ngày không hợp lệ. Vui lòng kiểm tra lại.");
        setLoading(false);
        return;
      }
    }

    const selectedDay = date ? parseInt(date) : null;
    const selectedMonth = month ? parseInt(month) : null;
    const selectedYear = year ? parseInt(year) : null;

    const response = await fetchStatistics(
      selectedYear,
      selectedMonth,
      selectedDay
    );
    console.log("API Response:", response); // Debug dữ liệu trả về

    if (response.success && response.data) {
      setData(response.data);
    } else {
      console.log(response.message || "Không thể tải dữ liệu.");
    }

    setLoading(false);
  };

  return (
    <div className="thongke-container">
      <h1 className="thongke-title">Thống Kê Doanh Thu</h1>
      <form onSubmit={handleSubmit} className="thongke-form">
        <div className="thongke-form-group">
          <label>Chọn ngày:</label>
          <input
            type="number"
            value={date}
            min="1"
            max="31"
            placeholder="Ngày (1-31)"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="thongke-form-group">
          <label>Chọn tháng:</label>
          <input
            type="number"
            value={month}
            min="1"
            max="12"
            placeholder="Tháng (1-12)"
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
        <div className="thongke-form-group">
          <label>Chọn năm:</label>
          <input
            type="number"
            value={year}
            placeholder="Năm (VD: 2023)"
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <button type="submit" className="thongke-btn">
          Thống Kê
        </button>
      </form>

      {loading && <div>Đang tải dữ liệu...</div>}
      {data && Array.isArray(data.orders) && data.orders.length > 0 ? (
        <div className="thongke-results">
          <table className="thongke-table">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Số đơn</th>
                <th>Tổng giá trị</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((order, index) => {
                // Debug để kiểm tra cấu trúc của từng đơn hàng
                console.log(order);
                return (
                  <tr key={index}>
                    <td>
                      {order.date
                        ? new Date(order.date).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>{order.number}</td>
                    <td>
                      {order.total_price
                        ? order.total_price.toLocaleString()
                        : "N/A"}{" "}
                      VND
                    </td>
                    <td>{order.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="thongke-total">
            <h3>
              Tổng doanh thu:{" "}
              {data.total_revenue ? data.total_revenue.toLocaleString() : "N/A"}{" "}
              VND
            </h3>
          </div>
        </div>
      ) : (
        !loading && (
          <div className="no-data-message">Không có dữ liệu thống kê.</div>
        )
      )}
    </div>
  );
};

export default ThongKe;
