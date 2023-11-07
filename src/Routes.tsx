import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Comments from "./pages/comments/comments";
import Discounts from "./pages/discounts/discounts";
import Orders from "./pages/orders/orders";
import Products from "./pages/products/products";
import Users from "./pages/users/users";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "comments", element: <Comments /> },
      { path: "discount", element: <Discounts /> },
      { path: "orders", element: <Orders /> },
      { path: "users", element: <Users /> },
      { path: "products", element: <Products /> },
    ],
  },
]);
