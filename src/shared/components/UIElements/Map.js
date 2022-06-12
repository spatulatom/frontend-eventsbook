import React, { useRef, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

import './Map.css';

const Map = props => {
  // useRef has two main uses to create so calld references of two kind:
  // 1.to get a pointer at a real DOM node, we create varialble const mapRef = useRef();
  // and then where we want that variable to pint on a Html element we set up 
  // spacial prop ref and assign that varialbe to it, now the connection is established, 
  // and the acutal pointer that we need is held by the .current property on our variable
  //  2.we could also create variables 
  // which survive rerender cycles of our components  and dont loose they value 
  const mapRef = useRef();
  
  // when you use props as dependencies of useEffect is better to
  // destracure them so we dont have to use the whole props object 
  // which can change more often than our single props
  const { center, zoom } = props;


  // important note about this hook is that with those dependecies
  // what happens is that it will run in the first render (and then every time
  // dependecies change) but!! it will run after the jsx has been rendered not before, 
  // so it will run in the firs cycle , so in our case that very important as it 
  // means that ref={mapRef} connection has been established by the time this code runs:
  // const map = new window.google.maps.Map(mapRef.current, {
    //   center: {lat: -34.397, lng: 150.644}, this kind of format required
    // center: center,
    // zoom: zoom - so we don get an error, 
    // otherwise if we wanted to run whats inside useEffect first we would get 
    // an error sine mapRef.current is falsy
    let map;
  useEffect(() => {
    // inndex.html will crrate new google to window, and on it we have .maps and
    // .Map, this is a contructor function which will now be available on the global 
    // window object thanks to our javascript imports in index.html;
    // this now need a pointer at an element where the map should be rendered- 
    // we could use document.getElementbyId and assign an id to our div below , like we do in here:
    // in index.js: ReactDOM.render(<App />, document.getElementById('root'));
    // but we use useRef - I wonder if we could use ref in index.js
    map = new window.google.maps.Map(mapRef.current, {
      //   center: {lat: -34.397, lng: 150.644}, this kind of format required
      center: center,
      zoom: zoom
    });
  //  here we can also creae a marker at the center
    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);  

  return (
    <React.Fragment>
    {/* {!map && <LoadingSpinner/>} */}
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
    </React.Fragment>
  );
};

export default Map;


// notice that we have javascript file, that imports javascript package
// that helps you render google maps,
// and that package is added to our aplication of course,
// (lets try to understnd it by analogy in my-portfolio i use javascript 
// file to check if link is active, that script has to be made part of index.html 
// and only then it will be able to tap into dom elements and manipulate them,
// so in here we have also some javascript function in a file -it is online though
// and it manipulates our dom? anyways we can tap into that, and that is:
// our function will add global 'google' on the 'window' object, that 
// google varable gives us access to the 'maps' features and ultimatly
// to the map constructor function,
// that Map constructor function need a pointer at the element where the map 
// should be rendered )