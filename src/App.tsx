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
        Component: Home,
      },
      {
        path: "activities",
        Component: Activities,
      },
      {
        path: "activities/:id",
        Component: ActivityDetails,
      },
      {
        path: "volunteers",
        Component: Volunteers,
      },
      {
        path: "associations",
        Component: Associations,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
