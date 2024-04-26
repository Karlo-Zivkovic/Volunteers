import { NavLink } from "react-router-dom";

interface NavLinkComponentProps {
  title: string;
  to: string;
}

export default function NavLinkComponent({ title, to }: NavLinkComponentProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        `text-sm md:text-base font-semibold hover:bg-yellow-500 px-4 h-full transition-all flex items-center xl:px-8 xl:text-lg 2xl:px-12  ${
          isActive ? "bg-yellow-500 " : ""
        }`
      }
      to={to}
    >
      {title}
    </NavLink>
  );
}
