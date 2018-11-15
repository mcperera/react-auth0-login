import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Auth from './Auth';

const auth = new Auth();

let state = {}; // Globle state
window.setState = (changes) => {    // This will track our all the changes of this application.
    state = Object.assign( {}, state, changes);
    ReactDOM.render(<App {...state} />, document.getElementById('root')); // This will rerender everytime that application make changes. Passing all the properties by using spred (...) operator.
}

/*eslint no-restricted-globals: ["off", "location"]*/

let username = auth.getProfile().given_name || 'Madushan Perera'

let initialState = {
    name : username,
    location : location.pathname.replace(/^\/?|\/$/g,''),  // Routing
    auth
};

window.setState(initialState); // Starting the application by using.

serviceWorker.unregister();
