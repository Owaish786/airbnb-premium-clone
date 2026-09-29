import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-20">
        {/* Links Grid */}
        <div className="grid grid-cols-1 gap-8 py-12 text-sm md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-gray-900">Support</h3>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 hover:underline underline-offset-2">Help Center</a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 hover:underline underline-offset-2">Get help with a safety issue</a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 hover:underline underline-offset-2">AirCover</a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 hover:underline underline-offset-2">Anti-discrimination</a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 hover:underline underline-offset-2">Disability support</a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 hover:underline underline-offset-2">Cancellation options</a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 hover:underline underline-offset-2">Report neighbourhood concern</a>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-gray-900">Hosting</h3>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 hover:underline underline-offset-2">Airbnb your home</a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 hover:underline underline-offset-2">AirCover for Hosts</a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 hover:underline underline-offset-2">Hosting resources</a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 hover:underline underline-offset-2">Community forum</a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 hover:underline underline-offset-2">Hosting responsibly</a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 hover:underline underline-offset-2">Airbnb-friendly apartments</a>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-gray-900">Airbnb</h3>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 hover:underline underline-offset-2">Newsroom</a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 hover:underline underline-offset-2">New features</a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 hover:underline underline-offset-2">Careers</a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 hover:underline underline-offset-2">Investors</a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 hover:underline underline-offset-2">Gift cards</a>
            <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 hover:underline underline-offset-2">Airbnb.org emergency stays</a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 lg:flex-row">
          {/* Copyright & Legal */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600">
            <span>&copy; {new Date().getFullYear()} Airbnb, Inc.</span>
            <span className="hidden lg:inline">·</span>
            <a href="#" className="hover:underline underline-offset-2">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:underline underline-offset-2">Terms</a>
            <span>·</span>
            <a href="#" className="hover:underline underline-offset-2">Sitemap</a>
            <span>·</span>
            <a href="#" className="hover:underline underline-offset-2">Company details</a>
          </div>

          {/* Language & Socials */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              <span>English (IN)</span>
              <span className="mx-1">₹ INR</span>
            </div>
            <div className="flex items-center gap-4">
              {/* Facebook */}
              <a href="#" className="text-gray-700 transition-colors hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              {/* Twitter/X */}
              <a href="#" className="text-gray-700 transition-colors hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-gray-700 transition-colors hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
