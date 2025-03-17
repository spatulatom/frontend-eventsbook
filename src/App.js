import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet
} from 'react-router-dom';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

// ...your imports...
import Reset from './user/pages/Reset';
import NewPassword from './user/pages/NewPassword';
import Users from './user/pages/Users';
import NewEvent from './events/pages/NewEvent';
import UserEvents from './events/pages/UserEvents';
import UpdateEvent from './events/pages/UpdateEvent';
import AllEvents from './events/pages/AllEvents';
// import Welcome from './user/pages/WelcomePage';
import NewPost from './events/pages/NewPost';
import About from './user/pages/About';
import Login from './user/pages/Login';
import MainNavigation from './shared/components/Navigation/MainNavigation';
// import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';


const App = () => {
  const { token, login, logout, userId, userName } = useAuth();

  // Create a layout component with navigation
  const Root = () => {
    return (
      <>
        <MainNavigation />
        <main>
          <Outlet />
        </main>
      </>
    );
  };

  // Define routes based on authentication
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: token ? [
        // Authenticated routes
        { path: "users", element: <Users /> },
        { path: ":userId/events", element: <UserEvents /> },
        { path: "allevents", element: <AllEvents /> },
        { path: "events/new", element: <NewEvent /> },
        { path: "events/new-post", element: <NewPost /> },
        { path: "events/:eventId", element: <UpdateEvent /> },
        { path: "about", element: <About /> },
        { path: "*", element: <Navigate to="/allevents" /> },
        { index: true, element: <Navigate to="/allevents" /> }
      ] : [
        // Non-authenticated routes
        { path: "allevents", element: <AllEvents /> },
        { path: "users", element: <Users /> },
        { path: ":userId/events", element: <UserEvents /> },
        { path: "auth", element: <Login /> },
        { path: "reset", element: <Reset /> },
        { path: "new-password/:token", element: <NewPassword /> },
        { path: "login", element: <Login /> },
        { path: "*", element: <Navigate to="/allevents" /> },
        { index: true, element: <Navigate to="/allevents" /> }
      ]
    }
  ]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        userId,
        name: userName,
        login,
        logout
      }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;