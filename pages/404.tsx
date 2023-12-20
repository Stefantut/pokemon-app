import Link from "next/link";

const NotFound = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-4">
        Sorry, the page you're looking for does not exist.
      </p>
      <Link href="/">
        <span className="text-blue-500 hover:underline">
          Go back to the home page
        </span>
      </Link>
    </div>
  );
};

export default NotFound;
