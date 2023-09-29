import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
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

export const App = () => {
  const { login, leave, token, user } = useAuth();
  const isLogin = !!token;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="events/*" element={<EventsPage />} />
          <Route path="artists/*" element={<ArtistsPage />} />
        </Route>
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="*" element={<ErrorPage />} />
      </>
    )
  );

  return (
    // <BrowserRouter>
    <AuthContext.Provider value={{ login, leave, token, user, isLogin }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
    // </BrowserRouter>
  );
};
