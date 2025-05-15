import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteEvent, fetchEvent, queryClient } from '../../utils/https.ts';
import ErrorBlock from '../UI/ErrorBlock.tsx';
import { useState } from 'react';
import Modal from '../UI/Modal.tsx';

interface EventDetails {
  id: string;
  title: string;
  description?: string;
  location: string;
  date: string;
  time?: string;
  image: string;
}

const URL = 'http://localhost:3000/';

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);
  const eventID = useParams().id;
  const navigate = useNavigate();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['event', eventID],
    queryFn: ({ signal }) => fetchEvent({ id: eventID!, signal }),
    staleTime: 5000,
    // gcTime: 1000
  });

  const { mutate, isPending: IsPendingDeletion, isError: IsErrorDeleting, error: deleteError } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'], refetchType: 'none' });
      navigate('/events');
    },
  });

  const { title, description, location, date, time, image }: EventDetails = data || {};

  const imageUrl = `${URL}${image}`;

  function handleStartDelete() {

    setIsDeleting(true);
  }
  function handleStopDelete() {
    setIsDeleting(false);
  }

  async function handleDelete() {
    if (eventID) {
      mutate(eventID);
    }
  }
  let content;


  if (isPending) {
    content = (
      <div id="event-details-content" className="center">
        <p>Fetching event data...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            'Failed to fetch event data, please try again later.'
          }
        />
      </div>
    );
  }

  if (data) {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    content = (
      <>
        <header>
          <h1>{title}</h1>
          <nav>
            <button onClick={handleDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={imageUrl} alt={title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {time}
              </time>
            </div>
            <p id="event-details-description">{description}</p>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this event?</p>
          <div className='form-actions'>
            {IsPendingDeletion && <p>Deleting...</p>}
            {!IsPendingDeletion && (
              <>
                <button onClick={handleStopDelete} className='button'>Cancel</button>
                <button onClick={handleStartDelete} className='button-text'>Delete</button>
              </>
            )}

          </div>
          {IsErrorDeleting && (
            <ErrorBlock
              title="Failed to delete event"
              message={
                deleteError.info?.message ||
                'Failed to delete event, please try again later.'
              }
            />
          )}
        </Modal >

      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
