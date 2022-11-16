//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyCBKRUYjJzoEWo79lYglt8YHulHyay4_RA",
  authDomain: "comp1800-project-dev.firebaseapp.com",
  projectId: "comp1800-project-dev",
  storageBucket: "comp1800-project-dev.appspot.com",
  messagingSenderId: "1071322256460",
  appId: "1:1071322256460:web:168633a02e2216bc91d0e9",
  measurementId: "G-QYKLD1Q997"
};


//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
