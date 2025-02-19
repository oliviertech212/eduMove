// pages/404.tsx
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="mt-2 text-gray-500">
        Oops! This page doesn’t exist.
      </p>
      <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Go Back
      </Link>
    </div>
  );
}
