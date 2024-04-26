import { FaGithub } from "react-icons/fa6";

export default function Author() {
  return (
    <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-10 py-10 bg-orange-100 px-10 md:px-10 xl:px-32">
      <div>
        <img
          src="profile_image.jpg"
          alt="author's picture"
          className="h-[30rem] md:h-[40rem] w-[15rem] md:w-[25rem] object-cover  border border-stone-500 p-2"
        />
      </div>
      <div className="py-5 text-slate-800 sm:px-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
          Author
        </h2>
        <ul className="text-sm md:text-base lg:text-lg font-medium md:pt-10 pt-2 tracking-wide leading-10 list-disc">
          <li>Karlo Zivkovic - Front-end Developer based in Split, Croatia.</li>
          <li className="mt-4">
            I'm passionate about front-end development and constantly striving
            to improve my skills.
          </li>
          <li className="mt-4">
            I'm actively seeking opportunities in the field of front-end
            development to apply my skills and knowledge.
          </li>
          <li className="mt-4">
            I dedicate my free time to learning new technologies and staying
            up-to-date with the latest trends in web development.
          </li>
          <li className="mt-4">
            I believe in the power of continuous learning and growth, and I'm
            excited to contribute to innovative projects in the industry.
          </li>
        </ul>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Karlo-Zivkovic"
          className="text-xl font-medium pt-10 tracking-wide leading-10 list-disc flex items-center gap-4 hover:underline"
        >
          Check out my projects on GitHub
          <FaGithub size={50} />
        </a>
      </div>
    </div>
  );
}
