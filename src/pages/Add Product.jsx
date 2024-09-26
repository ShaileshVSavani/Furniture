
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from "../redux/productSlice";
// import axios from "axios";

// const AddEditProduct = () => {
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector((state) => state.product);

//   const [newProduct, setNewProduct] = useState({
//     title: "",
//     price: "",
//     category: "",
//     img: "",
//     brand: "",
//     short_description: "",
//     description: "",
//   });
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     dispatch(getProducts());
//   }, [dispatch]);

//   const handleChange = (e) => {
//     if (e.target.name === "img") {
//       setImageFile(e.target.files[0]);
//     } else {
//       setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
//     }
//   };

//   const uploadImage = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "rmitiypa"); // Replace with your Cloudinary upload preset

//     try {
//       const response = await axios.post(
//         `https://api.cloudinary.com/v1_1/dl8hsmer2/image/upload`,
//         formData
//       );
//       return response.data.secure_url; // Return the image URL from Cloudinary
//     } catch (error) {
//       setErrorMessage("Error uploading image. Please try again.");
//       return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let imageUrl = newProduct.img;

//     if (imageFile) {
//       imageUrl = await uploadImage(imageFile);
//       console.log("Image uploaded successfully");
//       if (!imageUrl) return; // Stop if image upload fails
//     }

//     const productData = { ...newProduct, img: imageUrl };

//     if (selectedProductId) {
//       // Update product
//       dispatch(updateProduct({ id: selectedProductId, product: productData }));
//     } else {
//       // Add new product
//       dispatch(createProduct(productData));
//     }
// console.log("product created successfully")
//     // Reset form and state after submission
//     setNewProduct({
//       title: "",
//       price: "",
//       category: "",
//       img: "",
//       brand: "",
//       short_description: "",
//       description: "",
//     });
//     setImageFile(null);
//     setSelectedProductId(null);
//     setErrorMessage("");
//     setIsEditing(false);
//   };

//   const handleEdit = (product) => {
//     setNewProduct(product); // Populate the form with product details for editing
//     setSelectedProductId(product.id); // Set selected product ID for editing
//     setIsEditing(true);
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteProduct(id));
//     setSelectedProductId(null); // Reset after deletion
//     setIsEditing(false);
//   };

//   const handleClose = () => {
//     setSelectedProductId(null); // Close the edit form without saving changes
//     setNewProduct({
//       title: "",
//       price: "",
//       category: "",
//       img: "",
//       brand: "",
//       short_description: "",
//       description: "",
//     });
//     setIsEditing(false);
//   };

