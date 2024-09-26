// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = () => {
//   const navigate = useNavigate();
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials({ ...credentials, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Replace with your login API call
//       const response = await fetch('/api/admin/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(credentials),
//       });
//       const data = await response.json();
      
//       if (response.ok) {
//         localStorage.setItem('admin', JSON.stringify(data)); // Store admin details in local storage
//         navigate('/admin/dashboard');
//       } else {
//         setError(data.message || 'Login failed');
//       }
//     } catch (err) {
//       setError('An error occurred');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Admin Login</h2>
//       {error && <p className="error-message">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           value={credentials.username}
//           onChange={handleChange}
//           placeholder="Username"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           value={credentials.password}
//           onChange={handleChange}
//           placeholder="Password"
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;


//====


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
