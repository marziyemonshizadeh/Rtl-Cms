import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Comments from "@/pages/Comments/CommentsPage";
import Discounts from "@/pages/Discounts/DiscountsPage";
import Home from "@/pages/home/home";
import Orders from "@/pages/Orders/OrdersPage";
import ProductsPage from "@/pages/Products/ProductsPage";
import Users from "@/pages/Users/UsersPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "comments", element: <Comments /> },
      { path: "discount", element: <Discounts /> },
      { path: "orders", element: <Orders /> },
      { path: "users", element: <Users /> },
      { path: "products", element: <ProductsPage /> },
    ],
  },
]);
