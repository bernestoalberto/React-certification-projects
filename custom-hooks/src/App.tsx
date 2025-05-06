import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.tsx';
import Modal from './components/Modal.tsx';
import DeleteConfirmation from './components/DeleteConfirmation.tsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.tsx';
import { fetchUserPlaces, updateUserPlaces } from './http.ts';
import Error from './components/Error.tsx';
import { useFetch } from './hooks/useFetch.ts';

interface IError {
  message: string;
}

interface Place {
  id: string;
  title?: string;
  // add other place properties as needed
}

function App() {
  const selectedPlace = useRef<Place | null>(null);


  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState<{ message: string } | null>();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {
    isFetching,
    error,
    fetchedData: userPlaces,
    setFetchedData: setUserPlaces
  } = useFetch(fetchUserPlaces, []);


  function handleStartRemovePlace(place: null) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace: { id: any; }) {
    // await updateUserPlaces([selectedPlace, ...userPlaces]);

    setUserPlaces((prevPickedPlaces: any[]) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place: { id: any; }) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error: IError | any) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error instanceof Error ? error.message : 'Failed to update places.',
      });
    }
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces: any[]) =>
        prevPickedPlaces.filter(
          (place: { id: string; }) => selectedPlace.current && place.id !== selectedPlace.current.id
        ) || []
      );

      try {
        await updateUserPlaces(
          userPlaces.filter((place: { id: string | undefined; }) => place.id !== selectedPlace.current?.id)
        );
      } catch (error: IError | any) {
        setUserPlaces(userPlaces);
        setErrorUpdatingPlaces({
          message: error.message || 'Failed to delete place.',
        });
      }

      setModalIsOpen(false);
    },
    [userPlaces, setUserPlaces]
  );

  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <Error
            title="An error occurred!"
            message={errorUpdatingPlaces.message}
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
        {error && <Error title="An error occurred!" message={error.message} />}
        {!error && (
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
