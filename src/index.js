import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import {firebase} from './firebase';
import './Resources/css/app.css';

const App = (props) => {
  return (
    <Routes {...props}/>
  )
}

firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(
    <App user={user}/>
    ,document.getElementById('root')
  );
})