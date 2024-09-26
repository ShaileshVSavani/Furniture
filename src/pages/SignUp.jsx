
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { signupUser } from '../redux/userSlice';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [userName, setUserName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const signupError = useSelector((state) => state.users.error);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       await dispatch(signupUser({ userName, email, password })).unwrap();
//       console.log("User", userName, email, password);
//       navigate('/login'); // Redirect to login page after successful signup
//     } catch (error) {
//       setError(signupError || 'An error occurred during signup. Please try again.');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-base-200">
//       <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 space-y-4 bg-white shadow-md rounded-lg">
//         <h2 className="text-2xl font-bold text-center">Signup</h2>
//         {error && <p className="text-red-500 text-center">{error}</p>}
//         <div className="form-control">
//           <label className="label">
//             <span className="label-text">User Name:</span>
//           </label>
//           <input
//             type="text"
//             name="userName"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             className="input input-bordered w-full"
//             required
//           />
//         </div>
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
//           <input type="submit" value="Submit" className="btn btn-outline w-full" />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Signup;


//================================================


// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { signupUser } from '../redux/userSlice';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Signup = () => {
//   const [userName, setUserName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const signupError = useSelector((state) => state.user.error); // Get the error from Redux state

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await dispatch(signupUser({ userName, email, password })).unwrap();
//       toast.success('Signup successful! Redirecting to login...');
//       setTimeout(() => {
//         navigate('/login'); // Redirect to login page after successful signup
//       }, 2000);
//     } catch (error) {
//       // No need to manually set the error; Redux handles it
//       toast.error(signupError); // Show error notification
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-lg p-8 space-y-4 bg-white shadow-md rounded-lg"
//       >
//         <h2 className="text-3xl font-bold text-center mb-4">Signup</h2>
//         <div className="form-control">
//           <label className="label">
//             <span className="label-text">User Name:</span>
//           </label>
//           <input
//             type="text"
//             name="userName"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             className="input input-bordered w-full"
//             required
//           />
//         </div>
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
//           <input type="submit" value="Submit" className="btn btn-outline w-full" />
//         </div>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Signup;


//=================================


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signupError = useSelector((state) => state.users.error); // Ensure the path is correct

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(signupUser({ userName, email, password })).unwrap();
      toast.success('Signup successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after successful signup
      }, 2000);
    } catch (error) {
      // The error is handled by the Redux state
      toast.error(signupError); // Show error notification
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 space-y-4 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-4">Signup</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">User Name:</span>
          </label>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
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
          <input type="submit" value="Submit" className="btn btn-outline w-full" />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
