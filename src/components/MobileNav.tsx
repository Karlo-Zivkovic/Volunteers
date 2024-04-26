import { NavLink } from "react-router-dom";

interface MobileNavProps {
  mobileNavIsOpen: boolean;
  setMobileNavIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function MobileNav({
  mobileNavIsOpen,
  setMobileNavIsOpen,
}: MobileNavProps) {
  return (
    <div
      className={`bg-gray-800 h-[93vh] absolute top-[7vh] text-white w-full transition-all flex flex-col justify-center items-center gap-10 z-50 ${
        mobileNavIsOpen ? "-translate-x-5" : "-translate-x-[300vh]"
      }`}
    >
      <NavLink
        className={({ isActive }) =>
          `font-semibold hover:bg-yellow-500 w-[24rem] text-center  py-4 transition-all text-2xl rounded-md ${
            isActive ? "bg-yellow-500 " : ""
          }`
        }
        to="/"
        onClick={() => setMobileNavIsOpen(false)}
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `font-semibold hover:bg-yellow-500 w-[24rem] text-center py-4 transition-all text-2xl rounded-md ${
            isActive ? "bg-yellow-500 " : ""
          }`
        }
        to="/activities"
        onClick={() => setMobileNavIsOpen(false)}
      >
        Activities
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `font-semibold hover:bg-yellow-500 w-[24rem] text-center py-4 transition-all text-2xl rounded-md ${
            isActive ? "bg-yellow-500 " : ""
          }`
        }
        to="/volunteers"
        onClick={() => setMobileNavIsOpen(false)}
      >
        Volunteers
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `font-semibold hover:bg-yellow-500 w-[24rem] text-center  py-4 transition-all text-2xl rounded-md ${
            isActive ? "bg-yellow-500 " : ""
          }`
        }
        to="/associations"
        onClick={() => setMobileNavIsOpen(false)}
      >
        Associations
      </NavLink>
    </div>
  );
}
