import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/auth-slice";
import adminProducts from "./admin-slice/products-slice";
import adminOrdersSlice from "./admin-slice/orders-slice";
import ShopProductsSlice from "./shop-slice/products-slice";
import ShopAddressSlice from "./shop-slice/address-slice";
import ShopOrdersSlice from "./shop-slice/orders-slice";
import shopCart from "./shop-slice/cart-slice";
import ShopSearchSlice from "./shop-slice/search-slice";
import ShopReviewSlice from "./shop-slice/review-slice";
import commonFeatureSlice from "./common-slice/feature-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: adminProducts,
    adminOrders: adminOrdersSlice,
    shopProducts: ShopProductsSlice,
    shopCart: shopCart,
    shopAddress: ShopAddressSlice,
    shopOrders: ShopOrdersSlice,
    shopSearch: ShopSearchSlice,
    shopReview: ShopReviewSlice,
    commonFeature: commonFeatureSlice,

  },
});


export default store;
