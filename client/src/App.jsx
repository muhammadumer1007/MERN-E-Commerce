import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/layouts/auth/auth-layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./components/layouts/admin-view/admin-layout";
import AdminViewDashboard from "./pages/admin-view/admin-view-dashboard";
import AdminViewFeatures from "./pages/admin-view/admin-view-features";
import AdminViewOrders from "./pages/admin-view/admin-view-orders";
import AdminViewProducts from "./pages/admin-view/admin-view-products";
import ShoppingLayout from "./components/layouts/shoping-view/shopping-layout";
import ShoppingViewHome from "./pages/shoping-view/shopping-view-home";
import ShoppingViewAccount from "./pages/shoping-view/shopping-view-account";
import ShoppingViewCheckout from "./pages/shoping-view/shopping-view-checkout";
import ShoppingViewListing from "./pages/shoping-view/shopping-view-listing";
import NotFound from "./pages/not-found/not-found";
import CheckAuth from "./components/common/check-auth";
import UnAuthpage from "./pages/un-authpage/un-authpage";
import { Toaster } from "@/components/ui/toaster";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice/auth-slice";
import SearchProducts from "./pages/shoping-view/shopping-view-search";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading)
    return (
      <>
        <h1>Loading....</h1>
      </>
    );
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminViewDashboard />} />
          <Route path="features" element={<AdminViewFeatures />} />
          <Route path="orders" element={<AdminViewOrders />} />
          <Route path="products" element={<AdminViewProducts />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingViewHome />} />
          <Route path="account" element={<ShoppingViewAccount />} />
          <Route path="checkout" element={<ShoppingViewCheckout />} />
          <Route path="listing" element={<ShoppingViewListing />} />
          <Route path="search" element={<SearchProducts />} />

        </Route>
        <Route path="/un-auth" element={<UnAuthpage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
