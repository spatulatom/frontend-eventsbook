// import React from 'react';
// import ReactDOM from 'react-dom';

// import './index.css';
// import App from './App';

// ReactDOM.render(<App />, document.getElementById('root')); legacy react -dom 16 and below


import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
