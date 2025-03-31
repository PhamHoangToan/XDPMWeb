import React, { useState } from "react";

const ThongKe = () => {
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Giả lập dữ liệu trả về từ API
    const fakeData = {
      totalRevenue: 2044000,
      results: [
        {
          image: "logobanh.png",
          product_name: "Bánh Cheese & Mousse Mix 4 vị",
          total_quantity: 1,
          total_revenue: 509000,
        },
        {
          image: "logobanh.png",
          product_name: "Bánh kem dâu tây",
          total_quantity: 2,
          total_revenue: 1535000,
        },
      ],
    };

    setData(fakeData);
  };

  return (
    <div className="thongke-container">
      <h1 className="thongke-title">Thống Kê Doanh Thu</h1>
      <form onSubmit={handleSubmit} className="thongke-form">
        <div className="thongke-form-group">
          <label>Chọn ngày:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
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
        <button type="submit" className="thongke-btn">Thống Kê</button>
      </form>

      {data && (
        <div className="thongke-results">
          <table className="thongke-table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {data.results.map((row, index) => (
                <tr key={index}>
                  <td>
                    <img src={`/img/upload/${row.image}`} alt={row.product_name} className="thongke-img" />
                  </td>
                  <td>{row.product_name}</td>
                  <td>{row.total_quantity}</td>
                  <td>{row.total_revenue.toLocaleString()} VND</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="thongke-total">
            <h3>Tổng doanh thu: {data.totalRevenue.toLocaleString()} VND</h3>
          </div>
        </div>
      )}
    </div>
  );
};
export default ThongKe;