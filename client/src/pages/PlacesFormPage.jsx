import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '@/utils/axios';

import AccountNav from '@/components/ui/AccountNav';
import Perks from '@/components/ui/Perks';
import PhotosUploader from '@/components/ui/PhotosUploader';
import Spinner from '@/components/ui/Spinner';

const PlacesFormPage = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedPhotos, setAddedPhotos] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    address: '',
    description: '',
    perks: [],
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    maxGuests: 10,
    price: 500,
  });

  const {
    title,
    address,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = formData;

  const isValidPlaceData = () => {
    if (title.trim() === '') {
      toast.error("Title can't be empty!");
      return false;
    } else if (address.trim() === '') {
      toast.error("Address can't be empty!");
      return false;
    } else if (addedPhotos.length < 5) {
      toast.error('Upload at least 5 photos!');
      return false;
    } else if (description.trim() === '') {
      toast.error("Description can't be empty!");
      return false;
    } else if (maxGuests < 1) {
      toast.error('At least one guest is required!');
      return false;
    } else if (maxGuests > 10) {
      toast.error("Max. guests can't be greater than 10");
      return false;
    }

    return true;
  };

  const handleFormData = (e) => {
    const { name, value, type } = e.target;
    // If the input is not a checkbox, update 'formData' directly
    if (type !== 'checkbox') {
      setFormData({ ...formData, [name]: value });
      return;
    }

    // If type is checkbox (perks)
    if (type === 'checkbox') {
      const currentPerks = [...perks];
      let updatedPerks = [];

      // Check if the perk is already in perks array
      if (currentPerks.includes(name)) {
        updatedPerks = currentPerks.filter((perk) => perk !== name);
      } else {
        updatedPerks = [...currentPerks, name];
      }
      setFormData({ ...formData, perks: updatedPerks });
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    axiosInstance.get(`/places/${id}`).then((response) => {
      const { place } = response.data;
      // update the state of formData
      for (let key in formData) {
        if (place.hasOwnProperty(key)) {
          setFormData((prev) => ({
            ...prev,
            [key]: place[key],
          }));
        }
      }

      // update photos state separately
      setAddedPhotos([...place.photos]);

      setLoading(false);
    });
  }, [id]);

  const preInput = (header, description) => {
    return (
      <>
        <h2 className="mt-6 text-lg font-semibold text-gray-900">{header}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </>
    );
  };

  const savePlace = async (e) => {
    e.preventDefault();

    const formDataIsValid = isValidPlaceData();
    const placeData = { ...formData, addedPhotos };

    // Make API call only if formData is valid
    if (formDataIsValid) {
      if (id) {
        // update existing place
        const { data } = await axiosInstance.put('/places/update-place', {
          id,
          ...placeData,
        });
      } else {
        // new place
        const { data } = await axiosInstance.post(
          '/places/add-places',
          placeData,
        );
      }
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={'/account/places'} />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="pb-12">
      <AccountNav />
      <div className="mx-auto max-w-3xl px-6 animate-fade-in">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {id ? 'Edit your place' : 'Add a new place'}
          </h1>
          <p className="text-sm text-gray-500 mb-4">Fill in the details below to list your property.</p>

          <form onSubmit={savePlace}>
            {preInput(
              'Title',
              'A short and catchy title for your listing',
            )}
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleFormData}
              placeholder="e.g. My lovely apartment"
            />

            {preInput('Address', 'Full address of your property')}
            <input
              type="text"
              name="address"
              value={address}
              onChange={handleFormData}
              placeholder="e.g. Candolim, Goa, India"
            />

            {preInput('Photos', 'Add at least 5 photos — the more, the better')}

            <PhotosUploader
              addedPhotos={addedPhotos}
              setAddedPhotos={setAddedPhotos}
            />

            {preInput('Description', 'Tell guests what makes your place special')}
            <textarea
              value={description}
              name="description"
              onChange={handleFormData}
              placeholder="Describe the space, neighbourhood, and what guests can expect..."
            />

            {preInput('Perks', 'Select all the amenities your place offers')}
            <Perks selected={perks} handleFormData={handleFormData} />

            {preInput('Extra info', 'House rules, check-in instructions, etc.')}
            <textarea
              value={extraInfo}
              name="extraInfo"
              onChange={handleFormData}
              placeholder="e.g. No smoking, check-in after 2 PM..."
            />

            {preInput(
              'Guests & Pricing',
              'Set the maximum number of guests and your nightly rate',
            )}
            <div className="mt-2 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">Max guests</label>
                <input
                  type="text"
                  name="maxGuests"
                  value={maxGuests}
                  onChange={handleFormData}
                  placeholder="1"
                  className="!mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">Price per night (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={handleFormData}
                  placeholder="500"
                  className="!mt-1"
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                className="w-full rounded-lg py-3.5 text-base font-bold text-white transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]"
                style={{ background: 'linear-gradient(to right, #E61E4D, #E31C5F, #D70466)' }}
              >
                {id ? 'Save changes' : 'Publish listing'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlacesFormPage;
