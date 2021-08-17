import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'

// import {cityDb} from './temp/m-city-export';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCv0VPkPy_Prp6rrwoyn9iWhQ7djt2a1Uk",
    authDomain: "mcity-79ca4.firebaseapp.com",
    projectId: "mcity-79ca4",
    storageBucket: "mcity-79ca4.appspot.com",
    messagingSenderId: "206817208194",
    appId: "1:206817208194:web:136ff7421dc2e37651519b",
    measurementId: "G-FX1X8506Z7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const DB = firebase.firestore();
const matchesCollection = DB.collection('matches');
const playersCollection = DB.collection('players');
const positionsCollection = DB.collection('positions');
const promotionsCollection = DB.collection('promotions');
const teamsCollection = DB.collection('teams');

// // We need to do this part just for one time because it will save data 
// // when the server is reloaded
// cityDb.matches.forEach(item => {
//     matchesCollection.add(item)
// });

// // We need to do this part just for one time because it will save data 
// // when the server is reloaded
// cityDb.players.forEach(item => {
//     playersCollection.add(item)
// });

// // We need to do this part just for one time because it will save data 
// // when the server is reloaded
// cityDb.positions.forEach(item => {
//     positionsCollection.add(item)
// });

// // We need to do this part just for one time because it will save data 
// // when the server is reloaded
// cityDb.promotions.forEach(item => {
//     promotionsCollection.add(item)
// });

// // We need to do this part just for one time because it will save data 
// // when the server is reloaded
// cityDb.teams.forEach(item => {
//     teamsCollection.add(item)
// });

export {
    firebase,
    matchesCollection,
    playersCollection,
    positionsCollection,
    promotionsCollection,
    teamsCollection
}

