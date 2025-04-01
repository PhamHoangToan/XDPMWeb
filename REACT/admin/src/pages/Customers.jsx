import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    {
      user_id: 1,
      email: "user1@example.com",
      username: "user1",
      password: "password1",
      phone: "0123456789",
      address: "123 Đường ABC, TP. HCM",
      created_at: "2024-03-30",
    },
    {
      user_id: 2,
      email: "user2@example.com",
      username: "user2",
      password: "password2",
      phone: "0987654321",
      address: "456 Đường XYZ, Hà Nội",
      created_at: "2024-03-28",
    },
    {
      user_id: 3,
      email: "user3@example.com",
      username: "user3",
      password: "password3",
      phone: "0912345678",
      address: "789 Đường DEF, Đà Nẵng",
      created_at: "2024-03-25",
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này không?")) {
      setUsers(users.filter((user) => user.user_id !== id));
    }
  };

  return (
    <div className="user-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Created_at</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>{user.created_at}</td>
              <td>
                <button
                  onClick={() => navigate(`/customers-edit/${user.user_id}`)}
                  className="user-btn-edit"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(user.user_id)}
                  className="user-btn-delete"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
