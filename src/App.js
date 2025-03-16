import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

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

// ...other imports

const App = () => {
  const { token, login, logout, userId, userName } = useAuth();

  let routes;
  console.log('app.js', userName)

  if (token) {
    routes = (
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/:userId/events" element={<UserEvents />} />
        <Route path="/allevents" element={<AllEvents />} />
        <Route path="/events/new" element={<NewEvent />} />
        <Route path="/events/new-post" element={<NewPost />} />
        <Route path="/events/:eventId" element={<UpdateEvent />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/allevents" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/allevents" element={<AllEvents />} />
        <Route path="/users" element={<Users />} />
        <Route path="/:userId/events" element={<UserEvents />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/new-password/:token" element={<NewPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/allevents" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        name: userName,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;