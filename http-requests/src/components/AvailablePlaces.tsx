import { useState, useEffect } from 'react';
import Places from './Places.tsx';
import ErrorPage from './ErrorPage.tsx';
import { sortPlacesByDistance } from '../loc.ts';

import { fetchAvailablePlaces } from '../http.ts';

export default function AvailablePlaces({ onSelectPlace }: { onSelectPlace: (id: string) => void }) {

  const [availablePlaces, setAvailablePlaces] = useState<Array<any>>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    fetchPlaces();
  }, []);



  async function fetchPlaces() {
    setIsFetching(true);
    console.log('fetching places');
    try {
      const data = await fetchAvailablePlaces();

      navigator.geolocation.getCurrentPosition((position) => {
        const sortedPlaces = sortPlacesByDistance(data, position.coords.latitude, position.coords.longitude);
        setAvailablePlaces(sortedPlaces as any[]);
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong!';
      setError(errorMessage);
    } finally {
      setIsFetching(false);
    }
  }

  if (error) {
    return <ErrorPage title="An Error ocurred!" message={error} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Loading places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}





