import { usePlaces } from '../../hooks';
import Spinner from '@/components/ui/Spinner';
import PlaceCard from '@/components/ui/PlaceCard';

const IndexPage = () => {
  const allPlaces = usePlaces();
  const { places, loading } = allPlaces;

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="px-6 pt-24 pb-16 md:px-10 lg:px-20">
      {places.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 stagger-children">
          {places.map((place) => (
            <PlaceCard place={place} key={place._id} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">No results found</h1>
          <p className="mt-2 text-base text-gray-500 text-center max-w-md">
            Try adjusting your search or filter to find what you&apos;re looking for.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-white font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: 'linear-gradient(to right, #E61E4D, #E31C5F, #D70466)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Clear search
          </a>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
