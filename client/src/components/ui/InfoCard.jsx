import React from 'react';
import { Link } from 'react-router-dom';
import PlaceImg from './PlaceImg';

const InfoCard = ({ place }) => {
  return (
    <Link
      to={`/account/places/${place._id}`}
      className="flex cursor-pointer flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:shadow-md hover:border-gray-300 md:flex-row"
      key={place._id}
    >
      <div className="flex w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-32 sm:w-40">
        <PlaceImg place={place} />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-lg font-semibold text-gray-900 md:text-xl">{place.title}</h2>
        <p className="line-clamp-2 mt-1.5 text-sm text-gray-500 leading-relaxed">{place.description}</p>
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
          <span className="font-semibold text-gray-900">₹{place.price?.toLocaleString('en-IN')}</span>
          <span>/ night</span>
          <span className="text-gray-300">·</span>
          <span>{place.maxGuests} guest{place.maxGuests !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </Link>
  );
};

export default InfoCard;
