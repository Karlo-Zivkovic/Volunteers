import { MdOutlineEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white min-h-[13vh] px-4 md:px-10 text-center md:text-left py-4 flex justify-between items-center flex-col md:flex-row gap-2">
      <img
        src="/volunteer_white.svg"
        className="h-16 w-16 order-1 sm:order-2"
        alt="logo"
      />
      <div className="order-2 sm:order-1">
        <h2 className="text-xl font-bold">GET IN TOUCH</h2>
        <p className="mt-2 text-sm">
          Join us and be a part of something great!
        </p>
      </div>
      <div className="flex items-center gap-2 order-last">
        <MdOutlineEmail size={40} className="text-orange-300" />
        <p className="text-sm md:text-base lg:text-lg">volunteer@example.com</p>
      </div>
    </footer>
  );
}
