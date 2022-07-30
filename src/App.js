import React, {Suspense} from 'react';
// react-dom-router has named imports so we have to import multiple 
// specific things by their name (in contrac to for example import
// Rwact from 'react')
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
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
import Welcome from './user/pages/WelcomePage';
import NewPost from './events/pages/NewPost';
import About from './user/pages/About';
import Login from './user/pages/Login';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';




// for example AllPlaces is rendered as first page so tehnically
// we dont need to Reat.lazy. Secondly we import Suspense and
// wrap our rendered lazyly routes in it(MainNavigation we want rendered
// always and from the start so we dont React.lazy it);
// then on Suspense we provide a fallback of what to render if loading jsx
// code takes longer
// const Users = React.lazy(()=>import('./user/pages/Users'));
// const Reset = React.lazy(()=>import('./user/pages/Reset'));
// const NewPassword = React.lazy(()=>import('./user/pages/NewPassword'));
// const NewEvent = React.lazy(()=>import('./events/pages/NewEvent'));
// const UserEvents = React.lazy(()=>import('./events/pages/UserEvents'));
// const UpdateEvent = React.lazy(()=>import('./events/pages/UpdateEvent'));
// const AllEvents = React.lazy(()=>import('./events/pages/AllEvents'));
// const Welcome = React.lazy(()=>import('./user/pages/WelcomePage'));
// const NewPost = React.lazy(()=>import('./events/pages/NewPost'));
// const About = React.lazy(()=>import('./user/pages/About'));
// const Login = React.lazy(()=>import('./user/pages/Login'));


const App = () => {
  const { token, login, logout, userId, userName } = useAuth();

  let routes;
  console.log('app.js', userName)

  if (token) {
    routes = (
      <Switch>
        {/* Switch instructs our Router that whenever it 
        encounter a fitting route it should not evalute there after, 
        as the default behaviour is to do so, we could for example have 
        <footer> after our routes and we would wnt it rendered- that why 
        the default;
        also there shouldnt be nothing betewen Routes and Switch
        like for example React.Fragment*/}
        {/* <Route path="/users" exact>
          <Users />
        </Route> */}
        {/* another way: <Route path="/users" component={Users}/> */}
        
        <Route path="/:userId/events" exact>
          <UserEvents />
        </Route>
        <Route path="/allevents" exact>
          <AllEvents/>
        </Route>
        <Route path="/events/new" exact>
          <NewEvent />
        </Route>
        {/* apparently even with exact the order matters, like the following 
        two routes should not be swapped */}
        <Route path="/events/new-post" exact>
          <NewPost />
        </Route>
        <Route path="/events/:eventId" exact>
          <UpdateEvent />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Redirect to="/allevents" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        {/* <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route> */}
        <Route path="/allevents" exact>
          <AllEvents />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/:userId/events" exact>
          <UserEvents />
        </Route>
        <Route path="/auth" exact>
          <Login/>
        </Route>
        <Route path="/reset" exact>
          <Reset/>
        </Route>
        <Route path="/new-password/:token" exact>
          <NewPassword/>
        </Route>
        <Route path="/login" exact>
          <Login/>
        </Route>
        <Redirect to="/allevents" />
      </Switch>
    );
  }

  return (
    // we wrap the parts of our  application that should be able to use that context
    //  with it, and so that AuthContext object that we created in auth-context.js
    // turns out to have a property .Provider that is a React component, 
    // so we use this component and wrap our entire Router with it;
    // so every  componet inside there has access to this AuthContext, 
    // the Provider also takes a value prop and here we bind the object that we 
    // initilized with our AuthContext, we bind it to a new value, and 
    // whenever this value here changes all the componets that listen to our Context
    // will rerender - mind you not all the componets that are wrapped by AuthContext 
    // but only those that are some Context code added 
    // So now we can managae some state here in the app component and bind this to the value
    // of our Context, and hence when the state here changes  and the value changes  and 
    // this component rerenders becuae our state changed  we will be able to rerender  or update
    // the components that are 'interested' in our Context
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
        {/* MainNavigation is rendered above the route where the Switch applies, its always
        visible*/}
        <MainNavigation />
        <main>
          {/* logic for React.Lazy: */}
          {/* <Suspense fallback={
            <div className="center">
              <LoadingSpinner/>
            </div>}>{routes}
          </Suspense> */}
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
