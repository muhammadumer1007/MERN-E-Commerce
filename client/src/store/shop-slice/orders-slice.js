import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    orderId: null,
    orderList: [],
    orderDetails: null,
};

export const createNewOrder = createAsyncThunk(
    "/order/createNewOrder",
    async (orderData) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/shop/orders/create`,
            orderData
        );

        console.log(response.data);

        return response.data;
    }
);

export const getAllOrdersByUserId = createAsyncThunk(
    "/order/getAllOrdersByUserId",
    async (userId) => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/shop/orders/list/${userId}`
        );

        return response.data;
    }
);


export const getOrderDetails = createAsyncThunk(
    "/order/getOrderDetails",
    async (id) => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/shop/orders/details/${id}`
        );

        return response.data;
    }
);

const shoppingOrderSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            state.orderDetails = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNewOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderId = action.payload.data._id;
            })
            .addCase(createNewOrder.rejected, (state) => {
                state.isLoading = false;
                state.orderId = null;
            })
            .addCase(getAllOrdersByUserId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderList = action.payload.data.orders;
            })
            .addCase(getAllOrdersByUserId.rejected, (state) => {
                state.isLoading = false;
                state.orderList = [];
            })
            .addCase(getOrderDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderDetails = action.payload.data;
            })
            .addCase(getOrderDetails.rejected, (state) => {
                state.isLoading = false;
                state.orderDetails = null;
            });
    },
});

export default shoppingOrderSlice.reducer;

export const { resetOrderDetails } = shoppingOrderSlice.actions;

