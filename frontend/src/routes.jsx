import { createBrowserRouter } from "react-router-dom";
import { ProductListPage } from "./pages/ProductListPage/ProductListPage";
import { HomePage } from "./pages/HomePage/HomePage";

import { MainLayout } from "./layout/MainLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/women", element: <ProductListPage gender={"WOMEN"} /> },
      { path: "/men", element: <ProductListPage gender={"MEN"} /> },
      { path: "/kids", element: <ProductListPage gender={"KIDS"} /> },
    ],
  },
]);
