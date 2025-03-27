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
import { Account } from "./pages/Account/Account";
import { Checkout } from "./pages/Checkout/Checkout";

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
      { path: "account", element: <Account /> },
      { path: "checkout", element: <Checkout /> },
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
]);
