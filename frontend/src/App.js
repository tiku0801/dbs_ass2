import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home/Home";
import StInfo from "./pages/StInfo/StInfo";
import SocialActivity from "./pages/SocialActivity/SocialActivity";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/app",
    element: <RootLayout />,
    children: [
      {
        path: "/app/stinfo",
        element: <StInfo />,
      },
      {
        path: "/app/social",
        element: <SocialActivity />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
