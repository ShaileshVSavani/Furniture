
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://json-server-react-project.onrender.com";
// const baseUrl = "http://localhost:3000";

// Fetch all products
export const getProducts = createAsyncThunk("/product", async () => {
    let res = await axios.get(`${baseUrl}/product`);
    return res.data;
});

// Create a new product
export const createProduct = createAsyncThunk("/createProduct", async (product) => {
    let res = await axios.post(`${baseUrl}/product`, product);
    return res.data;
});

// Update an existing product
export const updateProduct = createAsyncThunk("/updateProduct", async ({ id, product }) => {
    let res = await axios.patch(`${baseUrl}/product/${id}`, product);
    return res.data;
});

// Delete a product
export const deleteProduct = createAsyncThunk("/deleteProduct", async (id) => {
    await axios.delete(`${baseUrl}/product/${id}`);
    return id; // Return the ID of the deleted product
});

// Product slice
const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        // Fetch products
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Create a product
        builder.addCase(createProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products.push(action.payload); // Add new product to the array
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Update a product
        builder.addCase(updateProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            const updatedProducts = state.products.map((product) =>
                product.id === action.payload.id ? action.payload : product
            );
            state.products = updatedProducts;
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Delete a product
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = state.products.filter((product) => product.id !== action.payload);
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const productReducer = productSlice.reducer;
