import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AccountNav from '../components/ui/AccountNav';
import AddressLink from '../components/ui/AddressLink';
import BookingDates from '../components/ui/BookingDates';
import PlaceGallery from '../components/ui/PlaceGallery';
import Spinner from '../components/ui/Spinner';
import axiosInstance from '../utils/axios';

const SingleBookedPlace = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const [loading, setLoading] = useState(false);

  const getBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/bookings');

      // filter the data to get current booking
      const filteredBooking = data.booking.filter(
        (booking) => booking._id === id,
      );

      setBooking(filteredBooking[0]);
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <AccountNav />
      {booking?.place ? (
        <div className="mx-auto max-w-4xl px-6 pb-12 animate-fade-in">
          <h1 className="text-2xl font-semibold text-gray-900">{booking?.place?.title}</h1>

          <AddressLink
            className="mt-1 block"
            placeAddress={booking.place?.address}
          />

          {/* Booking Info Card */}
          <div className="my-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:gap-0">
            <div>
              <h2 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">
                Your booking information
              </h2>
              <BookingDates booking={booking} />
            </div>
            <div className="w-full rounded-xl p-5 text-white sm:mt-0 sm:w-auto"
              style={{ background: 'linear-gradient(to right, #E61E4D, #E31C5F, #D70466)' }}
            >
              <div className="text-sm font-medium opacity-90">Total price</div>
              <div className="flex justify-center text-3xl font-bold mt-1">
                <span>₹{booking?.price?.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <PlaceGallery place={booking?.place} />
        </div>
      ) : (
        <div className="flex flex-col items-center py-16 animate-fade-in">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No booking data found</h3>
          <p className="mt-1 text-sm text-gray-500">This booking may not exist or has been removed.</p>
        </div>
      )}
    </div>
  );
};

export default SingleBookedPlace;
