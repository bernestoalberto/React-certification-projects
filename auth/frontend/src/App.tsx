
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditEventPage from './pages/EditEvent.tsx';
import ErrorPage from './pages/Error.tsx';
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail.tsx';
import EventsPage, { loader as eventsLoader } from './pages/Events.tsx';
import EventsRootLayout from './pages/EventsRoot.tsx';
import HomePage from './pages/Home.tsx';
import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root.tsx';
import { action as manipulateEventAction } from './components/EventForm.tsx';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter.tsx';
import AuthenticationPage, { action as authAction } from './pages/Authentication.tsx';
import { action as logoutAction } from './pages/Logout.tsx';
import { checkAuthLoader, tokenLoader } from './util/auth.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    id: 'root',
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                loader: checkAuthLoader,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            loader: checkAuthLoader,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction
      },
      {
        path: 'logout',

        action: logoutAction
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
