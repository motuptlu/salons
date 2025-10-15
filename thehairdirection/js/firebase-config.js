// Firebase Configuration (Replace with your own Firebase project config)
const firebaseConfig = {
  apiKey: "AIzaSyDmYeInEH9tP7ZaBRXuQWstoovezi_dAj4",
  authDomain: "thehairdirection-d3f31.firebaseapp.com",
  projectId: "thehairdirection-d3f31",
  storageBucket: "thehairdirection-d3f31.firebasestorage.app",
  messagingSenderId: "744475068477",
  appId: "1:744475068477:web:1208e649d671c59b940254",
  measurementId: "G-N9GKR32QBY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const storage = firebase.storage();

// Export for use in other scripts
window.db = database;
window.storage = storage;
