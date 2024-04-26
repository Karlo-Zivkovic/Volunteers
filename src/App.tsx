import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import RootErrorBoundary from "./components/RootErrorBoundary";
import Activities from "./components/Activities/Activities";
import Volunteers from "./components/Volunteers/Volunteers";
import Associations from "./components/Associations/Associations";
import Home from "./components/Home/Home";
import ActivityDetails from "./components/Activities/ActivityDetails/ActivityDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    ErrorBoundary: RootErrorBoundary,
    children: [
      {
        index: true,
        loader: () => {
          return <p>Loading...</p>;
        },
        Component: Home,
      },
      {
        path: "activities",
        loader: () => {
          return <p>Loading...</p>;
        },
        Component: Activities,
        // ErrorBoundary: TodosBoundary,
        // children: [
        //   {
        //     path: ":id",
        //     loader: todoLoader,
        //     Component: <div>something</div>,
        //   },
        // ],
      },
      {
        path: "activities/:id",
        loader: () => {
          return <p>Loading...</p>;
        },
        Component: ActivityDetails,
      },
      {
        path: "volunteers",
        loader: () => {
          return <p>Loading...</p>;
        },
        Component: Volunteers,
      },
      {
        path: "associations",
        loader: () => {
          return <p>Loading...</p>;
        },
        Component: Associations,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
