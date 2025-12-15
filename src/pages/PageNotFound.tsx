import Logo from '@/components/Logo';
import { Link, useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="fixed top-4 left-4">
        <Logo onClick={() => navigate('/')} />
      </div>

      <div className="w-full max-w-lg rounded-xl py-12 text-center">
        <h1 className="text-brand mb-4 text-6xl font-extrabold lg:text-8xl">
          404
        </h1>

        <h2 className="text-content mb-3 text-2xl font-bold lg:text-3xl">
          Page Not Found
        </h2>

        <p className="text-content-light mdtext-lg mb-8">
          Oops! It looks like the page you were looking for doesn't exist. It
          might have been moved or deleted.
        </p>

        <div className="flex flex-col space-y-4">
          <Link
            to="/"
            className="bg-brand inline-flex items-center justify-center rounded-full border border-transparent px-6 py-3 text-base font-medium tracking-wide text-white shadow-sm"
          >
            Take Me Home
          </Link>
        </div>
      </div>
    </div>
  );
}
