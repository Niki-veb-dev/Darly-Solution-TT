import firebase from 'firebase/compat/app';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './App';

const firebaseConfig = {
  apiKey: 'AIzaSyB3ztw78QbRqpAbw7CRO00Z-Mh5QPa9_-4',
  authDomain: 'fir-test-project-8bd3a.firebaseapp.com',
  databaseURL: 'https://fir-test-project-8bd3a-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'fir-test-project-8bd3a',
  storageBucket: 'fir-test-project-8bd3a.appspot.com',
  messagingSenderId: '400610114990',
  appId: '1:400610114990:web:a8f1d61f4a538229715c3f',
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
