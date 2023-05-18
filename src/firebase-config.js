const config = {
    apiKey: "AIzaSyABo4CxzbryH00W8Z0Yp8fo9JGYgrbvztU",
    authDomain: "to-do-app-aa73e.firebaseapp.com",
    projectId: "to-do-app-aa73e",
    storageBucket: "to-do-app-aa73e.appspot.com",
    messagingSenderId: "538501160143",
    appId: "1:538501160143:web:6f9729c4d3a42bbeebebba",
    measurementId: "G-V2TWBKYFFW"
  };
  
  export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.js');
    } else {
      return config;
    }
  }
  