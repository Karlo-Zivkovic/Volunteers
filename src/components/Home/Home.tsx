import Author from "./Author";
import Welcome from "./Welcome";

export default function Home() {
  return (
    <>
      <div className="w-full">
        <Welcome />
      </div>
      <div className="bg-orange-100 w-full">
        <Author />
      </div>
    </>
  );
}
