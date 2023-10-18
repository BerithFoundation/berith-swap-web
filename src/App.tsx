import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Home from "./ui/components/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    loader: async () => {
      throw redirect("/");
    },
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}