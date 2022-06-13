import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);
  console.log('Navlink', auth.name)

  return (
    <ul className="nav-links">
      {auth.isLoggedIn && (
        <li>
          <NavLink to={"/allevents"}>TIMELINE</NavLink>
        </li>
      )}
        {auth.isLoggedIn && (
      <li>
        <NavLink to="/users" exact>
          USERS
        </NavLink>
      </li>
       )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/events`}>MY EVENTS</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li  className="nav-links__desktop nav-links__desktop--dropdown"> <NavLink to="/events/new">ADD EVENT</NavLink>
          <div className="nav-links__desktop--dropdown__content">
            <li className="nav-links__desktop--dropdown__item">
              <NavLink to="/events/new">ADD PLACE</NavLink>
            </li>
            <li className="nav-links__desktop--dropdown__item">
              <NavLink to="/events/new-post">ADD POST</NavLink>
            </li>
          </div>
      </li>
        
      )}
      {auth.isLoggedIn && (
        <li className='nav-links__mobile'>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li className='nav-links__mobile'>
          <NavLink to="/places/new-post">ADD POST</NavLink>
        </li>
      )}

      {auth.isLoggedIn && (
        <li>
          <NavLink to="/about">ABOUT</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">LOG IN</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <a onClick={auth.logout}>LOG OUT</a>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
