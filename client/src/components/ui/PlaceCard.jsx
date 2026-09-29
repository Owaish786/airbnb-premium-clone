import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PlaceCard = ({ place }) => {
  const { _id: placeId, photos, address, title, price } = place;
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const nextPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (photos && currentPhoto < photos.length - 1) {
      setCurrentPhoto(currentPhoto + 1);
    }
  };

  const prevPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentPhoto > 0) {
      setCurrentPhoto(currentPhoto - 1);
    }
  };

  return (
    <Link to={`/place/${placeId}`} className="group flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
        {/* Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton" />
        )}

        {/* Main Image */}
        {photos?.[currentPhoto] && (
          <img
            src={photos[currentPhoto]}
            alt={title}
            className={`h-full w-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        )}

        {/* Heart / Favourite Button */}
        <button
          onClick={handleLike}
          className="absolute top-3 right-3 z-10 transition-transform duration-200 hover:scale-110 active:scale-90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`h-6 w-6 drop-shadow-md transition-colors duration-200 ${
              isLiked ? 'fill-rose-500 stroke-rose-500' : 'fill-black/30 stroke-white'
            }`}
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        {/* Navigation Arrows — only show on hover when multiple photos */}
        {photos && photos.length > 1 && (
          <>
            {currentPhoto > 0 && (
              <button
                onClick={prevPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-md transition-all duration-200 hover:bg-white hover:scale-110 group-hover:opacity-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3 w-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
            )}
            {currentPhoto < photos.length - 1 && (
              <button
                onClick={nextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-md transition-all duration-200 hover:bg-white hover:scale-110 group-hover:opacity-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3 w-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            )}

            {/* Dots Indicator */}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
              {photos.slice(0, 5).map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                    index === currentPhoto
                      ? 'bg-white scale-110'
                      : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Info */}
      <div className="mt-3">
        <div className="flex items-start justify-between gap-1">
          <h2 className="font-semibold text-[15px] text-gray-900 truncate">{address}</h2>
          <div className="flex items-center gap-0.5 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">4.9</span>
          </div>
        </div>
        <h3 className="truncate text-sm text-gray-500 mt-0.5">{title}</h3>
        <div className="mt-1.5">
          <span className="font-semibold">₹{price?.toLocaleString('en-IN')}</span>
          <span className="text-gray-600"> night</span>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
