import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { AuthContext } from "./core/context/AuthContext";
import { useAuth } from "./core/hooks/useAuth";

import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { Layout } from "./pages/Layout/Layout";
import { HomePage } from "./pages/HomePage/HomePage";
import { SignInPage } from "./pages/SignInPage/SignInPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { EventsPage } from "./pages/EventsPage/EventsPage";
import { ArtistsPage } from "./pages/ArtistsPage/ArtistsPage";
import { EventsListPage } from "./pages/EventsPage/EventsListPage/EventsListPage";
import { EventPage } from "./pages/EventsPage/EventPage/EventPage";
import { EditEventPage } from "./pages/EventsPage/EditEventPage/EditEventPage";
import { AddEventPage } from "./pages/EventsPage/AddEventPage/AddEventPage";
import { ArtistsListPage } from "./pages/ArtistsPage/ArtistsListPage/ArtistsListPage";
import { ArtistPage } from "./pages/ArtistsPage/ArtistPage/ArtistPage";
import { EditArtistPage } from "./pages/ArtistsPage/EditArtistPage/EditArtistPage";
import { AddArtistPage } from "./pages/ArtistsPage/AddArtistPage/AddArtistPage";
import { RequireIsAdmin } from "./hoc/RequireIsAdmin";

import { SubscriptionsPage } from "./pages/SubscriptionsPage/SubscriptionsPage";

export const App = () => {
  const { login, leave, token, user } = useAuth();
  const isLogin = !!token;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="events/*" element={<EventsPage />}>
            <Route index element={<EventsListPage />} />
            <Route path=":eventId" element={<EventPage />} />
            <Route
              path=":eventId/edit"
              element={
                <RequireIsAdmin>
                  <EditEventPage />
                </RequireIsAdmin>
              }
            />
            <Route
              path="add"
              element={
                <RequireIsAdmin>
                  <AddEventPage />
                </RequireIsAdmin>
              }
            />
          </Route>
          <Route path="artists/*" element={<ArtistsPage />}>
            <Route index element={<ArtistsListPage />} />
            <Route path=":artistId" element={<ArtistPage />} />
            <Route
              path=":artistId/edit"
              element={
                <RequireIsAdmin>
                  <EditArtistPage />
                </RequireIsAdmin>
              }
            />
            <Route
              path="add"
              element={
                <RequireIsAdmin>
                  <AddArtistPage />
                </RequireIsAdmin>
              }
            />
          </Route>
          <Route path="subscriptions" element={<SubscriptionsPage />} />
        </Route>
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="*" element={<ErrorPage />} />
      </>
    )
  );

  return (
    <AuthContext.Provider value={{ login, leave, token, user, isLogin }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};
