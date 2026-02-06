import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"

import App from "./App"
import HomeScreen from "./screen/home.screen"
import CheckoutScreen from "./screen/checkout.screen"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,        // layout
    children: [
      {
        index: true,         // "/"
        element: <HomeScreen />,
      },
      {
        path: "checkout",    // "/checkout"
        element: <CheckoutScreen />,
      },
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
