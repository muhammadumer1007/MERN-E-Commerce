import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const fetchFilteredProducts = createAsyncThunk(

  "http://localhost:5173/shop/listing",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`
    );
    return data.data.data.products;
  }
);


export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/productDetails/${id}`
    );

    return result?.data.data;
  }
);


const ShopProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;

      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      }).addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload;

      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = {};
      });
  },
});

export const { setProductDetails } = ShopProductsSlice.actions;

export default ShopProductsSlice.reducer;
