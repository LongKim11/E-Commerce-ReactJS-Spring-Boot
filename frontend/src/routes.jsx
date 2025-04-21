import { createBrowserRouter } from "react-router-dom";
import { ProductListPage } from "./pages/ProductListPage/ProductListPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { MainLayout } from "./layout/MainLayout";
import { ProductDetailPage } from "./pages/ProductDetailPage/ProductDetailPage";
import { AuthenticationLayout } from "./layout/AuthenticationLayout";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";
import { OAuth2LoginCallback } from "./pages/OAuth2LoginCallback/OAuth2LoginCallback";
import { Cart } from "./pages/Cart/Cart";
import { Checkout } from "./pages/Checkout/Checkout";
import { ConfirmPayment } from "./pages/ConfirmPayment/ConfirmPayment";
import { OrderConfirm } from "./pages/OrderConfirm/OrderConfirm";
import { Profile } from "./pages/Account/Profile";
import { Order } from "./pages/Account/Order";
import { Logout } from "./pages/Account/Logout";
import { AccountManagementLayout } from "./layout/AccountMangementLayout";
import { WishList } from "./pages/WishList/WishList";
import { AdminLayout } from "./layout/AdminLayout";
import { Product } from "./pages/Admin/Product";
import { Dashboard } from "./pages/Admin/Dashboard";
import { OrdersMangement } from "./pages/Admin/OrdersMangement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "women", element: <ProductListPage gender={"WOMEN"} /> },
      { path: "men", element: <ProductListPage gender={"MEN"} /> },
      { path: "kids", element: <ProductListPage gender={"KIDS"} /> },
      {
        path: "product/:id",
        element: <ProductDetailPage />,
      },
      { path: "cart", element: <Cart /> },
      { path: "wishlist", element: <WishList /> },
      {
        path: "account",
        element: <AccountManagementLayout />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          { path: "orders", element: <Order /> },
          { path: "logout", element: <Logout /> },
        ],
      },
      { path: "checkout", element: <Checkout /> },
      { path: "confirm-payment", element: <ConfirmPayment /> },
      { path: "confirm-order", element: <OrderConfirm /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthenticationLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  { path: "/oauth2/callback", element: <OAuth2LoginCallback /> },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "product", element: <Product /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "orders", element: <OrdersMangement /> },
    ],
  },
]);
