import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { AuthContext } from "./core/context/AuthContext";
import { useAuth } from "./core/hooks/useAuth";

import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { Layout } from "./pages/Layout/Layout";
import { HomePage } from "./pages/HomePage/HomePage";
import { SignInPage } from "./pages/SignInPage/SignInPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { TasksPage } from "./pages/TasksPage/TasksPage";
import { AddTaskPage } from "./pages/TasksPage/AddTaskPage/AddTaskPage";
import { EditTaskPage } from "./pages/TasksPage/EditTaskPage/EditTaskPage";

export const App = () => {
  const { login, leave, token, user } = useAuth();
  const isLogin = !!token;

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ login, leave, token, user, isLogin }}>
        <>
          <Routes>
            <Route
              path="/"
              element={
                !isLogin ? <Navigate to="/signin" replace /> : <Layout />
              }
            >
              <Route index element={<HomePage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/tasks/add" element={<AddTaskPage />} />
              <Route path="/tasks/:id" element={<EditTaskPage />} />
            </Route>
            <Route
              path="/signin"
              element={isLogin ? <Navigate to="/" replace /> : <SignInPage />}
            />
            <Route
              path="/signup"
              element={isLogin ? <Navigate to="/" replace /> : <SignUpPage />}
            />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};
