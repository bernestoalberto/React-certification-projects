import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.tsx';
import Modal from './components/Modal.tsx';
import DeleteConfirmation from './components/DeleteConfirmation.tsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.tsx';
import { fetchUserPlaces, updateUserPlaces } from './http.ts';
import ErrorPage from './components/ErrorPage.tsx';

function App() {
  const selectedPlace = useRef<any>(null);

  const [userPlaces, setUserPlaces] = useState<any[]>([]);
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState<string | undefined>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | undefined>();


  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch user places.');
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);


  function handleStartRemovePlace(place: any) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace: any) {
    setUserPlaces((prevPickedPlaces: any[]) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place: { id: string }) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces(error instanceof Error
        ? error.message
        : "Failed to update places!");
    }
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );

      try {
        await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );
      } catch (error) {
        setUserPlaces(userPlaces);
        setErrorUpdatingPlaces(error instanceof Error
          ? error.message
          : 'Failed to delete place.')
      }

      setModalIsOpen(false);
    },
    [userPlaces]
  );

  function handleError() {
    setErrorUpdatingPlaces(undefined);
  }
  return (
    <>
      <Modal open={!!errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <ErrorPage
            title="An error occurred!"
            message={errorUpdatingPlaces}
            onConfirm={handleError}
          />
        )}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error && <ErrorPage title="An error occurred!" message={error} />}
        { !error && (
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            isLoading={isFetching}
            loadingText="Fetching your places..."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
      )}
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>

  );
}

export default App;












