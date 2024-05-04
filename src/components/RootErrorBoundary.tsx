import { useRouteError } from "react-router-dom";

export default function RootErrorBoundary() {
  const error  = useRouteError() as { error: { message:string } }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Uh oh, something went terribly wrong 😩
        </h1>
        <p className="text-red-700 mb-4 text-center">{error.error.message}</p>
        <div className="text-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Click here to reload the app
          </button>
        </div>
      </div>
    </div>
  );
}
