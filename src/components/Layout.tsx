import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function Layout() {

  return (
    <div className="h-screen">
      <Navigation />
      <div className="min-h-[80vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
