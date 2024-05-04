import { Switch } from "antd";
import { HiOutlineViewList } from "react-icons/hi";
import NavLinkComponent from "./NavLink";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import MobileNav from "./MobileNav";
import { useAppContext } from "../context";

export default function Navigation() {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState<boolean>(false);
  const { setIsAdmin } = useAppContext();

  return (
    <div className="h-[7vh] bg-gray-800 text-white flex items-center px-5">
      <div className="flex items-center h-full justify-between w-full">
        <div className="flex gap-2 items-center">
          <img src="/volunteer_white.svg" className="h-10 w-10 " alt="logo" />
          <NavLink
            to="/"
            className="sm:hidden font-semibold lg:inline lg:text-xl"
          >
            Volunteer HQ
          </NavLink>
        </div>
        <HiOutlineViewList
          size={40}
          className="sm:hidden hover:bg-yellow-500 cursor-pointer rounded-full w-14 h-14 p-2 "
          onClick={() => setMobileNavIsOpen((state) => !state)}
        />
        <MobileNav
          mobileNavIsOpen={mobileNavIsOpen}
          setMobileNavIsOpen={setMobileNavIsOpen}
        />
        <div className="md:flex h-full items-center hidden sm:flex">
          <NavLinkComponent title="Home" to="/" />
          <NavLinkComponent title="Activities" to="/activities" />
          <NavLinkComponent title="Volunteers" to="/volunteers" />
          <NavLinkComponent title="Associations" to="/associations" />
        </div>
        <div className="rounded-full sm:flex items-center hidden p-3 gap-2 border-2 border-gray-500">
          <p className="font-semibold">Admin</p>
          <Switch
            className="bg-white"
            onChange={() => setIsAdmin((state) => !state)}
          />
        </div>
      </div>
    </div>
  );
}
