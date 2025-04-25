
// AdminLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace with your own admin credentials check
    if (username === "admin" && password === "adminpassword") {
      localStorage.setItem(
        'admin',
        JSON.stringify({ username: "admin", isAdmin: true })
      );
      navigate("/admin/add-edit-product"); // Redirect to the admin panel
    } else {
      setErrorMessage("Invalid credentials");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm mx-auto">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input input-bordered w-full mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full mb-4"
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
