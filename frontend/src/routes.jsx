import { createBrowserRouter } from "react-router-dom";
import { ProductListPage } from "./pages/ProductListPage/ProductListPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { MainLayout } from "./layout/MainLayout";
import { ProductDetailPage } from "./pages/ProductDetailPage/ProductDetailPage";
import { AuthenticationLayout } from "./layout/AuthenticationLayout";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";

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
]);
