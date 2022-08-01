
# frontend-'eventsbook'

This is a frontend source code of a MERN app called 'eventsbook' and is intended as social media platform.

It is built with up-to-date React.js (React 18) and is deployed on Firebase. The frontend and the backend are both using Google Map Platform APIs for the 'location' functionality.

Heavy usage of React Hooks like useReducer for managing complex state and useContext (as a part of the Context API that is being used for a "global" state managment) also useEffect, useRef, useCallback and useState. There are also custom hooks built and that is form-hook.js for managing form data, http-hook.js for all fetching requests and auth-hook.js for managing back end login token through the rerender cycles.

Multer middleware library is used for uploading multipart/form-data (photos), bcrypt library for hashing password and jsonwebtoken for creating login token.

All sorts of errors that are being handled on the back end with custom error messages are dispalyed on the fronend for better UX.

As for the CSS styling, Block/Element/Modifier convention is being followed.





