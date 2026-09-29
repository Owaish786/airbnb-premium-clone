import React, { useState, useEffect } from 'react';
import Lightbox from './Lightbox';

const PlaceGallery = ({ place }) => {
  const [mode, setMode] = useState('gallery'); // 'gallery', 'tour', 'lightbox'
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Close tour/lightbox on escape key if in tour mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mode === 'tour') setMode('gallery');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode]);

  const openLightbox = (index) => {
    setActivePhotoIndex(index);
    setMode('lightbox');
  };

  const openTour = () => setMode('tour');

  if (mode === 'lightbox') {
    return (
      <Lightbox
        photos={place?.photos || []}
        initialIndex={activePhotoIndex}
        onClose={() => setMode('tour')}
      />
    );
  }

  if (mode === 'tour') {
    return (
      <div className="fixed inset-0 z-40 overflow-y-auto bg-white">
        <div className="sticky top-0 z-10 flex items-center bg-white p-4 pb-2">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition"
            onClick={() => setMode('gallery')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M15.28 5.22a.75.75 0 010 1.06L9.56 12l5.72 5.72a.75.75 0 01-1.06 1.06l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-4">
          <h2 className="mb-8 text-2xl font-semibold">Photo Tour</h2>
          <div className="flex flex-col gap-8">
            {place?.photos?.map((photo, index) => (
              <div key={index} className="flex flex-col gap-2">
                <img
                  onClick={() => openLightbox(index)}
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full cursor-pointer object-cover hover:opacity-90 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const photos = place?.photos || [];
  if (photos.length === 0) return null;

  return (
    <div className="relative mt-6">
      {/* Grid for desktop */}
      <div className="hidden h-[400px] grid-cols-4 gap-2 overflow-hidden rounded-xl md:grid">
        {/* Main Photo */}
        <div className="col-span-2 overflow-hidden relative group">
          <img
            onClick={() => openLightbox(0)}
            className="h-full w-full cursor-pointer object-cover transition duration-300 group-hover:brightness-90"
            src={photos[0]}
            alt=""
          />
        </div>
        {/* Secondary Photos */}
        <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-2">
          {photos.slice(1, 5).map((photo, index) => (
            <div key={index} className="overflow-hidden relative group">
              <img
                onClick={() => openLightbox(index + 1)}
                className="h-full w-full cursor-pointer object-cover transition duration-300 group-hover:brightness-90"
                src={photo}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile view */}
      <div className="flex overflow-hidden rounded-xl md:hidden h-[300px]">
        <img
          onClick={() => openLightbox(0)}
          className="h-full w-full cursor-pointer object-cover"
          src={photos[0]}
          alt=""
        />
      </div>

      <button
        className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg border border-black bg-white px-4 py-1.5 text-sm font-semibold shadow-sm transition hover:bg-gray-100"
        onClick={openTour}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm2.25 0a.75.75 0 01.75-.75h12a.75.75 0 01.75.75v12a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V6zM6 8.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm10.125-1.06a.75.75 0 00-1.06-1.06l-4.5 4.5a.75.75 0 000 1.06l1.5 1.5-3.03 3.03a.75.75 0 001.06 1.06l3.03-3.03 1.5 1.5a.75.75 0 001.06 0l4.5-4.5z"
            clipRule="evenodd"
          />
        </svg>
        Show all photos
      </button>
    </div>
  );
};

export default PlaceGallery;
