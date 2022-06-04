import React from 'react';
// react-dom-router has named imports so we have to import multiple 
// specific things by their name (in contrac to for example import
// Rwact from 'react')
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import Reset from './user/pages/Reset';
import NewPassword from './user/pages/NewPassword';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import AllPlaces from './places/pages/AllPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import Welcome from './user/pages/WelcomePage';
import NewPost from './places/pages/NewPost';
import About from './user/pages/About';
import Login from './user/pages/Login';

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
        <Route path="/users" exact>
          <Users />
        </Route>
        {/* <Route path="/users" component={Users}/> */}
        
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/allplaces" exact>
          <AllPlaces/>
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        {/* apparently even with exact the order matters, like the following 
        two routes should not be swapped */}
        <Route path="/places/new-post" exact>
          <NewPost />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Redirect to="/allplaces" />
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
        <Route path="/" exact>
          <Welcome />
        </Route>
        <Route path="/auth" exact>
          {/* <Auth /> */}
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
        <Redirect to="/" />
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
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
