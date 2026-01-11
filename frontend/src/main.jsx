import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, replace } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import axiosInstance from "./utility/axiosInstance";

const checkLoggedIn = async ({ request }) => {
  try {
    const path = new URL(request.url).pathname;
    const response = await axiosInstance.get("/auth/profile");
    if (response.data.data.id) {
      if (path == "/login" || path == "/register") {
        return replace("/dashboard");
      }
    } else {
      return replace("/login");
    }
  } catch (error) {
    return replace("/login");
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        loader: async () => replace("/dashboard"),
      },
      {
        path: "login",
        Component: Login,
        loader: checkLoggedIn,
      },
      {
        path: "register",
        Component: Register,
        loader: checkLoggedIn,
      },
      {
        path: "dashboard",
        loader: checkLoggedIn,
        Component: Dashboard,
      },
    ],
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

const root = document.getElementById("root");

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
