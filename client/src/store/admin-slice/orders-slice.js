import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    orderId: null,
    orderList: [],
    orderDetails: null,
};

export const getAllOrders = createAsyncThunk(
    "/order/getAllOrdersByUserId",
    async () => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/admin/orders/list`
        );

        return response.data;
    }
);

export const getOrderDetails = createAsyncThunk(
    "/order/getOrderDetails",
    async (id) => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/admin/orders/details/${id}`
        );

        return response.data;
    }
);

export const updateOrderStatus = createAsyncThunk(
    "/order/updateOrderStatus",
    async ({ id, orderStatus }) => {
        const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/admin/orders/update/${id}`,
            {
                orderStatus,
            }
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
            .addCase(getAllOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderList = action.payload.data.orders;
            })
            .addCase(getAllOrders.rejected, (state) => {
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

