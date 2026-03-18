import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col self-center h-full mx-auto justify-center text-center max-w-md p-8">
      <h1 className="text-9xl font-bold text-blue-500 animate-bounce">404</h1>
      <h2 className="text-2xl font-medium mt-4">This page doesnt exist</h2>

      <Link
        href="/"
        className="mt-6 px-4 py-3 text-white bg-black rounded-md w-fit mx-auto font-medium text-sm"
      >
        Go Home
      </Link>
    </div>
  );
}
