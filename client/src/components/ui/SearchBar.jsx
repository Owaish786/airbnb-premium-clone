import React, { useState } from 'react';

import axiosInstance from '@/utils/axios';
import { usePlaces } from '../../../hooks';

const SearchBar = () => {
  const Places = usePlaces();
  const { setPlaces, setLoading } = Places;

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = async (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    const query = e.target.value.trimStart();
    if (query !== '') {
      setSearchTimeout(
        setTimeout(async () => {
          try {
            setLoading(true);
            const { data } = await axiosInstance.get(
              `/places/search/${query}`,
            );
            setPlaces(data);
          } catch (error) {
            console.error('Search failed, backend may be down:', error);
            // Don't clear the current places on search failure
          } finally {
            setLoading(false);
          }
        }, 500),
      );
    }
  };

  return (
    <div
      className={`hidden md:flex items-center w-full max-w-md mx-4 rounded-full border transition-all duration-300 ${
        isFocused
          ? 'border-gray-400 shadow-lg'
          : 'border-gray-300 shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex items-center w-full">
        <div className="flex-1 px-1">
          <input
            type="search"
            placeholder="Search destinations"
            className="!my-0 h-full w-full !rounded-full !border-none bg-transparent py-3 px-5 text-sm font-medium focus:!ring-0 placeholder:text-gray-500 placeholder:font-normal"
            onChange={(e) => handleSearch(e)}
            value={searchText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
        <button
          className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-105 active:scale-95"
          style={{ background: 'linear-gradient(to right, #E61E4D, #E31C5F, #D70466)' }}
          onClick={handleSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-3.5 w-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
