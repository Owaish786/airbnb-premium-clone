import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '../../../hooks';
import SearchBar from './SearchBar';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';

export const Header = () => {
  const auth = useAuth();
  const location = useLocation();

  const [showSearchBar, setShowSearchBar] = useState(true);
  const [hasShadow, setHasShadow] = useState(false);
  const { user } = auth;

  const handleScroll = () => {
    const shouldHaveShadow = window.scrollY > 0;
    setHasShadow(shouldHaveShadow);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // hide searchbar based on url
    if (location.pathname === '/') {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
    // clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  return (
    <header
      className={`fixed top-0 z-20 flex w-screen justify-center bg-white transition-shadow duration-300 ${
        hasShadow ? 'shadow-md' : 'border-b border-gray-100'
      }`}
    >
      <div
        className={`flex items-center ${
          showSearchBar ? 'justify-between px-6 md:px-10 lg:px-20' : 'justify-between px-6 md:px-10'
        } w-full max-w-screen-xl py-4`}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group shrink-0">
          <svg
            viewBox="0 0 32 32"
            className="h-8 w-8 transition-transform duration-200 group-hover:scale-105"
            fill="#FF385C"
          >
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.172-.179h-.114l-.084.089-.108.114c-2.019 2.115-4.326 3.622-6.792 3.622C5.377 31 2.5 28.584 2.5 24.522l.005-.469c.026-.928.23-1.768.83-3.244l.216-.524c.966-2.298 5.146-11.02 7.076-14.898L11.249 4.27C12.537 1.963 13.992 1 16 1zm0 2c-1.239 0-2.053.539-2.987 2.21l-.523 1.008c-1.926 3.776-6.06 12.43-7.031 14.692l-.345.836c-.427 1.071-.573 1.655-.605 2.24l-.009.33v.206C4.5 27.395 6.411 29 8.857 29c1.773 0 3.87-1.236 5.831-3.354l.587-.649.56-.642.56.642.587.65c2.082 2.223 4.138 3.353 5.874 3.353 2.37 0 4.143-1.457 4.143-3.478l-.002-.218c-.028-.561-.17-1.12-.522-2.063l-.238-.581c-.964-2.298-5.063-10.937-7.043-14.785l-.562-1.091C17.986 3.539 17.239 3 16 3z"/>
          </svg>
          <span className="hidden text-[22px] font-bold tracking-tight md:block" style={{ color: '#FF385C' }}>
            airbnb
          </span>
        </a>

        {/* Search Bar */}
        {showSearchBar && <SearchBar />}

        {/* User Menu */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to={user ? '/account/places' : '/login'}
            className="hidden md:flex items-center rounded-full px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
          >
            Airbnb your home
          </Link>

          <Link
            to={user ? '/account' : '/login'}
            className="flex items-center gap-3 rounded-full border border-gray-300 py-2 pl-3 pr-2 transition-shadow hover:shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>

            <div className="h-[30px] w-[30px] overflow-hidden rounded-full">
              {user ? (
                <Avatar>
                  {user?.picture ? (
                    <AvatarImage src={user.picture} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-800 text-xs font-bold text-white">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  )}
                </Avatar>
              ) : (
                <svg
                  viewBox="0 0 32 32"
                  className="h-full w-full"
                  fill="#717171"
                >
                  <path d="M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.394 6.394 0 0 1 9.7 14a6.3 6.3 0 0 1 12.6 0 6.394 6.394 0 0 1-2.82 5.49 12.43 12.43 0 0 1 6.45 4.4A12.77 12.77 0 0 1 16 28.7z"/>
                </svg>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
