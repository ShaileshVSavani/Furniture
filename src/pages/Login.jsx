
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../redux/userSlice";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const loginError = useSelector((state) => state.users.error);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     const user = {
//       email: email,
//       password: password,
//     };
//     try {
//       await dispatch(loginUser(user)).unwrap();
//       navigate("/"); // Redirect to home or dashboard after successful login
//     } catch (error) {
//       setError(
//         loginError || "An error occurred during login. Please try again."
//       );
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-base-200">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-sm p-8 space-y-4 bg-white shadow-md rounded-lg"
//       >
//         <h2 className="text-2xl font-bold text-center">Login</h2>
//         {error && <p className="text-red-500 text-center">{error}</p>}
//         <div className="form-control">
//           <label className="label">
//             <span className="label-text">Email:</span>
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="input input-bordered w-full"
//             required
//           />
//         </div>
//         <div className="form-control">
//           <label className="label">
//             <span className="label-text">Password:</span>
//           </label>
//           <input
//             type="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="input input-bordered w-full"
//             required
//           />
//         </div>
//         <div className="form-control mt-4">
//           <input
//             type="submit"
//             value="Submit"
//             className="btn btn-outline w-full"
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;



//=================================================


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginError = useSelector((state) => state.users.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const user = {
      email: email,
      password: password,
    };
    try {
      await dispatch(loginUser(user)).unwrap();
      toast.success("Login successful!"); // Toast for successful login
      navigate("/"); // Redirect to home or dashboard after successful login
    } catch (error) {
      const errorMsg = loginError || "An error occurred during login. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg); // Toast for error message
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 space-y-4 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email:</span>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password:</span>
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control mt-4">
          <input
            type="submit"
            value="Submit"
            className="btn btn-outline w-full"
          />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
