// Firebase Configuration (Replace with your own Firebase project config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE", // Replace with your Firebase API key
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const storage = firebase.storage();

// Export for use in other scripts
window.db = database;
window.storage = storage;
