import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Home from "./ui/components/home/Home";
import Header from "./ui/components/header/Header";
import Footer from "./ui/components/footer/Footer";
import "./App.css";

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
  return (
    <div className="App">
      <div className="App_main_wrap">
        <Header />
        <RouterProvider router={router} />
      </div>
      <Footer />
    </div>
  );
}