import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 pt-16">
      <div className="text-center animate-fade-in-up">
        {/* Large 404 */}
        <div className="mb-6">
          <span className="text-8xl font-extrabold tracking-tight" style={{ background: 'linear-gradient(to right, #E61E4D, #E31C5F, #D70466)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            404
          </span>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
          We can&apos;t seem to find the page you&apos;re looking for
        </h1>
        <p className="mt-3 text-base text-gray-500 max-w-md mx-auto">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: 'linear-gradient(to right, #E61E4D, #E31C5F, #D70466)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