//   const handleViewProduct = (product) => {
//     setSelectedProductId(product.id);
//     setNewProduct(product);
//     setIsEditing(false); // View mode, not editing
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {selectedProductId && !isEditing ? (
//         <div className="border p-4 rounded-lg flex">
//           <div>
//             <img
//               src={newProduct.img}
//               alt={newProduct.title}
//               className="w-64 h-64 object-cover rounded-lg mb-4"
//             />
//           </div>
//           <div>
//             <div>
//               <h2 className="text-2xl font-bold mb-2">{newProduct.title}</h2>
//               <p className="text-lg">Category: {newProduct.category}</p>
//               <p className="text-lg">Brand: {newProduct.brand}</p>
//               <p className="text-lg">Price: ${newProduct.price}</p>
//               <p className="mt-4">{newProduct.short_description}</p>
//               <p className="mt-4">{newProduct.description}</p>
//             </div>
//             <div className="mt-4">
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="btn btn-outline btn-primary"
//               >
//                 Edit Product
//               </button>
//               <button
//                 onClick={() => handleDelete(selectedProductId)}
//                 className="btn btn-outline btn-error ml-2"
//               >
//                 Delete Product
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="p-8 shadow-xl w-1/2 rounded-xl mx-auto">
//           <form onSubmit={handleSubmit} className="space-y-4  mx-auto">
//             {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//             <input
//               type="text"
//               name="title"
//               value={newProduct.title}
//               onChange={handleChange}
//               placeholder="Title"
//               className="input input-bordered w-full"
//               required
//             />
//             <input
//               type="text"
//               name="price"
//               value={newProduct.price}
//               onChange={handleChange}
//               placeholder="Price"
//               className="input input-bordered w-full"
//               required
//             />
//             <input
//               type="text"
//               name="category"
//               value={newProduct.category}
//               onChange={handleChange}
//               placeholder="Category"
//               className="input input-bordered w-full"
//               required
//             />
//             <input
//               type="text"
//               name="brand"
//               value={newProduct.brand}
//               onChange={handleChange}
//               placeholder="Brand"
//               className="input input-bordered w-full"
//               required
//             />
//             <input
//               type="file"
//               name="img"
//               onChange={handleChange}
//               className="input input-bordered w-full"
//             />
//             <textarea
//               name="short_description"
//               value={newProduct.short_description}
//               onChange={handleChange}
//               placeholder="Short Description"
//               className="textarea textarea-bordered w-full"
//               required
//             />
//             <textarea
//               name="description"
//               value={newProduct.description}
//               onChange={handleChange}
//               placeholder="Description"
//               className="textarea textarea-bordered w-full"
//               required
//             />
//             <button type="submit" className="btn btn-outline w-full">
//               {selectedProductId ? "Save Changes" : "Add Product"}
//             </button>
//             {selectedProductId && (
//               <button
//                 type="button"
//                 className="btn btn-outline btn-error w-full mt-2"
//                 onClick={handleClose}
//               >
//                 Close
//               </button>
//             )}
//           </form>
//         </div>
//       )}

//       {!selectedProductId && (
//         <>
//           <h2 className="text-2xl mt-6">Product List</h2>
//           {loading ? (
//             <p>Loading...</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : (
//             <ul className="space-y-2 mt-4 w-2/3 mx-auto">
//               {products.map((product) => (
//                 <li
//                   key={product.id}
//                   className="flex justify-between items-center border p-4 rounded-lg"
//                 >
//                   <div>
//                     <p className="font-bold">{product.title}</p>
//                     <p>{product.category}</p>
//                   </div>
//                   <button
//                     onClick={() => handleViewProduct(product)}
//                     className="btn btn-sm btn-outline"
//                   >
//                     View Details
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default AddEditProduct;



//============================================


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../redux/productSlice";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEditProduct = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "",
    img: "",
    brand: "",
    short_description: "",
    description: "",
  });
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    if (e.target.name === "img") {
      setImageFile(e.target.files[0]);
    } else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "rmitiypa"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dl8hsmer2/image/upload`,
        formData
      );
      toast.success("Image uploaded successfully!", { autoClose: 4000 }); // Image upload success toast
      return response.data.secure_url; // Return the image URL from Cloudinary
    } catch (error) {
      setErrorMessage("Error uploading image. Please try again.");
      toast.error("Error uploading image!", { autoClose: 4000 }); // Image upload error toast
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = newProduct.img;

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
      if (!imageUrl) return; // Stop if image upload fails
    }

    const productData = { ...newProduct, img: imageUrl };

    if (selectedProductId) {
      // Update product
      dispatch(updateProduct({ id: selectedProductId, product: productData }));
    } else {
      // Add new product
      dispatch(createProduct(productData));
      toast.success("Product created successfully!", { autoClose: 3000 }); // Product creation success toast
    }

    // Reset form and state after submission
    setNewProduct({
      title: "",
      price: "",
      category: "",
      img: "",
      brand: "",
      short_description: "",
      description: "",
    });
    setImageFile(null);
    setSelectedProductId(null);
    setErrorMessage("");
    setIsEditing(false);
  };

  const handleEdit = (product) => {
    setNewProduct(product); // Populate the form with product details for editing
    setSelectedProductId(product.id); // Set selected product ID for editing
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    setSelectedProductId(null); // Reset after deletion
    setIsEditing(false);
  };

  const handleClose = () => {
    setSelectedProductId(null); // Close the edit form without saving changes
    setNewProduct({
      title: "",
      price: "",
      category: "",
      img: "",
      brand: "",
      short_description: "",
      description: "",
    });
    setIsEditing(false);
  };

  const handleViewProduct = (product) => {
    setSelectedProductId(product.id);
    setNewProduct(product);
    setIsEditing(false); // View mode, not editing
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer /> {/* Add this to enable toast notifications */}
      
      {selectedProductId && !isEditing ? (
        <div className="border p-4 rounded-lg flex justify-evenly">
          <div className="">
            <img
              src={newProduct.img}
              alt={newProduct.title}
              className="w-72 h-72 flex r object-cover rounded-lg mb-4"
            />
          </div>
          <div>
            <div>
              <h2 className="text-2xl font-bold mb-2">{newProduct.title}</h2>
              <p className="text-lg">Category: {newProduct.category}</p>
              <p className="text-lg">Brand: {newProduct.brand}</p>
              <p className="text-lg">Price: ${newProduct.price}</p>
              <p className="mt-4">{newProduct.short_description}</p>
              <p className="mt-4 w-1/2 mx-auto">{newProduct.description}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-outline btn-primary"
              >
                Edit Product
              </button>
              <button
                onClick={() => handleDelete(selectedProductId)}
                className="btn btn-outline btn-error ml-2"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 shadow-xl w-1/2 rounded-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4 mx-auto">
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <input
              type="text"
              name="title"
              value={newProduct.title}
              onChange={handleChange}
              placeholder="Title"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              placeholder="Price"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              placeholder="Category"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="brand"
              value={newProduct.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="input input-bordered w-full"
              required
            />
            <input
              type="file"
              name="img"
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <textarea
              name="short_description"
              value={newProduct.short_description}
              onChange={handleChange}
              placeholder="Short Description"
              className="textarea textarea-bordered w-full"
              required
            />
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              placeholder="Description"
              className="textarea textarea-bordered w-full"
              required
            />
            <button type="submit" className="btn btn-outline w-full">
              {selectedProductId ? "Save Changes" : "Add Product"}
            </button>
            {selectedProductId && (
              <button
                type="button"
                className="btn btn-outline btn-error w-full mt-2"
                onClick={handleClose}
              >
                Close
              </button>
            )}
          </form>
        </div>
      )}

      {!selectedProductId && (
        <>
          <h2 className="text-2xl mt-6">Product List</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul className="space-y-2 mt-4 w-2/3 mx-auto">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center border p-4 rounded-lg"
                >
                  <div>
                    <p className="font-bold">{product.title}</p>
                    <p>{product.category}</p>
                  </div>
                  <button
                    onClick={() => handleViewProduct(product)}
                    className="btn btn-sm btn-outline"
                  >
                    View Details
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default AddEditProduct;

