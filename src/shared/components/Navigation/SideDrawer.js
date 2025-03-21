import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';

import './SideDrawer.css';
// https://github.com/reactjs/react-transition-group/issues/918 now useRef is needed
// The Solution: Using nodeRef
// The key issue is that React 19 removed findDOMNode, which React Transition Group v4 relies on. 
// Instead of upgrading to v5, you can use the nodeRef approach that's supported in v4.4.5:

const SideDrawer = props => {
  const nodeRef = useRef(null);
  const content = (
    // npm install --save react-transition-group
    <CSSTransition
    // its a component and we are wrapping aside in it,
    // we need to tell the library when teh sidedrawer becomes visible, we do this 
    // with the 'in' prop
      in={props.show}
      // timeout is the duration of the animation and it is in miliseconds;
      // looks like this timeout prop has no effect and to change duration 
      // oft the transition we need to change property of the classNames in index.css
      timeout={2000}
      // then classNames (not className) spaccial prop accepted by this component
      // those css classes are defined in index.css and CSSTransition knows 
      // how to use them and applies them in sequence
      classNames="slide-in-left"
      // the last two props regard whats wrapped in which is <aside> and tells
      // this component what should be added towo the DOM and what shoul be
      // removed from the DOM
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
  );
// we are usin ReactDOM.creatPortal, the difference is that when we inspect 
// our app sidedrawer which shows like <aside="side-drawer>" is under <bidy> element
// not under "root" like the rest of the aplication, it a sematical defference with 
// unknown purpose
  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
