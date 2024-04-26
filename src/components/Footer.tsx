import { MdOutlineEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white min-h-[13vh] px-4 md:px-10 text-center md:text-left py-4 flex justify-between items-center flex-col md:flex-row gap-2">
      <div>
        <h2 className="text-xl font-bold">GET IN TOUCH</h2>
        <p className="mt-2 text-sm">
          Join us and be a part of something great!
        </p>
      </div>
      <div className="hover:text-orange-300 flex items-center gap-2 ">
        <MdOutlineEmail size={40} className="text-orange-300 " />
        <p className="text-sm md:text-base lg:text-lg">volunteer@example.com</p>
      </div>
    </footer>
  );
}
