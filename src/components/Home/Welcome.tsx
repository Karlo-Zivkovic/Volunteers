import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="max-w-[1400px] mx-auto flex justify-center px-10 md:px-10 xl:px-32 h-content gap-10 py-10 sm:py-20 flex-col md:flex-row-reverse md:justify-between md:gap-4 2xl:justify-center">
      <div className="xl:w-[50rem]">
        <img
          src="https://static.vecteezy.com/system/resources/previews/017/169/355/non_2x/volunteers-needed-volunteering-volunteer-organization-is-recruiting-volunteers-girl-with-a-mouthpiece-says-she-needs-volunteers-vector.jpg"
          alt="Volunteers needed sign"
          className=""
        />
      </div>
      <div className="flex flex-col items-center md:text-start text-stone-900 md:items-start">
        <h1 className="font-bold text-yellow-400 text-5xl md:text-start md:text-6xl xl:text-7xl">
          Volunteers
        </h1>{" "}
        <br />
        <h1 className="text-blue-900 font-bold text-center text-2xl md:text-start md:text-3xl xl:text-5xl">
          Welcome to our <br /> journey!
        </h1>
        <p className="text-blue-900 mt-4 text-center sm:mt-8 md:text-start md:text-base md:w-[20rem] xl:w-[33rem] xl:text-xl">
          At Volunteer HQ, we believe in the power of volunteering to transform
          communities and enrich lives. Whether you're passionate about
          supporting local causes, lending a helping hand to those in need, or
          simply looking to give back to society, you've come to the right
          place.
        </p>
        <Link to='/activities' className="bg-yellow-400 font-semibold px-7 py-4 rounded-lg text-white text-2xl hover:bg-yellow-500 transition-all mt-10">
          Find & Participate
        </Link>
      </div>
    </div>
  );
}
