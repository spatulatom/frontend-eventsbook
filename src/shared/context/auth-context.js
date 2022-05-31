import { createContext } from 'react';
  // createContext is a function React offers to create such an object to 
  // share some data behind the scenes, we can initilize it with some 
  // initial data and there we will have a very simple piece of data  
  // so we have three properties and functions in an object - that is called methods

  // so this is an object that we can share between components and when
  // we update it the data will be shared;
  // now we go to the componet that is on the top of our hierachi of components- 
  // in our case that is App.js - more notes there
export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  name: null,
  login: () => {},
  logout: () => {}
});
