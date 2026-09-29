import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { differenceInDays } from 'date-fns';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks';
import axiosInstance from '@/utils/axios';
import DatePickerWithRange from './DatePickerWithRange';

const BookingWidget = ({ place }) => {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [bookingData, setBookingData] = useState({
    noOfGuests: 1,
    name: '',
    phone: '',
  });
  const [redirect, setRedirect] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const { noOfGuests, name, phone } = bookingData;
  const { _id: id, price } = place;

  useEffect(() => {
    if (user) {
      setBookingData((prev) => ({ ...prev, name: user.name }));
    }
  }, [user]);

  const numberOfNights =
    dateRange.from && dateRange.to
      ? differenceInDays(
          new Date(dateRange.to).setHours(0, 0, 0, 0),
          new Date(dateRange.from).setHours(0, 0, 0, 0),
        )
      : 0;

  const handleBookingData = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async () => {
    if (!user) {
      return setRedirect(`/login`);
    }

    if (numberOfNights < 1) {
      return toast.error('Please select valid dates');
    } else if (noOfGuests < 1) {
      return toast.error("No. of guests can't be less than 1");
    } else if (noOfGuests > place.maxGuests) {
      return toast.error(`Allowed max. no. of guests: ${place.maxGuests}`);
    } else if (name.trim() === '') {
      return toast.error("Name can't be empty");
    } else if (phone.trim() === '') {
      return toast.error("Phone can't be empty");
    }

    try {
      setIsLoading(true);
      const response = await axiosInstance.post('/bookings', {
        checkIn: dateRange.from,
        checkOut: dateRange.to,
        noOfGuests,
        name,
        phone,
        place: id,
        price: numberOfNights * price,
      });

      const bookingId = response.data.booking._id;
      setRedirect(`/account/bookings/${bookingId}`);
      toast('Congratulations! Enjoy your trip.');
    } catch (error) {
      toast.error('Something went wrong!');
      console.log('Error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const serviceFee = numberOfNights > 0 ? Math.round(numberOfNights * price * 0.12) : 0;
  const totalPrice = numberOfNights * price + serviceFee;

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Promo Banner */}
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-emerald-600">
              <path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Lower price</h3>
            <p className="text-xs text-gray-500">Your dates are ₹{Math.round(price * 0.1).toLocaleString('en-IN')} less than the avg. nightly rate.</p>
          </div>
        </div>
      </div>

      {/* Booking Widget */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 airbnb-shadow-lg">
        {/* Price */}
        <div className="mb-6 flex items-baseline gap-1.5">
          <span className="text-[22px] font-bold text-gray-900">₹{place.price?.toLocaleString('en-IN')}</span>
          <span className="text-base text-gray-600">night</span>
        </div>
        
        {/* Date & Guest Picker */}
        <div className="mb-4 overflow-hidden rounded-xl border border-gray-400">
          <div className="flex w-full border-b border-gray-400">
            <div className="w-full p-2.5">
              <DatePickerWithRange setDateRange={setDateRange} />
            </div>
          </div>
          <div className="p-3">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Guests</label>
            <input
              type="number"
              name="noOfGuests"
              className="!my-0 mt-0.5 w-full !border-none !p-0 text-sm outline-none focus:!ring-0"
              placeholder={`${place.maxGuests} guest${place.maxGuests !== 1 ? 's' : ''} max`}
              min={1}
              max={place.maxGuests}
              value={noOfGuests}
              onChange={handleBookingData}
            />
          </div>
        </div>

        {/* Guest Info (shown when dates selected) */}
        {numberOfNights > 0 && (
          <div className="mb-4 overflow-hidden rounded-xl border border-gray-400 animate-scale-in">
            <div className="border-b border-gray-300 p-3">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Full name</label>
              <input
                type="text"
                name="name"
                className="!my-0 mt-0.5 w-full !border-none !p-0 text-sm outline-none focus:!ring-0"
                placeholder="Enter your name"
                value={name}
                onChange={handleBookingData}
              />
            </div>
            <div className="p-3">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Phone number</label>
              <input
                type="tel"
                name="phone"
                className="!my-0 mt-0.5 w-full !border-none !p-0 text-sm outline-none focus:!ring-0"
                placeholder="Enter your phone number"
                value={phone}
                onChange={handleBookingData}
              />
            </div>
          </div>
        )}

        {/* Reserve Button */}
        <button
          onClick={handleBooking}
          disabled={isLoading}
          className="w-full rounded-lg py-3.5 text-base font-bold text-white transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(to right, #E61E4D, #E31C5F, #D70466)' }}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Reserving...
            </span>
          ) : (
            'Reserve'
          )}
        </button>

        <p className="mt-3 text-center text-sm text-gray-500">
          You won't be charged yet
        </p>

        {/* Price Breakdown */}
        {numberOfNights > 0 && (
          <div className="mt-5 space-y-3 pt-5 border-t border-gray-200 animate-fade-in">
            <div className="flex justify-between text-sm text-gray-700">
              <span className="underline underline-offset-2 decoration-gray-400">₹{place.price?.toLocaleString('en-IN')} × {numberOfNights} night{numberOfNights !== 1 ? 's' : ''}</span>
              <span>₹{(numberOfNights * place.price)?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span className="underline underline-offset-2 decoration-gray-400">Airbnb service fee</span>
              <span>₹{serviceFee?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-4 text-base font-semibold text-gray-900">
              <span>Total before taxes</span>
              <span>₹{totalPrice?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingWidget;
