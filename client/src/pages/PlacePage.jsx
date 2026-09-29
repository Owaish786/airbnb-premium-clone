import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '@/utils/axios';
import Spinner from '@/components/ui/Spinner';
import PlaceGallery from '@/components/ui/PlaceGallery';
import BookingWidget from '@/components/ui/BookingWidget';

// Fallback mock data keyed by ID
const MOCK_PLACES = {
  'mock-1': {
    _id: 'mock-1',
    title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
    address: 'Candolim, Goa, India',
    photos: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
    ],
    description: 'Welcome to our exquisite 1BHK apartment featuring a private jacuzzi, located in the heart of Candolim, Goa. This beautifully designed space offers modern amenities, stylish interiors, and a relaxing atmosphere perfect for couples and solo travelers.\n\nThe apartment features a spacious bedroom with a king-size bed, a fully equipped kitchen, a cozy living area, and a stunning private jacuzzi on the balcony overlooking lush greenery.',
    extraInfo: 'Check-in: 2:00 PM\nCheck-out: 11:00 AM\nNo smoking inside the apartment.\nNo parties or loud music after 10 PM.\nPets are not allowed.',
    maxGuests: 4,
    price: 5000,
    perks: ['wifi', 'parking', 'tv', 'entrance'],
  },
  'mock-2': {
    _id: 'mock-2',
    title: 'Luxury Villa with Private Pool in Baga',
    address: 'Baga, Goa, India',
    photos: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop',
    ],
    description: 'Experience the ultimate luxury at this stunning 3-bedroom villa featuring a private infinity pool, panoramic ocean views, and world-class amenities.',
    extraInfo: 'Private pool available 24/7.\nComplimentary breakfast included.\nAirport transfers can be arranged.',
    maxGuests: 8,
    price: 15000,
    perks: ['wifi', 'parking', 'tv', 'pets', 'entrance'],
  },
  'mock-3': {
    _id: 'mock-3',
    title: 'Cozy Beachfront Studio in Anjuna',
    address: 'Anjuna, Goa, India',
    photos: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
    ],
    description: 'Wake up to the sound of waves at this charming beachfront studio in Anjuna.',
    extraInfo: 'Direct beach access.\nBicycles available for rent.\nWeekly housekeeping included.',
    maxGuests: 2,
    price: 3500,
    perks: ['wifi', 'tv', 'entrance'],
  },
  'mock-4': {
    _id: 'mock-4',
    title: 'Heritage Boutique Stay in Panjim',
    address: 'Panjim, Goa, India',
    photos: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop',
    ],
    description: 'Step into history at this beautifully restored Portuguese heritage home in the Latin Quarter of Panjim.',
    extraInfo: 'Walking distance to Miramar Beach.\nGuided heritage walks available.\nBreakfast included.',
    maxGuests: 6,
    price: 8000,
    perks: ['wifi', 'parking', 'tv', 'entrance'],
  },
  'mock-5': {
    _id: 'mock-5',
    title: 'Treehouse Retreat in Palolem',
    address: 'Palolem, Goa, India',
    photos: [
      'https://images.unsplash.com/photo-1618767689160-da3fb810aad7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop',
    ],
    description: 'Escape to nature in this magical treehouse nestled among coconut palms near Palolem Beach.',
    extraInfo: 'Eco-friendly property.\nYoga sessions available on request.\nOrganic breakfast included.',
    maxGuests: 2,
    price: 4500,
    perks: ['wifi', 'entrance'],
  },
  'mock-6': {
    _id: 'mock-6',
    title: 'Modern Apartment with Sea View in Calangute',
    address: 'Calangute, Goa, India',
    photos: [
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop',
    ],
    description: 'Enjoy stunning Arabian Sea views from this modern 2BHK apartment in Calangute.',
    extraInfo: 'Swimming pool access included.\n24/7 security.\nFree parking available.',
    maxGuests: 5,
    price: 6500,
    perks: ['wifi', 'parking', 'tv', 'entrance'],
  },
  'mock-7': {
    _id: 'mock-7',
    title: 'Charming Cottage near Vagator Beach',
    address: 'Vagator, Goa, India',
    photos: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
    ],
    description: 'A charming stone cottage surrounded by tropical gardens, just a 5-minute walk from Vagator Beach.',
    extraInfo: 'Scooter rental available.\nBBQ facilities on request.\nLate checkout subject to availability.',
    maxGuests: 3,
    price: 4000,
    perks: ['wifi', 'parking', 'pets', 'entrance'],
  },
  'mock-8': {
    _id: 'mock-8',
    title: 'Penthouse Suite with Rooftop Terrace',
    address: 'Morjim, Goa, India',
    photos: [
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&h=600&fit=crop',
    ],
    description: 'Live the high life in this spectacular penthouse suite featuring a private rooftop terrace with a plunge pool.',
    extraInfo: 'Private rooftop plunge pool.\nIn-house chef available on request.\nAirport pickup included.',
    maxGuests: 6,
    price: 20000,
    perks: ['wifi', 'parking', 'tv', 'entrance'],
  },
};

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    const getPlace = async () => {
      try {
        const { data } = await axiosInstance.get(`/places/${id}`);
        setPlace(data.place);
      } catch (err) {
        console.error("Backend unreachable, using mock data for place");
        // Try to find in mock data
        if (MOCK_PLACES[id]) {
          setPlace(MOCK_PLACES[id]);
        } else {
          // Generic fallback
          setPlace(MOCK_PLACES['mock-1']);
        }
      } finally {
        setLoading(false);
      }
    };
    getPlace();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!place) {
    return null;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 font-sans text-gray-900 animate-fade-in">
      {/* Title & Actions */}
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-[26px] font-semibold leading-tight tracking-tight">{place.title}</h1>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 text-sm">
            <div className="flex items-center gap-1 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
              <span>4.92</span>
            </div>
            <span className="text-gray-400">·</span>
            <span className="font-medium underline underline-offset-2">128 reviews</span>
            <span className="text-gray-400">·</span>
            <span className="font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="inline h-3.5 w-3.5 mr-0.5 -mt-0.5">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              <span className="underline underline-offset-2">{place.address}</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0 mt-2 md:mt-0">
          <button className="flex items-center gap-1.5 rounded-lg py-2 px-3 text-sm font-medium transition-colors hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <span className="underline underline-offset-2">Share</span>
          </button>
          <button className="flex items-center gap-1.5 rounded-lg py-2 px-3 text-sm font-medium transition-colors hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <span className="underline underline-offset-2">Save</span>
          </button>
        </div>
      </div>

      {/* Gallery */}
      <PlaceGallery place={place} />

      {/* Content Grid */}
      <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-[1fr_380px]">
        {/* Left Column */}
        <div>
          {/* Host & Room Info */}
          <div className="border-b border-gray-200 pb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[22px] font-semibold">
                  Entire place in {place.address?.split(',')[0] || 'Goa'}
                </h2>
                <div className="mt-1 flex items-center gap-1 text-[15px] text-gray-600">
                  <span>{place.maxGuests} guest{place.maxGuests !== 1 ? 's' : ''}</span>
                  <span>·</span>
                  <span>1 bedroom</span>
                  <span>·</span>
                  <span>1 bed</span>
                  <span>·</span>
                  <span>1 bathroom</span>
                </div>
              </div>
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-lg">
                R
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="border-b border-gray-200 py-8 space-y-6">
            <div className="flex gap-5">
              <div className="shrink-0 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.181.588l1.22 5.378c.11.487-.417.876-.84.62L12 17.652a.563.563 0 00-.584 0L6.89 20.573c-.424.257-.95-.133-.84-.621l1.22-5.378a.563.563 0 00-.181-.588L2.885 10.386c-.38-.325-.178-.948.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Superhost</h3>
                <p className="text-gray-500 text-sm mt-0.5">Superhosts are experienced, highly rated hosts committed to providing great stays.</p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="shrink-0 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Self check-in</h3>
                <p className="text-gray-500 text-sm mt-0.5">Check yourself in with the lockbox.</p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="shrink-0 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Free cancellation for 48 hours</h3>
                <p className="text-gray-500 text-sm mt-0.5">Get a full refund if you change your mind.</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-b border-gray-200 py-8">
            <div className="whitespace-pre-wrap text-[15px] text-gray-700 leading-relaxed">
              {place.description}
            </div>
          </div>

          {/* What this place offers */}
          {place.perks && place.perks.length > 0 && (
            <div className="border-b border-gray-200 py-8">
              <h2 className="mb-6 text-[22px] font-semibold">What this place offers</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {place.perks.includes('wifi') && (
                  <div className="flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                    </svg>
                    <span className="text-[15px]">Wifi</span>
                  </div>
                )}
                {place.perks.includes('parking') && (
                  <div className="flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                    <span className="text-[15px]">Free parking on premises</span>
                  </div>
                )}
                {place.perks.includes('tv') && (
                  <div className="flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <span className="text-[15px]">TV</span>
                  </div>
                )}
                {place.perks.includes('pets') && (
                  <div className="flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                    </svg>
                    <span className="text-[15px]">Pets allowed</span>
                  </div>
                )}
                {(place.perks.includes('entrance') || place.perks.includes('enterence')) && (
                  <div className="flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    <span className="text-[15px]">Private entrance</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Extra Info / Things to know */}
          {place.extraInfo && (
            <div className="py-8">
              <h2 className="mb-4 text-[22px] font-semibold">Things to know</h2>
              <div className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                {place.extraInfo}
              </div>
            </div>
          )}
        </div>

        {/* Right Column — Booking Widget */}
        <div className="relative">
          <div className="sticky top-24">
            <BookingWidget place={place} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
