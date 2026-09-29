import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AccountNav from '@/components/ui/AccountNav';
import PlaceImg from '@/components/ui/PlaceImg';
import BookingDates from '@/components/ui/BookingDates';
import Spinner from '@/components/ui/Spinner';
import axiosInstance from '@/utils/axios';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const { data } = await axiosInstance.get('/bookings');
        setBookings(data.booking);
        setLoading(false);
      } catch (error) {
        console.log('Error: ', error);
        setLoading(false);
      }
    };
    getBookings();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col items-center">
      <AccountNav />
      <div className="w-full max-w-4xl px-4">
        {bookings?.length > 0 ? (
          <div className="stagger-children space-y-4">
            {bookings.map((booking) => (
              <Link
                to={`/account/bookings/${booking._id}`}
                className="flex h-32 gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-200 hover:shadow-md hover:border-gray-300 md:h-40"
                key={booking._id}
              >
                <div className="w-32 shrink-0 overflow-hidden md:w-48">
                  {booking?.place?.photos[0] && (
                    <PlaceImg
                      place={booking?.place}
                      className={'h-full w-full object-cover'}
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center py-3 pr-4">
                  <h2 className="font-semibold text-gray-900 text-base md:text-lg line-clamp-1">{booking?.place?.title}</h2>
                  <BookingDates
                    booking={booking}
                    className="mt-2 hidden items-center text-sm text-gray-500 md:flex"
                  />
                  <div className="mt-2 flex items-center gap-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    <span className="text-base font-semibold text-gray-900 md:text-lg">
                      ₹{booking.price?.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-gray-500">total</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="animate-fade-in">
            <h1 className="mb-4 text-2xl font-semibold text-gray-900">Trips</h1>
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col items-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  No trips booked... yet!
                </h3>
                <p className="mt-1 text-gray-500 text-[15px]">
                  Time to dust off your bags and start planning your next adventure.
                </p>
                <Link to="/" className="mt-5">
                  <div className="rounded-lg border-2 border-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white">
                    Start searching
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
